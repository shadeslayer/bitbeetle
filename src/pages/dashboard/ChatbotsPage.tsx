import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Settings, 
  MessageSquare, 
  Trash2,
  Bot,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { blink } from '@/lib/blink';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// MVP bypass: hardcoded user until auth is implemented
const MVP_USER_ID = 'demo';

export default function ChatbotsPage() {
  const [chatbots, setChatbots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newBotName, setNewBotName] = useState('');
  const [newBotDesc, setNewBotDesc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchChatbots();
  }, []);

  const fetchChatbots = async () => {
    try {
      const user = await blink.auth.me().catch(() => null);
      const userId = user?.id ?? MVP_USER_ID;
      
      const data = await blink.db.chatbots.list({
        where: { user_id: userId },
        orderBy: { created_at: 'desc' }
      });
      setChatbots(data);
    } catch (error) {
      console.error('Error fetching chatbots:', error);
      toast.error('Failed to load chatbots');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBot = async () => {
    if (!newBotName.trim()) {
      toast.error('Bot name is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await blink.auth.me().catch(() => null);
      const userId = user?.id ?? MVP_USER_ID;

      const widgetId = Math.random().toString(36).substring(2, 12);
      const botId = `bot_${Math.random().toString(36).substring(2, 10)}`;
      
      const newBot = await blink.db.chatbots.create({
        id: botId,
        name: newBotName,
        description: newBotDesc,
        user_id: userId,
        widget_id: widgetId,
        status: 'active',
        settings: JSON.stringify({
          primaryColor: '#18181b',
          greeting: 'Hello! How can I help you today?',
          botName: newBotName
        })
      });

      toast.success('Chatbot created successfully');
      setChatbots([newBot, ...chatbots]);
      setIsCreateOpen(false);
      setNewBotName('');
      setNewBotDesc('');
      
      // Navigate to details
      navigate(`/dashboard/chatbots/${botId}`);
    } catch (error) {
      console.error('Error creating chatbot:', error);
      toast.error('Failed to create chatbot');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBot = async (id: string) => {
    if (!confirm('Are you sure you want to delete this chatbot? This action cannot be undone.')) return;

    try {
      await blink.db.chatbots.delete(id);
      setChatbots(chatbots.filter(bot => bot.id !== id));
      toast.success('Chatbot deleted');
    } catch (error) {
      console.error('Error deleting chatbot:', error);
      toast.error('Failed to delete chatbot');
    }
  };

  const filteredBots = chatbots.filter(bot => 
    bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bot.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-950">My Chatbots</h1>
          <p className="text-zinc-500 mt-1">Manage and train your AI support agents.</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full">
              <Plus className="mr-2 h-4 w-4" /> Create New Bot
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Chatbot</DialogTitle>
              <DialogDescription>
                Give your chatbot a name and a brief description of its purpose.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Bot Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g. Support Assistant" 
                  value={newBotName}
                  onChange={(e) => setNewBotName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea 
                  id="description" 
                  placeholder="What should this bot help with?" 
                  value={newBotDesc}
                  onChange={(e) => setNewBotDesc(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateBot} disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Chatbot'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center relative max-w-md">
        <Search className="absolute left-3 h-4 w-4 text-zinc-400" />
        <Input 
          placeholder="Search chatbots..." 
          className="pl-10 rounded-full bg-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-32 bg-zinc-50"></CardHeader>
              <CardContent className="h-16"></CardContent>
            </Card>
          ))}
        </div>
      ) : filteredBots.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBots.map((bot) => (
            <Card key={bot.id} className="mono-card group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-950">
                    <Bot size={24} />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-950">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/dashboard/chatbots/${bot.id}`)}>
                        <Settings className="mr-2 h-4 w-4" /> Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => handleDeleteBot(bot.id)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="mt-4 flex items-center gap-2">
                  {bot.name}
                  <span className={`h-2 w-2 rounded-full ${bot.status === 'active' ? 'bg-green-500' : 'bg-zinc-300'}`}></span>
                </CardTitle>
                <CardDescription className="line-clamp-2 mt-1">
                  {bot.description || 'No description provided.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-xs font-medium text-zinc-400 mb-4 uppercase tracking-wider">
                  <span>Widget ID: {bot.widget_id}</span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 rounded-lg text-xs"
                    onClick={() => navigate(`/dashboard/chatbots/${bot.id}`)}
                  >
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 rounded-lg text-xs"
                    onClick={() => navigate(`/dashboard/chatbots/${bot.id}/test`)}
                  >
                    Test Bot <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white border border-dashed border-zinc-200 rounded-2xl">
          <div className="h-16 w-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bot size={32} className="text-zinc-400" />
          </div>
          <h3 className="text-xl font-bold text-zinc-950">No chatbots found</h3>
          <p className="text-zinc-500 mt-2 max-w-xs mx-auto">
            You haven't created any chatbots yet. Click the button above to get started.
          </p>
          <Button variant="outline" className="mt-6 rounded-full" onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create First Bot
          </Button>
        </div>
      )}
    </div>
  );
}
