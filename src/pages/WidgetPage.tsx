import React, { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Send, Bot, User, X, MessageCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { blink } from '@/lib/blink';
import { toast } from 'sonner';
import { generateSupportReply } from '@/lib/openrouter';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function WidgetPage() {
  const [searchParams] = useSearchParams();
  const widgetId = searchParams.get('id');
  const [bot, setBot] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [showSatisfaction, setShowSatisfaction] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [aiDraft, setAiDraft] = useState<string | null>(null);
  const [aiDraftLoading, setAiDraftLoading] = useState(false);
  const [aiDraftError, setAiDraftError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (widgetId) {
      fetchBotByWidgetId();
    }
    return () => { abortRef.current?.abort(); };
  }, [widgetId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const fetchBotByWidgetId = async () => {
    try {
      const { rows } = await blink.db.sql(`SELECT * FROM chatbots WHERE widget_id = ?`, [widgetId]);
      if (rows && rows.length > 0) {
        const botData = rows[0];
        setBot({
          ...botData,
          settings: botData.settings ? JSON.parse(botData.settings) : {}
        });

        // Initial greeting
        setMessages([{
          role: 'assistant',
          content: botData.settings ? JSON.parse(botData.settings).greeting : 'Hello! How can I help you?'
        }]);
      }
    } catch (error) {
      console.error('Error fetching bot:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !bot) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      // 1. Create or get conversation
      let currentConvId = conversationId;
      if (!currentConvId) {
        currentConvId = `conv_${Math.random().toString(36).substring(2, 12)}`;
        await blink.db.conversations.create({
          id: currentConvId,
          chatbot_id: bot.id,
          visitor_id: 'anonymous', // In a real app, track this via cookie/localstorage
          metadata: JSON.stringify({
            userAgent: navigator.userAgent,
            language: navigator.language
          })
        });
        setConversationId(currentConvId);
      }

      // 2. Save user message
      await blink.db.messages.create({
        id: `msg_${Date.now()}_u`,
        conversation_id: currentConvId,
        role: 'user',
        content: userMessage
      });

      // Fire OpenRouter draft (non-blocking)
      abortRef.current?.abort();
      abortRef.current = new AbortController();
      setAiDraft(null);
      setAiDraftError(null);
      setAiDraftLoading(true);
      generateSupportReply(
        messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
        bot.settings?.botName || bot.name || 'Support',
        abortRef.current.signal
      ).then(draft => {
        setAiDraft(draft);
      }).catch(err => {
        if (err.name !== 'AbortError') {
          setAiDraftError(err.message);
        }
      }).finally(() => {
        setAiDraftLoading(false);
      });

      // 3. Get AI response using RAG if available
      let aiResponse = '';
      if (bot.rag_collection_id) {
        const { answer } = await blink.rag.aiSearch({
          collectionName: bot.rag_collection_id,
          query: userMessage,
          model: 'google/gemini-3-flash'
        });
        aiResponse = answer;
      } else {
        const { text } = await blink.ai.generateText({
          prompt: `You are a helpful customer support assistant. Answer the user's question: ${userMessage}`,
          model: 'google/gemini-3-flash'
        });
        aiResponse = text;
      }

      // 4. Save AI message
      await blink.db.messages.create({
        id: `msg_${Date.now()}_a`,
        conversation_id: currentConvId,
        role: 'assistant',
        content: aiResponse
      });

      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);

      // Show satisfaction after 3 messages
      if (messages.length > 2 && !showSatisfaction) {
        setShowSatisfaction(true);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSatisfaction = async (rating: number) => {
    if (conversationId) {
      try {
        await blink.db.conversations.update(conversationId, {
          satisfaction_rating: rating
        });
        toast.success('Thank you for your feedback!');
        setShowSatisfaction(false);
      } catch (error) {
        console.error('Error saving satisfaction:', error);
      }
    }
  };

  if (loading) return null;
  if (!bot) return (
    <div className="p-4 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
      Bot not found
    </div>
  );

  const themeColor = bot.settings.primaryColor || '#18181b';

  return (
    <div
      className="flex flex-col h-screen font-sans"
      style={{
        background: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border-subtle)',
        fontFamily: 'var(--font-display)',
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-4 flex items-center justify-between text-white shadow-sm"
        style={{ backgroundColor: themeColor }}
      >
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bot size={18} />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight">{bot.settings.botName || bot.name}</h1>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span>
              <span className="text-[10px] font-medium opacity-80">Always active</span>
            </div>
          </div>
        </div>
        <button className="opacity-70 hover:opacity-100 transition-opacity">
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ background: 'var(--color-bg-primary)' }}
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'
              }`}
              style={
                msg.role === 'user'
                  ? { background: 'var(--color-accent-teal)', color: '#0A1628' }
                  : {
                      background: 'var(--color-bg-elevated)',
                      color: 'var(--color-text-primary)',
                      border: '1px solid var(--color-border-subtle)',
                    }
              }
            >
              {msg.content}
            </div>
          </div>
        ))}

        {(aiDraftLoading || aiDraft || aiDraftError) && (
          <div className="flex justify-start">
            <div className="ai-draft-bubble">
              <div className="ai-draft-label">
                AI DRAFT
                {aiDraft && (
                  <div className="confidence-bar">
                    <div className="confidence-fill" />
                  </div>
                )}
              </div>
              {aiDraftLoading && (
                <div className="draft-dots">
                  <span className="dot" style={{ animationDelay: '0s' }} />
                  <span className="dot" style={{ animationDelay: '0.2s' }} />
                  <span className="dot" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
              {aiDraft && <p>{aiDraft}</p>}
              {aiDraftError && (
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-accent-error)', margin: 0 }}>
                  {aiDraftError}
                </p>
              )}
            </div>
          </div>
        )}

        {isTyping && (
          <div className="flex justify-start">
            <div
              className="px-4 py-2 rounded-2xl rounded-tl-none"
              style={{
                background: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border-subtle)',
              }}
            >
              <div className="draft-dots" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <span className="dot" style={{ animationDelay: '0s' }} />
                <span className="dot" style={{ animationDelay: '0.2s' }} />
                <span className="dot" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}

        {showSatisfaction && (
          <div
            className="flex flex-col items-center gap-3 p-4 rounded-2xl text-center animate-fade-in"
            style={{
              background: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Rate this conversation
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleSatisfaction(rating)}
                  className="h-8 w-8 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: 'var(--color-bg-glass)',
                    border: '1px solid var(--color-border-subtle)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div
        className="p-4"
        style={{
          background: 'var(--color-bg-elevated)',
          borderTop: '1px solid var(--color-border-subtle)',
        }}
      >
        <div className="relative flex items-center">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="pr-12 py-6 rounded-2xl"
            style={{
              background: 'var(--color-bg-glass)',
              borderColor: 'var(--color-border-subtle)',
              color: 'var(--color-text-primary)',
            }}
          />
          <Button
            size="icon"
            className="absolute right-2 rounded-xl"
            style={{ backgroundColor: themeColor }}
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
          >
            <Send size={18} />
          </Button>
        </div>
        <p
          className="text-[10px] text-center mt-3 uppercase tracking-widest font-bold"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Powered by <span style={{ color: 'var(--color-text-secondary)' }}>BitBeetle</span>
        </p>
      </div>
    </div>
  );
}
