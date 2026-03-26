import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, Menu, X } from 'lucide-react';
import { blink } from '@/lib/blink';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const unsubscribe = blink.auth.onAuthStateChanged(({ user }) => {
      setUser(user);
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const handleLogin = () => {
    blink.auth.login(window.location.origin + '/dashboard');
  };

  const handleLogout = () => {
    blink.auth.signOut();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-zinc-100 py-3' : 'bg-transparent py-6'}`}>
      <div className="container px-4 mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <Bot className="h-8 w-8 text-zinc-950 transition-transform group-hover:scale-110" />
          <span className="text-xl font-bold tracking-tighter text-zinc-950">BotSupport</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6 text-sm font-medium text-zinc-600">
            <a href="#features" className="hover:text-zinc-950 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-zinc-950 transition-colors">Pricing</a>
            <a href="#docs" className="hover:text-zinc-950 transition-colors">Docs</a>
          </div>
          <div className="flex items-center gap-3 pl-6 border-l border-zinc-100">
            {user ? (
              <>
                <Button variant="ghost" className="text-sm font-medium" onClick={() => window.location.href = '/dashboard'}>
                  Dashboard
                </Button>
                <Button variant="outline" className="text-sm font-medium rounded-full" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="text-sm font-medium" onClick={handleLogin}>
                  Login
                </Button>
                <Button className="text-sm font-medium rounded-full" onClick={handleLogin}>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2 text-zinc-950" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-zinc-100 p-6 animate-fade-in">
          <div className="flex flex-col gap-4">
            <a href="#features" className="text-lg font-medium text-zinc-600" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#pricing" className="text-lg font-medium text-zinc-600" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <a href="#docs" className="text-lg font-medium text-zinc-600" onClick={() => setMobileMenuOpen(false)}>Docs</a>
            <div className="pt-4 border-t border-zinc-100 flex flex-col gap-3">
              {user ? (
                <Button className="w-full rounded-full" onClick={() => window.location.href = '/dashboard'}>Dashboard</Button>
              ) : (
                <>
                  <Button variant="outline" className="w-full rounded-full" onClick={handleLogin}>Login</Button>
                  <Button className="w-full rounded-full" onClick={handleLogin}>Get Started</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
