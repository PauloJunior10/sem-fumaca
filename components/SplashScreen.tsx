
import React, { useMemo } from 'react';
import { Wind } from 'lucide-react';

const QUOTES = [
  "Cada minuto conta.",
  "Seus pulmões agradecem.",
  "Um dia de cada vez.",
  "Respire a liberdade.",
  "Você é mais forte que o vício.",
  "Sua saúde é o seu maior tesouro.",
  "Um futuro sem fumaça começa agora.",
  "A cada hora, uma vitória.",
  "Sinta o ar puro entrando.",
  "Persista. O desejo passa, a saúde fica."
];

const SplashScreen: React.FC = () => {
  const randomQuote = useMemo(() => {
    return QUOTES[Math.floor(Math.random() * QUOTES.length)];
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-[#0F172A] flex flex-col items-center justify-center animate-out fade-out duration-700 fill-mode-forwards">
      <div className="relative">
        {/* Glowing aura */}
        <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
        
        {/* Main Icon Card */}
        <div className="relative animate-in fade-in zoom-in duration-1000 ease-out">
          <div className="bg-[#1E293B] p-8 rounded-[3rem] border border-emerald-500/10 shadow-2xl shadow-emerald-950/40">
            <Wind size={70} className="text-emerald-500" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <div className="mt-12 text-center animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-300 fill-mode-both">
        {/* Custom Personalized Brand */}
        <div className="flex items-baseline justify-center gap-0.5 mb-2">
          <span className="text-4xl font-thin tracking-tighter text-slate-300">sem</span>
          <span className="text-4xl font-black tracking-tighter text-emerald-500">fumaça</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 mb-1.5 ml-0.5 animate-pulse"></span>
        </div>
        
        <p className="text-emerald-500/40 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">Respire Liberdade</p>
        
        {/* Motivational Quote */}
        <div className="px-10 mt-4 animate-in fade-in duration-1000 delay-700 fill-mode-both">
          <p className="text-slate-400 text-sm font-medium italic leading-relaxed opacity-80">
            "{randomQuote}"
          </p>
        </div>
      </div>

      {/* Discrete loading bar */}
      <div className="mt-16 w-40 h-1 bg-slate-800/50 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 animate-loading-bar origin-left"></div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .animate-loading-bar {
          animation: loading-bar 2s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
