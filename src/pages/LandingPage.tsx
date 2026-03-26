import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Zap, BarChart3, Shield, Globe, MessageSquare, Star, CheckCircle2, Play, Users, Cloud, Cpu } from 'lucide-react';
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
    <div className="flex flex-col min-h-screen selection:bg-zinc-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass h-16 flex items-center">
        <div className="container px-4 mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="h-8 w-8 bg-zinc-950 rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-950 font-serif italic">BotSupport</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <a href="#features" className="hover:text-zinc-950 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-zinc-950 transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-zinc-950 transition-colors">Pricing</a>
            <Button variant="ghost" className="rounded-full text-zinc-600 hover:text-zinc-950" onClick={handleStart}>Login</Button>
            <Button className="rounded-full px-6 shadow-md shadow-zinc-200" onClick={handleStart}>Get Started</Button>
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
            <motion.div variants={fadeInUp} className="inline-flex items-center px-4 py-1.5 mb-8 text-sm font-medium text-zinc-600 bg-zinc-100/50 backdrop-blur-sm rounded-full border border-zinc-200">
              <span className="relative flex h-2 w-2 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-600"></span>
              </span>
              Now with Context-Aware RAG v2.0
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-6xl lg:text-8xl font-bold tracking-tight text-zinc-950 mb-8 leading-[0.9] font-serif"
            >
              Your AI Support Team, <br />
              <span className="text-zinc-400 italic font-normal">Trained on Your Data.</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl lg:text-2xl text-zinc-600 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Effortlessly train AI chatbots on your documentation to provide world-class support. Deploy in minutes, not months.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className="h-14 px-10 text-lg font-medium rounded-full shadow-lg shadow-zinc-200" onClick={handleStart}>
                Start Your 14-Day Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-10 text-lg font-medium rounded-full border-zinc-200 bg-white hover:bg-zinc-50">
                <Play className="mr-2 h-5 w-5 fill-current" /> Watch the Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements for Depth */}
        <div className="absolute top-1/4 -left-20 h-64 w-64 bg-zinc-100 rounded-full blur-3xl opacity-50 -z-10"></div>
        <div className="absolute bottom-1/4 -right-20 h-96 w-96 bg-zinc-200 rounded-full blur-3xl opacity-30 -z-10"></div>
      </section>

      {/* Trust Section / Marquee */}
      <section className="py-20 bg-white border-y border-zinc-100">
        <div className="container px-4 mx-auto mb-12">
          <p className="text-center text-sm font-semibold text-zinc-400 uppercase tracking-[0.2em]">Trusted by Industry Leaders</p>
        </div>
        <div className="relative overflow-hidden w-full mask-fade-x">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-16 lg:gap-32 px-8">
                {['Acme Corp', 'GlobalTech', 'Innovate', 'StackPath', 'Vercel', 'NextJS', 'Cloudflare', 'Supabase'].map((name) => (
                  <span key={name} className="text-3xl font-bold tracking-tighter text-zinc-300 hover:text-zinc-900 transition-colors cursor-default select-none font-serif italic">
                    {name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works - Visualized */}
      <section className="py-32 bg-zinc-50 overflow-hidden" id="how-it-works">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mb-24">
            <h2 className="text-4xl lg:text-6xl font-bold text-zinc-950 mb-8 leading-tight font-serif">Zero configuration. <br />Infinite possibilities.</h2>
            <p className="text-xl text-zinc-600 leading-relaxed">
              We've abstracted the complexity of LLMs and RAG into a simple 3-step workflow. No PhD in AI required.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="mono-card group">
              <div className="h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center mb-8 font-serif italic text-xl">01</div>
              <h3 className="text-2xl font-bold mb-4 font-serif">Ingest Your Data</h3>
              <p className="text-zinc-600 mb-8 leading-relaxed">Upload PDFs, CSVs, or just paste your documentation URLs. Our engine automatically parses and cleans the content.</p>
              <div className="h-40 bg-zinc-100 rounded-xl overflow-hidden relative border border-zinc-200/50">
                <div className="absolute inset-4 border-2 border-dashed border-zinc-200 rounded-lg flex items-center justify-center">
                  <Cloud className="h-8 w-8 text-zinc-300" />
                </div>
              </div>
            </div>

            <div className="mono-card bg-zinc-950 text-white group border-zinc-900">
              <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center mb-8 font-serif italic text-xl">02</div>
              <h3 className="text-2xl font-bold mb-4 font-serif">AI Processing</h3>
              <p className="text-zinc-400 mb-8 leading-relaxed">Our proprietary RAG pipeline processes your data into a high-performance vector index for near-instant retrieval.</p>
              <div className="h-40 bg-zinc-900 rounded-xl flex items-center justify-center gap-1 border border-zinc-800">
                {[...Array(5)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: [20, 40, 20] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-2 bg-zinc-700 rounded-full"
                  />
                ))}
              </div>
            </div>

            <div className="mono-card group">
              <div className="h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center mb-8 font-serif italic text-xl">03</div>
              <h3 className="text-2xl font-bold mb-4 font-serif">Deploy Everywhere</h3>
              <p className="text-zinc-600 mb-8 leading-relaxed">Copy a snippet of code or use our API. Your bot is ready to handle queries across web, mobile, and Slack.</p>
              <div className="h-40 bg-zinc-100 rounded-xl p-4 font-mono text-xs text-zinc-500 overflow-hidden border border-zinc-200/50">
                <code className="text-zinc-800 font-bold">{`<script src="bot.js"></script>`}</code>
                <code className="block mt-2">{`<bot-widget id="b_123" />`}</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-white" id="features">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl lg:text-6xl font-bold text-zinc-950 mb-8 leading-tight font-serif">Everything you need for <span className="italic font-normal text-zinc-400">elite support.</span></h2>
            <p className="text-xl text-zinc-600">Powerful tools designed to help you scale your operations while improving customer satisfaction.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-100 border border-zinc-100 rounded-3xl overflow-hidden shadow-2xl">
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
      <section className="py-32 bg-zinc-50 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <Quotes className="h-16 w-16 text-zinc-200 mb-8" weight="fill" />
              <h2 className="text-4xl lg:text-6xl font-bold text-zinc-950 mb-12 leading-tight font-serif">The new standard for <span className="italic font-normal text-zinc-400">customer success.</span></h2>
              
              <div className="space-y-12">
                <div className="group">
                  <p className="text-2xl text-zinc-700 italic mb-6 leading-relaxed">"BotSupport reduced our ticket volume by 65% in the first month. It's like adding 10 senior support agents overnight."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-zinc-200"></div>
                    <div>
                      <div className="font-bold text-zinc-950">Sarah Jenkins</div>
                      <div className="text-sm text-zinc-500 uppercase tracking-widest">VP Support, SaaSFlow</div>
                    </div>
                  </div>
                </div>
                
                <div className="group opacity-50 hover:opacity-100 transition-opacity">
                  <p className="text-2xl text-zinc-700 italic mb-6 leading-relaxed">"The most intuitive AI platform we've used. Our bot was live and answering complex technical questions in an afternoon."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-zinc-200"></div>
                    <div>
                      <div className="font-bold text-zinc-950">Marcus Chen</div>
                      <div className="text-sm text-zinc-500 uppercase tracking-widest">CTO, DevScale</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="aspect-[4/5] bg-zinc-200 rounded-[2rem] overflow-hidden shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000" 
                  alt="Customer Support Success" 
                  className="w-full h-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-zinc-950/20"></div>
              </div>
              <div className="absolute -bottom-10 -left-10 glass p-8 rounded-2xl max-w-sm border-white/40">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-zinc-950 text-zinc-950" />)}
                </div>
                <p className="text-lg font-medium text-zinc-900 mb-4 font-serif italic leading-relaxed">"We saw positive ROI within the first 14 days of our trial."</p>
                <div className="flex items-center gap-2 text-sm text-zinc-500 font-sans">
                  <CheckCircle2 className="h-4 w-4 text-zinc-950" /> Verified G2 Review
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Static Pricing Section */}
      <section className="py-32 bg-white" id="pricing">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold text-zinc-950 mb-8 font-serif">Simple, transparent <span className="italic font-normal text-zinc-400">pricing.</span></h2>
            <p className="text-xl text-zinc-600">Choose the plan that's right for your stage of growth.</p>
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
      <section className="py-32 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-transparent to-transparent"></div>
        <div className="container px-4 mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl lg:text-8xl font-bold mb-12 leading-[0.9] font-serif italic">Ready to transform your <br /><span className="not-italic text-zinc-500">customer experience?</span></h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="h-16 px-12 text-xl bg-white text-zinc-950 hover:bg-zinc-200 rounded-full font-bold" onClick={handleStart}>
                Start Your Free Trial
              </Button>
              <Button variant="outline" size="lg" className="h-16 px-12 text-xl border-zinc-800 hover:bg-zinc-900 rounded-full font-bold">
                Talk to Our Experts
              </Button>
            </div>
            <p className="mt-12 text-zinc-500 flex items-center justify-center gap-2">
              <ShieldCheck className="h-5 w-5" /> No credit card required. 14-day full access.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white border-t border-zinc-100">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-8">
                <Bot className="h-8 w-8 text-zinc-950" />
                <span className="text-2xl font-bold tracking-tight text-zinc-950 font-serif italic">BotSupport</span>
              </div>
              <p className="text-lg text-zinc-500 max-w-sm mb-8 leading-relaxed mx-auto md:mx-0">
                The leading platform for training AI on your documentation. Empower your customers with instant, accurate answers.
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <a href="#" className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-zinc-200 transition-colors"><Globe className="h-5 w-5" /></a>
                <a href="#" className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-zinc-200 transition-colors"><MessageSquare className="h-5 w-5" /></a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-zinc-950 mb-6 uppercase tracking-widest text-xs font-sans">Product</h4>
              <ul className="space-y-4 text-zinc-500 font-sans">
                <li><a href="#" className="hover:text-zinc-950 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-zinc-950 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-zinc-950 transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-zinc-950 transition-colors">Widget Generator</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-zinc-950 mb-6 uppercase tracking-widest text-xs font-sans">Company</h4>
              <ul className="space-y-4 text-zinc-500 font-sans">
                <li><a href="#" className="hover:text-zinc-950 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-zinc-950 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-zinc-950 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-zinc-950 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-zinc-400 font-sans">
            <p>© 2026 BotSupport Platform. A Blink Venture.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-zinc-950 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-950 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-zinc-950 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-12 bg-white transition-all hover:bg-zinc-50 group border-b md:border-r border-zinc-100">
      <div className="h-14 w-14 rounded-2xl bg-zinc-100 flex items-center justify-center mb-8 group-hover:bg-zinc-950 group-hover:text-white transition-all duration-500 group-hover:rotate-[15deg]">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-zinc-950 mb-4 font-serif">{title}</h3>
      <p className="text-zinc-500 leading-relaxed text-lg font-sans">{description}</p>
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
    <div className={`mono-card flex flex-col relative ${isPopular ? 'border-zinc-950 shadow-2xl scale-105 z-10' : ''}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-zinc-950 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full font-sans">
          Most Popular
        </div>
      )}
      <div className="mb-8 text-center md:text-left">
        <h3 className="text-xl font-bold text-zinc-950 mb-2 font-serif">{title}</h3>
        <p className="text-zinc-500 text-sm font-sans">{description}</p>
      </div>
      <div className="mb-8 text-center md:text-left">
        <div className="flex items-baseline justify-center md:justify-start gap-1">
          <span className="text-4xl font-bold text-zinc-950 font-sans">{price === 'Custom' ? '' : '$'}{price}</span>
          {price !== 'Custom' && <span className="text-zinc-500 font-sans">/mo</span>}
        </div>
      </div>
      <ul className="space-y-4 mb-10 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-zinc-600 font-sans">
            <CheckCircle2 className="h-5 w-5 text-zinc-950 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <Button 
        className={`w-full h-12 rounded-xl text-base font-bold transition-all font-sans ${isPopular ? 'bg-zinc-950 text-white hover:bg-zinc-800' : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'}`}
        onClick={onClick}
      >
        {price === 'Custom' ? 'Contact Sales' : 'Get Started'}
      </Button>
    </div>
  );
}
