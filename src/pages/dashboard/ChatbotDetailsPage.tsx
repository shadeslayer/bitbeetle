import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Bot, 
  FileText, 
  Settings, 
  Code, 
  Upload, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MessageSquare,
  Copy,
  Plus,
  ArrowLeft,
  Search,
  Zap,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { blink } from '@/lib/blink';
import { toast } from 'sonner';

export default function ChatbotDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bot, setBot] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [docs, setDocs] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchBotDetails();
  }, [id]);

  const fetchBotDetails = async () => {
    if (!id) return;
    try {
      const data = await blink.db.chatbots.get(id);
      if (!data) {
        toast.error('Chatbot not found');
        navigate('/dashboard');
        return;
      }
      setBot(data);
      
      const knowledge = await blink.db.knowledgeBase.list({
        where: { chatbot_id: id },
        orderBy: { created_at: 'desc' }
      });
      setDocs(knowledge);
    } catch (error) {
      console.error('Error fetching bot details:', error);
      toast.error('Failed to load bot details');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !id || !bot) return;

    setUploading(true);
    try {
      // 1. Upload to storage
      const extension = file.name.split('.').pop();
      const filename = `${id}_${Date.now()}.${extension}`;
      const { publicUrl } = await blink.storage.upload(file, `knowledge_base/${filename}`);

      // 2. Initialize RAG collection if not exists
      let collectionName = bot.rag_collection_id;
      if (!collectionName) {
        collectionName = `col_${id}`;
        await blink.rag.createCollection({ name: collectionName });
        await blink.db.chatbots.update(id, { rag_collection_id: collectionName });
        setBot({ ...bot, rag_collection_id: collectionName });
      }

      // 3. Process with RAG
      const doc = await blink.rag.upload({
        collectionName,
        filename: file.name,
        file: {
          data: await file.arrayBuffer(),
          contentType: file.type
        }
      });

      // 4. Save to DB
      const newDoc = await blink.db.knowledgeBase.create({
        chatbot_id: id,
        user_id: bot.user_id,
        filename: file.name,
        doc_id: doc.id,
        status: 'ready'
      });

      setDocs([newDoc, ...docs]);
      toast.success('Document uploaded and processed');
    } catch (error) {
      console.error('Error uploading document:', error);
      toast.error('Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDoc = async (docId: string, ragDocId: string) => {
    try {
      await blink.db.knowledgeBase.delete(docId);
      if (bot.rag_collection_id) {
        await blink.rag.deleteDocument(ragDocId);
      }
      setDocs(docs.filter(d => d.id !== docId));
      toast.success('Document removed');
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Failed to delete document');
    }
  };

  const copyEmbedCode = () => {
    const code = `<script 
  src="${window.location.origin}/widget.js" 
  data-widget-id="${bot?.widget_id}" 
  async
></script>`;
    navigator.clipboard.writeText(code);
    toast.success('Embed code copied to clipboard');
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!bot) return null;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-zinc-950 flex items-center gap-3">
            {bot.name}
            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${bot.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-zinc-100 text-zinc-500'}`}>
              {bot.status}
            </span>
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Widget ID: {bot.widget_id}</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-white border border-zinc-200 p-1 rounded-full w-full sm:w-auto h-auto">
          <TabsTrigger value="overview" className="rounded-full px-6 py-2 data-[state=active]:bg-zinc-950 data-[state=active]:text-white">Overview</TabsTrigger>
          <TabsTrigger value="knowledge" className="rounded-full px-6 py-2 data-[state=active]:bg-zinc-950 data-[state=active]:text-white">Knowledge Base</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-full px-6 py-2 data-[state=active]:bg-zinc-950 data-[state=active]:text-white">Settings</TabsTrigger>
          <TabsTrigger value="installation" className="rounded-full px-6 py-2 data-[state=active]:bg-zinc-950 data-[state=active]:text-white">Installation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard title="Conversations" value="0" icon={<MessageSquare className="text-zinc-400" />} />
            <StatsCard title="Docs Trained" value={docs.length.toString()} icon={<FileText className="text-zinc-400" />} />
            <StatsCard title="Avg. Satisfaction" value="N/A" icon={<Zap className="text-zinc-400" />} />
          </div>

          <Card className="mono-card overflow-hidden">
            <CardHeader className="bg-zinc-50 border-b border-zinc-100">
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Monitor your chatbot's performance in real-time.</CardDescription>
            </CardHeader>
            <CardContent className="py-12 text-center">
              <div className="h-16 w-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 size={32} className="text-zinc-400" />
              </div>
              <p className="text-zinc-500">No activity recorded yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-950">Knowledge Base</h2>
              <p className="text-zinc-500 text-sm">Upload documents to train your AI agent.</p>
            </div>
            
            <div className="relative">
              <Input
                type="file"
                className="hidden"
                id="kb-upload"
                onChange={handleFileUpload}
                accept=".pdf,.txt,.docx,.html"
                disabled={uploading}
              />
              <Label
                htmlFor="kb-upload"
                className={`inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${uploading ? 'bg-zinc-100 text-zinc-400' : 'bg-zinc-950 text-white hover:bg-zinc-800'}`}
              >
                {uploading ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" /> Upload Document
                  </>
                )}
              </Label>
            </div>
          </div>

          {docs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {docs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-2xl group hover:border-zinc-300 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-zinc-50 rounded-lg flex items-center justify-center text-zinc-400">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-950">{doc.filename}</p>
                      <p className="text-xs text-zinc-400 flex items-center gap-1">
                        <CheckCircle2 size={12} className="text-green-500" /> Trained • {new Date(doc.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDeleteDoc(doc.id, doc.doc_id)}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-dashed border-zinc-200 rounded-2xl">
              <FileText size={32} className="text-zinc-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-zinc-950">No documents yet</h3>
              <p className="text-zinc-500 max-w-xs mx-auto text-sm mt-1">
                Upload PDFs or documentation to train your AI support agent.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="mono-card">
            <CardHeader>
              <CardTitle>Chatbot Configuration</CardTitle>
              <CardDescription>Customize how your bot looks and behaves.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bot-name">Bot Display Name</Label>
                  <Input id="bot-name" defaultValue={bot.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Theme Color</Label>
                  <div className="flex gap-2">
                    <Input id="primary-color" type="color" className="w-12 h-10 p-1" defaultValue="#18181b" />
                    <Input defaultValue="#18181b" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="greeting">Welcome Message</Label>
                <Input id="greeting" defaultValue="Hello! How can I help you today?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="system-prompt">System Instructions (Advanced)</Label>
                <Textarea 
                  id="system-prompt" 
                  rows={4}
                  placeholder="Tell the AI how to behave..."
                  defaultValue="You are a helpful customer support assistant. Answer questions based on the provided documentation."
                />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="installation" className="space-y-6">
          <Card className="mono-card">
            <CardHeader>
              <CardTitle>Embed Code</CardTitle>
              <CardDescription>Add this code to your website to enable the support widget.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <pre className="p-4 bg-zinc-950 text-zinc-400 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed">
                  {`<script 
  src="${window.location.origin}/widget.js" 
  data-widget-id="${bot.widget_id}" 
  async
></script>`}
                </pre>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute top-2 right-2 text-zinc-500 hover:text-white"
                  onClick={copyEmbedCode}
                >
                  <Copy size={16} />
                </Button>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-zinc-500">How to install</h4>
                <ol className="list-decimal list-inside space-y-2 text-zinc-600 text-sm">
                  <li>Copy the script tag above.</li>
                  <li>Paste it into the <code className="bg-zinc-100 px-1 rounded text-zinc-950">{'<head>'}</code> or <code className="bg-zinc-100 px-1 rounded text-zinc-950">{'<body>'}</code> of your website.</li>
                  <li>The support widget will appear in the bottom right corner automatically.</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatsCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <Card className="mono-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-zinc-500">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-zinc-950">{value}</div>
      </CardContent>
    </Card>
  );
}
