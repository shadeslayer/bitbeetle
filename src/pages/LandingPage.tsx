import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, BarChart3, Shield, Globe, MessageSquare, Star, CheckCircle2, Play } from 'lucide-react';
import { blink } from '@/lib/blink';
import { motion } from 'framer-motion';
import {
  Lightning,
  ChartLineUp,
  ShieldCheck,
  GlobeHemisphereWest,
  Quotes,
  Robot,
  Target,
  ArrowRight as PhosphorArrowRight,
  Database,
  Code as PhosphorCode,
  ChatCircleText,
  MagnifyingGlass,
  Gear,
  SlackLogo,
  DiscordLogo,
  WhatsappLogo,
  CaretDown,
  Copy as PhosphorCopy,
  Check as PhosphorCheck,
  TrendUp,
  UsersThree,
  LockSimple,
  X
} from '@phosphor-icons/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BitBeetleLogo = () => (
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
);

const BentoCard = ({ title, description, icon: Icon, className = "", children }: any) => (
  <div
    className={`glass p-8 flex flex-col h-full group ${className}`}
    style={{ position: 'relative', overflow: 'hidden' }}
  >
    <div className="flex items-center gap-4 mb-4">
      <div
        className="h-10 w-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
        style={{ background: 'var(--color-accent-teal-dim)', color: 'var(--color-accent-teal)' }}
      >
        <Icon size={24} weight="duotone" />
      </div>
      <h3 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{title}</h3>
    </div>
    <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
      {description}
    </p>
    <div className="mt-auto">
      {children}
    </div>
    <div
      className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-0 group-hover:opacity-10 transition-opacity"
      style={{ background: 'var(--color-accent-teal)', filter: 'blur(40px)' }}
    />
  </div>
);

const IntegrationIcon = ({ icon: Icon, label }: any) => (
  <div className="flex flex-col items-center gap-3 group cursor-pointer">
    <div
      className="h-16 w-16 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:-translate-y-1"
      style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-subtle)' }}
    >
      <Icon size={32} weight="duotone" style={{ color: 'var(--color-text-secondary)' }} className="group-hover:text-accent-teal transition-colors" />
    </div>
    <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
  </div>
);

const InstallationCode = () => {
  const [copied, setCopied] = React.useState(false);
  const code = `<script 
  src="https://bitbeetle.ai/widget.js" 
  data-id="bb_94281" 
  async
></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-accent-teal to-accent-cyan rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative bg-zinc-950 rounded-xl overflow-hidden border border-white/10">
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/50" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
            <div className="h-3 w-3 rounded-full bg-green-500/50" />
          </div>
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">HTML</div>
          <button 
            onClick={handleCopy}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            {copied ? <PhosphorCheck size={16} className="text-accent-green" /> : <PhosphorCopy size={16} />}
          </button>
        </div>
        <div className="p-6 font-mono text-sm leading-relaxed">
          <div className="flex gap-4">
            <span className="text-zinc-700 select-none">1</span>
            <span className="text-accent-teal">&lt;script</span>
          </div>
          <div className="flex gap-4">
            <span className="text-zinc-700 select-none">2</span>
            <span className="ml-4 text-zinc-400">src=</span>
            <span className="text-accent-amber">"https://bitbeetle.ai/widget.js"</span>
          </div>
          <div className="flex gap-4">
            <span className="text-zinc-700 select-none">3</span>
            <span className="ml-4 text-zinc-400">data-id=</span>
            <span className="text-accent-amber">"bb_94281"</span>
          </div>
          <div className="flex gap-4">
            <span className="text-zinc-700 select-none">4</span>
            <span className="ml-4 text-accent-teal">async</span>
          </div>
          <div className="flex gap-4">
            <span className="text-zinc-700 select-none">5</span>
            <span className="text-accent-teal">&gt;&lt;/script&gt;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function LandingPage() {
  const handleStart = () => {
    blink.auth.login(window.location.origin + '/dashboard');
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav
        className="fixed top-0 w-full z-50 h-16 flex items-center"
        style={{
          background: 'rgba(10,22,40,0.6)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--color-border-subtle)'
        }}
      >
        <div className="container px-4 mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="h-8 w-8 flex items-center justify-center transition-transform group-hover:rotate-12">
              <BitBeetleLogo />
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>BitBeetle</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            <a
              href="#features"
              className="transition-colors"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
            >Features</a>
            <a
              href="#how-it-works"
              className="transition-colors"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
            >How it Works</a>
            <a
              href="#pricing"
              className="transition-colors"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
            >Pricing</a>
            <Button variant="ghost" className="rounded-full" style={{ color: 'var(--color-text-secondary)' }} onClick={handleStart}>Login</Button>
            <Button className="rounded-full px-6" style={{ background: 'var(--color-accent-cyan)', color: '#0A1628', fontWeight: 600 }} onClick={handleStart}>Get Started</Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <MessageSquare className="h-6 w-6" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden hero-gradient">
        <div className="container px-4 mx-auto relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center px-4 py-1.5 mb-8 text-sm font-medium backdrop-blur-sm rounded-full"
              style={{
                background: 'var(--color-accent-teal-dim)',
                border: '1px solid rgba(23,195,206,0.2)',
                color: 'var(--color-accent-teal)'
              }}
            >
              <span className="relative flex h-2 w-2 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--color-accent-teal)' }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--color-accent-teal)' }}></span>
              </span>
              Now with Context-Aware RAG v2.0
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mb-8 leading-[0.9]"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem,6vw,4rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--color-text-primary)'
              }}
            >
              Your AI Support Team, <br />
              <span className="text-gradient">Trained on Your Data.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl lg:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Effortlessly train AI chatbots on your documentation to provide world-class support. Deploy in minutes, not months.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="h-14 px-10 text-lg font-medium rounded-full"
                style={{ background: 'var(--color-accent-cyan)', color: '#0A1628', fontWeight: 700 }}
                onClick={handleStart}
              >
                Start Your 14-Day Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-10 text-lg font-medium rounded-full"
                style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-text-primary)', background: 'transparent' }}
              >
                <Play className="mr-2 h-5 w-5 fill-current" /> Watch the Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Teal orb top-left */}
        <div style={{
          position: 'absolute', top: '10%', left: '-5%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'var(--color-accent-teal)',
          filter: 'blur(80px)', opacity: 0.12,
          animation: 'float 8s ease-in-out infinite alternate',
          pointerEvents: 'none', zIndex: 0
        }} />
        {/* Cyan orb bottom-right */}
        <div style={{
          position: 'absolute', bottom: '5%', right: '-5%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'var(--color-accent-cyan)',
          filter: 'blur(80px)', opacity: 0.10,
          animation: 'float 8s ease-in-out infinite alternate-reverse',
          pointerEvents: 'none', zIndex: 0
        }} />
      </section>

      {/* Trust Section / Marquee */}
      <section
        className="py-20"
        style={{
          background: 'var(--color-bg-elevated)',
          borderTop: '1px solid var(--color-border-subtle)',
          borderBottom: '1px solid var(--color-border-subtle)'
        }}
      >
        <div className="container px-4 mx-auto mb-12">
          <p
            className="text-center text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: 'var(--color-text-muted)' }}
          >Trusted by Industry Leaders</p>
        </div>
        <div className="relative overflow-hidden w-full mask-fade-x">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-16 lg:gap-32 px-8">
                {['Acme Corp', 'GlobalTech', 'Innovate', 'StackPath', 'Vercel', 'NextJS', 'Cloudflare', 'Supabase'].map((name) => (
                  <span
                    key={name}
                    className="text-3xl font-bold tracking-tighter transition-colors cursor-default select-none"
                    style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', fontStyle: 'normal' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent-teal)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                  >
                    {name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works - Visualized */}
      <section
        className="py-32 overflow-hidden"
        id="how-it-works"
        style={{ background: 'var(--color-bg-primary)' }}
      >
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mb-24">
            <h2
              className="text-4xl lg:text-6xl font-bold mb-8 leading-tight"
              style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
            >Zero configuration. <br />Infinite possibilities.</h2>
            <p
              className="text-xl leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              We've abstracted the complexity of LLMs and RAG into a simple 3-step workflow. No PhD in AI required.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="mono-card group">
              <div
                className="h-12 w-12 rounded-full flex items-center justify-center mb-8 text-xl"
                style={{ background: 'var(--color-accent-teal-dim)', color: 'var(--color-accent-teal)', fontFamily: 'var(--font-mono)' }}
              >01</div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Ingest Your Data</h3>
              <p className="mb-8 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>Upload PDFs, CSVs, or just paste your documentation URLs. Our engine automatically parses and cleans the content.</p>
              <div
                className="h-40 rounded-xl overflow-hidden relative"
                style={{ background: 'var(--color-bg-glass)', border: '1px solid var(--color-border-subtle)' }}
              >
                <div
                  className="absolute inset-4 border-2 border-dashed rounded-lg flex items-center justify-center"
                  style={{ borderColor: 'var(--color-border-subtle)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-text-muted)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
              </div>
            </div>

            <div
              className="mono-card group"
              style={{ background: 'var(--color-bg-glass)', border: '1px solid var(--color-border-glow)' }}
            >
              <div
                className="h-12 w-12 rounded-full flex items-center justify-center mb-8 text-xl"
                style={{ background: 'var(--color-accent-teal-dim)', color: 'var(--color-accent-teal)', fontFamily: 'var(--font-mono)' }}
              >02</div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>AI Processing</h3>
              <p className="mb-8 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>Our proprietary RAG pipeline processes your data into a high-performance vector index for near-instant retrieval.</p>
              <div
                className="h-40 rounded-xl flex items-center justify-center gap-1"
                style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-border-subtle)' }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [20, 40, 20] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-2 rounded-full"
                    style={{ background: 'var(--color-accent-teal)' }}
                  />
                ))}
              </div>
            </div>

            <div className="mono-card group">
              <div
                className="h-12 w-12 rounded-full flex items-center justify-center mb-8 text-xl"
                style={{ background: 'var(--color-accent-teal-dim)', color: 'var(--color-accent-teal)', fontFamily: 'var(--font-mono)' }}
              >03</div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Deploy Everywhere</h3>
              <p className="mb-8 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>Copy a snippet of code or use our API. Your bot is ready to handle queries across web, mobile, and Slack.</p>
              <div
                className="h-40 rounded-xl p-4 text-xs overflow-hidden"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  borderColor: 'var(--color-border-subtle)',
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-mono)',
                  border: '1px solid var(--color-border-subtle)'
                }}
              >
                <code style={{ color: 'var(--color-accent-cyan)' }}>{`<script src="bot.js"></script>`}</code>
                <code className="block mt-2">{`<bot-widget id="b_123" />`}</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Bento Style */}
      <section className="py-32" id="features" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-6xl font-bold mb-8 leading-tight"
              style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
            >
              Support that scales <br />
              <span className="italic font-normal text-gradient">without the overhead.</span>
            </motion.h2>
            <p className="text-xl leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Powerful tools designed to help you scale your operations while improving customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 lg:h-[800px]">
            <BentoCard
              className="md:col-span-3 lg:col-span-4"
              title="Knowledge Graph Indexing"
              description="We don't just store text. We build a semantic knowledge graph from your documentation, allowing the AI to understand relationships between concepts."
              icon={Database}
            >
              <div className="relative h-48 bg-black/40 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <div className="w-[300px] h-[300px] border border-accent-teal/20 rounded-full animate-ping" />
                  <div className="w-[200px] h-[200px] border border-accent-teal/20 rounded-full" />
                </div>
                <div className="grid grid-cols-4 gap-4 p-4">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      className="h-8 w-8 rounded-md"
                      style={{ background: 'var(--color-accent-teal-dim)', border: '1px solid var(--color-border-glow)' }}
                    />
                  ))}
                </div>
              </div>
            </BentoCard>

            <BentoCard
              className="md:col-span-3 lg:col-span-2"
              title="Global by Default"
              description="Communicate with customers in 100+ languages. Automatic detection and translation ensure your message is never lost."
              icon={GlobeHemisphereWest}
            >
              <div className="flex flex-wrap gap-2">
                {['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Hindi', 'Arabic'].map(lang => (
                  <span key={lang} className="badge-teal text-[10px]">{lang}</span>
                ))}
              </div>
            </BentoCard>

            <BentoCard
              className="md:col-span-2"
              title="Real-time Analytics"
              description="Identify knowledge gaps instantly with deep-dive analytics into every conversation."
              icon={ChartLineUp}
            >
              <div className="h-32 flex items-end gap-1">
                {[40, 70, 45, 90, 65, 80, 50, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    className="flex-1 rounded-t-sm"
                    style={{ background: i === 7 ? 'var(--color-accent-cyan)' : 'var(--color-accent-teal-dim)' }}
                  />
                ))}
              </div>
            </BentoCard>

            <BentoCard
              className="md:col-span-2"
              title="Smart Escalation"
              description="Automatically detects when a user is frustrated or needs human help and routes them to your team."
              icon={Target}
            >
              <div className="flex items-center justify-center h-24">
                <div className="h-16 w-16 rounded-full border-2 border-dashed border-accent-teal/30 flex items-center justify-center animate-spin-slow">
                  <Target size={24} className="text-accent-teal" />
                </div>
              </div>
            </BentoCard>

            <BentoCard
              className="md:col-span-2"
              title="Custom Widget Styling"
              description="Make the chatbot feel like a native part of your application with complete CSS control."
              icon={Gear}
            >
              <div className="flex gap-2">
                <div className="h-6 w-6 rounded-full bg-accent-teal shadow-lg shadow-accent-teal/20" />
                <div className="h-6 w-6 rounded-full bg-accent-cyan" />
                <div className="h-6 w-6 rounded-full bg-accent-amber" />
                <div className="h-6 w-6 rounded-full bg-accent-green" />
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* Live Demo Visual Section */}
      <section className="py-32 overflow-hidden border-y border-white/5" style={{ background: 'var(--color-bg-elevated)' }}>
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <h2
                className="text-4xl lg:text-6xl font-bold mb-8 leading-tight font-serif"
                style={{ color: 'var(--color-text-primary)' }}
              >The bot that <br /><span className="text-gradient">actually knows</span> your business.</h2>
              <p
                className="text-xl leading-relaxed mb-8"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Stop using generic chatbots. BitBeetle deeply understands your unique documentation, providing answers that are always accurate and contextually relevant.
              </p>
              <div className="space-y-4">
                {[
                  "Semantic understanding of complex docs",
                  "Source-backed answers with citations",
                  "Continuous learning from feedback",
                  "Multimodal support (Text, Images, Code)"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full flex items-center justify-center" style={{ background: 'var(--color-accent-teal-dim)' }}>
                      <CheckCircle2 size={12} style={{ color: 'var(--color-accent-teal)' }} />
                    </div>
                    <span style={{ color: 'var(--color-text-primary)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 w-full max-w-xl">
              <div className="glass p-6 min-h-[400px] flex flex-col gap-6 shadow-glow-teal">
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-accent-teal/20 flex items-center justify-center">
                      <Robot size={18} className="text-accent-teal" />
                    </div>
                    <span className="font-bold text-sm">BitBeetle Assistant</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-zinc-700" />
                    <div className="h-2 w-2 rounded-full bg-zinc-700" />
                    <div className="h-2 w-2 rounded-full bg-zinc-700" />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-3 rounded-2xl rounded-bl-none text-sm max-w-[80%]"
                    style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-primary)' }}
                  >
                    Hi there! How do I set up custom domain for my widget?
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 }}
                    className="p-3 rounded-2xl rounded-br-none text-sm max-w-[80%] self-end"
                    style={{ background: 'var(--color-accent-teal-dim)', color: 'var(--color-text-primary)', border: '1px solid rgba(23,195,206,0.2)' }}
                  >
                    <p className="mb-2 text-xs font-mono uppercase tracking-widest text-accent-teal opacity-70">Source: Settings Guide</p>
                    You can set up a custom domain in the "Installation" tab. Simply enter your subdomain (e.g., support.yoursite.com) and add the CNAME record to your DNS provider.
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.5 }}
                    className="flex justify-center mt-4"
                  >
                    <div className="badge-green">Confidence: 98.4%</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Ecosystem Section */}
      <section className="py-32 bg-white/0">
        <div className="container px-4 mx-auto text-center">
          <h2
            className="text-3xl lg:text-5xl font-bold mb-16 leading-tight font-serif"
            style={{ color: 'var(--color-text-primary)' }}
          >Fits into your <span className="italic font-normal text-zinc-500">workflow.</span></h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 max-w-5xl mx-auto">
            <IntegrationIcon icon={SlackLogo} label="Slack" />
            <IntegrationIcon icon={DiscordLogo} label="Discord" />
            <IntegrationIcon icon={WhatsappLogo} label="WhatsApp" />
            <IntegrationIcon icon={Database} label="Postgres" />
            <IntegrationIcon icon={Globe} label="Shopify" />
            <IntegrationIcon icon={Robot} label="Zendesk" />
          </div>
        </div>
      </section>

      {/* Installation Snippet Section */}
      <section className="py-32 overflow-hidden" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <h2 
                className="text-4xl lg:text-6xl font-bold mb-8 leading-tight font-serif"
                style={{ color: 'var(--color-text-primary)' }}
              >Go live in <span className="text-gradient">seconds.</span></h2>
              <p className="text-xl leading-relaxed mb-8" style={{ color: 'var(--color-text-secondary)' }}>
                Integration is as simple as adding a single script tag to your site. Works with any framework, from React to WordPress.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Universal Compatibility", desc: "Works with React, Next.js, Vue, Webflow, and static HTML." },
                  { title: "Blazing Fast Load", desc: "Our widget is ultra-lightweight and asynchronously loaded to ensure zero impact on your SEO." },
                  { title: "Auto-Versioning", desc: "Your widget always stays up to date with the latest AI improvements automatically." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ background: 'var(--color-accent-teal-dim)' }}>
                      <Lightning size={12} weight="fill" style={{ color: 'var(--color-accent-teal)' }} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>{item.title}</h4>
                      <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full max-w-2xl">
              <InstallationCode />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32" id="faq" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="text-center mb-20">
            <h2
              className="text-4xl lg:text-6xl font-bold mb-8 font-serif"
              style={{ color: 'var(--color-text-primary)' }}
            >Got <span className="italic font-normal text-gradient">questions?</span></h2>
            <p className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>Everything you need to know about BitBeetle.</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="glass px-6 border-white/5">
              <AccordionTrigger className="text-left py-6 hover:no-underline font-bold text-lg" style={{ color: 'var(--color-text-primary)' }}>
                How accurate is the AI's response?
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-zinc-400 leading-relaxed">
                BitBeetle uses a specialized RAG (Retrieval-Augmented Generation) pipeline that forces the AI to only use the information provided in your documents. If the answer isn't in your docs, the bot is instructed to politely say so rather than guessing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="glass px-6 border-white/5">
              <AccordionTrigger className="text-left py-6 hover:no-underline font-bold text-lg" style={{ color: 'var(--color-text-primary)' }}>
                What file formats do you support?
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-zinc-400 leading-relaxed">
                We currently support PDF, CSV, TXT, and Markdown files. You can also provide URLs to your public documentation pages or sync directly from Notion and Google Drive.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="glass px-6 border-white/5">
              <AccordionTrigger className="text-left py-6 hover:no-underline font-bold text-lg" style={{ color: 'var(--color-text-primary)' }}>
                Is my data used to train other models?
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-zinc-400 leading-relaxed">
                Absolutely not. Your data is isolated to your specific vector index and is never used to train public LLMs or other customers' bots. We prioritize data privacy and are working towards SOC2 compliance.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="glass px-6 border-white/5">
              <AccordionTrigger className="text-left py-6 hover:no-underline font-bold text-lg" style={{ color: 'var(--color-text-primary)' }}>
                Can I customize the look of the widget?
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-zinc-400 leading-relaxed">
                Yes! You have full control over the widget's primary color, greeting message, bot name, and avatar. For Enterprise customers, we offer complete white-labeling and custom CSS injection.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="py-32 overflow-hidden"
        style={{ background: 'var(--color-bg-elevated)' }}
      >
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <Quotes className="h-16 w-16 mb-8" weight="fill" style={{ color: 'var(--color-border-strong)' }} />
              <h2
                className="text-4xl lg:text-6xl font-bold mb-12 leading-tight"
                style={{ color: 'var(--color-text-primary)' }}
              >The new standard for <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-text-muted)' }}>customer success.</span></h2>

              <div className="space-y-12">
                <div className="group">
                  <p
                    className="text-2xl mb-6 leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}
                  >"BitBeetle reduced our ticket volume by 65% in the first month. It's like adding 10 senior support agents overnight."</p>
                  <div className="flex items-center gap-4">
                    <div
                      className="h-12 w-12 rounded-full"
                      style={{ background: 'var(--color-bg-glass)', border: '1px solid var(--color-border-subtle)' }}
                    ></div>
                    <div>
                      <div className="font-bold" style={{ color: 'var(--color-text-primary)' }}>Sarah Jenkins</div>
                      <div className="text-sm uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>VP Support, SaaSFlow</div>
                    </div>
                  </div>
                </div>

                <div className="group opacity-50 hover:opacity-100 transition-opacity">
                  <p
                    className="text-2xl mb-6 leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}
                  >"The most intuitive AI platform we've used. Our bot was live and answering complex technical questions in an afternoon."</p>
                  <div className="flex items-center gap-4">
                    <div
                      className="h-12 w-12 rounded-full"
                      style={{ background: 'var(--color-bg-glass)', border: '1px solid var(--color-border-subtle)' }}
                    ></div>
                    <div>
                      <div className="font-bold" style={{ color: 'var(--color-text-primary)' }}>Marcus Chen</div>
                      <div className="text-sm uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>CTO, DevScale</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div
                className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative"
                style={{ background: 'var(--color-bg-glass)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000"
                  alt="Customer Support Success"
                  className="w-full h-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-zinc-950/20"></div>
              </div>
              <div className="absolute -bottom-10 -left-10 glass p-8 rounded-2xl max-w-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5" style={{ fill: 'var(--color-accent-teal)', color: 'var(--color-accent-teal)' }} />
                  ))}
                </div>
                <p
                  className="text-lg font-medium mb-4 leading-relaxed"
                  style={{ color: 'var(--color-text-primary)' }}
                >"We saw positive ROI within the first 14 days of our trial."</p>
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  <CheckCircle2 className="h-4 w-4" style={{ color: 'var(--color-text-muted)' }} /> Verified G2 Review
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-32 bg-white/0">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 font-serif" style={{ color: 'var(--color-text-primary)' }}>Standard Bot vs. <span className="text-gradient">BitBeetle</span></h2>
            <p className="text-lg text-zinc-500">Why thousands of businesses are switching to context-aware support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-12 bg-zinc-950/20">
              <h3 className="text-xl font-bold mb-8 text-zinc-500 uppercase tracking-widest text-sm">Legacy Chatbots</h3>
              <ul className="space-y-6">
                {[
                  "Keyword-based keyword matching",
                  "Constant 'hallucinations' and guessing",
                  "Disconnected from your actual data",
                  "Frustrating 'I don't understand' loops",
                  "Static, pre-programmed flows"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-zinc-600">
                    <X className="h-5 w-5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-12 bg-accent-teal/5 border-l border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <div className="badge-teal">Recommended</div>
              </div>
              <h3 className="text-xl font-bold mb-8 text-accent-teal uppercase tracking-widest text-sm">BitBeetle AI</h3>
              <ul className="space-y-6">
                {[
                  "Deep semantic documentation analysis",
                  "Fact-grounded, citation-backed answers",
                  "Native sync with your knowledge base",
                  "Human-like reasoning and empathy",
                  "Learns and improves with every chat"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-zinc-200 font-medium">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent-teal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Specs Section */}
      <section className="py-32 border-y border-white/5" style={{ background: 'var(--color-bg-elevated)' }}>
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center md:text-left">
              <div className="h-12 w-12 rounded-xl bg-accent-teal/10 flex items-center justify-center mb-6 mx-auto md:mx-0">
                <TrendUp size={24} className="text-accent-teal" />
              </div>
              <h4 className="text-lg font-bold mb-2 text-white">99.9% Uptime</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">Enterprise-grade infrastructure ensures your support is never offline.</p>
            </div>
            <div className="text-center md:text-left">
              <div className="h-12 w-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center mb-6 mx-auto md:mx-0">
                <LockSimple size={24} className="text-accent-cyan" />
              </div>
              <h4 className="text-lg font-bold mb-2 text-white">AES-256 Encryption</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">Your data is encrypted at rest and in transit with the highest standards.</p>
            </div>
            <div className="text-center md:text-left">
              <div className="h-12 w-12 rounded-xl bg-accent-amber/10 flex items-center justify-center mb-6 mx-auto md:mx-0">
                <UsersThree size={24} className="text-accent-amber" />
              </div>
              <h4 className="text-lg font-bold mb-2 text-white">Team Collaboration</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">Share access, manage permissions, and collaborate across departments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Static Pricing Section */}
      <section
        className="py-32"
        id="pricing"
        style={{ background: 'var(--color-bg-primary)' }}
      >
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2
              className="text-4xl lg:text-6xl font-bold mb-8"
              style={{ color: 'var(--color-text-primary)' }}
            >Simple, transparent <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-text-muted)' }}>pricing.</span></h2>
            <p className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>Choose the plan that's right for your stage of growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PricingCard
              title="Starter"
              price="49"
              description="Perfect for early-stage startups."
              features={[
                '1 Chatbot',
                '2,000 Messages / mo',
                '100 Knowledge base docs',
                'Standard Widget',
                'Email Support'
              ]}
              onClick={handleStart}
            />
            <PricingCard
              title="Pro"
              price="149"
              description="For growing teams scaling support."
              features={[
                '5 Chatbots',
                '10,000 Messages / mo',
                '1,000 Knowledge base docs',
                'Custom Widget Styling',
                'Priority Support',
                'Analytics Dashboard'
              ]}
              isPopular
              onClick={handleStart}
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              description="Advanced features for high-volume teams."
              features={[
                'Unlimited Chatbots',
                'Unlimited Messages',
                'Unlimited Docs',
                'White-labeled Widget',
                'Dedicated Success Manager',
                'SSO & RBAC'
              ]}
              onClick={handleStart}
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-32 relative overflow-hidden"
        style={{ background: 'var(--color-bg-primary)' }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{ background: 'var(--gradient-cta)', pointerEvents: 'none' }}
        ></div>
        <div className="container px-4 mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-5xl lg:text-8xl font-bold mb-12 leading-[0.9]"
              style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
            >Ready to transform your <br /><span style={{ color: 'var(--color-text-muted)' }}>customer experience?</span></h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                size="lg"
                className="h-16 px-12 text-xl rounded-full font-bold"
                style={{ background: 'var(--color-accent-cyan)', color: '#0A1628' }}
                onClick={handleStart}
              >
                Start Your Free Trial
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-16 px-12 text-xl rounded-full font-bold"
                style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-text-primary)', background: 'transparent' }}
              >
                Talk to Our Experts
              </Button>
            </div>
            <p className="mt-12 flex items-center justify-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
              <ShieldCheck className="h-5 w-5" /> No credit card required. 14-day full access.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-20"
        style={{ background: 'var(--color-bg-elevated)', borderTop: '1px solid var(--color-border-subtle)' }}
      >
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-8">
                <BitBeetleLogo />
                <span
                  className="text-2xl font-bold tracking-tight"
                  style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
                >BitBeetle</span>
              </div>
              <p
                className="text-lg max-w-sm mb-8 leading-relaxed mx-auto md:mx-0"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                The leading platform for training AI on your documentation. Empower your customers with instant, accurate answers.
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <a
                  href="#"
                  className="h-10 w-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: 'var(--color-bg-glass)', border: '1px solid var(--color-border-subtle)', color: 'var(--color-text-secondary)' }}
                ><Globe className="h-5 w-5" /></a>
                <a
                  href="#"
                  className="h-10 w-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: 'var(--color-bg-glass)', border: '1px solid var(--color-border-subtle)', color: 'var(--color-text-secondary)' }}
                ><MessageSquare className="h-5 w-5" /></a>
              </div>
            </div>
            <div>
              <h4
                className="font-bold mb-6 uppercase tracking-widest text-xs"
                style={{ color: 'var(--color-text-primary)' }}
              >Product</h4>
              <ul className="space-y-4">
                <li><a href="#" className="transition-colors" style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                >Features</a></li>
                <li><a href="#" className="transition-colors" style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                >Pricing</a></li>
                <li><a href="#" className="transition-colors" style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                >API Docs</a></li>
                <li><a href="#" className="transition-colors" style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                >Widget Generator</a></li>
              </ul>
            </div>
            <div>
              <h4
                className="font-bold mb-6 uppercase tracking-widest text-xs"
                style={{ color: 'var(--color-text-primary)' }}
              >Company</h4>
              <ul className="space-y-4">
                <li><a href="#" className="transition-colors" style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                >About Us</a></li>
                <li><a href="#" className="transition-colors" style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                >Blog</a></li>
                <li><a href="#" className="transition-colors" style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                >Careers</a></li>
                <li><a href="#" className="transition-colors" style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                >Contact</a></li>
              </ul>
            </div>
          </div>
          <div
            className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-sm"
            style={{ borderTop: '1px solid var(--color-border-subtle)', color: 'var(--color-text-muted)' }}
          >
            <p>© 2026 BitBeetle Platform. A Blink Venture.</p>
            <div className="flex gap-8">
              <a href="#" className="transition-colors" style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >Privacy Policy</a>
              <a href="#" className="transition-colors" style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >Terms of Service</a>
              <a href="#" className="transition-colors" style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div
      className="p-12 transition-all group"
      style={{ background: 'var(--color-bg-elevated)', borderBottom: '1px solid var(--color-border-subtle)' }}
    >
      <div
        className="h-14 w-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:rotate-[15deg]"
        style={{ background: 'var(--color-accent-teal-dim)', color: 'var(--color-accent-teal)' }}
      >
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>{title}</h3>
      <p className="leading-relaxed text-lg" style={{ color: 'var(--color-text-secondary)' }}>{description}</p>
    </div>
  );
}

function PricingCard({ title, price, description, features, isPopular, onClick }: {
  title: string,
  price: string,
  description: string,
  features: string[],
  isPopular?: boolean,
  onClick: () => void
}) {
  return (
    <div
      className={`mono-card flex flex-col relative ${isPopular ? 'scale-105 z-10' : ''}`}
      style={isPopular ? { borderColor: 'var(--color-border-glow)', boxShadow: 'var(--shadow-glow-teal)' } : {}}
    >
      {isPopular && (
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full"
          style={{ background: 'var(--color-accent-teal)', color: '#0A1628' }}
        >
          Most Popular
        </div>
      )}
      <div className="mb-8 text-center md:text-left">
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>{title}</h3>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{description}</p>
      </div>
      <div className="mb-8 text-center md:text-left">
        <div className="flex items-baseline justify-center md:justify-start gap-1">
          <span className="text-4xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{price === 'Custom' ? '' : '$'}{price}</span>
          {price !== 'Custom' && <span style={{ color: 'var(--color-text-muted)' }}>/mo</span>}
        </div>
      </div>
      <ul className="space-y-4 mb-10 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: 'var(--color-accent-teal)' }} />
            <span style={{ color: 'var(--color-text-secondary)' }}>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        className="w-full h-12 rounded-xl text-base font-bold transition-all"
        style={isPopular
          ? { background: 'var(--color-accent-cyan)', color: '#0A1628' }
          : { background: 'var(--color-bg-glass)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border-strong)' }
        }
        onClick={onClick}
      >
        {price === 'Custom' ? 'Contact Sales' : 'Get Started'}
      </Button>
    </div>
  );
}
