import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  Settings,
  CreditCard,
  LogOut,
  Menu,
  LifeBuoy
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// MVP bypass: auth is disabled. Replace with real auth when ready.
const MVP_USER = { id: 'demo', email: 'demo@bitbeetle.app' };

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
    else setSidebarOpen(true);
  }, [isMobile]);

  const navItems = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <ellipse cx="14" cy="16" rx="9" ry="10" fill="var(--color-accent-teal)" opacity="0.9"/>
          <ellipse cx="14" cy="15" rx="6" ry="7" fill="var(--color-bg-primary)"/>
          <circle cx="14" cy="13" r="3" fill="var(--color-accent-cyan)"/>
          <line x1="10" y1="7" x2="7" y2="2" stroke="var(--color-accent-teal)" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="18" y1="7" x2="21" y2="2" stroke="var(--color-accent-teal)" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="5"  y1="13" x2="1"  y2="11" stroke="var(--color-accent-teal)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="5"  y1="16" x2="1"  y2="16" stroke="var(--color-accent-teal)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="5"  y1="19" x2="1"  y2="21" stroke="var(--color-accent-teal)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="23" y1="13" x2="27" y2="11" stroke="var(--color-accent-teal)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="23" y1="16" x2="27" y2="16" stroke="var(--color-accent-teal)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="23" y1="19" x2="27" y2="21" stroke="var(--color-accent-teal)" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      ),
      label: 'Chatbots',
      path: '/dashboard',
    },
    { icon: <BarChart3 size={20} />, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: <CreditCard size={20} />, label: 'Billing', path: '/dashboard/billing' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--color-bg-primary)' }}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[220px] transition-transform duration-300 transform lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: 'var(--color-bg-elevated)', borderRight: '1px solid var(--color-border-subtle)' }}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
            <a href="/" className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <ellipse cx="14" cy="16" rx="9" ry="10" fill="var(--color-accent-teal)" opacity="0.9"/>
                <ellipse cx="14" cy="15" rx="6" ry="7" fill="var(--color-bg-primary)"/>
                <circle cx="14" cy="13" r="3" fill="var(--color-accent-cyan)"/>
                <line x1="10" y1="7" x2="7" y2="2" stroke="var(--color-accent-teal)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="18" y1="7" x2="21" y2="2" stroke="var(--color-accent-teal)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="5"  y1="13" x2="1"  y2="11" stroke="var(--color-accent-teal)" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="5"  y1="16" x2="1"  y2="16" stroke="var(--color-accent-teal)" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="5"  y1="19" x2="1"  y2="21" stroke="var(--color-accent-teal)" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="23" y1="13" x2="27" y2="11" stroke="var(--color-accent-teal)" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="23" y1="16" x2="27" y2="16" stroke="var(--color-accent-teal)" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="23" y1="19" x2="27" y2="21" stroke="var(--color-accent-teal)" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span className="text-lg font-bold tracking-tighter" style={{ color: 'var(--color-text-primary)' }}>BitBeetle</span>
            </a>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center gap-3 py-2 text-sm font-medium transition-colors'
                    : 'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-[rgba(23,195,206,0.06)]'
                }
                style={({ isActive }) =>
                  isActive
                    ? {
                        borderLeft: '3px solid var(--color-accent-teal)',
                        background: 'var(--color-accent-teal-dim)',
                        color: 'var(--color-accent-teal)',
                        paddingLeft: 'calc(0.75rem - 3px)',
                      }
                    : { color: 'var(--color-text-secondary)' }
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 space-y-1" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-[rgba(255,255,255,0.04)]"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <LifeBuoy size={20} />
              Help & Support
            </a>
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-[rgba(248,113,113,0.08)]"
              style={{ color: 'var(--color-accent-error)' }}
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden" style={{ background: 'var(--color-bg-primary)' }}>
        <header
          className="flex items-center justify-between px-6 lg:hidden"
          style={{
            background: 'var(--color-bg-primary)',
            borderBottom: '1px solid var(--color-border-subtle)',
            height: '60px',
          }}
        >
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" style={{ color: 'var(--color-text-secondary)' }} />
          </button>
          <span className="font-bold" style={{ color: 'var(--color-text-primary)' }}>BitBeetle</span>
          <div className="w-6"></div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
