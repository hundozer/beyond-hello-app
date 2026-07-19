import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Compass, Sparkles, Coffee, Camera, Landmark, UtensilsCrossed } from 'lucide-react';
import { PragueSpot } from '../types';

export default function PragueSection() {
  const [selectedSpotIdx, setSelectedSpotIdx] = useState<number>(0);

  const spots: PragueSpot[] = [
    {
      name: "Letná Park Hilltop",
      category: "🌅 Panoramic Outlooks & Sunsets",
      description: "Prague's premiere social hub. Our Letná challenge takes you past the giant metronome, through leafy paths, ending with a panoramic sunset photo task overlooking the Vltava bridges.",
      popularFor: "Sunset Photo Quests & Outdoor Board Games",
      imageAlt: "https://images.unsplash.com/photo-1541560052-5e137f229371?auto=format&fit=crop&w=600&q=80" // Letna viewpoint vibe
    },
    {
      name: "Malá Strana Alleys",
      category: "🏰 Hidden Courtyards & Fairy-tales",
      description: "Escape the tourist streams. Wander down gas-lit lanes beneath the Prague Castle, solving clues on historic doors to unlock quiet, secret courtyard cafés where peacocks roam.",
      popularFor: "Secret Courtyard Hunts & Icebreaker Walks",
      imageAlt: "https://images.unsplash.com/photo-1513807016779-d51c0c026263?auto=format&fit=crop&w=600&q=80" // Old Prague streets
    },
    {
      name: "Karlín Bistro Scene",
      category: "🍜 Hip Eateries & Espresso Bars",
      description: "Prague's creative culinary core. Ideal for our foodie collaborations—vote on flavors blind and get matched to off-the-beaten-path espresso bars or modern street food bistros.",
      popularFor: "Blind Taste Matches & Barista Quests",
      imageAlt: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80" // Cafe scene
    },
    {
      name: "Vinohrady Vintage Squares",
      category: "🌳 Art-Deco Architecture & Parks",
      description: "Quiet tree-lined streets, independent bookshops, and vibrant local life. Discover Prague's premier expat neighborhood by tracking down rare records or completing vintage shop puzzles.",
      popularFor: "Vintage Shop Puzzles & Bookshop Escapes",
      imageAlt: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80" // Vinohrady cafe/street vibe
    },
    {
      name: "Vyšehrad Fortress",
      category: "🧱 Ancient Walls & Legend Trails",
      description: "Step onto historic fortifications with incredible skyline views and secret tunnels. Perfect for twilight walking tasks that bring local legends to life without standard dating pressure.",
      popularFor: "Twilight Story Walks & Myth Riddles",
      imageAlt: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=600&q=80" // Vysehrad style overlook
    }
  ];

  const currentSpot = spots[selectedSpotIdx];

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-brand-orange/20">
          Local Spotlight
        </span>
        <h3 className="text-3xl md:text-5xl font-black font-display tracking-tight text-neutral-900 leading-none">
          Launching first in <span className="text-brand-orange">Prague.</span>
        </h3>
        <p className="text-sm md:text-base text-neutral-500">
          Prague is full of magical streets, secret courtyards, and incredible young people. Beyond Hello acts as your key to unlocking the city together.
        </p>
      </div>

      <div className="bg-white/40 backdrop-blur-xl rounded-[40px] border border-white/60 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Side: 5 Columns - Selector buttons list */}
        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/40 bg-white/20 p-6 flex flex-col justify-center space-y-2.5">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-3 mb-1">
            EXPLORE INAUGURAL DISTRICTS:
          </p>
          
          {spots.map((spot, idx) => {
            const isSelected = selectedSpotIdx === idx;
            return (
              <button
                id={`btn-prague-district-${idx}`}
                key={idx}
                onClick={() => setSelectedSpotIdx(idx)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer ${
                  isSelected 
                    ? 'bg-neutral-900/90 backdrop-blur-md border-white/10 text-white shadow-lg' 
                    : 'bg-white/50 backdrop-blur-md border-white/40 hover:border-brand-orange/40 text-neutral-700 hover:bg-white/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg border ${
                    isSelected ? 'bg-brand-orange/15 text-brand-orange border-brand-orange/20' : 'bg-neutral-100 text-neutral-400 border-neutral-200/60'
                  }`}>
                    {idx === 0 && <Camera className="w-4 h-4" />}
                    {idx === 1 && <Landmark className="w-4 h-4" />}
                    {idx === 2 && <UtensilsCrossed className="w-4 h-4" />}
                    {idx === 3 && <Coffee className="w-4 h-4" />}
                    {idx === 4 && <Compass className="w-4 h-4" />}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm leading-tight">{spot.name}</h5>
                    <p className={`text-[10px] font-medium mt-0.5 ${isSelected ? 'text-neutral-400' : 'text-neutral-400'}`}>
                      {spot.category.split('&')[0]}
                    </p>
                  </div>
                </div>
                <MapPin className={`w-4 h-4 transition-transform ${
                  isSelected ? 'text-brand-orange scale-110' : 'text-neutral-300 group-hover:text-neutral-400'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Right Side: 7 Columns - Highlight of the current spot */}
        <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between min-h-[400px] relative">
          
          {/* Main Content Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase bg-brand-orange/10 text-brand-orange px-2.5 py-1 rounded-full border border-brand-orange/20 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" /> {currentSpot.category}
              </span>
            </div>

            <h4 className="text-2xl md:text-3xl font-black font-display text-neutral-900 tracking-tight">
              {currentSpot.name}
            </h4>
            
            <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-xl">
              {currentSpot.description}
            </p>

            <div className="p-4 bg-brand-orange/5 border border-brand-orange/15 rounded-2xl max-w-xl">
              <h6 className="text-xs font-bold uppercase tracking-wider text-brand-orange flex items-center gap-1.5 mb-1">
                <Compass className="w-4 h-4 text-brand-orange" /> POPULAR CHALLENGE TYPES
              </h6>
              <p className="text-xs font-semibold text-neutral-700">
                {currentSpot.popularFor}
              </p>
            </div>
          </div>

          {/* Visual card mimicking a post preview inside Prague */}
          <div className="mt-8 border-t border-neutral-100 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border border-neutral-200">
                <img 
                  src={currentSpot.imageAlt} 
                  alt={currentSpot.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-800">Prague Founding Community</p>
                <p className="text-[10px] text-neutral-500">Curated by local Prague guides & event planners.</p>
              </div>
            </div>

            <button 
              onClick={() => {
                const formEl = document.getElementById('signup-section');
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer text-center"
            >
              Sign up for Prague access
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
