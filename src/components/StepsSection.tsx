import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  UserPlus, Compass, UserCheck, Heart, Sparkles, 
  ChevronRight, Smile, MapPin, MessageCircle, Star 
} from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import { AppScreenId, StepJourney } from '../types';

export default function StepsSection() {
  const [activeStep, setActiveStep] = useState<number>(1);

  // Define our 4 steps mapped to phone mockup screen states
  const steps: StepJourney[] = [
    {
      number: 1,
      title: "Create your profile",
      description: "Introduce your true personality. Swap standard resumes for quirky answers, favorite local spots, and preferred adventure styles.",
      screenId: "profile",
      accentText: "Your digital space"
    },
    {
      number: 2,
      title: "Discover challenges and experiences",
      description: "Browse curated local mini-quests. Choose from coffee hunts in Prague 2, street photo riddles, or culinary bento boxes in Karlín.",
      screenId: "explore",
      accentText: "Dozens of quests weekly"
    },
    {
      number: 3,
      title: "Meet interesting singles in Prague",
      description: "No endless chatting. Match with a compatible partner who signed up for the same challenge. Confirm your quest and head out!",
      screenId: "invite",
      accentText: "Skip the awkward interview"
    },
    {
      number: 4,
      title: "Build real connections",
      description: "Solve riddles, find hidden cafés, and laugh together. By the time the challenge is complete, you already have an authentic memory together.",
      screenId: "match",
      accentText: "Unleash instant chemistry"
    }
  ];

  // Auto-cycle steps every 8 seconds for a lively preview, unless user overrides by clicking
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 4) + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleStepClick = (stepNum: number) => {
    setActiveStep(stepNum);
  };

  const currentStepData = steps[activeStep - 1];

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-brand-purple/20">
          The Journey
        </span>
        <h3 className="text-3xl md:text-5xl font-black font-display tracking-tight text-neutral-900 leading-none">
          Meeting people should be <br className="hidden md:block" />
          <span className="text-brand-purple">an adventure.</span>
        </h3>
        <p className="text-sm md:text-base text-neutral-500">
          Four simple steps that turn dating from an exhausting screen task into an organic, fun, real-world connection journey in Prague.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left 7 Columns: Step cards list */}
        <div className="lg:col-span-7 space-y-4">
          {steps.map((step) => {
            const isActive = activeStep === step.number;
            return (
              <div
                id={`step-milestone-card-${step.number}`}
                key={step.number}
                onClick={() => handleStepClick(step.number)}
                className={`text-left p-5 md:p-6 rounded-[32px] border cursor-pointer transition-all flex gap-4 md:gap-5 items-start relative overflow-hidden ${
                  isActive 
                    ? 'bg-neutral-900/95 backdrop-blur-md border-brand-purple text-white shadow-xl shadow-brand-purple/15' 
                    : 'bg-white/40 backdrop-blur-xl border border-white/60 hover:border-brand-purple/30 text-neutral-800 shadow-sm'
                }`}
              >
                {/* Active progress indicator line inside left margin */}
                {isActive && (
                  <motion.div 
                    layoutId="activeStepIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-purple"
                  />
                )}

                {/* Step Circle Badge */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-display shrink-0 text-sm border-2 ${
                  isActive 
                    ? 'bg-brand-purple text-white border-brand-purple' 
                    : 'bg-neutral-100 text-neutral-400 border-neutral-200'
                }`}>
                  {step.number}
                </div>

                {/* Step Content */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-lg font-bold tracking-tight font-display">
                      {step.title}
                    </h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isActive ? 'bg-brand-purple/20 text-brand-purple' : 'bg-neutral-100 text-neutral-500'
                    }`}>
                      {step.accentText}
                    </span>
                  </div>
                  
                  <p className={`text-xs md:text-sm leading-relaxed ${isActive ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    {step.description}
                  </p>
                  
                  {isActive && (
                    <div className="text-[10px] font-bold text-brand-purple flex items-center gap-1 pt-1.5 animate-pulse">
                      <Sparkles className="w-3 h-3 text-brand-yellow fill-current" />
                      <span>Previewing screen in phone simulator...</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 5 Columns: Smartphone mockup syncing with step */}
        <div className="lg:col-span-5 flex justify-center py-4 relative">
          
          {/* Subtle surrounding design frame/shadow highlights to accentuate the mockup */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-[600px] bg-brand-purple/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          
          <PhoneMockup 
            activeScreen={currentStepData.screenId} 
            onScreenChange={(screenId) => {
              // Sync back to corresponding step if user clicks tabs on the phone itself!
              const foundStep = steps.find(s => s.screenId === screenId);
              if (foundStep) {
                setActiveStep(foundStep.number);
              }
            }}
            interactive={true}
          />
        </div>

      </div>
    </div>
  );
}
