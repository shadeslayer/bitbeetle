import React, { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Send, Bot, User, X, MessageCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { blink } from '@/lib/blink';
import { toast } from 'sonner';

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

  useEffect(() => {
    if (widgetId) {
      fetchBotByWidgetId();
    }
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
  if (!bot) return <div className="p-4 text-center text-zinc-400 text-sm">Bot not found</div>;

  const themeColor = bot.settings.primaryColor || '#18181b';

  return (
    <div className="flex flex-col h-screen bg-white font-sans border border-zinc-200">
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
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-zinc-950 text-white rounded-tr-none' 
                : 'bg-white text-zinc-900 border border-zinc-200 rounded-tl-none shadow-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-zinc-200 px-4 py-2 rounded-2xl rounded-tl-none shadow-sm">
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}

        {showSatisfaction && (
          <div className="flex flex-col items-center gap-3 p-4 bg-white border border-zinc-100 rounded-2xl shadow-sm text-center animate-fade-in">
            <p className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Rate this conversation</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button 
                  key={rating}
                  onClick={() => handleSatisfaction(rating)}
                  className="h-8 w-8 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 hover:border-zinc-400 transition-all text-zinc-600 hover:text-zinc-950"
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-zinc-100">
        <div className="relative flex items-center">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="pr-12 py-6 rounded-2xl border-zinc-200 focus:ring-zinc-950 bg-zinc-50/50"
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
        <p className="text-[10px] text-zinc-400 text-center mt-3 uppercase tracking-widest font-bold">
          Powered by <span className="text-zinc-900">BotSupport</span>
        </p>
      </div>
    </div>
  );
}
