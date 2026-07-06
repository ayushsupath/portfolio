import { useState } from 'react';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "e257bf0d-4575-4119-b224-d1840a345d06");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark-bg/80 backdrop-blur-md pointer-events-auto text-left">
      <div className="relative w-full max-w-lg glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-3xl animate-fade-in-scale">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-lime-neon transition-colors"
        >
          <X size={24} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-12 animate-fade-in-scale">
            <CheckCircle2 className="w-20 h-20 text-lime-neon mx-auto mb-6" />
            <h3 className="text-3xl font-black mb-2 uppercase">Message Sent!</h3>
            <p className="text-zinc-400">I'll get back to you as soon as possible.</p>
          </div>
        ) : (
          <>
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">Let's Talk</h2>
            <p className="text-zinc-400 mb-8 text-sm uppercase tracking-widest">Send me a direct message</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="YOUR NAME"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-lime-neon focus:ring-1 focus:ring-lime-neon transition-all"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="EMAIL ADDRESS"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-lime-neon focus:ring-1 focus:ring-lime-neon transition-all"
                />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="PHONE NUMBER"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-lime-neon focus:ring-1 focus:ring-lime-neon transition-all"
                />
              </div>

              <div>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  placeholder="HOW CAN I HELP YOU?"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-lime-neon focus:ring-1 focus:ring-lime-neon transition-all resize-none"
                ></textarea>
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm">Something went wrong. Please try again or email directly.</p>
              )}

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-lime-neon text-black font-black uppercase tracking-widest py-4 rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
