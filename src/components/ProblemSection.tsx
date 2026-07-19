import { motion } from 'motion/react';
import { 
  X, Check, AlertCircle, Sparkles, Sliders, Frown, Smile, 
  MessageSquareOff, ShieldAlert, Heart, CalendarRange
} from 'lucide-react';

export default function ProblemSection() {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-rose-500/10 text-rose-500 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-rose-500/20">
          The Reality Check
        </span>
        <h3 className="text-3xl md:text-5xl font-black font-display tracking-tight text-neutral-900 leading-none">
          Dating apps created more matches. <br />
          <span className="text-brand-orange">Not more connections.</span>
        </h3>
        <p className="text-sm md:text-base text-neutral-500">
          We’ve spent a decade swiping left and right, only to end up with lists of silent conversations and forgettable coffee interviews. It’s time for something human.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Side: The Fatigue (Old way) */}
        <div className="bg-white/40 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border border-white/60 flex flex-col justify-between space-y-8 relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">TRADITIONAL SWIPING APPS</span>
              <Frown className="w-5 h-5 text-neutral-400" />
            </div>

            {/* Simulated boring conversation chat */}
            <div className="space-y-2.5 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-sm text-xs">
              <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-bold mb-1">
                <MessageSquareOff className="w-3.5 h-3.5" /> Typical Boring Conversation
              </div>
              <div className="bg-neutral-100/85 text-neutral-600 rounded-2xl rounded-tl-sm p-2.5 max-w-[80%] self-start">
                "Hey! How is your Sunday going? :)"
              </div>
              <div className="bg-[#E4E2DD]/85 text-neutral-500 rounded-2xl rounded-tr-sm p-2.5 max-w-[80%] ml-auto text-right">
                "Hey fine, just watching Netflix, u?"
              </div>
              <div className="bg-neutral-100/85 text-neutral-600 rounded-2xl rounded-tl-sm p-2.5 max-w-[80%] self-start">
                "Same. nm... how long have u lived in Prague?"
              </div>
              <div className="text-center text-[10px] text-neutral-400 italic pt-1.5">
                (Read 3 days ago • Chat faded away)
              </div>
            </div>

            {/* Main problems bullets */}
            <div className="space-y-4">
              <div className="flex gap-3.5 items-start">
                <div className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 border border-rose-500/20">
                  <X className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-neutral-800">Endless, exhausting swiping</h5>
                  <p className="text-xs text-neutral-500 mt-0.5">Judging human souls in 0.5 seconds based on curated, edited photos and generic captions.</p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 border border-rose-500/20">
                  <X className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-neutral-800">Endless small talk & ghosts</h5>
                  <p className="text-xs text-neutral-500 mt-0.5">Dozens of "Hey, how are you?" openers that lead to exhausting virtual small talk and dry ghosting.</p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 border border-rose-500/20">
                  <X className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-neutral-800">Forgettable, awkward first dates</h5>
                  <p className="text-xs text-neutral-500 mt-0.5">Meeting up like a formal job interview in a noisy cafe, asking the exact same questions over again.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-200/30 p-3 rounded-2xl text-center text-xs text-neutral-500 font-semibold border border-neutral-200/20">
            😞 Feels like a repetitive chore instead of an adventure.
          </div>
        </div>

        {/* Right Side: The Adventure (Beyond Hello way) */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border-2 border-brand-orange/40 flex flex-col justify-between space-y-8 relative overflow-hidden group shadow-xl shadow-brand-orange/5">
          {/* Subtle background glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-orange/10 rounded-full blur-2xl"></div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-brand-orange uppercase tracking-widest">BEYOND HELLO PLATFORM</span>
              <div className="flex items-center gap-1 bg-brand-orange/10 px-2 py-0.5 rounded-full border border-brand-orange/20 text-brand-orange text-[10px] font-bold">
                <Sparkles className="w-3 h-3 text-brand-orange" />
                <span>Next Gen Social</span>
              </div>
            </div>

            {/* Interactive styled experience conversation card */}
            <div className="space-y-2.5 bg-neutral-900/90 backdrop-blur-md text-white p-4 rounded-2xl border border-white/10 text-xs shadow-lg">
              <div className="flex items-center justify-between text-[10px] text-brand-yellow font-bold mb-1">
                <span className="flex items-center gap-1">🌟 Letná Sunset Picnic Hunt</span>
                <span className="bg-brand-orange text-white text-[8px] font-black px-1.5 py-0.2 rounded">LIVE CHALLENGE</span>
              </div>
              <div className="flex items-center gap-2 bg-[#231E1B] p-2 rounded-xl border border-neutral-800">
                <div className="w-7 h-7 rounded-full overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=50&q=80" alt="Avatar" referrerPolicy="no-referrer" loading="lazy" />
                </div>
                <div>
                  <p className="font-bold text-[11px] text-neutral-200">Klara shared a secret photo clue!</p>
                  <p className="text-[9px] text-brand-orange font-bold">"Solve the puzzle to unlock the picnic coordinates"</p>
                </div>
              </div>
              <div className="text-center text-[10px] text-brand-teal font-bold pt-1 flex items-center justify-center gap-1">
                <Smile className="w-3.5 h-3.5 text-brand-teal" /> You both solved the clue! Unlocking chat...
              </div>
            </div>

            {/* Main solution bullets */}
            <div className="space-y-4">
              <div className="flex gap-3.5 items-start">
                <div className="w-6 h-6 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0 border border-brand-teal/20">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-neutral-900">Real shared experiences</h5>
                  <p className="text-xs text-neutral-600 mt-0.5">Meet directly by signing up for exciting local quests, café hunts, photo contests, and outdoor puzzles in Prague.</p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="w-6 h-6 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0 border border-brand-teal/20">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-neutral-900">Better, instant conversations</h5>
                  <p className="text-xs text-neutral-600 mt-0.5">Skip "What's up?" Our built-in conversational challenge cards and shared task progress provide instant icebreakers.</p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="w-6 h-6 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0 border border-brand-teal/20">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-neutral-900">Memorable, playful moments</h5>
                  <p className="text-xs text-neutral-600 mt-0.5">Every connection starts with a story. Whether you solve the challenge together or laugh trying, you have a memory.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-orange/10 p-3 rounded-2xl text-center text-xs text-brand-orange font-bold border border-brand-orange/20">
            🤩 Making socializing an absolute, playful adventure!
          </div>
        </div>

      </div>
    </div>
  );
}
