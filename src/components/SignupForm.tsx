import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle, Ticket, Users, AlertCircle, Share2, 
  Trash2, Database, ShieldCheck, Download, ChevronDown, ChevronUp
} from 'lucide-react';
import { SignupData } from '../types';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [gender, setGender] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [city, setCity] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [signups, setSignups] = useState<SignupData[]>([]);
  const [spotsClaimed, setSpotsClaimed] = useState(942);
  const [myTicketNum, setMyTicketNum] = useState<number | null>(null);
  
  // State to show the admin dashboard panel for demonstrating persistence
  const [showAdmin, setShowAdmin] = useState(false);

  // Load existing signups on mount
  useEffect(() => {
    const fetchSignups = async () => {
      try {
        const res = await fetch('/api/signup');
        const data = await res.json();
        if (data.success) {
          setSignups(data.signups);
          setSpotsClaimed(data.count);

          // Check if current user is already registered in local storage
          const currentEmail = localStorage.getItem('beyond_hello_registered_email');
          if (currentEmail) {
            const userIndex = data.signups.findIndex((s: SignupData) => s.email.toLowerCase() === currentEmail.toLowerCase());
            if (userIndex !== -1) {
              setMyTicketNum(942 + userIndex + 1);
              setIsSuccess(true);
              const user = data.signups[userIndex];
              setName(user.name);
              setEmail(user.email);
              setCity(user.city || '');
            }
          }
        }
      } catch (e) {
        console.error("Could not fetch signups from server, falling back to local storage:", e);
        try {
          const stored = localStorage.getItem('beyond_hello_signups');
          if (stored) {
            const parsed = JSON.parse(stored) as SignupData[];
            setSignups(parsed);
            setSpotsClaimed(942 + parsed.length);
            
            const currentEmail = localStorage.getItem('beyond_hello_registered_email');
            if (currentEmail) {
              const userIndex = parsed.findIndex(s => s.email.toLowerCase() === currentEmail.toLowerCase());
              if (userIndex !== -1) {
                setMyTicketNum(942 + userIndex + 1);
                setIsSuccess(true);
                const user = parsed[userIndex];
                setName(user.name);
                setEmail(user.email);
                setCity(user.city || '');
              }
            }
          }
        } catch (localError) {
          console.error("Could not parse local storage fallback:", localError);
        }
      }
    };

    fetchSignups();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    // Basic Validation
    if (!name.trim()) {
      setErrorMsg('Please enter your first name.');
      setIsSubmitting(false);
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }
    if (!ageRange) {
      setErrorMsg('Please select your age range.');
      setIsSubmitting(false);
      return;
    }
    if (!gender) {
      setErrorMsg('Please select your gender.');
      setIsSubmitting(false);
      return;
    }
    if (!lookingFor) {
      setErrorMsg('Please let us know what you are looking for.');
      setIsSubmitting(false);
      return;
    }
    if (!city) {
      setErrorMsg('Please select your city.');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          ageRange,
          gender,
          lookingFor,
          city
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Failed to submit registration. Please try again.');
        setIsSubmitting(false);
        return;
      }

      localStorage.setItem('beyond_hello_registered_email', email.trim());
      
      // Update local state with server response
      const updatedSignups = [...signups.filter(s => s.email.toLowerCase() !== email.toLowerCase()), data.signup];
      localStorage.setItem('beyond_hello_signups', JSON.stringify(updatedSignups));
      
      setSignups(updatedSignups);
      setSpotsClaimed(data.ticketNum);
      setMyTicketNum(data.ticketNum);
      setIsSuccess(true);
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMsg('Network error. Failed to connect to server API.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear your launch signup ticket and try again?")) {
      localStorage.removeItem('beyond_hello_registered_email');
      setIsSuccess(false);
      setName('');
      setEmail('');
      setAgeRange('');
      setGender('');
      setLookingFor('');
      setCity('');
      setMyTicketNum(null);
    }
  };

  const clearAllSignups = async () => {
    if (window.confirm("Admin: Clear the entire local and server-side signup registry database?")) {
      try {
        const res = await fetch('/api/signup', { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          localStorage.removeItem('beyond_hello_signups');
          localStorage.removeItem('beyond_hello_registered_email');
          setSignups([]);
          setSpotsClaimed(942);
          setIsSuccess(false);
          setMyTicketNum(null);
        } else {
          alert('Failed to clear server database: ' + (data.error || 'Unknown error'));
        }
      } catch (err) {
        console.error('Clear error:', err);
        alert('Failed to connect to server API to clear database.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Dynamic Spots Counter Widget */}
      <div className="text-center mb-8">
        <span className="bg-brand-orange/15 text-brand-orange text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border border-brand-orange/30 animate-pulse-slow">
          ⚠️ PRAGUE EXCLUSIVE INITIATIVE
        </span>
        <h3 className="text-4xl md:text-5xl font-black font-display text-neutral-900 mt-3 tracking-tight">
          {spotsClaimed} / 1,000
        </h3>
        <p className="text-neutral-500 font-medium text-sm md:text-base mt-1.5 max-w-md mx-auto">
          Prague founder spots claimed. <span className="text-brand-orange font-bold">Only {1000 - spotsClaimed} spots remaining</span> before registration lock.
        </p>
        
        {/* Progress Bar */}
        <div className="w-full max-w-md bg-neutral-200 h-3.5 rounded-full mx-auto mt-4 overflow-hidden border p-0.5">
          <div 
            className="h-full bg-gradient-to-r from-brand-orange to-brand-yellow rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${Math.min(100, (spotsClaimed / 1000) * 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur-xl rounded-[40px] border border-white/60 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Side: Dynamic State Visualizer / Info */}
        <div className="lg:col-span-5 bg-neutral-950/90 backdrop-blur-md text-white p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-6 relative z-10">
            <h4 className="text-xl font-bold font-display text-neutral-100">Prague Founding Member</h4>
            
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0 border border-neutral-700">
                  <CheckCircle className="w-4 h-4 text-brand-teal" />
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  <strong className="text-white">Free Premium App Access:</strong> Get 3 months of Beyond Hello Premium on iOS or Android at launch.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0 border border-neutral-700">
                  <CheckCircle className="w-4 h-4 text-brand-teal" />
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  <strong className="text-white">Exclusive First Invitation:</strong> Gain early entry to curated local launch experiences in Vinohrady and Prague Old Town.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0 border border-neutral-700">
                  <CheckCircle className="w-4 h-4 text-brand-teal" />
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  <strong className="text-white">Shape the Platform:</strong> Vote on upcoming challenges, city spots, and custom conversation games.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-800/80 mt-8 lg:mt-0 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <Users className="w-5 h-5 text-brand-yellow" />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-200">Prague Young Pros & Expats</p>
                <p className="text-[10px] text-neutral-400">Join a vibrant, modern social network.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Form */}
        <div className="lg:col-span-7 p-8 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form 
                key="launch-signup-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSubmit} 
                className="space-y-4"
              >
                {errorMsg && (
                  <div className="bg-red-50 text-red-600 border border-red-200 p-3.5 rounded-2xl flex items-start gap-2.5 text-xs font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-700 block">First Name</label>
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Klara"
                      className="w-full bg-white/60 border border-white/80 rounded-2xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange outline-none transition-all shadow-sm"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-700 block">Email Address</label>
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full bg-white/60 border border-white/80 rounded-2xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Age Selection */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-700 block">Age Range</label>
                    <select
                      value={ageRange}
                      onChange={(e) => setAgeRange(e.target.value)}
                      className="w-full bg-white/60 border border-white/80 rounded-2xl px-3 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange outline-none transition-all shadow-sm"
                    >
                      <option value="">Select age range</option>
                      <option value="25-30">25 to 30 years</option>
                      <option value="31-35">31 to 35 years</option>
                      <option value="36-40">36 to 40 years</option>
                      <option value="41-45">41 to 45 years</option>
                      <option value="Other">Other age range</option>
                    </select>
                  </div>

                  {/* Gender Selection */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-700 block">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full bg-white/60 border border-white/80 rounded-2xl px-3 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange outline-none transition-all shadow-sm"
                    >
                      <option value="">Identify as</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Non-binary">Non-binary</option>
                      <option value="PreferNotToSay">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                {/* What are you looking for? */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-700 block">What are you looking for most?</label>
                  <select
                    value={lookingFor}
                    onChange={(e) => setLookingFor(e.target.value)}
                    className="w-full bg-white/60 border border-white/80 rounded-2xl px-3 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange outline-none transition-all shadow-sm"
                  >
                    <option value="">Select primary interest</option>
                    <option value="Real Connections">Real connections through shared experiences</option>
                    <option value="Friendship & Activities">Friendship & social partner activities</option>
                    <option value="Fun Prague Spots">A more playful way to discover Prague</option>
                    <option value="All of the above">All of the above (Complete experience)</option>
                  </select>
                </div>

                {/* City selection field */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-700 block">Select your city</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white/60 border border-white/80 rounded-2xl px-3 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange outline-none transition-all shadow-sm"
                  >
                    <option value="">Select your launch city</option>
                    <option value="Prague">Prague, Czech Republic</option>
                    <option value="Belgrade">Belgrade, Serbia</option>
                    <option value="Other">Other City</option>
                  </select>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    id="btn-reserve-launch-place"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-orange hover:bg-brand-orange/95 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-lg hover:shadow-brand-orange/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Reserving your spot...
                      </span>
                    ) : (
                      <>
                        <Ticket className="w-5 h-5" />
                        Reserve my Prague place
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-neutral-400 text-center mt-3 font-semibold flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" /> 100% Secure. We respect your privacy & zero spam.
                  </p>
                </div>
              </motion.form>
            ) : (
              // Success Ticket Display State
              <motion.div 
                key="launch-success-ticket"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-6 px-2 space-y-6 flex flex-col items-center"
              >
                {/* SVG ticket layout */}
                <div className="bg-neutral-900 text-white rounded-3xl p-6 border-2 border-brand-orange/40 w-full max-w-sm shadow-2xl relative overflow-hidden">
                  {/* Decorative notch cuttings in card borders */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-r-2 border-brand-orange/20"></div>
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-l-2 border-brand-orange/20"></div>

                  <div className="flex justify-between items-center text-[10px] text-neutral-400 font-bold tracking-widest uppercase mb-4">
                    <span>BEYOND HELLO</span>
                    <span className="text-brand-orange">{(city || 'PRG').toUpperCase().slice(0, 3)} FOUNDER</span>
                  </div>

                  <div className="my-4">
                    <p className="text-xs text-neutral-400 uppercase font-bold">Launch Ticket Seat</p>
                    <h4 className="text-3xl font-black font-display text-brand-yellow mt-1 tracking-tight">
                      #{myTicketNum}
                    </h4>
                  </div>

                  <div className="space-y-1 bg-neutral-800/50 p-3 rounded-xl border border-neutral-800 text-left my-4 text-xs">
                    <div className="flex justify-between"><span className="text-neutral-400">Reserved for:</span> <span className="font-bold text-neutral-100">{name}</span></div>
                    <div className="flex justify-between"><span className="text-neutral-400">Email:</span> <span className="font-bold text-neutral-100 truncate max-w-[150px]">{email}</span></div>
                    <div className="flex justify-between"><span className="text-neutral-400">Location:</span> <span className="font-bold text-brand-orange">{city || 'Prague, CZ'}</span></div>
                  </div>

                  <div className="pt-2 border-t border-dashed border-neutral-700 flex flex-col items-center gap-1">
                    <span className="text-[9px] text-neutral-400 font-bold uppercase">QR CODE FOR APP REGISTRY</span>
                    {/* Simulated vector QR Code using nice table grid */}
                    <div className="w-16 h-16 bg-white p-1 rounded-lg flex flex-wrap gap-0.5 items-center justify-center">
                      <div className="grid grid-cols-4 gap-1 w-full h-full">
                        <div className="bg-black"></div><div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div>
                        <div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div><div className="bg-white"></div>
                        <div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div>
                        <div className="bg-black"></div><div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-center">
                  <h4 className="text-xl font-bold font-display text-neutral-900">You're on the list, {name}!</h4>
                  <p className="text-sm text-neutral-500 max-w-sm leading-relaxed">
                    We have successfully reserved your spot. When Beyond Hello launches in Prague, your premium ticket code will be sent directly to <strong>{email}</strong>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm pt-2">
                  <button 
                    onClick={() => alert(`Simulated link copied: Bring 3 friends to get spot advancement! \nLink: https://beyondhello.app/invite/prg-${myTicketNum}`)}
                    className="flex-1 bg-brand-orange hover:bg-brand-orange/95 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" /> Share with Friends
                  </button>
                  <button 
                    onClick={handleReset}
                    className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 font-semibold py-2 px-4 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Sign up another email
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Persistence Showcase Toggle Button (Startup Admin Panel) */}
      <div className="mt-8 border-t border-dashed border-neutral-300/60 pt-6 text-center">
        <button
          onClick={() => setShowAdmin(!showAdmin)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-neutral-600 transition-colors bg-neutral-100 hover:bg-neutral-200/60 px-4 py-2 rounded-full cursor-pointer"
        >
          <Database className="w-4 h-4 text-brand-orange" />
          <span>{showAdmin ? 'Hide Startup Registry Panel' : 'Show Local Startup Registry (Admin Panel)'}</span>
          {showAdmin ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Admin Panel content */}
      <AnimatePresence>
        {showAdmin && (
          <motion.div
            id="admin-dashboard-container"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-4"
          >
            <div className="bg-neutral-900 rounded-3xl p-6 border-2 border-neutral-800 text-left text-neutral-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-800">
                <div>
                  <h5 className="text-base font-bold text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-brand-orange" />
                    Beyond Hello local client-side persistence dashboard
                  </h5>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Demonstrating real, live-saving storage operations. Any signups submitted above persist across browser sessions.
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearAllSignups}
                    className="bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear All Signups
                  </button>
                </div>
              </div>

              {signups.length === 0 ? (
                <div className="text-center py-10 bg-neutral-800/30 rounded-2xl border border-neutral-800 border-dashed">
                  <p className="text-sm text-neutral-400">No custom emails registered locally yet!</p>
                  <p className="text-xs text-neutral-500 mt-1">Submit the signup form above to see your registration database update instantly in real-time.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Stats Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-neutral-800/40 p-3 rounded-xl border border-neutral-800">
                      <p className="text-[10px] text-neutral-400 uppercase font-bold">Total Custom signups</p>
                      <p className="text-xl font-bold text-brand-orange mt-1">{signups.length}</p>
                    </div>
                    <div className="bg-neutral-800/40 p-3 rounded-xl border border-neutral-800">
                      <p className="text-[10px] text-neutral-400 uppercase font-bold">Total Spots Claimed</p>
                      <p className="text-xl font-bold text-brand-yellow mt-1">{spotsClaimed}</p>
                    </div>
                    <div className="bg-neutral-800/40 p-3 rounded-xl border border-neutral-800">
                      <p className="text-[10px] text-neutral-400 uppercase font-bold">Average Age Segment</p>
                      <p className="text-xl font-bold text-brand-teal mt-1">
                        {(() => {
                          const counts: Record<string, number> = {};
                          signups.forEach(s => counts[s.ageRange] = (counts[s.ageRange] || 0) + 1);
                          return Object.entries(counts).sort((a,b) => b[1]-a[1])[0]?.[0] || 'N/A';
                        })()}
                      </p>
                    </div>
                    <div className="bg-neutral-800/40 p-3 rounded-xl border border-neutral-800">
                      <p className="text-[10px] text-neutral-400 uppercase font-bold">Platform State</p>
                      <p className="text-xl font-bold text-green-400 mt-1">Healthy</p>
                    </div>
                  </div>

                  {/* Registered List */}
                  <div>
                    <h6 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">Live Registered List</h6>
                    <div className="max-h-60 overflow-y-auto rounded-xl border border-neutral-800 divide-y divide-neutral-800 text-xs no-scrollbar">
                      {signups.map((s, idx) => (
                        <div key={s.id} className="p-3 bg-neutral-900/40 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                          <div>
                            <p className="font-bold text-white flex items-center gap-1.5">
                              <span>{s.name}</span>
                              <span className="text-[9px] text-brand-yellow bg-brand-yellow/15 px-1.5 py-0.2 rounded font-mono">
                                Ticket #{942 + idx + 1}
                              </span>
                            </p>
                            <p className="text-[11px] text-neutral-400 mt-0.5">{s.email}</p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 text-[9px] font-semibold text-neutral-300">
                            <span className="bg-neutral-800 px-2 py-0.5 rounded-full border border-neutral-700/60 text-brand-yellow">City: {s.city || 'Prague'}</span>
                            <span className="bg-neutral-800 px-2 py-0.5 rounded-full border border-neutral-700/60">Age: {s.ageRange}</span>
                            <span className="bg-neutral-800 px-2 py-0.5 rounded-full border border-neutral-700/60">Gender: {s.gender}</span>
                            <span className="bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded-full border border-brand-orange/20 max-w-[150px] truncate">{s.lookingFor}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
