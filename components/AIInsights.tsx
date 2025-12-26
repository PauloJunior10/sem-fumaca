
import React, { useState, useEffect } from 'react';
import { BrainCircuit, Sparkles } from 'lucide-react';
import { getHealthInsights } from '../services/gemini';

interface AIInsightsProps {
  stats: any;
}

const AIInsights: React.FC<AIInsightsProps> = ({ stats }) => {
  const [insight, setInsight] = useState<string>("Analisando seus dados para gerar recomendações personalizadas...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInsight() {
      setLoading(true);
      const text = await getHealthInsights(stats);
      setInsight(text);
      setLoading(false);
    }
    
    const timeout = setTimeout(fetchInsight, 1500);
    return () => clearTimeout(timeout);
  }, [stats.today, stats.month]);

  return (
    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem] p-6 relative overflow-hidden shadow-lg shadow-emerald-950/5 group active:scale-[0.99] transition-transform">
      {/* Dynamic background element */}
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Sparkles className="text-emerald-500 animate-pulse" size={64} strokeWidth={1} />
      </div>
      
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <div className="bg-emerald-500 p-2 rounded-xl text-[#0F172A] shadow-lg shadow-emerald-500/20">
          <BrainCircuit size={20} strokeWidth={2.5} />
        </div>
        <h3 className="font-black text-emerald-500 text-xs uppercase tracking-[0.2em]">Insights Inteligentes</h3>
      </div>
      
      <div className={`relative z-10 min-h-[4rem] flex flex-col justify-center`}>
        {loading ? (
          <div className="space-y-2 animate-pulse">
            <div className="h-2.5 bg-emerald-500/20 rounded-full w-full"></div>
            <div className="h-2.5 bg-emerald-500/20 rounded-full w-3/4"></div>
          </div>
        ) : (
          <p className="text-slate-300 text-sm leading-relaxed font-medium italic transition-all duration-700">
            "{insight}"
          </p>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
