
import React, { useState, useEffect, useMemo } from 'react';
import { Home, BarChart3, Trophy, Plus, RotateCcw, TrendingUp, Calendar, Target, Wallet, HeartPulse } from 'lucide-react';
import Timer from './components/Timer';
import HistoryChart from './components/HistoryChart';
import StatCard from './components/StatCard';
import AIInsights from './components/AIInsights';
import Achievements from './components/Achievements';
import AchievementNotification from './components/AchievementNotification';
import SplashScreen from './components/SplashScreen';
import { UserData, CigaretteLog, Achievement } from './types';

const STORAGE_KEY = 'sem_fumaca_data_v1';

const ACHIEVEMENTS: Achievement[] = [
  { id: '1h', title: 'Primeiro Passo', description: '1 hora sem fumar', thresholdMs: 1000 * 60 * 60, iconName: 'Zap' },
  { id: '24h', title: 'Pulmões Limpos', description: '24 horas de pureza', thresholdMs: 1000 * 60 * 60 * 24, iconName: 'Wind' },
  { id: '3d', title: 'Resiliência', description: '72 horas vencendo o vício', thresholdMs: 1000 * 60 * 60 * 24 * 3, iconName: 'Flame' },
  { id: '7d', title: 'Uma Semana de Ferro', description: '7 dias de liberdade total', thresholdMs: 1000 * 60 * 60 * 24 * 7, iconName: 'ShieldCheck' },
];

const INITIAL_DATA: UserData = {
  logs: [],
  lastReset: Date.now(),
  dailyGoal: 10,
  pricePerPack: 12.00,
  cigarettesPerPack: 20,
  unlockedBadges: []
};

type Tab = 'home' | 'stats' | 'achievements';

const App: React.FC = () => {
  const [data, setData] = useState<UserData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [showSplash, setShowSplash] = useState(true);

  // Splash Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Persistence
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Achievement Monitoring
  useEffect(() => {
    const checkAchievements = () => {
      const survivalTime = Date.now() - data.lastReset;
      const newlyUnlocked = ACHIEVEMENTS.find(
        a => survivalTime >= a.thresholdMs && !data.unlockedBadges.includes(a.id)
      );

      if (newlyUnlocked) {
        setNewAchievement(newlyUnlocked);
        setData(prev => ({
          ...prev,
          unlockedBadges: [...prev.unlockedBadges, newlyUnlocked.id]
        }));
      }
    };

    const interval = setInterval(checkAchievements, 5000);
    return () => clearInterval(interval);
  }, [data.lastReset, data.unlockedBadges]);

  // Actions
  const handleAddCigarette = () => {
    const newLog: CigaretteLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    setData(prev => ({
      ...prev,
      logs: [...prev.logs, newLog],
      lastReset: Date.now(),
      unlockedBadges: [] 
    }));
  };

  const handleResetSurvival = () => {
    setData(prev => ({
      ...prev,
      lastReset: Date.now(),
      unlockedBadges: []
    }));
    setIsResetConfirmOpen(false);
  };

  // Stats Logic
  const stats = useMemo(() => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    
    const todayLogs = data.logs.filter(l => l.timestamp >= todayStart);
    const monthLogs = data.logs.filter(l => l.timestamp >= monthStart);
    
    const weeklyData = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const start = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
      const end = start + 86400000;
      const count = data.logs.filter(l => l.timestamp >= start && l.timestamp < end).length;
      return {
        day: d.toLocaleDateString('pt-BR', { weekday: 'short' }),
        count
      };
    });

    const totalCigarettesNotSmoked = (data.dailyGoal * 30) - monthLogs.length;
    const moneyPerCigarette = data.pricePerPack / data.cigarettesPerPack;
    
    return {
      today: todayLogs.length,
      month: monthLogs.length,
      weekly: weeklyData,
      moneySaved: Math.max(0, totalCigarettesNotSmoked * moneyPerCigarette),
      lifeRegained: Math.max(0, totalCigarettesNotSmoked * 11)
    };
  }, [data]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="animate-in fade-in duration-500 space-y-8">
            {/* Main Counter */}
            <section>
              <div className="bg-[#1E293B] border border-slate-700/50 rounded-[2.5rem] p-10 text-center shadow-xl shadow-slate-950/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>
                <h2 className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-6">Tempo de Sobrevivência</h2>
                <Timer startTime={data.lastReset} />
              </div>
            </section>

            {/* Quick Stats Grid */}
            <section className="grid grid-cols-2 gap-4">
              <StatCard 
                title="Hoje" 
                value={stats.today} 
                subtitle={`Meta: ${data.dailyGoal}`} 
                icon={<Target size={18} />}
                accent="red"
                progress={(stats.today / data.dailyGoal) * 100}
              />
              <StatCard 
                title="Mês" 
                value={stats.month} 
                subtitle="Cigarros totais" 
                icon={<Calendar size={18} />}
                accent="emerald"
              />
            </section>

            {/* AI Insights */}
            <AIInsights stats={stats} />

            {/* Floating Action Button - Made smaller to avoid obstruction */}
            <div className="fixed bottom-[110px] left-0 right-0 px-8 flex justify-center z-40 pointer-events-none">
              <button 
                onClick={handleAddCigarette}
                className="pointer-events-auto flex items-center gap-3 bg-[#EF4444] hover:bg-red-600 text-white px-5 py-3 rounded-full shadow-[0_12px_24px_-8px_rgba(239,68,68,0.5)] active:scale-90 transition-all group backdrop-blur-sm"
              >
                <div className="bg-white/20 rounded-full p-1 group-hover:rotate-90 transition-transform">
                  <Plus size={18} strokeWidth={3} />
                </div>
                <span className="font-black uppercase tracking-[0.15em] text-[11px]">Fumei agora</span>
              </button>
            </div>
          </div>
        );
      case 'stats':
        return (
          <div className="animate-in fade-in duration-500 space-y-8 pb-10">
            <section className="grid grid-cols-2 gap-4">
              <StatCard 
                title="Economia" 
                value={`R$ ${stats.moneySaved.toFixed(2)}`} 
                subtitle="Estimado mensal" 
                icon={<Wallet size={18} />}
                accent="emerald"
              />
              <StatCard 
                title="Vida Extra" 
                value={`${Math.floor(stats.lifeRegained / 60)}h ${Math.floor(stats.lifeRegained % 60)}m`} 
                subtitle="Tempo recuperado" 
                icon={<HeartPulse size={18} />}
                accent="red"
              />
            </section>

            <section className="bg-[#1E293B] border border-slate-700/50 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-8">
                <div className="p-2 bg-emerald-500/10 rounded-xl">
                  <TrendingUp className="text-emerald-500" size={20} />
                </div>
                <h3 className="font-bold text-slate-100 uppercase text-xs tracking-widest">Análise de Frequência</h3>
              </div>
              <div className="h-48 w-full">
                <HistoryChart data={stats.weekly} />
              </div>
            </section>

            <AIInsights stats={stats} />
          </div>
        );
      case 'achievements':
        return (
          <div className="animate-in fade-in duration-500 space-y-8 pb-10">
            <section>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Trophy className="text-amber-400" size={20} />
                  <h3 className="font-bold text-slate-100 uppercase text-sm tracking-widest">Seus Troféus</h3>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-3 py-1 rounded-full border border-slate-700 font-bold uppercase tracking-wider">
                  {data.unlockedBadges.length} / {ACHIEVEMENTS.length}
                </span>
              </div>
              <Achievements 
                achievements={ACHIEVEMENTS} 
                unlockedIds={data.unlockedBadges} 
                survivalTime={Date.now() - data.lastReset}
              />
            </section>
            
            <div className="bg-[#1E293B] border border-slate-700/50 rounded-3xl p-6 shadow-md">
              <h4 className="text-slate-100 font-bold text-sm mb-4 uppercase tracking-wider">Progresso de Saúde</h4>
              <div className="space-y-4">
                {[
                  { label: 'Paladar & Olfato', progress: Math.min(100, (Date.now() - data.lastReset) / (1000 * 60 * 60 * 48) * 100) },
                  { label: 'Circulação Sanguínea', progress: Math.min(100, (Date.now() - data.lastReset) / (1000 * 60 * 60 * 24 * 14) * 100) },
                  { label: 'Função Pulmonar', progress: Math.min(100, (Date.now() - data.lastReset) / (1000 * 60 * 60 * 24 * 30 * 3) * 100) },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                      <span>{item.label}</span>
                      <span>{Math.floor(item.progress)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 transition-all duration-1000" 
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] pb-40 md:pb-12 max-w-2xl mx-auto px-5 pt-8 overflow-x-hidden">
      {showSplash && <SplashScreen />}

      {newAchievement && (
        <AchievementNotification 
          achievement={newAchievement} 
          onClose={() => setNewAchievement(null)} 
        />
      )}

      {/* Modern Professional Branding Header */}
      <header className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-baseline gap-0.5">
            <span className="text-3xl font-thin tracking-tighter text-slate-300">sem</span>
            <span className="text-3xl font-black tracking-tighter text-emerald-500">fumaça</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mb-1 ml-0.5"></span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
              {activeTab === 'home' ? 'Painel de Sobrevivência' : activeTab === 'stats' ? 'Análise de Dados' : 'Conquistas'}
            </p>
          </div>
        </div>
        <button 
          onClick={() => setIsResetConfirmOpen(true)}
          className="p-3 rounded-2xl bg-[#1E293B] border border-slate-700 text-slate-400 hover:text-red-500 hover:border-red-500/30 transition-all active:scale-90"
          title="Recaída (Resetar Tempo)"
        >
          <RotateCcw size={20} />
        </button>
      </header>

      <main className={`${showSplash ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
        {renderContent()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-[#1E293B] border-t border-slate-700/50 pb-8 pt-4 px-8 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <TabButton 
            active={activeTab === 'home'} 
            onClick={() => setActiveTab('home')} 
            icon={<Home size={24} />} 
            label="Home" 
          />
          <TabButton 
            active={activeTab === 'stats'} 
            onClick={() => setActiveTab('stats')} 
            icon={<BarChart3 size={24} />} 
            label="Stats" 
          />
          <TabButton 
            active={activeTab === 'achievements'} 
            onClick={() => setActiveTab('achievements')} 
            icon={<Trophy size={24} />} 
            label="Badges" 
          />
        </div>
      </nav>

      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-[#1E293B] border border-slate-700 rounded-[2rem] p-8 max-sm w-full shadow-2xl">
            <div className="bg-red-500/20 w-16 h-16 rounded-3xl flex items-center justify-center text-red-500 mb-6 mx-auto">
              <RotateCcw size={32} strokeWidth={3} />
            </div>
            <h3 className="text-2xl font-black text-center mb-3">Recaída?</h3>
            <p className="text-slate-400 text-center mb-8 text-sm leading-relaxed">
              O cronômetro e suas conquistas serão zerados. <br/>Não desanime, <strong>cada tentativa é um aprendizado!</strong>
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleResetSurvival}
                className="w-full py-4 rounded-2xl bg-[#EF4444] text-white font-black uppercase tracking-widest text-xs hover:bg-red-600 transition-colors active:scale-95"
              >
                Confirmar Reset
              </button>
              <button 
                onClick={() => setIsResetConfirmOpen(false)}
                className="w-full py-4 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 font-bold uppercase tracking-widest text-xs active:scale-95"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all duration-300 active:scale-90 ${active ? 'text-[#10B981]' : 'text-slate-500'}`}
  >
    <div className={`p-2 rounded-xl transition-all duration-300 ${active ? 'bg-emerald-500/10' : ''}`}>
      {icon}
    </div>
    <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'opacity-100' : 'opacity-60'}`}>
      {label}
    </span>
  </button>
);

export default App;
