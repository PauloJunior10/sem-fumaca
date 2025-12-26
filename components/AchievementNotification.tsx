
import React, { useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { Achievement } from '../types';

interface AchievementNotificationProps {
  achievement: Achievement;
  onClose: () => void;
}

const AchievementNotification: React.FC<AchievementNotificationProps> = ({ achievement, onClose }) => {
  const IconComponent = (LucideIcons as any)[achievement.iconName] || LucideIcons.Trophy;

  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="bg-slate-900 border-2 border-amber-500/50 rounded-2xl p-4 shadow-2xl shadow-amber-900/40 flex items-center gap-4">
        <div className="bg-amber-500 p-3 rounded-xl text-slate-900 shadow-lg animate-bounce">
          <IconComponent size={28} strokeWidth={3} />
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em] mb-0.5">Nova Conquista!</div>
          <h4 className="text-lg font-bold text-white leading-tight">{achievement.title}</h4>
          <p className="text-slate-400 text-xs">{achievement.description}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-slate-500 hover:text-white p-1"
        >
          <LucideIcons.X size={18} />
        </button>
      </div>
      
      {/* Visual flair - glowing effect behind */}
      <div className="absolute inset-0 bg-amber-500/10 blur-2xl -z-10 rounded-full scale-150 opacity-50" />
    </div>
  );
};

export default AchievementNotification;
