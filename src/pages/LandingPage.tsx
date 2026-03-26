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
  Target
} from '@phosphor-icons/react';

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

      {/* Features Grid */}
      <section
        className="py-32"
        id="features"
        style={{ background: 'var(--color-bg-primary)' }}
      >
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2
              className="text-4xl lg:text-6xl font-bold mb-8 leading-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >Everything you need for <span style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', fontWeight: 400 }}>elite support.</span></h2>
            <p className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>Powerful tools designed to help you scale your operations while improving customer satisfaction.</p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: 'var(--color-border-subtle)', border: '1px solid var(--color-border-subtle)' }}
          >
            <FeatureCard
              icon={<Lightning className="h-6 w-6" />}
              title="Instant Training"
              description="Upload your documentation and have a fully-trained AI expert ready to chat in under 60 seconds."
            />
            <FeatureCard
              icon={<Robot className="h-6 w-6" />}
              title="Advanced RAG Engine"
              description="Uses Hybrid Search and Semantic Re-ranking to ensure every answer is grounded in your facts."
            />
            <FeatureCard
              icon={<GlobeHemisphereWest className="h-6 w-6" />}
              title="Multilingual Support"
              description="Automatically detects and responds in 50+ languages, allowing you to serve a global audience."
            />
            <FeatureCard
              icon={<ChartLineUp className="h-6 w-6" />}
              title="Actionable Analytics"
              description="Identify knowledge gaps and track resolution rates with deep conversation insights."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Enterprise Security"
              description="SOC2 compliant infrastructure with advanced PII masking and data encryption at rest."
            />
            <FeatureCard
              icon={<Target className="h-6 w-6" />}
              title="Intent Detection"
              description="Smart routing that identifies when a query needs human intervention and escalates seamlessly."
            />
          </div>
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
