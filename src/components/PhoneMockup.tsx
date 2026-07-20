import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Compass, Award, MailOpen, Heart, 
  MapPin, Coffee, Camera, Eye, Zap, CheckCircle2,
  Lock, Sparkles, MessageSquare, ChevronRight, X, Clock,
  ArrowRight, Landmark, Navigation, MessageCircle, Star,
  Compass as CompassIcon, Inbox, Smile, RefreshCw
} from 'lucide-react';

interface PhoneMockupProps {
  activeScreen?: string;
  onScreenChange?: (screenId: string) => void;
  interactive?: boolean;
}

type ScreenState = 
  | 'splash'
  | 'onboarding_welcome'
  | 'onboarding_intentions'
  | 'onboarding_vibes'
  | 'onboarding_experience'
  | 'onboarding_profile'
  | 'onboarding_location'
  | 'onboarding_ready'
  | 'discover'
  | 'detail'
  | 'connection'
  | 'chat'
  | 'feedback';

interface ChatMessage {
  id: string;
  sender: 'you' | 'partner';
  text: string;
  time: string;
}

interface Participant {
  id: string;
  name: string;
  age: number;
  photo: string;
  interest: string;
}

interface Experience {
  id: string;
  title: string;
  description: string;
  location: string;
  time: string;
  duration: string;
  spotsLeft: number;
  image: string;
  tag: string;
  category: string;
  participants: Participant[];
  chatPartner: Participant;
  chatPartnerMessage: string;
  chatPartnerReply: string;
  conversationStarters: string[];
}

const PARTICIPANTS: Record<string, Participant> = {
  klara: { id: 'p1', name: 'Klara', age: 26, photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', interest: 'Specialty Coffee' },
  jakub: { id: 'p2', name: 'Jakub', age: 28, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', interest: 'Cycling' },
  elena: { id: 'p3', name: 'Elena', age: 25, photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', interest: 'Reading' },
  lukas: { id: 'p4', name: 'Lukas', age: 29, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', interest: 'Photography' },
};

const EXPERIENCES: Experience[] = [
  {
    id: 'golden-hour',
    title: 'Golden Hour Prague Walk',
    description: 'A relaxed evening exploring Prague\'s hidden viewpoints with interesting people.',
    location: 'Letná Park',
    time: 'Friday 19:00',
    duration: '90 minutes',
    spotsLeft: 6,
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=300&q=80',
    tag: '⭐ Featured Quest',
    category: '🌳 Outdoors',
    participants: [PARTICIPANTS.klara, PARTICIPANTS.jakub, PARTICIPANTS.elena],
    chatPartner: PARTICIPANTS.klara,
    chatPartnerMessage: 'Hey! Super excited for the Golden Hour walk this Friday. 🌅 Have you been to Letná Park before?',
    chatPartnerReply: 'That sounds awesome! Let\'s meet near the Hanavský Pavilion at 19:00. See you there! 🙌',
    conversationStarters: [
      'What is your favorite secret overlook in Letná?',
      'Do you prefer Prague in the morning or at sunset?',
      'What local beer or cider do you usually grab at the beer garden?'
    ]
  },
  {
    id: 'coffee-quest',
    title: 'Vinohrady Coffee Quest',
    description: 'Find Prague\'s coziest hidden cafés and solve coffee riddles together.',
    location: 'Café Mezera',
    time: 'Saturday 14:00',
    duration: '60 minutes',
    spotsLeft: 4,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=300&q=80',
    tag: '🔥 Popular Vibe',
    category: '☕ Coffee',
    participants: [PARTICIPANTS.elena, PARTICIPANTS.lukas],
    chatPartner: PARTICIPANTS.elena,
    chatPartnerMessage: 'Hi there! Ready to hunt down the secret bookcase door at Café Mezera? ☕ I hear their flat whites are legendary.',
    chatPartnerReply: 'Yay! Let\'s get a slice of their cinnamon roll too. See you Saturday at 14:00! 🍰',
    conversationStarters: [
      'What is the coziest café you have found in Vinohrady?',
      'Are you a filter coffee fan or an espresso purist?',
      'Do you work from cafés or use them strictly to escape screen time?'
    ]
  },
  {
    id: 'secret-jazz',
    title: 'Old Town Secret Cellar Jazz',
    description: 'Discover hidden live jazz tunes tucked away under Prague\'s historical cellars.',
    location: 'U Staré Paní',
    time: 'Sunday 20:00',
    duration: '120 minutes',
    spotsLeft: 5,
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=300&q=80',
    tag: '🎵 Live Session',
    category: '🎨 Culture',
    participants: [PARTICIPANTS.jakub, PARTICIPANTS.lukas],
    chatPartner: PARTICIPANTS.jakub,
    chatPartnerMessage: 'Hey! Glad you chose the secret cellar jazz night. 🎷 It is hidden deep under the Old Town cobblestones.',
    chatPartnerReply: 'Brilliant! I will grab a table near the stage. Look out for me in a green jacket. Cheers! 🍻',
    conversationStarters: [
      'Do you play any musical instruments or just love live music?',
      'What is the best underground bar or club you have visited in Prague?',
      'What is your go-to jazz style—classic swing or modern fusion?'
    ]
  }
];

export default function PhoneMockup({ 
  activeScreen = 'splash', 
  onScreenChange, 
  interactive = true 
}: PhoneMockupProps) {
  const [localScreen, setLocalScreen] = useState<ScreenState>(activeScreen as ScreenState);
  
  // Loading & State Simulators
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [hasJoined, setHasJoined] = useState(false);

  // Active Experience Data pointer
  const [activeExp, setActiveExp] = useState<Experience>(EXPERIENCES[0]);

  // Onboarding inputs
  const [intentions, setIntentions] = useState<string[]>([]);
  const [vibes, setVibes] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string>('');
  const [profileName, setProfileName] = useState('Klara');
  const [profileAge, setProfileAge] = useState('26');
  const [profileIntro, setProfileIntro] = useState('Weekend explorer. Coffee addict. Always looking for hidden places.');

  // Detail screen confirmation sheet
  const [showJoinSheet, setShowJoinSheet] = useState(false);

  // Chat message logs mapping to active partner
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [typedMessage, setTypedMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Feedback inputs
  const [rating, setRating] = useState('');
  const [nextAdventure, setNextAdventure] = useState<boolean | null>(null);

  useEffect(() => {
    setLocalScreen(activeScreen as ScreenState);
  }, [activeScreen]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  // Sync initial chat messages when active experience changes
  useEffect(() => {
    setChatMessages([
      {
        id: 'init-msg',
        sender: 'partner',
        text: activeExp.chatPartnerMessage,
        time: '8:44 PM'
      }
    ]);
  }, [activeExp]);

  const triggerTransition = (target: ScreenState, message: string, delay: number) => {
    setLoading(true);
    setLoadingMessage(message);
    setTimeout(() => {
      setLoading(false);
      setLocalScreen(target);
      if (onScreenChange) onScreenChange(target);
    }, delay);
  };

  const handleScreenChange = (id: ScreenState) => {
    if (id === 'discover' && localScreen === 'onboarding_ready') {
      triggerTransition('discover', 'Curating your Prague vibe feed...', 1200);
    } else {
      setLocalScreen(id);
      if (onScreenChange) onScreenChange(id);
    }
  };

  const toggleIntention = (val: string) => {
    if (intentions.includes(val)) {
      setIntentions(intentions.filter(i => i !== val));
    } else {
      setIntentions([...intentions, val]);
    }
  };

  const toggleVibe = (val: string) => {
    if (vibes.includes(val)) {
      setVibes(vibes.filter(v => v !== val));
    } else {
      setVibes([...vibes, val]);
    }
  };

  const handleJoinSelection = () => {
    setShowJoinSheet(false);
    triggerTransition('connection', 'Connecting you with other participants...', 1100);
    setHasJoined(true);
  };

  const handleSendMessage = () => {
    if (!typedMessage.trim()) return;
    
    const newMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'you',
      text: typedMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, newMsg]);
    setTypedMessage('');
    setIsTyping(true);

    // Simulate reply from the specific experience's partner
    setTimeout(() => {
      setIsTyping(false);
      const replyMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'partner',
        text: activeExp.chatPartnerReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, replyMsg]);
    }, 1500);
  };

  return (
    <div 
      id="beyond-hello-phone-mockup"
      className="relative mx-auto w-[320px] h-[640px] md:w-[340px] md:h-[680px] bg-brand-dark rounded-[50px] p-3.5 shadow-2xl border-4 border-neutral-800 ring-12 ring-neutral-900/10 flex flex-col overflow-hidden"
    >
      {/* Speaker and Notch Area */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-brand-dark rounded-b-2xl z-50 flex items-center justify-center">
        <div className="w-16 h-1 bg-neutral-800 rounded-full mb-2"></div>
        <div className="absolute w-3 h-3 bg-neutral-950 rounded-full top-1 right-8"></div>
      </div>

      {/* Side buttons */}
      <div className="absolute -left-1.5 top-24 w-1 h-12 bg-neutral-800 rounded-r-md"></div>
      <div className="absolute -left-1.5 top-40 w-1 h-16 bg-neutral-800 rounded-r-md"></div>
      <div className="absolute -right-1.5 top-32 w-1 h-16 bg-neutral-800 rounded-l-md"></div>

      {/* Internal Phone Screen Container */}
      <div className="w-full h-full bg-[#080A10] rounded-[38px] overflow-hidden relative flex flex-col text-neutral-200 select-none font-sans">
        
        {/* Top Status Bar */}
        <div className="h-10 pt-3 px-6 flex justify-between items-center text-[11px] font-semibold text-neutral-400 z-40 bg-[#080A10]/95 backdrop-blur-md">
          <span>19:05</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-brand-orange bg-brand-orange/10 px-1.5 py-0.2 rounded font-bold">PRG</span>
            <span>5G</span>
            <div className="w-5 h-2.5 border border-neutral-600 rounded-sm p-0.5 flex items-center">
              <div className="h-full w-[80%] bg-brand-orange rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* LOADING LAYER OVERLAY */}
        <AnimatePresence>
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#080A10]/95 z-50 flex flex-col items-center justify-center gap-4 text-center px-6"
            >
              <RefreshCw className="w-8 h-8 text-brand-orange animate-spin" />
              <p className="text-xs font-bold text-neutral-200 mt-2">{loadingMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Screen Content Viewport */}
        <div className="flex-1 overflow-y-auto px-4 pb-16 pt-2 relative no-scrollbar flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {!loading && (
              <motion.div
                key={localScreen}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex-1 flex flex-col h-full justify-between"
              >
                {/* 1. SPLASH SCREEN */}
                {localScreen === 'splash' && (
                  <div className="flex-1 flex flex-col justify-between items-center py-6 text-center">
                    <div className="my-auto space-y-8 flex flex-col items-center">
                      <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center relative shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/20 to-brand-teal/20"></div>
                        <div className="w-10 h-16 bg-brand-orange/80 rounded-full rotate-[-15deg] absolute left-6 shadow-lg"></div>
                        <div className="w-10 h-16 bg-brand-yellow/80 rounded-full rotate-[15deg] absolute right-6 shadow-lg"></div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-3xl font-black tracking-tight text-white font-display">Beyond Hello</h3>
                        <p className="text-sm text-neutral-400 font-medium">Meet people through experiences</p>
                      </div>
                    </div>

                    <div className="w-full space-y-3">
                      <button 
                        onClick={() => handleScreenChange('onboarding_welcome')}
                        className="w-full bg-brand-orange hover:bg-brand-orange/95 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg hover:shadow-brand-orange/20 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Get Started <ArrowRight className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleScreenChange('discover')}
                        className="w-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 text-xs font-semibold py-3 rounded-2xl transition-colors cursor-pointer border border-neutral-800"
                      >
                        Already have an account? Log in
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. ONBOARDING WELCOME */}
                {localScreen === 'onboarding_welcome' && (
                  <div className="flex-1 flex flex-col justify-between py-6 text-center">
                    <div className="my-auto space-y-6 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-brand-orange" />
                      </div>
                      <h3 className="text-2xl font-black text-white leading-tight font-display">Dating should feel{"\n"}exciting again.</h3>
                      <p className="text-sm text-neutral-400 leading-relaxed max-w-[240px]">
                        Meet people through experiences, not endless chats.
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => handleScreenChange('onboarding_intentions')}
                      className="w-full bg-brand-orange hover:bg-brand-orange/95 text-white font-bold py-3.5 rounded-2xl transition-colors cursor-pointer"
                    >
                      Continue
                    </button>
                  </div>
                )}

                {/* 3. ONBOARDING INTENTIONS */}
                {localScreen === 'onboarding_intentions' && (
                  <div className="flex-1 flex flex-col justify-between py-6">
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider">Step 2 of 7</span>
                      <h4 className="text-lg font-bold text-white">What are you looking for?</h4>
                      <p className="text-xs text-neutral-400">Select one or multiple options</p>

                      <div className="space-y-2.5 pt-2">
                        {[
                          '❤️ A meaningful relationship',
                          '✨ New experiences',
                          '🌍 Meeting interesting people',
                          '🏙 Exploring Prague'
                        ].map(opt => {
                          const isSelected = intentions.includes(opt);
                          return (
                            <button
                              key={opt}
                              onClick={() => toggleIntention(opt)}
                              className={`w-full text-left px-4 py-3 rounded-2xl border text-xs font-semibold transition-all flex justify-between items-center ${isSelected ? 'border-brand-orange bg-brand-orange/5 text-white' : 'border-neutral-850 bg-white/3 hover:bg-white/5 text-neutral-300'}`}
                            >
                              <span>{opt}</span>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-brand-orange" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button 
                      disabled={intentions.length === 0}
                      onClick={() => handleScreenChange('onboarding_vibes')}
                      className={`w-full font-bold py-3.5 rounded-2xl transition-all ${intentions.length > 0 ? 'bg-brand-orange text-white cursor-pointer' : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'}`}
                    >
                      Continue
                    </button>
                  </div>
                )}

                {/* 4. ONBOARDING VIBES */}
                {localScreen === 'onboarding_vibes' && (
                  <div className="flex-1 flex flex-col justify-between py-6">
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider">Step 3 of 7</span>
                      <h4 className="text-lg font-bold text-white">What kind of experiences do you enjoy?</h4>
                      <p className="text-xs text-neutral-400">Select all that describe your vibe</p>

                      <div className="grid grid-cols-2 gap-2.5 pt-2">
                        {[
                          '☕ Coffee & conversations',
                          '🍷 Food & drinks',
                          '🎨 Culture & creativity',
                          '🌳 Outdoor adventures',
                          '🎵 Music & events',
                          '🎲 Games & fun'
                        ].map(v => {
                          const isSelected = vibes.includes(v);
                          return (
                            <button
                              key={v}
                              onClick={() => toggleVibe(v)}
                              className={`px-3 py-4 rounded-2xl border text-[11px] font-semibold transition-all text-center flex flex-col justify-center items-center gap-1 ${isSelected ? 'border-brand-orange bg-brand-orange/5 text-white' : 'border-neutral-850 bg-white/3 hover:bg-white/5 text-neutral-400'}`}
                            >
                              <span>{v}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button 
                      disabled={vibes.length === 0}
                      onClick={() => handleScreenChange('onboarding_experience')}
                      className={`w-full font-bold py-3.5 rounded-2xl transition-all ${vibes.length > 0 ? 'bg-brand-orange text-white cursor-pointer' : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'}`}
                  >
                    Continue
                  </button>
                </div>
              )}

              {/* 5. ONBOARDING EXPERIENCE */}
              {localScreen === 'onboarding_experience' && (
                <div className="flex-1 flex flex-col justify-between py-6">
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider">Step 4 of 7</span>
                    <h4 className="text-lg font-bold text-white">Your perfect first meet-up looks like...</h4>

                    <div className="grid grid-cols-2 gap-2.5 pt-2">
                      {[
                        'Coffee discovery',
                        'Hidden Prague walk',
                        'Dinner adventure',
                        'Cocktail experience',
                        'Active challenge',
                        'Creative activity'
                      ].map(item => {
                        const isSelected = selectedExperience === item;
                        return (
                          <button
                            key={item}
                            onClick={() => setSelectedExperience(item)}
                            className={`px-3 py-4 aspect-[1.2] rounded-2xl border text-xs font-bold transition-all text-center flex flex-col justify-center items-center ${isSelected ? 'border-brand-orange bg-brand-orange/5 text-white shadow-lg shadow-brand-orange/10' : 'border-neutral-850 bg-white/3 hover:bg-white/5 text-neutral-400'}`}
                          >
                            <span>{item}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button 
                    disabled={!selectedExperience}
                    onClick={() => handleScreenChange('onboarding_profile')}
                    className={`w-full font-bold py-3.5 rounded-2xl transition-all ${selectedExperience ? 'bg-brand-orange text-white cursor-pointer' : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'}`}
                  >
                    Continue
                  </button>
                </div>
              )}

              {/* 6. ONBOARDING PROFILE */}
              {localScreen === 'onboarding_profile' && (
                <div className="flex-1 flex flex-col justify-between py-4">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider">Step 5 of 7</span>
                    <h4 className="text-lg font-bold text-white">Create your profile</h4>

                    <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-2 text-neutral-400">
                      <Camera className="w-6 h-6" />
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">First Name</label>
                        <input 
                          type="text" 
                          value={profileName} 
                          onChange={(e) => setProfileName(e.target.value)}
                          className="w-full bg-white/3 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-orange"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">Age</label>
                        <input 
                          type="text" 
                          value={profileAge} 
                          onChange={(e) => setProfileAge(e.target.value)}
                          className="w-full bg-white/3 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-orange"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">Short Intro</label>
                        <textarea 
                          rows={2}
                          value={profileIntro} 
                          onChange={(e) => setProfileIntro(e.target.value)}
                          className="w-full bg-white/3 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-orange"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    disabled={!profileName || !profileAge}
                    onClick={() => handleScreenChange('onboarding_location')}
                    className="w-full bg-brand-orange text-white font-bold py-3 rounded-xl transition-colors cursor-pointer mt-4"
                  >
                    Continue
                  </button>
                </div>
              )}

              {/* 7. ONBOARDING LOCATION */}
              {localScreen === 'onboarding_location' && (
                <div className="flex-1 flex flex-col justify-between py-6 text-center">
                  <div className="my-auto space-y-6 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-brand-teal/15 border border-brand-teal/30 flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-brand-teal" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-xl font-black text-white">📍 Prague</h4>
                      <p className="text-xs text-neutral-400 max-w-[200px] mx-auto">
                        Beyond Hello launches first in Prague.
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleScreenChange('onboarding_ready')}
                    className="w-full bg-brand-orange text-white font-bold py-3.5 rounded-2xl transition-colors cursor-pointer"
                  >
                    Continue
                  </button>
                </div>
              )}

              {/* 8. ONBOARDING READY */}
              {localScreen === 'onboarding_ready' && (
                <div className="flex-1 flex flex-col justify-between py-6 text-center">
                  <div className="my-auto space-y-6 flex flex-col items-center">
                    <div className="text-4xl">✨</div>
                    <h3 className="text-2xl font-black text-white leading-tight font-display">Your Prague adventure{"\n"}starts here ✨</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed max-w-[220px]">
                      Welcome to the community! Discover Prague and connect with real people.
                    </p>
                  </div>

                  <button 
                    onClick={() => handleScreenChange('discover')}
                    className="w-full bg-brand-teal text-white font-bold py-3.5 rounded-2xl transition-colors cursor-pointer"
                  >
                    Discover Experiences
                  </button>
                </div>
              )}

              {/* 9. DISCOVER SCREEN */}
              {localScreen === 'discover' && (
                <div className="flex-1 flex flex-col py-1 text-left">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div>
                      <span className="text-[11px] font-bold text-neutral-400">Good evening 👋</span>
                      <h4 className="text-sm font-black text-white mt-0.5">📍 Prague</h4>
                    </div>
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" 
                        alt="Avatar" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <h5 className="text-sm font-black text-white leading-tight mb-3">What would you like to experience?</h5>

                  {/* Scrolling Feed of multiple realistic experiences */}
                  <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-0.5 no-scrollbar">
                    {EXPERIENCES.map(exp => (
                      <div 
                        key={exp.id} 
                        onClick={() => { setActiveExp(exp); handleScreenChange('detail'); }}
                        className="bg-white/4 border border-white/8 hover:border-brand-orange/40 rounded-3xl p-3 flex flex-col gap-2 relative overflow-hidden transition-all cursor-pointer"
                      >
                        <div className="w-full h-24 rounded-2xl overflow-hidden relative">
                          <img 
                            src={exp.image} 
                            alt={exp.title} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent"></div>
                          <span className="absolute top-2 left-2 bg-black/70 text-[8px] font-bold text-[#FFB853] px-2 py-0.5 rounded border border-white/5">{exp.tag}</span>
                        </div>

                        <div>
                          <h6 className="text-xs font-bold text-white flex items-center justify-between">
                            <span>{exp.title}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                          </h6>
                          <p className="text-[9.5px] text-neutral-400 mt-0.5">{exp.description}</p>
                          
                          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 mt-2.5 text-[8.5px] text-neutral-300 font-semibold border-t border-white/5 pt-2">
                            <div>📍 {exp.location}</div>
                            <div>🕒 {exp.time}</div>
                            <div>⏱️ {exp.duration}</div>
                            <div>👥 {exp.spotsLeft} spots left</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Categories */}
                  <div className="mt-3.5">
                    <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Experience Categories</p>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                      {['☕ Coffee', '🍷 Food & Drinks', '🎨 Culture', '🌳 Outdoors', '🎵 Music', '🎲 Games'].map((c, i) => (
                        <span 
                          key={c} 
                          className="text-[9px] font-bold px-2.5 py-1.5 rounded-full flex-shrink-0 border border-neutral-850 bg-white/2 text-neutral-400"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 10. EXPERIENCE DETAIL SCREEN */}
              {localScreen === 'detail' && (
                <div className="flex-1 flex flex-col py-1 text-left relative h-full justify-between">
                  <div className="overflow-y-auto no-scrollbar max-h-[380px] space-y-4">
                    {/* Immersive Photo Header */}
                    <div className="w-full h-28 rounded-2xl overflow-hidden relative">
                      <img 
                        src={activeExp.image} 
                        alt={activeExp.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent"></div>
                      <button 
                        onClick={() => handleScreenChange('discover')}
                        className="absolute top-2 left-2 bg-black/60 text-[9px] font-bold text-neutral-300 px-2 py-0.5 rounded"
                      >
                        ← Back
                      </button>
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-white">{activeExp.title} ✨</h4>
                      <p className="text-[11px] text-neutral-400 mt-1">{activeExp.description}</p>
                    </div>

                    {/* Details Cards */}
                    <div className="grid grid-cols-2 gap-2 text-left">
                      {[
                        { label: 'Location', val: activeExp.location },
                        { label: 'Time', val: activeExp.time },
                        { label: 'Duration', val: activeExp.duration },
                        { label: 'Participants', val: `${activeExp.participants.length + 5} people joining` }
                      ].map(d => (
                        <div key={d.label} className="bg-white/3 border border-white/5 rounded-xl p-2.5">
                          <span className="text-[8px] font-bold text-neutral-500 uppercase block">{d.label}</span>
                          <span className="text-xs font-bold text-white mt-0.5 block">{d.val}</span>
                        </div>
                      ))}
                    </div>

                    {/* Timeline: What Happens */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <h5 className="text-[10px] font-bold text-white uppercase tracking-wider">What happens?</h5>
                      <div className="space-y-3 pl-1 pt-1">
                        {[
                          { step: '1', title: 'Meet', desc: `Gather at ${activeExp.location} entrance.` },
                          { step: '2', title: 'Explore & Puzzle', desc: 'Unblock interactive tasks with your group.' },
                          { step: '3', title: 'Conversation prompt', desc: 'Low-pressure prompts to trigger sharing.' },
                          { step: '4', title: 'Continue', desc: 'Sunset drinks or coffee.' }
                        ].map((t) => (
                          <div key={t.step} className="flex gap-3 items-start">
                            <span className="w-5 h-5 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-[10px] font-bold text-brand-orange shrink-0">{t.step}</span>
                            <div>
                              <p className="text-[11px] font-bold text-neutral-200">{t.title}</p>
                              <p className="text-[9.5px] text-neutral-500 mt-0.5">{t.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* People Joining */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <h5 className="text-[10px] font-bold text-white uppercase tracking-wider">People joining</h5>
                      <div className="space-y-2">
                        {activeExp.participants.map(p => (
                          <div key={p.id} className="bg-white/2 border border-white/5 rounded-xl p-2 flex items-center gap-3">
                            <img src={p.photo} alt={p.name} className="w-8 h-8 rounded-full object-cover" />
                            <div>
                              <p className="text-xs font-bold text-white">{p.name}, {p.age}</p>
                              <p className="text-[9px] text-neutral-500 mt-0.5">Vibes: {p.interest}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleOpenConfirm}
                    className="w-full bg-brand-orange hover:bg-brand-orange/95 text-white font-bold py-3 rounded-xl transition-colors cursor-pointer mt-4"
                  >
                    Join Experience
                  </button>

                  {/* Confirmation Modal Sheet simulation */}
                  <AnimatePresence>
                    {showJoinSheet && (
                      <motion.div 
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 200, opacity: 0 }}
                        className="absolute bottom-[-10px] left-[-16px] right-[-16px] bg-[#12131C] border-t border-white/10 rounded-t-3xl p-5 z-50 text-center shadow-2xl flex flex-col gap-3"
                      >
                        <div className="w-10 h-1 bg-white/15 rounded-full mx-auto mb-2"></div>
                        <h5 className="text-sm font-black text-white leading-tight">You're joining{"\n"}{activeExp.title} ✨</h5>
                        <p className="text-[10px] text-neutral-400">Choose how you would like to participate.</p>
                        
                        <div className="flex flex-col gap-2 pt-1">
                          <button 
                            onClick={handleJoinSelection}
                            className="w-full bg-brand-orange text-white text-xs font-bold py-2.5 rounded-xl cursor-pointer"
                          >
                            Join solo
                          </button>
                          <button 
                            onClick={handleJoinSelection}
                            className="w-full bg-white/5 border border-white/10 text-white text-xs font-semibold py-2.5 rounded-xl cursor-pointer"
                          >
                            Invite someone
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* 11. CONNECTION CREATED SCREEN */}
              {localScreen === 'connection' && (
                <div className="flex-1 flex flex-col justify-between py-6 text-center">
                  <div className="my-auto space-y-8 flex flex-col items-center">
                    <span className="text-[10px] font-black tracking-widest text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-full uppercase">Connection Sparked</span>
                    
                    <h4 className="text-lg font-black text-white leading-tight font-display">Beyond Hello Connection ✨</h4>
                    
                    {/* Intertwined Avatars */}
                    <div className="flex items-center justify-center -space-x-4">
                      <div className="w-16 h-16 rounded-full border-4 border-[#080A10] overflow-hidden shadow-xl">
                        <img src={activeExp.chatPartner.photo} alt={activeExp.chatPartner.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-brand-orange border-2 border-[#080A10] flex items-center justify-center text-xs font-bold text-white z-10">✨</div>
                      <div className="w-16 h-16 rounded-full border-4 border-[#080A10] bg-neutral-800 flex items-center justify-center text-xs text-neutral-400 font-bold shadow-xl">
                        You
                      </div>
                    </div>

                    <p className="text-xs text-neutral-400 px-4 leading-relaxed">
                      You both connected around <span className="font-bold text-white">{activeExp.title}</span>.
                    </p>
                  </div>

                  <button 
                    onClick={() => handleScreenChange('chat')}
                    className="w-full bg-brand-teal text-white font-bold py-3.5 rounded-2xl transition-colors cursor-pointer"
                  >
                    Open Chat
                  </button>
                </div>
              )}

              {/* 12. CHAT SCREEN */}
              {localScreen === 'chat' && (
                <div className="flex-1 flex flex-col justify-between text-left h-full">
                  {/* Top Header info banner */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-2">
                    <div className="flex items-center gap-2">
                      <img src={activeExp.chatPartner.photo} alt={activeExp.chatPartner.name} className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <h5 className="text-xs font-bold text-white">{activeExp.chatPartner.name}</h5>
                        <p className="text-[8px] text-brand-teal font-semibold">Joined walk • active</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleScreenChange('feedback')}
                      className="bg-brand-orange/20 text-brand-orange text-[9px] font-bold px-2 py-1 rounded"
                    >
                      Feedback Loop
                    </button>
                  </div>

                  {/* Conversational starter cue */}
                  <div className="bg-brand-orange/5 border border-brand-orange/15 rounded-xl p-2 mb-2 text-[8px] text-brand-orange font-semibold flex items-center gap-1.5 animate-pulse">
                    <span>💡 Starter: "{activeExp.conversationStarters[0]}"</span>
                  </div>

                  {/* Scrollable messages area */}
                  <div 
                    ref={chatScrollRef}
                    className="flex-1 overflow-y-auto no-scrollbar space-y-3 pr-1 py-1.5 max-h-[220px]"
                  >
                    {chatMessages.map(m => (
                      <div 
                        key={m.id}
                        className={`max-w-[80%] p-2.5 rounded-2xl text-[11px] ${m.sender === 'you' ? 'bg-brand-teal text-white self-end ml-auto rounded-tr-none' : 'bg-white/4 border border-white/5 text-neutral-200 self-start mr-auto rounded-tl-none'}`}
                      >
                        <p className="leading-relaxed">{m.text}</p>
                        <span className="text-[8px] text-neutral-500 block text-right mt-1">{m.time}</span>
                      </div>
                    ))}
                    
                    {/* Realistic Typing Indicator */}
                    {isTyping && (
                      <div className="bg-white/3 border border-white/5 p-2 rounded-2xl rounded-tl-none max-w-[50px] self-start mr-auto flex gap-1 items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    )}
                  </div>

                  {/* Bottom input area */}
                  <div className="flex items-center gap-2 border-t border-white/5 pt-2.5">
                    <input 
                      type="text" 
                      placeholder="Type a message..." 
                      value={typedMessage}
                      onChange={(e) => setTypedMessage(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                      className="flex-1 bg-white/3 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                    <button 
                      onClick={handleSendMessage}
                      className="bg-brand-teal text-white text-xs font-bold px-3 py-2 rounded-xl"
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}

              {/* 13. FEEDBACK SCREEN */}
              {localScreen === 'feedback' && (
                <div className="flex-1 flex flex-col justify-between py-6">
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Post Experience</span>
                    <h4 className="text-lg font-bold text-white">How was your experience?</h4>
                    <p className="text-xs text-neutral-400">We hope you enjoyed the walk!</p>

                    <div className="space-y-2 pt-2">
                      {['Great', 'Good', 'Not for me'].map(r => {
                        const isSelected = rating === r;
                        return (
                          <button
                            key={r}
                            onClick={() => setRating(r)}
                            className={`w-full text-center py-3 rounded-xl border text-xs font-bold transition-all ${isSelected ? 'border-brand-orange bg-brand-orange/5 text-white' : 'border-neutral-850 bg-white/2 hover:bg-white/4 text-neutral-300'}`}
                          >
                            {r}
                          </button>
                        );
                      })}
                    </div>

                    {rating !== '' && (
                      <div className="pt-4 border-t border-white/5 space-y-2">
                        <p className="text-xs font-semibold text-white text-center">Would you like another experience together?</p>
                        <div className="flex justify-center gap-3">
                          <button 
                            onClick={() => setNextAdventure(true)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold border ${nextAdventure === true ? 'border-brand-orange bg-brand-orange/10 text-white' : 'border-neutral-800 bg-white/2 text-neutral-400'}`}
                          >
                            Yes
                          </button>
                          <button 
                            onClick={() => setNextAdventure(false)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold border ${nextAdventure === false ? 'border-brand-orange bg-brand-orange/10 text-white' : 'border-neutral-800 bg-white/2 text-neutral-400'}`}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <button 
                    disabled={rating === '' || nextAdventure === null}
                    onClick={() => {
                      setRating('');
                      setNextAdventure(null);
                      setHasJoined(false);
                      handleScreenChange('discover');
                    }}
                    className={`w-full font-bold py-3.5 rounded-2xl transition-all ${(rating !== '' && nextAdventure !== null) ? 'bg-brand-teal text-white cursor-pointer' : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'}`}
                  >
                    Submit Feedback
                  </button>
                </div>
              )}

            </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Interactive Navigation Tab bar */}
        {['discover', 'detail', 'connection', 'chat', 'feedback'].includes(localScreen) && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#0E0E12]/95 border-t border-neutral-850 flex justify-around items-center px-4 pb-2 z-40 backdrop-blur-md">
            
            {/* Discover Tab */}
            <button 
              onClick={() => handleScreenChange('discover')} 
              className={`flex flex-col items-center justify-center gap-0.5 transition-all ${localScreen === 'discover' || localScreen === 'detail' ? 'text-brand-orange scale-105' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              <CompassIcon className="w-4 h-4" />
              <span className="text-[9px] font-medium">Discover</span>
            </button>

            {/* Connections Tab with Realistic Empty State support */}
            <button 
              onClick={() => {
                if (hasJoined) {
                  handleScreenChange('connection');
                } else {
                  alert("📍 No Connections Yet\n\nJoin an experience first! Once you choose an experience and express interest, vibe-matched Prague partners will appear here.");
                }
              }} 
              className={`flex flex-col items-center justify-center gap-0.5 transition-all ${localScreen === 'connection' ? 'text-brand-orange scale-105' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              <Zap className="w-4 h-4" />
              <span className="text-[9px] font-medium">Connections</span>
            </button>

            {/* Messages Tab with Realistic Empty State support */}
            <button 
              onClick={() => {
                if (hasJoined) {
                  handleScreenChange('chat');
                } else {
                  alert("💬 Quiet Inbox\n\nYour message threads will unlock here once a Prague connection is established around a shared experience.");
                }
              }} 
              className={`flex flex-col items-center justify-center gap-0.5 transition-all ${localScreen === 'chat' ? 'text-brand-orange scale-105' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-[9px] font-medium">Messages</span>
            </button>

            {/* Profile Tab */}
            <button 
              onClick={() => {
                alert(`👤 Profile details:\n\nName: ${profileName}\nAge: ${profileAge}\nIntro: "${profileIntro}"\n\nRegistered to the Prague Waitlist!`);
              }} 
              className="flex flex-col items-center justify-center gap-0.5 text-neutral-500 hover:text-neutral-300 transition-all"
            >
              <User className="w-4 h-4" />
              <span className="text-[9px] font-medium">Profile</span>
            </button>
          </div>
        )}

        {/* Floating helper tooltip */}
        {interactive && (
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-black/85 text-[8px] text-neutral-400 font-bold px-2.5 py-0.5 rounded-full border border-neutral-800 flex items-center gap-1 opacity-80 pointer-events-none z-50">
            <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse"></span>
            <span>DEMO VERSION • FOLLOW THE NATURAL STEPS</span>
          </div>
        )}
      </div>
    </div>
  );

  function handleOpenConfirm() {
    setShowJoinSheet(true);
  }
}
