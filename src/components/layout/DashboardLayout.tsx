import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Bot, 
  BarChart3, 
  Settings, 
  CreditCard, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  MessageSquare,
  LifeBuoy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { blink } from '@/lib/blink';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    return blink.auth.onAuthStateChanged(({ user, isLoading }) => {
      setUser(user);
      setLoading(isLoading);
      if (!isLoading && !user) {
        navigate('/');
      }
    });
  }, [navigate]);

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
    else setSidebarOpen(true);
  }, [isMobile]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-950"></div>
      </div>
    );
  }

  if (!user) return null;

  const navItems = [
    { icon: <Bot size={20} />, label: 'Chatbots', path: '/dashboard' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: <CreditCard size={20} />, label: 'Billing', path: '/dashboard/billing' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-zinc-200 transition-transform duration-300 transform lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6 border-b border-zinc-100">
            <a href="/" className="flex items-center gap-2">
              <Bot className="h-7 w-7 text-zinc-950" />
              <span className="text-lg font-bold tracking-tighter text-zinc-950">BotSupport</span>
            </a>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-zinc-100 text-zinc-950' 
                      : 'text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-zinc-100 space-y-1">
            <a 
              href="#" 
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-500 rounded-lg hover:text-zinc-950 hover:bg-zinc-50 transition-colors"
            >
              <LifeBuoy size={20} />
              Help & Support
            </a>
            <button 
              onClick={() => blink.auth.signOut()}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-red-500 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-zinc-200 lg:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6 text-zinc-500" />
          </button>
          <span className="font-bold">BotSupport</span>
          <div className="w-6"></div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-zinc-950/20 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
