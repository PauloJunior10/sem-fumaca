
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  accent: 'emerald' | 'red';
  progress?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, accent, progress }) => {
  const isEmerald = accent === 'emerald';
  
  return (
    <div className="bg-[#1E293B] border border-slate-700/50 rounded-3xl p-5 flex flex-col justify-between h-36 relative overflow-hidden group shadow-md transition-all active:scale-[0.98]">
      {/* Decorative gradient background */}
      <div className={`absolute top-0 right-0 w-24 h-24 blur-[40px] opacity-10 pointer-events-none -mr-8 -mt-8 ${isEmerald ? 'bg-emerald-500' : 'bg-red-500'}`}></div>

      <div className="flex justify-between items-start mb-2 relative z-10">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{title}</span>
        <div className={`p-2 rounded-xl border transition-all duration-500 ${isEmerald ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
          {icon}
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="text-2xl font-black text-white leading-none mb-1">{value}</div>
        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">{subtitle}</div>
      </div>
      
      {progress !== undefined && (
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-900/50">
          <div 
            className={`h-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(239,68,68,0.2)] ${isEmerald ? 'bg-[#10B981]' : 'bg-[#EF4444]'}`}
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default StatCard;
