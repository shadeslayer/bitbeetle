import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, MessageSquare, Star, Zap } from 'lucide-react';
import { blink } from '@/lib/blink';

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    conversations: 0,
    visitors: 0,
    satisfaction: 0,
    messages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const user = await blink.auth.me();
      if (!user) return;

      // Get all chatbots for this user
      const chatbots = await blink.db.chatbots.list({
        where: { user_id: user.id }
      });
      const botIds = chatbots.map(b => b.id);

      if (botIds.length === 0) {
        setLoading(false);
        return;
      }

      // Fetch conversations for these bots
      const conversations = await blink.db.conversations.list({
        where: {
          OR: botIds.map(id => ({ chatbot_id: id }))
        }
      });

      const visitorIds = new Set(conversations.map(c => c.visitor_id));
      const ratedConversations = conversations.filter(c => c.satisfaction_rating !== null);
      const avgSatisfaction = ratedConversations.length > 0 
        ? (ratedConversations.reduce((acc, c) => acc + Number(c.satisfaction_rating), 0) / ratedConversations.length).toFixed(1)
        : 0;

      setStats({
        conversations: conversations.length,
        visitors: visitorIds.size,
        satisfaction: Number(avgSatisfaction),
        messages: 0 
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-zinc-950">Analytics</h1>
        <p className="text-zinc-500 mt-1">Track conversations and visitor satisfaction.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Conversations" 
          value={stats.conversations.toString()} 
          change="+0%" 
          icon={<MessageSquare size={20} />} 
        />
        <StatsCard 
          title="Active Visitors" 
          value={stats.visitors.toString()} 
          change="+0%" 
          icon={<Users size={20} />} 
        />
        <StatsCard 
          title="Satisfaction Rate" 
          value={`${(stats.satisfaction * 20).toFixed(0)}%`} 
          change="+0%" 
          icon={<Star size={20} />} 
        />
        <StatsCard 
          title="Response Time" 
          value="< 1s" 
          change="stable" 
          icon={<Zap size={20} />} 
        />
      </div>

      <Card className="mono-card">
        <CardHeader>
          <CardTitle>Conversation Trends</CardTitle>
          <CardDescription>Daily volume of support queries across all bots.</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center border-t border-zinc-100">
          {stats.conversations > 0 ? (
            <div className="text-center">
              <BarChart3 size={48} className="text-zinc-200 mx-auto mb-4" />
              <p className="text-zinc-500">Analytics visualization is being processed.</p>
            </div>
          ) : (
            <p className="text-zinc-400">Not enough data to display trends.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatsCard({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
  return (
    <Card className="mono-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-zinc-500">{title}</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-zinc-950">{value}</div>
        <p className="text-xs text-zinc-400 mt-1">
          <span className="text-zinc-600 font-medium">{change}</span> from last month
        </p>
      </CardContent>
    </Card>
  );
}
