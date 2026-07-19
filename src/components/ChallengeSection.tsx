import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, Camera, Compass, Sparkles, MessageCircle, 
  MapPin, HelpCircle, RefreshCw, Star, Clock, Heart, CheckCircle2 
} from 'lucide-react';
import { Challenge } from '../types';

export default function ChallengeSection() {
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>('coffee');
  const [conversationCardIdx, setConversationCardIdx] = useState<number>(0);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState<boolean>(false);
  const [votedAnswer, setVotedAnswer] = useState<string | null>(null);

  const challenges: Challenge[] = [
    {
      id: 'coffee',
      title: '☕ Coffee Quest',
      description: "Find Prague's most interesting hidden café together. Solve a visual riddle to locate the café, and decode a secret menu item.",
      tag: 'Cafe Explorer',
      difficulty: 'Easy',
      timeNeeded: '1.5 hours',
      participants: 1240,
      iconName: 'Coffee',
      colorClass: 'text-brand-orange border-brand-orange/30 bg-brand-orange/10',
      bgGradient: 'from-orange-500/10 via-amber-500/5 to-transparent',
      steps: [
        'Solve the photo clue depicting a vintage clockwork interior in Vinohrady',
        'Meet your experience partner at the street corner',
        'Find the bookshelf entrance to unlock the secret coffee blend together'
      ]
    },
    {
      id: 'explorer',
      title: '📸 City Explorer',
      description: "Complete a street photography riddles and viewpoint challenges around Letná Park or the quiet alleys of Malá Strana.",
      tag: 'Scavenger Hunt',
      difficulty: 'Medium',
      timeNeeded: '2 hours',
      participants: 940,
      iconName: 'Camera',
      colorClass: 'text-brand-yellow border-brand-yellow/30 bg-brand-yellow/10',
      bgGradient: 'from-amber-500/10 via-yellow-500/5 to-transparent',
      steps: [
        'Navigate using the in-app magnetic compass to a secret overlook',
        'Take a synchronized dual-selfie recreating a vintage 1920s Prague postcard',
        'Locate the stone gargoyle carved on the old wall to find the hidden code word'
      ]
    },
    {
      id: 'taste',
      title: '🍜 Taste Adventure',
      description: "Discover a secret culinary gem in Prague (from Vietnamese Pho back-alleys to traditional modern beer gardens) through blind menu voting.",
      tag: 'Foodie Collab',
      difficulty: 'Adventurous',
      timeNeeded: '2.5 hours',
      participants: 1510,
      iconName: 'Compass',
      colorClass: 'text-brand-teal border-brand-teal/30 bg-brand-teal/10',
      bgGradient: 'from-teal-500/10 via-emerald-500/5 to-transparent',
      steps: [
        'Cast blind votes on your favorite ingredients (sweet vs spicy, street vs dine)',
        'App routes both of you to a highly-rated, off-the-radar bistro in Karlín',
        'Complete the "Barista Interview" mini-game to unlock a complimentary dessert'
      ]
    },
    {
      id: 'conversation',
      title: '🎲 Conversation Challenge',
      description: "Skip the generic small talk. Draw curated question cards designed specifically to bypass boring dates and spark authentic, unforgettable talk.",
      tag: 'Icebreaker Game',
      difficulty: 'Easy',
      timeNeeded: '45 mins',
      participants: 2310,
      iconName: 'MessageCircle',
      colorClass: 'text-brand-purple border-brand-purple/30 bg-brand-purple/10',
      bgGradient: 'from-purple-500/10 via-violet-500/5 to-transparent',
      steps: [
        'Sit anywhere (café, park bench, Charles Bridge stairs)',
        'Take turns drawing the interactive digital game cards',
        'Earn bonus experience points (XP) for answering deep or hilarious prompts'
      ]
    }
  ];

  const icebreakerCards = [
    {
      prompt: "What is the single most beautiful hidden corner in Prague you have found completely by accident?",
      category: "Prague secrets",
      funFact: "Prague has over 200 registered palace gardens, many with free hidden doors!"
    },
    {
      prompt: "If you were banned from drinking coffee or Czech beer, what quirky beverage or ritual would you substitute it with?",
      category: "Vibe check",
      funFact: "Prague consumes more carbonated mineral water than almost any other European capital per capita!"
    },
    {
      prompt: "Describe your ideal Sunday in Prague using only 3 nouns and 1 verb.",
      category: "Creative sparks",
      funFact: "Letná beer garden is officially ranked among the top 10 scenic terraces globally!"
    },
    {
      prompt: "What is a weird expat habit or local Czech custom you have recently adopted and now completely defend?",
      category: "Human quirks",
      funFact: "Prague is home to expats from over 150 nations, forming 18% of the city population."
    }
  ];

  const currentIcebreaker = icebreakerCards[conversationCardIdx];

  const cycleIcebreaker = () => {
    setConversationCardIdx((prev) => (prev + 1) % icebreakerCards.length);
    setShowAnswerFeedback(false);
    setVotedAnswer(null);
  };

  const handleVote = (ans: string) => {
    setVotedAnswer(ans);
    setShowAnswerFeedback(true);
  };

  const activeChallenge = challenges.find(c => c.id === selectedChallengeId) || challenges[0];

  return (
    <div className="space-y-12">
      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {challenges.map((item) => {
          const isSelected = selectedChallengeId === item.id;
          return (
            <motion.div
              id={`challenge-card-${item.id}`}
              key={item.id}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedChallengeId(item.id)}
              className={`cursor-pointer rounded-[32px] p-6 border transition-all flex flex-col justify-between ${
                isSelected 
                  ? 'bg-neutral-900/95 backdrop-blur-md border border-brand-orange text-white shadow-xl shadow-brand-orange/20' 
                  : 'bg-white/40 backdrop-blur-xl border border-white/60 hover:border-brand-orange/40 text-neutral-800 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                {/* Icon & Category Tag */}
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                    isSelected ? 'bg-neutral-800 text-neutral-200' : 'bg-white/60 border border-white/40 text-neutral-500'
                  }`}>
                    {item.tag}
                  </span>
                  <div className={`p-2 rounded-xl border ${item.colorClass}`}>
                    {item.id === 'coffee' && <Coffee className="w-5 h-5" />}
                    {item.id === 'explorer' && <Camera className="w-5 h-5" />}
                    {item.id === 'taste' && <Compass className="w-5 h-5" />}
                    {item.id === 'conversation' && <MessageCircle className="w-5 h-5" />}
                  </div>
                </div>

                {/* Title & Description */}
                <h4 className="text-xl font-bold font-display mb-2">{item.title}</h4>
                <p className={`text-sm ${isSelected ? 'text-neutral-300' : 'text-neutral-500'} line-clamp-3 mb-6`}>
                  {item.description}
                </p>
              </div>

              {/* Bottom Specs */}
              <div className="flex items-center justify-between pt-4 border-t border-dashed border-neutral-200/40 mt-auto text-xs font-semibold">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 opacity-60" /> {item.timeNeeded}
                </span>
                <span className={`px-2 py-0.5 rounded-md ${
                  item.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-500' :
                  item.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-brand-orange/10 text-brand-orange'
                }`}>
                  {item.difficulty}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Detail Simulator */}
      <div 
        id="challenge-simulator-wrapper"
        className="bg-neutral-900/90 backdrop-blur-xl text-white rounded-[40px] p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left panel: Selected Quest Steps */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[11px] font-bold tracking-widest text-brand-orange uppercase flex items-center gap-1.5 mb-2">
                <Star className="w-3.5 h-3.5 fill-current text-brand-yellow" /> App Experience Simulator
              </span>
              <h3 className="text-3xl font-bold font-display text-neutral-50">
                How <span className="text-brand-orange">{activeChallenge.title}</span> plays out:
              </h3>
              <p className="text-neutral-300 mt-2 text-sm leading-relaxed max-w-xl">
                Unlike old chat apps, Beyond Hello coordinates real-world movement so meeting up is fluid, playful, and has zero interview pressure.
              </p>
            </div>

            {/* List of custom steps */}
            <div className="space-y-4">
              {activeChallenge.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start bg-neutral-800/40 p-4 rounded-2xl border border-neutral-800 hover:border-neutral-700/60 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-black flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm text-neutral-100">Step {idx + 1}</h5>
                    <p className="text-xs text-neutral-300 mt-0.5">{step}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated Live Match Stats */}
            <div className="flex gap-6 items-center bg-black/30 p-3.5 rounded-2xl border border-neutral-800/60 max-w-md">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border border-neutral-900 object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" referrerPolicy="no-referrer" loading="lazy" />
                <img className="w-8 h-8 rounded-full border border-neutral-900 object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" referrerPolicy="no-referrer" loading="lazy" />
                <img className="w-8 h-8 rounded-full border border-neutral-900 object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" referrerPolicy="no-referrer" loading="lazy" />
              </div>
              <p className="text-xs text-neutral-400 font-medium">
                <span className="text-brand-yellow font-bold">{activeChallenge.participants} singles</span> completed this challenge in Prague this week!
              </p>
            </div>
          </div>

          {/* Right panel: Live mini-game / interactive teaser */}
          <div className="lg:col-span-5">
            <div className="bg-[#191513] rounded-3xl p-5 border border-neutral-800 shadow-xl flex flex-col justify-between min-h-[360px] relative">
              
              {/* Header inside simulated device */}
              <div className="flex justify-between items-center pb-3 border-b border-neutral-800">
                <span className="text-[10px] font-bold text-neutral-400 tracking-wider">PREVIEW GAMEPLAY</span>
                <span className="text-[9px] font-bold text-brand-purple bg-brand-purple/20 px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-purple"></span> Icebreaker Mode
                </span>
              </div>

              {/* Dynamic Game Card Display */}
              <div className="py-6 flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={conversationCardIdx}
                    initial={{ scale: 0.95, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-[#241D1A] p-5 rounded-2xl border-2 border-brand-purple/40 relative shadow-inner text-center"
                  >
                    {/* Badge */}
                    <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-purple text-white text-[9px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full">
                      {currentIcebreaker.category}
                    </span>

                    <p className="text-sm font-semibold text-neutral-100 leading-relaxed pt-2">
                      "{currentIcebreaker.prompt}"
                    </p>

                    <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-center gap-1.5 text-[10px] text-neutral-400">
                      <HelpCircle className="w-3.5 h-3.5 text-brand-yellow" />
                      <span>{currentIcebreaker.funFact}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Interaction Buttons */}
              <div className="space-y-3.5 pt-4 border-t border-neutral-800">
                {!showAnswerFeedback ? (
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <button 
                      onClick={() => handleVote('funny')}
                      className="bg-[#241F1C] hover:bg-neutral-800 text-[10px] text-neutral-300 font-bold py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      🗣️ Let's Answer!
                    </button>
                    <button 
                      onClick={() => handleVote('deep')}
                      className="bg-[#241F1C] hover:bg-neutral-800 text-[10px] text-neutral-300 font-bold py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      🤩 Sounds Awesome
                    </button>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-brand-purple/10 border border-brand-purple/20 p-2.5 rounded-xl text-center text-xs text-brand-purple font-semibold"
                  >
                    🎉 That is exactly the Beyond Hello spirit! Real answers trigger local points.
                  </motion.div>
                )}

                <button 
                  onClick={cycleIcebreaker}
                  className="w-full bg-brand-orange hover:bg-brand-orange/95 text-white text-[11px] font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer shadow-brand-orange/10"
                >
                  <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" /> Draw Another Icebreaker Card
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
