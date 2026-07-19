import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Sparkles, MessageCircle, Heart, ChevronRight, MapPin, 
  Smile, ShieldCheck, Star, Users, Navigation, Info, Bell, X,
  ArrowRight, Download, Menu, AppWindow, Tablet, Smartphone
} from 'lucide-react';

// Custom modular components
import PhoneMockup from './components/PhoneMockup';
import ProblemSection from './components/ProblemSection';
import StepsSection from './components/StepsSection';
import ChallengeSection from './components/ChallengeSection';
import PragueSection from './components/PragueSection';
import SignupForm from './components/SignupForm';
import { FeatureCard, AppScreenId } from './types';

export default function App() {
  const [activeHeroScreen, setActiveHeroScreen] = useState<AppScreenId>('explore');
  const [showNotification, setShowNotification] = useState(true);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [currentLocalTime, setCurrentLocalTime] = useState('11:13');

  // Gentle Prague notification loop simulation to create "live" startup excitement
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState(false);

  const notifications = [
    "🔥 Klara & Jakub just unlocked the Vinohrady Coffee Quest!",
    "📸 Lukas solved the Sunset riddle at Letná Park!",
    "🍜 8 couples are currently casting blind foodie votes in Karlín!",
    "🚀 Prague Launch list is filling up! 942/1,000 spots claimed.",
    "🎲 New Icebreaker prompt unlocked: 'What local custom do you defend?'"
  ];

  useEffect(() => {
    // Clock setup based on additional metadata local time
    const interval = setInterval(() => {
      const date = new Date();
      const hrs = String(date.getHours()).padStart(2, '0');
      const mins = String(date.getMinutes()).padStart(2, '0');
      setCurrentLocalTime(`${hrs}:${mins}`);
    }, 60000);

    // Dynamic toast alerts every 12 seconds
    let idx = 0;
    const toastTimer = setInterval(() => {
      setToastMessage(notifications[idx]);
      setShowToast(true);
      idx = (idx + 1) % notifications.length;
      
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }, 12000);

    return () => {
      clearInterval(interval);
      clearInterval(toastTimer);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setShowNavMenu(false);
  };

  const featureCards: FeatureCard[] = [
    {
      title: "🌍 Discover your city",
      description: "Explore Prague in a completely new way. Uncover secret alleys in Malá Strana, hidden overlooks in Letná, and cozy underground coffee cellars in Vinohrady.",
      iconName: "Globe",
      color: "border-brand-orange/20 bg-brand-orange/5 text-brand-orange"
    },
    {
      title: "✨ More than a profile",
      description: "No more superficial judgements. Connect naturally through personality, creative icebreaker prompts, and fun physical activity goals.",
      iconName: "Sparkles",
      color: "border-brand-yellow/20 bg-brand-yellow/5 text-brand-yellow"
    },
    {
      title: "🤝 Less pressure",
      description: "No awkward interview-style face-offs. The challenges keep things naturally dynamic, providing automated conversational topics so you never run dry.",
      iconName: "Smile",
      color: "border-brand-teal/20 bg-brand-teal/5 text-brand-teal"
    },
    {
      title: "🎉 More stories",
      description: "Ditch the dry 'Hey, what's up?' history. Every long-lasting connection starts with something uniquely memorable. Make your first meeting an story to tell.",
      iconName: "Heart",
      color: "border-brand-purple/20 bg-brand-purple/5 text-brand-purple"
    }
  ];

  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark flex flex-col font-sans selection:bg-brand-orange selection:text-white relative overflow-hidden">
      
      {/* Frosted Glass Ambient Blur Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-brand-orange rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-brand-teal rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"></div>
      <div className="absolute -right-12 top-1/4 w-48 h-48 bg-brand-teal/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-12 bottom-1/4 w-48 h-48 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Dynamic Floating Toast Alerts */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            id="floating-prague-alert-toast"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm bg-neutral-900/90 backdrop-blur-md text-white rounded-2xl p-4 border border-white/20 shadow-2xl flex items-center gap-3.5"
          >
            <div className="w-9 h-9 rounded-full bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center shrink-0">
              <Bell className="w-4.5 h-4.5 text-brand-orange animate-bounce" />
            </div>
            <div className="flex-1">
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest block">PRAGUE ACTIVE LOGS</span>
              <p className="text-xs font-semibold text-neutral-100 mt-0.5">{toastMessage}</p>
            </div>
            <button onClick={() => setShowToast(false)} className="text-neutral-500 hover:text-neutral-300 transition-colors shrink-0">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner Ticker */}
      {showNotification && (
        <div id="top-announcement-banner" className="bg-[#1A1A1A] text-white text-xs py-2.5 px-4 text-center font-semibold relative flex items-center justify-center gap-2 border-b border-neutral-800">
          <span className="bg-brand-orange text-[9px] font-black uppercase px-2 py-0.5 rounded animate-pulse">Live</span>
          <span>🚀 Join the exclusive Belgrade and Prague launch lists! Limited spots left for Prague Founder Seats.</span>
          <button 
            onClick={() => setShowNotification(false)}
            className="absolute right-4 hover:text-brand-orange transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-40 bg-white/40 backdrop-blur-xl border-b border-white/60 px-4 md:px-8 py-4.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Brand Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF6B35] to-[#FF9F1C] flex items-center justify-center shadow-lg shadow-brand-orange/20 transition-transform group-hover:scale-105">
              <Navigation className="w-5 h-5 text-white transform rotate-45" />
            </div>
            <div>
              <h1 className="text-xl font-black font-display tracking-tight text-[#FF6B35] leading-none">
                Beyond Hello
              </h1>
              <span className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase">Prague 2026</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-neutral-600">
            <button onClick={() => scrollToSection('problem-section')} className="hover:text-neutral-950 transition-colors cursor-pointer">The Fatigue</button>
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-neutral-950 transition-colors cursor-pointer">How It Works</button>
            <button onClick={() => scrollToSection('challenges-section')} className="hover:text-neutral-950 transition-colors cursor-pointer">Challenges</button>
            <button onClick={() => scrollToSection('prague-section')} className="hover:text-neutral-950 transition-colors cursor-pointer">Why Prague</button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="bg-white/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/40 shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-orange" /> Prague, CZ
              </span>
            </div>
            <button 
              onClick={() => scrollToSection('signup-section')}
              className="bg-brand-orange hover:bg-brand-orange/95 text-white font-bold text-sm px-5 py-2.5 rounded-2xl shadow-lg shadow-brand-orange/15 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              Join Prague Launch
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setShowNavMenu(!showNavMenu)}
            className="md:hidden p-2 text-neutral-700 hover:text-neutral-950"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {showNavMenu && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden mt-4 overflow-hidden bg-white rounded-2xl border border-neutral-200/80 p-4 space-y-3 shadow-xl"
            >
              <button onClick={() => scrollToSection('problem-section')} className="block w-full text-left font-bold text-neutral-600 hover:text-neutral-950 py-1">The Fatigue</button>
              <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left font-bold text-neutral-600 hover:text-neutral-950 py-1">How It Works</button>
              <button onClick={() => scrollToSection('challenges-section')} className="block w-full text-left font-bold text-neutral-600 hover:text-neutral-950 py-1">Challenges</button>
              <button onClick={() => scrollToSection('prague-section')} className="block w-full text-left font-bold text-neutral-600 hover:text-neutral-950 py-1">Why Prague</button>
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-bold uppercase flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange" /> Prague
                </span>
                <button 
                  onClick={() => scrollToSection('signup-section')}
                  className="bg-brand-orange text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Join Prague Launch
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* SECTION 1 — HERO */}
      <section id="hero-section" className="relative px-4 py-12 md:py-24 max-w-7xl mx-auto w-full overflow-hidden">
        
        {/* Playful Floating Badges */}
        <div className="absolute top-10 left-5 bg-white/60 backdrop-blur-md text-brand-dark font-black text-[10px] uppercase px-3.5 py-2 rounded-full border border-white/40 shadow-sm tracking-wider rotate-3 hidden lg:flex items-center gap-1 z-10">
          <Star className="w-3.5 h-3.5 fill-brand-yellow text-brand-yellow" /> NOT A TRADITIONAL DATING APP
        </div>
        <div className="absolute top-2/3 right-1/4 bg-white/60 backdrop-blur-md text-brand-dark font-black text-[10px] uppercase px-3.5 py-2 rounded-full border border-white/40 shadow-sm tracking-wider -rotate-3 hidden lg:flex items-center gap-1 z-10">
          <Sparkles className="w-3.5 h-3.5 text-brand-orange" /> COFFEE QUESTS & PHOTO SCAVENGERS
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Details */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
            
            <div className="space-y-4">
              <span className="bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-brand-orange/20 inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping"></span>
                PRAGUE'S INAUGURAL SOCIAL EXPERIENCE PLATFORM
              </span>
              
              <h2 className="text-5xl md:text-7xl font-black font-display tracking-tight leading-none text-neutral-900">
                Beyond Hello
              </h2>
              
              <h3 className="text-2xl md:text-3.5xl font-bold font-display text-neutral-800">
                A social experience <span className="text-[#FF6B35]">for singles.</span>
              </h3>
              
              <p className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Meet people differently. Discover Prague through challenges, experiences, and moments that create real connections. No endless swiping, no generic small talk.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={() => scrollToSection('signup-section')}
                className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/95 text-white font-black text-base px-8 py-4 rounded-2xl shadow-xl shadow-brand-orange/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                Join the Prague launch <ArrowRight className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => {
                  alert("Beyond Hello is currently finishing private alpha testing! Complete the Signup Form below to secure your direct test invitation when the iOS & Android application boots.");
                  scrollToSection('signup-section');
                }}
                className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm px-6 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-neutral-800"
              >
                <Download className="w-4 h-4" /> Download when available
              </button>
            </div>

            {/* Badges / Platform Status */}
            <div className="space-y-3 pt-4 border-t border-dashed border-neutral-200/80 max-w-md mx-auto lg:mx-0">
              <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">
                Coming soon to iOS and Android
              </p>
              
              <div className="flex items-center justify-center lg:justify-start gap-3 opacity-95">
                {/* Simulated App Store badges with styled CSS frames */}
                <div className="bg-white/60 backdrop-blur-md text-neutral-800 py-1.5 px-3 rounded-lg border border-white/40 shadow-sm flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-brand-orange" />
                  <div className="text-left leading-none">
                    <span className="text-[8px] uppercase text-neutral-500 font-bold block">COMING TO</span>
                    <span className="text-[10px] font-black">App Store</span>
                  </div>
                </div>

                <div className="bg-white/60 backdrop-blur-md text-neutral-800 py-1.5 px-3 rounded-lg border border-white/40 shadow-sm flex items-center gap-2">
                  <AppWindow className="w-4 h-4 text-brand-yellow" />
                  <div className="text-left leading-none">
                    <span className="text-[8px] uppercase text-neutral-500 font-bold block">COMING TO</span>
                    <span className="text-[10px] font-black">Google Play</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero SmartPhone Mockup Grid */}
          <div className="lg:col-span-5 flex justify-center py-4 relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-[500px] bg-brand-orange/5 rounded-full blur-3xl -z-10"></div>
            
            <PhoneMockup 
              activeScreen={activeHeroScreen} 
              onScreenChange={(screenId) => setActiveHeroScreen(screenId)}
              interactive={true}
            />
          </div>

        </div>
      </section>

      {/* SECTION 2 — The Problem */}
      <section id="problem-section" className="bg-white border-t border-b border-neutral-200/60 px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <ProblemSection />
        </div>
      </section>

      {/* SECTION 3 — How the app works */}
      <section id="how-it-works" className="px-4 py-16 md:py-24 max-w-7xl mx-auto w-full">
        <StepsSection />
      </section>

      {/* SECTION 4 — Experience Challenges */}
      <section id="challenges-section" className="bg-white border-t border-b border-neutral-200/60 px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-brand-orange/20">
              The Challenges
            </span>
            <h3 className="text-3xl md:text-5xl font-black font-display tracking-tight text-neutral-900 leading-none">
              Dozens of experiences. <br />
              <span className="text-brand-orange">Unlimited stories.</span>
            </h3>
            <p className="text-sm md:text-base text-neutral-500">
              Whether you are a quiet coffee lover, an outdoor street photographer, a devoted foodie, or a board game fan, we have custom built challenges waiting.
            </p>
          </div>

          <ChallengeSection />
        </div>
      </section>

      {/* SECTION 5 — Why Beyond Hello */}
      <section id="why-beyond-hello" className="px-4 py-16 md:py-24 max-w-7xl mx-auto w-full">
        <div className="space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="bg-brand-teal/10 text-brand-teal text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-brand-teal/20">
              Our Philosophy
            </span>
            <h3 className="text-3xl md:text-5xl font-black font-display tracking-tight text-neutral-900 leading-none">
              Because meeting people <br className="hidden md:block" />
              <span className="text-brand-teal font-extrabold">should be an experience.</span>
            </h3>
            <p className="text-sm md:text-base text-neutral-500">
              Beyond Hello is thoughtfully designed by expats, local event hosts, and psychologists who understand that lasting connections come from shared presence.
            </p>
          </div>

          {/* Features Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureCards.map((feat, idx) => (
              <div 
                id={`feature-bento-card-${idx}`}
                key={idx}
                className={`rounded-3xl p-6 border-2 border-neutral-200/70 bg-white hover:border-neutral-300 shadow-sm transition-all flex flex-col md:flex-row gap-5 items-start group`}
              >
                <div className={`p-3 rounded-2xl border shrink-0 ${feat.color}`}>
                  {idx === 0 && <Globe className="w-6 h-6" />}
                  {idx === 1 && <Sparkles className="w-6 h-6 animate-pulse-slow" />}
                  {idx === 2 && <Smile className="w-6 h-6" />}
                  {idx === 3 && <Heart className="w-6 h-6 fill-current" />}
                </div>
                
                <div className="space-y-1.5 text-left">
                  <h4 className="text-lg font-bold font-display text-neutral-900">
                    {feat.title}
                  </h4>
                  <p className="text-xs md:text-sm text-neutral-500 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 6 — Built for Prague */}
      <section id="prague-section" className="bg-white border-t border-b border-neutral-200/60 px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <PragueSection />
        </div>
      </section>

      {/* SECTION 7 — Join the first community */}
      <section id="signup-section" className="px-4 py-16 md:py-24 max-w-7xl mx-auto w-full">
        <div className="space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-brand-orange/20">
              Early Registry
            </span>
            <h3 className="text-3xl md:text-5xl font-black font-display tracking-tight text-neutral-900 leading-none">
              Be one of the first <br className="hidden md:block" />
              <span className="text-brand-orange">1,000 members.</span>
            </h3>
            <p className="text-sm md:text-base text-neutral-500">
              Help shape the future of social connection in Prague. Reserve your founding spot today to lock in free premium access and priority event entries.
            </p>
          </div>

          <SignupForm />
        </div>
      </section>

      {/* SECTION 8 — Mobile App Preview */}
      <section id="app-preview-section" className="bg-neutral-950 text-white border-t border-neutral-900 px-4 py-16 md:py-24 relative overflow-hidden">
        {/* Abstract glowing graphics */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#12100E] via-transparent to-[#12100E] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-14 relative z-10 text-center">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="bg-brand-yellow/15 text-brand-yellow text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-brand-yellow/30">
              Inside Beyond Hello
            </span>
            <h3 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white leading-none">
              Your next connection <br />
              <span className="text-brand-orange">starts with an experience.</span>
            </h3>
            <p className="text-sm md:text-base text-neutral-400">
              Take a look inside our high-fidelity, native design screens. Engineered from the ground up for lightning-fast performance, safety, and modern social play.
            </p>
          </div>

          {/* Horizontal Gallery of multiple styled phone views side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            
            {/* Screen 1: Profile */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">1. My Profile</span>
              <div className="scale-95 origin-top hover:scale-[1.01] transition-transform">
                <PhoneMockup activeScreen="profile" interactive={false} />
              </div>
            </div>

            {/* Screen 2: Quests */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">2. Discover Quests</span>
              <div className="scale-95 origin-top hover:scale-[1.01] transition-transform">
                <PhoneMockup activeScreen="explore" interactive={false} />
              </div>
            </div>

            {/* Screen 3: Invites */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">3. Receive Invites</span>
              <div className="scale-95 origin-top hover:scale-[1.01] transition-transform">
                <PhoneMockup activeScreen="invite" interactive={false} />
              </div>
            </div>

            {/* Screen 4: Active Challenge */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">4. Active Task</span>
              <div className="scale-95 origin-top hover:scale-[1.01] transition-transform">
                <PhoneMockup activeScreen="challenge" interactive={false} />
              </div>
            </div>

            {/* Screen 5: Match */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">5. Spark Match</span>
              <div className="scale-95 origin-top hover:scale-[1.01] transition-transform">
                <PhoneMockup activeScreen="match" interactive={false} />
              </div>
            </div>

          </div>

          {/* Bottom Callout inside Preview */}
          <div className="pt-6">
            <button 
              onClick={() => scrollToSection('signup-section')}
              className="bg-brand-orange hover:bg-brand-orange/95 text-white font-black text-sm px-8 py-3.5 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              Reserve founding spot now
            </button>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900 px-6 py-12 text-sm mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center">
                <Navigation className="w-4.5 h-4.5 text-white transform rotate-45" />
              </div>
              <h4 className="text-lg font-black font-display text-white tracking-tight">Beyond Hello</h4>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Prague's premiere social experience application. Helping young professionals and expats connect authentically through local city adventures.
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-bold uppercase">
              <MapPin className="w-4 h-4 text-brand-orange" />
              <span>LAUNCHING IN PRAGUE, CZ</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3 text-left">
            <h5 className="text-xs font-bold uppercase text-white tracking-widest">Platform</h5>
            <div className="space-y-2 text-xs font-semibold">
              <button onClick={() => scrollToSection('problem-section')} className="block hover:text-white transition-colors cursor-pointer text-left">Swiping Fatigue</button>
              <button onClick={() => scrollToSection('how-it-works')} className="block hover:text-white transition-colors cursor-pointer text-left">The Journey</button>
              <button onClick={() => scrollToSection('challenges-section')} className="block hover:text-white transition-colors cursor-pointer text-left">Active Challenges</button>
              <button onClick={() => scrollToSection('signup-section')} className="block hover:text-white transition-colors cursor-pointer text-left">Founding Ticket</button>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4 text-left">
            <h5 className="text-xs font-bold uppercase text-white tracking-widest">Interactive Status</h5>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-neutral-900 pb-1.5">
                <span className="text-neutral-500 font-semibold">Live Local Time:</span>
                <span className="font-mono text-brand-yellow">{currentLocalTime} (Prague)</span>
              </div>
              <div className="flex justify-between border-b border-neutral-900 pb-1.5">
                <span className="text-neutral-500 font-semibold">Current Version:</span>
                <span className="font-mono text-neutral-200">v1.2.0-Alpha-Prague</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 font-semibold">Inaugural District Limit:</span>
                <span className="font-bold text-brand-orange">Prague 1, 2, 3, 7 & 8</span>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-neutral-900 text-center text-xs text-neutral-600 flex flex-col sm:flex-row justify-between gap-4">
          <p>© 2026 Beyond Hello Technologies Inc. All rights reserved.</p>
          <div className="flex justify-center gap-4">
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-neutral-400 cursor-pointer text-brand-orange font-bold">Zsolt Galfalvi</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
