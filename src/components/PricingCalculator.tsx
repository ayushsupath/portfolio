import { useState } from 'react';
import { Check } from 'lucide-react';

export default function PricingCalculator() {
  const [investment, setInvestment] = useState(5000);

  const calculateROI = (val: number) => {
    return Math.floor(val * 2.4); // Mock ROI calculation
  };

  return (
    <section className="relative w-full bg-dark-purple py-32 px-8 overflow-hidden z-20">
      {/* Blurred Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7C3AED] opacity-20 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-display font-black tracking-tighter uppercase mb-4 text-white">Investment</h2>
          <p className="text-zinc-400 text-xl max-w-2xl mx-auto">Scalable solutions tailored to your ambition.</p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-32">
          {/* Starter */}
          <div className="glass p-8 rounded-2xl border-l-4 border-l-lime-neon relative overflow-hidden group hover:bg-white/10 transition-colors">
            <h3 className="text-2xl font-bold mb-2">Starter</h3>
            <div className="text-4xl font-black mb-6">$2,000<span className="text-lg text-zinc-400 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 text-zinc-300">
              {['Basic MVP Development', 'UI/UX Design', 'Weekly Updates'].map((feature, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-lime-neon" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-4 border border-white/20 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors">
              Begin
            </button>
          </div>

          {/* Growth (Center) */}
          <div className="bg-white text-black p-10 rounded-2xl scale-100 lg:scale-110 shadow-[0_0_50px_rgba(255,255,255,0.1)] relative z-20">
            <div className="absolute top-0 right-0 bg-lime-neon text-black font-bold text-xs uppercase px-4 py-1 rounded-bl-xl rounded-tr-2xl">
              Popular
            </div>
            <h3 className="text-2xl font-bold mb-2">Growth</h3>
            <div className="text-5xl font-black mb-6">$5,000<span className="text-xl text-zinc-500 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 text-zinc-800">
              {['Full Stack Application', 'Premium Animations', 'Priority Support', 'Performance Tuning'].map((feature, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-lime-neon stroke-[3]" />
                  <span className="font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-lime-neon hover:text-black transition-colors">
              Scale Now
            </button>
          </div>

          {/* Enterprise */}
          <div className="glass p-8 rounded-2xl border-l-4 border-l-lime-neon relative overflow-hidden group hover:bg-white/10 transition-colors">
            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
            <div className="text-4xl font-black mb-6">Custom</div>
            <ul className="space-y-4 mb-8 text-zinc-300">
              {['Dedicated Team', 'Custom Architecture', '24/7 SLA', 'Security Audits'].map((feature, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-lime-neon" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-4 border border-white/20 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors">
              Let's Talk
            </button>
          </div>
        </div>

        {/* Investment Calculator */}
        <div className="max-w-4xl mx-auto glass p-12 rounded-3xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">ROI Calculator</h3>
            <p className="text-zinc-400">Drag the slider to project your potential return.</p>
          </div>
          
          <div className="mb-12">
            <input 
              type="range" 
              min="1000" 
              max="20000" 
              step="500"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="glow-slider"
            />
            <div className="flex justify-between mt-4 text-zinc-500 font-medium">
              <span>$1k</span>
              <span>$20k</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-8 md:pt-0">
              <div className="text-zinc-400 font-medium tracking-widest uppercase mb-2">Monthly Investment</div>
              <div className="text-4xl md:text-5xl font-black text-white">${investment.toLocaleString()}</div>
            </div>
            <div className="pt-8 md:pt-0">
              <div className="text-zinc-400 font-medium tracking-widest uppercase mb-2">Projected Value (1 Yr)</div>
              <div className="text-4xl md:text-5xl font-black cinematic-gradient-text">${calculateROI(investment).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
