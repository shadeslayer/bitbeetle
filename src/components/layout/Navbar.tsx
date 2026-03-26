import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToDashboard = () => { window.location.href = '/dashboard'; };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'bg-transparent py-6'}`}
      style={scrolled ? {
        background: 'rgba(10, 22, 40, 0.88)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(23,195,206,0.18)',
      } : undefined}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <span className="transition-transform group-hover:scale-110 inline-block">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
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
          </span>
          <span className="text-xl font-bold tracking-tighter" style={{ color: 'var(--color-text-primary)' }}>BitBeetle</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6 text-sm font-medium">
            <a href="#features" className="transition-colors" style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>Features</a>
            <a href="#pricing" className="transition-colors" style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>Pricing</a>
            <a href="#docs" className="transition-colors" style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>Docs</a>
          </div>
          <div className="flex items-center gap-3 pl-6 border-l" style={{ borderColor: 'var(--color-border-subtle)' }}>
            <Button
              className="text-sm font-medium rounded-full"
              style={{ background: 'var(--color-accent-cyan)', color: '#0A1628', fontWeight: 600 }}
              onClick={goToDashboard}
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2" style={{ color: 'var(--color-text-primary)' }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden absolute top-full left-0 right-0 p-6 animate-fade-in"
          style={{ background: 'var(--color-bg-elevated)', borderBottom: '1px solid var(--color-border-subtle)' }}
        >
          <div className="flex flex-col gap-4">
            <a href="#features" className="text-lg font-medium" style={{ color: 'var(--color-text-secondary)' }} onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#pricing" className="text-lg font-medium" style={{ color: 'var(--color-text-secondary)' }} onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <a href="#docs" className="text-lg font-medium" style={{ color: 'var(--color-text-secondary)' }} onClick={() => setMobileMenuOpen(false)}>Docs</a>
            <div className="pt-4 border-t flex flex-col gap-3" style={{ borderColor: 'var(--color-border-subtle)' }}>
              <Button
                className="w-full rounded-full"
                style={{ background: 'var(--color-accent-cyan)', color: '#0A1628', fontWeight: 600 }}
                onClick={goToDashboard}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
