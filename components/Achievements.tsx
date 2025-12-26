
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Achievement } from '../types';

interface AchievementsProps {
  achievements: Achievement[];
  unlockedIds: string[];
  survivalTime: number;
}

const Achievements: React.FC<AchievementsProps> = ({ achievements, unlockedIds, survivalTime }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {achievements.map((achievement) => {
        const isUnlocked = unlockedIds.includes(achievement.id);
        const IconComponent = (LucideIcons as any)[achievement.iconName] || LucideIcons.Trophy;
        
        const progress = isUnlocked 
          ? 100 
          : Math.min(100, (survivalTime / achievement.thresholdMs) * 100);

        return (
          <div 
            key={achievement.id}
            className={`relative flex flex-col items-center p-5 rounded-3xl border transition-all duration-700 overflow-hidden active:scale-95 ${
              isUnlocked 
                ? 'bg-[#1E293B] border-amber-500/40 shadow-lg shadow-amber-950/20' 
                : 'bg-[#1E293B]/40 border-slate-800 opacity-60'
            }`}
          >
            {/* Background progress fill */}
            {!isUnlocked && (
              <div 
                className="absolute inset-0 bg-slate-800/50 transition-all duration-1000 -z-10 origin-left"
                style={{ width: `${progress}%` }}
              />
            )}

            <div className={`mb-4 p-3 rounded-2xl transition-all duration-1000 ${
              isUnlocked 
                ? 'bg-amber-500/20 text-amber-500 scale-110 shadow-inner' 
                : 'bg-slate-900 text-slate-700'
            }`}>
              <IconComponent size={24} strokeWidth={2.5} />
            </div>

            <h4 className={`text-[10px] font-black uppercase tracking-widest text-center mb-1 ${
              isUnlocked ? 'text-white' : 'text-slate-600'
            }`}>
              {achievement.title}
            </h4>
            
            <p className="text-[8px] text-slate-500 text-center leading-tight font-bold">
              {achievement.description}
            </p>

            {isUnlocked && (
              <div className="absolute top-2 right-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Achievements;
