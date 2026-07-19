import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Compass, Award, MailOpen, Heart, 
  MapPin, Coffee, Camera, Eye, Zap, CheckCircle2,
  Lock, Sparkles, MessageSquare, ChevronRight, X, Clock
} from 'lucide-react';
import { AppScreenId } from '../types';

interface PhoneMockupProps {
  activeScreen?: AppScreenId;
  onScreenChange?: (screenId: AppScreenId) => void;
  interactive?: boolean;
}

export default function PhoneMockup({ 
  activeScreen = 'explore', 
  onScreenChange, 
  interactive = true 
}: PhoneMockupProps) {
  const [localScreen, setLocalScreen] = useState<AppScreenId>(activeScreen);
  const [timeLeft, setTimeLeft] = useState('2:45:10');

  useEffect(() => {
    setLocalScreen(activeScreen);
  }, [activeScreen]);

  // Gentle timer simulation for the active challenge
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      const min = String(date.getMinutes()).padStart(2, '0');
      const sec = String(date.getSeconds()).padStart(2, '0');
      setTimeLeft(`01:14:${sec}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScreenChange = (id: AppScreenId) => {
    setLocalScreen(id);
    if (onScreenChange) {
      onScreenChange(id);
    }
  };

  // Pre-configured mock data for Prague characters
  const mockUser = {
    name: "Klara",
    age: 27,
    role: "Expat / Digital Marketer",
    bio: "Londoner living in Prague 3. Coffee enthusiast, record collector, and chronic explorer of Letná Park. Let's do a photowalk!",
    tags: ["☕ Cafés", "📸 photography", "🚶 Walking", "🎨 Galleries"],
    stats: { quests: 14, connections: 8, points: 280 }
  };

  return (
    <div 
      id="beyond-hello-phone-mockup"
      className="relative mx-auto w-[320px] h-[640px] md:w-[340px] md:h-[680px] bg-brand-dark rounded-[50px] p-3.5 shadow-2xl border-4 border-slate-800 ring-12 ring-slate-900/10 flex flex-col overflow-hidden"
    >
      {/* Speaker and Notch Area */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-brand-dark rounded-b-2xl z-50 flex items-center justify-center">
        <div className="w-16 h-1 bg-neutral-800 rounded-full mb-2"></div>
        {/* Compact Dynamic Island-style camera punch-hole */}
        <div className="absolute w-3 h-3 bg-neutral-950 rounded-full top-1 right-8"></div>
      </div>

      {/* Side buttons */}
      <div className="absolute -left-1.5 top-24 w-1 h-12 bg-neutral-800 rounded-r-md"></div>
      <div className="absolute -left-1.5 top-40 w-1 h-16 bg-neutral-800 rounded-r-md"></div>
      <div className="absolute -right-1.5 top-32 w-1 h-16 bg-neutral-800 rounded-l-md"></div>

      {/* Internal Phone Screen Container */}
      <div className="w-full h-full bg-[#12100E] rounded-[38px] overflow-hidden relative flex flex-col text-neutral-200 select-none font-sans">
        
        {/* Top Status Bar */}
        <div className="h-10 pt-3 px-6 flex justify-between items-center text-[11px] font-semibold text-neutral-400 z-40 bg-[#12100E]">
          <span>11:13</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-brand-orange bg-brand-orange/10 px-1.5 py-0.2 rounded font-bold">PRG</span>
            <span>5G</span>
            <div className="w-5 h-2.5 border border-neutral-600 rounded-sm p-0.5 flex items-center">
              <div className="h-full w-[80%] bg-brand-orange rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* Screen Content Viewport */}
        <div className="flex-1 overflow-y-auto px-4 pb-16 pt-2 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={localScreen}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="h-full flex flex-col"
            >
              {/* SCREEN CONTENT CONDITIONAL RENDERING */}
              {localScreen === 'profile' && (
                <div id="screen-profile" className="flex flex-col h-full justify-between py-1">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold tracking-wide text-neutral-400 uppercase">My Space</span>
                      <Sparkles className="w-4 h-4 text-brand-yellow animate-pulse-slow" />
                    </div>

                    {/* Profile Photo Mock */}
                    <div className="relative w-24 h-24 mx-auto mb-3 rounded-full p-1 bg-gradient-to-tr from-brand-orange via-brand-yellow to-brand-purple">
                      <div className="w-full h-full rounded-full bg-[#201C1A] overflow-hidden flex items-center justify-center border-2 border-[#12100E]">
                        <img 
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                          alt="Klara" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute bottom-0 right-0 bg-brand-orange text-white p-1 rounded-full text-xs">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Name & Title */}
                    <div className="text-center mb-3">
                      <h4 className="text-lg font-bold text-neutral-100 flex items-center justify-center gap-1">
                        {mockUser.name}, {mockUser.age}
                      </h4>
                      <p className="text-[11px] text-neutral-400 font-medium">{mockUser.role}</p>
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-900/50 p-2.5 rounded-xl border border-neutral-800/60 text-center mb-3">
                      "{mockUser.bio}"
                    </p>

                    {/* Sparkle Tags */}
                    <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                      {mockUser.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="text-[10px] font-semibold bg-neutral-800/75 text-neutral-200 px-2 py-1 rounded-full border border-neutral-700/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick stats panel */}
                  <div className="bg-[#1D1917] p-2.5 rounded-2xl border border-[#2E2824] flex justify-around text-center mt-auto">
                    <div>
                      <p className="text-xs font-bold text-brand-orange">{mockUser.stats.quests}</p>
                      <p className="text-[9px] text-neutral-400 uppercase tracking-wider font-semibold">Quests</p>
                    </div>
                    <div className="w-px bg-neutral-800"></div>
                    <div>
                      <p className="text-xs font-bold text-brand-yellow">{mockUser.stats.connections}</p>
                      <p className="text-[9px] text-neutral-400 uppercase tracking-wider font-semibold">Partners</p>
                    </div>
                    <div className="w-px bg-neutral-800"></div>
                    <div>
                      <p className="text-xs font-bold text-brand-teal">{mockUser.stats.points}xp</p>
                      <p className="text-[9px] text-neutral-400 uppercase tracking-wider font-semibold">XP Score</p>
                    </div>
                  </div>
                </div>
              )}

              {localScreen === 'explore' && (
                <div id="screen-explore" className="flex flex-col h-full py-1">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider">Experiences</span>
                      <h4 className="text-lg font-bold font-display text-white">Prague Quests</h4>
                    </div>
                    <div className="bg-neutral-800 p-1.5 rounded-lg flex items-center justify-center border border-neutral-700">
                      <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                    </div>
                  </div>

                  {/* Quest Search Placeholder / Quick filters */}
                  <div className="flex gap-1.5 overflow-x-auto pb-2.5 mb-2.5 no-scrollbar">
                    <span className="text-[10px] font-semibold bg-brand-orange text-white px-2.5 py-1 rounded-full flex-shrink-0">All Quests</span>
                    <span className="text-[10px] font-semibold bg-neutral-800 text-neutral-400 px-2.5 py-1 rounded-full flex-shrink-0">☕ Cafés</span>
                    <span className="text-[10px] font-semibold bg-neutral-800 text-neutral-400 px-2.5 py-1 rounded-full flex-shrink-0">📸 Parks</span>
                    <span className="text-[10px] font-semibold bg-neutral-800 text-neutral-400 px-2.5 py-1 rounded-full flex-shrink-0">🍜 Foodies</span>
                  </div>

                  {/* Active List */}
                  <div className="space-y-3 overflow-y-auto max-h-[350px] pr-0.5 no-scrollbar">
                    {/* Item 1 */}
                    <div className="bg-[#1C1816] rounded-2xl border border-[#2E2824] p-3 hover:border-brand-orange/40 transition-colors flex flex-col gap-2.5">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                            <Coffee className="w-4.5 h-4.5 text-brand-orange" />
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-neutral-100">☕ Coffee Quest</h5>
                            <p className="text-[10px] text-neutral-400">Prague 2 • 3 Active Groups</p>
                          </div>
                        </div>
                        <span className="text-[8px] bg-brand-orange/20 text-brand-orange font-bold px-1.5 py-0.5 rounded-full">Popular</span>
                      </div>
                      <p className="text-[11px] text-neutral-300">Find Prague's coziest hidden cafés and order a mysterious drink.</p>
                      <button 
                        onClick={() => handleScreenChange('challenge')}
                        className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white text-[10px] font-bold py-1.5 rounded-xl flex items-center justify-center gap-1 transition-colors"
                      >
                        Start Experience <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Item 2 */}
                    <div className="bg-[#1C1816] rounded-2xl border border-neutral-800/80 p-3 hover:border-brand-yellow/40 transition-colors flex flex-col gap-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-brand-yellow/10 flex items-center justify-center">
                            <Camera className="w-4.5 h-4.5 text-brand-yellow" />
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-neutral-100">📸 City Explorer</h5>
                            <p className="text-[10px] text-neutral-400">Letná & Vyšehrad • Outdoor</p>
                          </div>
                        </div>
                        <span className="text-[8px] bg-brand-yellow/20 text-brand-yellow font-bold px-1.5 py-0.5 rounded-full">Photo Quest</span>
                      </div>
                      <p className="text-[11px] text-neutral-300">Complete photo riddles at Prague's epic lookouts with your partner.</p>
                      <button 
                        onClick={() => handleScreenChange('invite')}
                        className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[10px] font-bold py-1.5 rounded-xl flex items-center justify-center gap-1 transition-colors"
                      >
                        View Invitation <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Item 3 */}
                    <div className="bg-[#1C1816] rounded-2xl border border-neutral-800/80 p-3 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-brand-purple/10 flex items-center justify-center">
                          <Zap className="w-4.5 h-4.5 text-brand-purple" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-neutral-100">🎲 Conversation Deck</h5>
                          <p className="text-[10px] text-neutral-400">Anywhere • Fast Connections</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-neutral-300">Break the ice instantly with game cards made to bypass boring small talk.</p>
                    </div>
                  </div>
                </div>
              )}

              {localScreen === 'challenge' && (
                <div id="screen-challenge" className="flex flex-col h-full py-1">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3 bg-brand-orange/10 p-2 rounded-xl border border-brand-orange/20">
                    <div className="flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-brand-orange" />
                      <span className="text-xs font-bold text-brand-orange">Active Quest</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-neutral-300 bg-black/40 px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3 text-brand-orange animate-pulse" />
                      <span>{timeLeft}</span>
                    </div>
                  </div>

                  {/* Challenge details */}
                  <div className="bg-[#1C1816] rounded-2xl p-3 border border-neutral-800/80 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white mb-1">☕ Coffee Quest: Part 1</h4>
                      <p className="text-[11px] text-brand-orange font-semibold mb-2">Location: Vinohrady, Prague 2</p>
                      
                      <div className="w-full h-24 rounded-xl overflow-hidden mb-3 bg-neutral-900 border border-neutral-800 relative flex items-center justify-center">
                        <img 
                          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=300&q=80" 
                          alt="Cozy café in Vinohrady" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover brightness-75"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-2 left-2 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                          <span className="text-[10px] text-neutral-200 font-bold">Café Mezera, Prague 2</span>
                        </div>
                      </div>

                      <h5 className="text-xs font-bold text-neutral-100 mb-1">Your Challenge:</h5>
                      <p className="text-[11px] text-neutral-300 leading-relaxed mb-3">
                        "Locate the secret bookcase door inside the café. Share a single serving of Prague's famous cinnamon pastry, and unlock Task #2 by scanning each other's screen."
                      </p>
                    </div>

                    <div className="space-y-2 mt-auto">
                      <div className="bg-neutral-900 p-2.5 rounded-xl border border-neutral-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full overflow-hidden">
                            <img 
                              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" 
                              alt="Jakub" 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-neutral-200">Partner: Jakub</p>
                            <p className="text-[8px] text-brand-teal">● Nearby (20m)</p>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold text-brand-yellow bg-brand-yellow/10 px-2 py-0.5 rounded-full">Step 1/3</span>
                      </div>

                      <button 
                        onClick={() => handleScreenChange('match')}
                        className="w-full bg-brand-teal hover:bg-brand-teal/90 text-neutral-950 text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Tap to Complete Task
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {localScreen === 'invite' && (
                <div id="screen-invite" className="flex flex-col h-full py-1 justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-brand-purple uppercase tracking-wider">New Request</span>
                      <span className="text-[10px] bg-brand-purple/20 text-brand-purple font-bold px-2 py-0.5 rounded-full">Pending</span>
                    </div>

                    {/* Invitation Card */}
                    <div className="bg-[#1C1816] rounded-2xl p-4 border border-brand-purple/30 relative overflow-hidden flex flex-col items-center text-center">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/5 rounded-full blur-xl"></div>
                      
                      {/* Avatar */}
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-purple mb-2">
                        <img 
                          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" 
                          alt="Jakub" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      <h4 className="text-base font-bold text-white">Jakub, 29</h4>
                      <p className="text-[10px] text-neutral-400 mb-3">Architect • Living in Prague 2</p>

                      <div className="bg-[#24201E] rounded-xl p-2.5 border border-neutral-800/80 text-[11px] text-neutral-300 italic mb-4">
                        "Hey Klara! I see we are both photo nerds. Let's conquer the Sunset Photo Riddle challenge at Letná park. I hear there's a secret panoramic spot. Up for it?"
                      </div>

                      <div className="w-full space-y-2 text-left">
                        <div className="flex items-center gap-2 text-[11px] text-neutral-300">
                          <Compass className="w-4 h-4 text-brand-purple" />
                          <span>Challenge: Letná Photo Riddle</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-neutral-300">
                          <Clock className="w-4 h-4 text-brand-purple" />
                          <span>Time: Sunset tonight (19:30)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accept buttons */}
                  <div className="flex gap-2.5 mt-4">
                    <button 
                      onClick={() => handleScreenChange('explore')}
                      className="flex-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/60 text-neutral-400 text-xs font-bold py-2 rounded-xl transition-colors"
                    >
                      Skip
                    </button>
                    <button 
                      onClick={() => handleScreenChange('challenge')}
                      className="flex-1 bg-brand-purple hover:bg-brand-purple/90 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 transition-colors shadow-lg shadow-brand-purple/20"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" /> Accept
                    </button>
                  </div>
                </div>
              )}

              {localScreen === 'match' && (
                <div id="screen-match" className="flex flex-col h-full py-1 justify-between text-center">
                  <div className="my-auto space-y-6">
                    {/* Sparkle background elements */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center justify-center animate-ping opacity-25">
                        <div className="w-24 h-24 rounded-full bg-brand-teal/40"></div>
                      </div>

                      {/* Overlapping Circles */}
                      <div className="flex items-center justify-center -space-x-4">
                        <div className="w-20 h-20 rounded-full border-4 border-[#12100E] overflow-hidden shadow-lg transform -rotate-6">
                          <img 
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                            alt="Klara" 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="w-20 h-20 rounded-full border-4 border-[#12100E] overflow-hidden shadow-lg transform rotate-6">
                          <img 
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" 
                            alt="Jakub" 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {/* Absolute center heart badge */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-teal text-neutral-950 p-2 rounded-full border-2 border-[#12100E] shadow-md animate-bounce">
                        <CheckCircle2 className="w-4 h-4 text-neutral-950" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold uppercase bg-brand-teal/10 text-brand-teal px-3 py-1 rounded-full tracking-widest">
                        CONNECTED!
                      </span>
                      <h4 className="text-xl font-bold text-white font-display">Challenge Complete!</h4>
                      <p className="text-xs text-neutral-300 px-2">
                        You both solved the Prague 2 Courtyard Coffee Quest! Tap below to break the ice with unlocked stories.
                      </p>
                    </div>

                    {/* Fun mini questions unlocked info */}
                    <div className="bg-[#1C1816] border border-neutral-800 rounded-xl p-2.5 text-left mx-2">
                      <p className="text-[9px] font-bold uppercase text-neutral-400 mb-1">💡 Icebreaker unlocked:</p>
                      <p className="text-[11px] text-neutral-300">
                        "What is the strangest, funniest secret café or restaurant you have ever found?"
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 mt-auto">
                    <button 
                      onClick={() => alert("Simulated: Start Chatting with Jakub! This unlocks after Prague launch!")}
                      className="w-full bg-brand-teal hover:bg-brand-teal/90 text-neutral-950 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-brand-teal/20"
                    >
                      <MessageSquare className="w-4 h-4" /> Message Jakub
                    </button>
                    <button 
                      onClick={() => handleScreenChange('explore')}
                      className="w-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 text-[10px] font-bold py-1.5 rounded-xl transition-colors"
                    >
                      Back to Quests
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Interactive Navigation Tab bar */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#161311]/95 border-t border-[#25201E] flex justify-around items-center px-4 pb-2 z-40 backdrop-blur-md">
          <button 
            onClick={() => handleScreenChange('profile')} 
            className={`flex flex-col items-center justify-center gap-0.5 transition-all ${localScreen === 'profile' ? 'text-brand-orange scale-105' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            <User className="w-4.5 h-4.5" />
            <span className="text-[9px] font-medium">Profile</span>
          </button>

          <button 
            onClick={() => handleScreenChange('explore')} 
            className={`flex flex-col items-center justify-center gap-0.5 transition-all ${localScreen === 'explore' ? 'text-brand-orange scale-105' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            <Compass className="w-4.5 h-4.5" />
            <span className="text-[9px] font-medium">Quests</span>
          </button>

          {/* Glowing Middle Action Button */}
          <button 
            onClick={() => handleScreenChange('challenge')} 
            className={`flex flex-col items-center justify-center w-10 h-10 rounded-full bg-brand-orange text-white shadow-lg shadow-brand-orange/30 transform -translate-y-2 border-2 border-[#12100E] transition-all hover:scale-110 active:scale-95 ${localScreen === 'challenge' ? 'bg-brand-yellow text-neutral-950 shadow-brand-yellow/30' : ''}`}
          >
            <Zap className="w-5 h-5 fill-current" />
          </button>

          <button 
            onClick={() => handleScreenChange('invite')} 
            className={`flex flex-col items-center justify-center gap-0.5 transition-all ${localScreen === 'invite' ? 'text-brand-orange scale-105' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            <MailOpen className="w-4.5 h-4.5" />
            <span className="text-[9px] font-medium">Invites</span>
          </button>

          <button 
            onClick={() => handleScreenChange('match')} 
            className={`flex flex-col items-center justify-center gap-0.5 transition-all ${localScreen === 'match' ? 'text-brand-orange scale-105' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            <Heart className="w-4.5 h-4.5" />
            <span className="text-[9px] font-medium">Match</span>
          </button>
        </div>

        {/* Small floating tooltip to indicate interactive nature */}
        {interactive && (
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-[9px] text-neutral-400 font-bold px-2 py-0.5 rounded-full border border-neutral-800 flex items-center gap-1 opacity-70 pointer-events-none">
            <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-ping"></span>
            <span>TAP MENU AT BOTTOM TO TEST SCREEN MODES</span>
          </div>
        )}
      </div>
    </div>
  );
}
