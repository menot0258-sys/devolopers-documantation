/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Terminal, 
  Cpu, 
  Layers, 
  Zap, 
  ChevronRight, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Code2,
  Box,
  Compass,
  ArrowRight,
  Shield,
  Star,
  Globe,
  Command
} from 'lucide-react';
import { DOCS, DocSection } from './constants/docs';

// --- UI Components ---

const SidebarItem = ({ 
  section, 
  isActive, 
  onClick 
}: { 
  section: DocSection, 
  isActive: boolean, 
  onClick: () => void 
}) => (
  <motion.button
    whileHover={{ x: 8 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-3 ${
      isActive 
        ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' 
        : 'hover:bg-slate-100 text-slate-500'
    }`}
  >
    <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-slate-300'}`} />
    <span className="font-bold text-sm tracking-tight">{section.title}</span>
    {isActive && (
      <motion.div layoutId="active-indicator" className="ml-auto">
        <ArrowRight className="w-4 h-4" />
      </motion.div>
    )}
  </motion.button>
);

const FloatingBadge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    animate={{ 
      y: [0, -10, 0],
      rotate: [0, 2, 0]
    }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    className={`px-4 py-2 rounded-2xl glass-light border-slate-200 flex items-center gap-2 ${className}`}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [activeId, setActiveId] = useState(DOCS[0].id);
  const mainRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: mainRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const activeSection = useMemo(() => DOCS.find(d => d.id === activeId)!, [activeId]);

  const scrollToContent = () => {
    document.getElementById('content-area')?.scrollIntoView({ behavior: 'smooth' });
  };

  const githubUrl = "https://github.com/menot0258-sys/bk-chat";

  return (
    <div className="relative min-h-screen linear-gradient-bg overflow-hidden flex flex-col md:flex-row font-sans text-slate-900">
      
      {/* Background Layer: Tech Grid & Watermarks */}
      <div className="fixed inset-0 z-0 tech-grid pointer-events-none opacity-[0.03]" />
      <div className="watermark-text top-0 -left-20 rotate-12">BATOOR</div>
      <div className="watermark-text bottom-0 -right-20 -rotate-12">ARCHITECT</div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Sidebar */}
      <aside className="relative z-10 w-full md:w-80 h-auto md:h-screen md:sticky top-0 bg-white/40 backdrop-blur-xl border-r border-slate-200 p-8 flex flex-col gap-10">
        <div className="flex items-center gap-3 px-2">
          <motion.div 
            whileHover={{ rotate: 180 }}
            className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-200"
          >
            <Command className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter leading-none text-slate-900">BK<span className="text-indigo-600">.</span>Dev</h1>
            <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.2em] mt-1">Documentation</p>
          </div>
        </div>

        <nav className="flex-1 space-y-3">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 px-2">Core Guides</p>
          {DOCS.map(section => (
            <SidebarItem 
              key={section.id} 
              section={section} 
              isActive={activeId === section.id} 
              onClick={() => {
                setActiveId(section.id);
                scrollToContent();
              }} 
            />
          ))}

          <div className="pt-10 space-y-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-2">Community</p>
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noreferrer"
              className="group flex items-center justify-between p-4 rounded-2xl bg-slate-900 text-white hover:bg-indigo-600 transition-all duration-500"
            >
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span className="font-bold text-sm tracking-tight text-slate-100">GitHub</span>
              </div>
              <ExternalLink className="w-4 h-4 opacity-50" />
            </a>
            <a 
              href="https://menot0258-sys.github.io/bk-chat/" 
              target="_blank" 
              rel="noreferrer"
              className="group flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 transition-all duration-500 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-sm tracking-tight">BK Chat</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </nav>

        <div className="p-5 rounded-3xl bg-indigo-50 border border-indigo-100 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center font-black text-indigo-600">BK</div>
            <div>
              <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest leading-none mb-1">Lead Developer</p>
              <p className="text-sm font-black text-slate-900">Batoor Khan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main ref={mainRef} className="relative z-10 flex-1 h-screen overflow-y-auto overflow-x-hidden scroll-smooth selection:bg-indigo-600 selection:text-white">
        
        {/* Floating Top Header */}
        <header className="sticky top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-white/40 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-${i * 100} flex items-center justify-center text-[10px] font-black`}>{i}</div>
              ))}
            </div>
            <span className="text-xs font-bold text-slate-500">2.4k developers online</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-indigo-600 transition-colors">
              <Star className="w-3.5 h-3.5 fill-current" />
              1.2k Stars
            </button>
            <a href={githubUrl} target="_blank" rel="noreferrer" className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
              <Github className="w-5 h-5 text-slate-600" />
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-8 py-24 md:px-20 md:py-40 max-w-7xl mx-auto flex flex-col items-center text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[11px] font-black uppercase tracking-[0.3em] mb-4">
              <Globe className="w-3.5 h-3.5" />
              Real-world documentation
            </div>
            
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] text-slate-900">
              CRAFTED FOR<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">BUILDERS.</span>
            </h2>

            <p className="text-slate-500 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed">
              Professional engineering protocols by <span className="text-slate-900 font-black">Batoor Khan</span>. 
              Interactive, performant, and absolutely real.
            </p>

            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContent}
                className="px-10 py-5 rounded-3xl bg-slate-900 text-white font-black text-lg shadow-2xl shadow-slate-200 flex items-center gap-3 group"
              >
                Launch Portal
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.a 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href={githubUrl}
                target="_blank" 
                rel="noreferrer"
                className="px-10 py-5 rounded-3xl bg-white border-2 border-slate-100 text-slate-900 font-black text-lg hover:border-indigo-600 transition-all flex items-center gap-3 shadow-xl shadow-slate-100"
              >
                Source Hub
                <Github className="w-5 h-5 text-indigo-600" />
              </motion.a>
            </div>
          </motion.div>

          {/* Floating Aesthetic Elements */}
          <div className="absolute top-20 left-10 md:block hidden">
            <FloatingBadge className="text-indigo-600 font-bold text-xs">
              <Cpu className="w-4 h-4" />
              Architecture
            </FloatingBadge>
          </div>
          <div className="absolute bottom-40 right-10 md:block hidden">
            <FloatingBadge className="text-emerald-600 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              Verified
            </FloatingBadge>
          </div>
          <div className="absolute top-40 right-20 md:block hidden">
            <FloatingBadge className="text-amber-600 font-bold text-xs">
              <Star className="w-4 h-4" />
              Top Tier
            </FloatingBadge>
          </div>
        </section>

        {/* Documentation Content Area */}
        <section id="content-area" className="px-8 pb-40 md:px-20 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: "anticipate" }}
              className="grid lg:grid-cols-[1fr_1.3fr] gap-20 items-start"
            >
              <div className="space-y-10 lg:sticky lg:top-32">
                <div className="space-y-6">
                  <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-200">
                    <Box className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-2">
                      {activeSection.title}
                    </h3>
                    <p className="text-indigo-600 font-black text-lg uppercase tracking-widest">{activeSection.subtitle}</p>
                  </div>
                  <p className="text-slate-500 text-xl leading-relaxed font-medium">
                    {activeSection.content}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeSection.points.map((point, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-5 rounded-2xl bg-white border border-slate-100 flex items-center gap-3 text-slate-700 font-bold shadow-sm"
                    >
                      <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                      {point}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Code Experience */}
              <div className="space-y-8">
                <motion.div 
                  initial={{ rotateY: 10 }}
                  whileInView={{ rotateY: 0 }}
                  transition={{ duration: 1 }}
                  className="rounded-[32px] bg-slate-900 p-1 shadow-3xl shadow-slate-200"
                >
                  <div className="bg-slate-900 rounded-[31px] overflow-hidden">
                    <div className="px-8 py-4 bg-slate-800 flex items-center justify-between border-b border-white/5">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-700" />
                        <div className="w-3 h-3 rounded-full bg-slate-700" />
                        <div className="w-3 h-3 rounded-full bg-slate-700" />
                      </div>
                      <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">{activeSection.language}</span>
                    </div>

                    <div className="p-10 font-mono text-[15px] leading-relaxed overflow-x-auto">
                      <pre className="text-slate-300">
                        {activeSection.code.split('\n').map((line, i) => (
                          <div key={i} className="flex gap-8 group">
                            <span className="w-6 text-slate-600 select-none text-right font-medium">{i + 1}</span>
                            <span className={`${line.includes('//') ? 'text-slate-500 italic' : line.includes('import') || line.includes('export') || line.includes('await') ? 'text-indigo-400' : 'text-slate-300'}`}>
                              {line}
                            </span>
                          </div>
                        ))}
                      </pre>
                    </div>

                    <div className="px-10 py-6 bg-slate-950/50 flex items-center justify-between border-t border-white/5">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Runtime</span>
                        </div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Memory: 128MB</div>
                      </div>
                      <button className="text-indigo-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest flex items-center gap-2">
                        Copy Code <Command className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Sub Features */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-8 rounded-3xl bg-indigo-600 text-white shadow-2xl shadow-indigo-100 flex flex-col gap-6">
                    <Shield className="w-10 h-10" />
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-2">Protocol</p>
                      <h4 className="text-2xl font-black tracking-tight">Zero Trust Implementation</h4>
                    </div>
                  </div>
                  <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-100 flex flex-col gap-6">
                    <Code2 className="w-10 h-10 text-indigo-600" />
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Efficiency</p>
                      <h4 className="text-2xl font-black tracking-tight">Pure JS Integration</h4>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Real Metrics Section */}
        <section className="px-8 py-32 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 relative z-10">
            {[
              { val: "24.5s", label: "Build Time", icon: <Terminal className="w-5 h-5" /> },
              { val: "99.9%", label: "Test Coverage", icon: <CheckCircle2 className="w-5 h-5" /> },
              { val: "100%", label: "Uptime SLA", icon: <Zap className="w-5 h-5" /> },
              { val: "v2.4.0", label: "Latest Stable", icon: <Box className="w-5 h-5" /> }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-4 text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center text-indigo-600">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-4xl font-black text-slate-900 tracking-tighter">{stat.val}</p>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Global Footer */}
        <footer className="p-10 md:p-24 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-20">
            <div className="space-y-8 max-w-sm">
              <div className="flex items-center gap-4">
                <Command className="w-10 h-10 text-indigo-600" />
                <span className="text-3xl font-black tracking-tighter">BK<span className="text-indigo-600">.</span>Dev</span>
              </div>
              <p className="text-slate-500 text-lg leading-relaxed font-medium">
                The definitive engineering ecosystem architected by <span className="text-slate-900 font-black">Batoor Khan</span>. 
                Built for the next generation of full-stack builders.
              </p>
              <div className="flex gap-4">
                <a href={githubUrl} className="p-4 bg-slate-100 rounded-2xl hover:bg-slate-900 hover:text-white transition-all"><Github className="w-6 h-6" /></a>
                <a href="https://menot0258-sys.github.io/bk-chat/" className="p-4 bg-slate-100 rounded-2xl hover:bg-slate-900 hover:text-white transition-all"><Zap className="w-6 h-6" /></a>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-16 flex-1 lg:justify-end">
              <div className="space-y-6">
                <p className="font-black text-slate-900 uppercase text-xs tracking-[0.3em]">Foundation</p>
                <ul className="space-y-4 text-slate-500 font-bold text-sm">
                  <li className="hover:text-indigo-600 cursor-pointer transition-colors">Documentation</li>
                  <li className="hover:text-indigo-600 cursor-pointer transition-colors">Edge Services</li>
                  <li className="hover:text-indigo-600 cursor-pointer transition-colors">Security</li>
                </ul>
              </div>
              <div className="space-y-6">
                <p className="font-black text-slate-900 uppercase text-xs tracking-[0.3em]">Developer</p>
                <ul className="space-y-4 text-slate-500 font-bold text-sm">
                  <li><a href={githubUrl} className="hover:text-indigo-600">GitHub Repo</a></li>
                  <li><a href="https://menot0258-sys.github.io/bk-chat/" className="hover:text-indigo-600">BK Chat App</a></li>
                  <li className="hover:text-indigo-600 cursor-pointer transition-colors">Developer Portal</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">© 2026 BATOOR KHAN ARCHITECTURES. SECURE NODE.</p>
            <div className="flex gap-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span className="hover:text-slate-900 cursor-pointer">Security Protocol 7</span>
              <span className="hover:text-slate-900 cursor-pointer">Privacy Matrix</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
