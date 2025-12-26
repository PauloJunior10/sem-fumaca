
import React, { useState } from 'react';
import { Cigarette, Coins, Check } from 'lucide-react';

interface OnboardingProps {
  onComplete: (dailyGoal: number, pricePerPack: number) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [dailyGoal, setDailyGoal] = useState('');
  const [pricePerPack, setPricePerPack] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const goal = parseInt(dailyGoal, 10);
    const price = parseFloat(pricePerPack.replace(',', '.'));

    if (isNaN(goal) || goal <= 0 || isNaN(price) || price <= 0) {
      setError('Por favor, insira valores válidos e positivos.');
      return;
    }
    onComplete(goal, price);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="bg-[#1E293B] border border-slate-700 rounded-[2rem] p-8 max-w-sm w-full shadow-2xl text-center">
        <h2 className="text-2xl font-black text-slate-100 mb-2"> personalize sua jornada </h2>
        <p className="text-slate-400 text-sm mb-8">
          Responda duas perguntas rápidas para estatísticas mais precisas.
        </p>

        <div className="space-y-6 text-left">
          {/* Daily Goal Input */}
          <div>
            <label htmlFor="dailyGoal" className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-2">
              <Cigarette size={16} />
              Quantos cigarros você fuma por dia?
            </label>
            <input
              id="dailyGoal"
              type="number"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(e.target.value)}
              placeholder="Ex: 15"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Price Per Pack Input */}
          <div>
            <label htmlFor="pricePerPack" className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-2">
              <Coins size={16} />
              Qual o preço médio do maço?
            </label>
            <input
              id="pricePerPack"
              type="text"
              inputMode="decimal"
              value={pricePerPack}
              onChange={(e) => setPricePerPack(e.target.value)}
              placeholder="Ex: 12,50"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-xs mt-6">{error}</p>}

        <div className="mt-8">
          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-xl bg-emerald-600 text-white font-black uppercase tracking-widest text-sm hover:bg-emerald-500 transition-colors active:scale-95 flex items-center justify-center gap-2"
          >
            <Check size={18} />
            Salvar e Começar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
