
import React, { useState, useEffect } from 'react';

interface TimerProps {
  startTime: number;
}

const Timer: React.FC<TimerProps> = ({ startTime }) => {
  const [elapsed, setElapsed] = useState(Date.now() - startTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
  const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex justify-center items-center gap-2 md:gap-4 text-white">
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-6xl font-black tracking-tighter tabular-nums">{format(days)}</span>
        <span className="text-[10px] text-emerald-500 uppercase font-black tracking-widest mt-2">Dias</span>
      </div>
      <span className="text-2xl font-black opacity-10 pb-6">:</span>
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-6xl font-black tracking-tighter tabular-nums">{format(hours)}</span>
        <span className="text-[10px] text-emerald-500 uppercase font-black tracking-widest mt-2">Hrs</span>
      </div>
      <span className="text-2xl font-black opacity-10 pb-6">:</span>
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-6xl font-black tracking-tighter tabular-nums">{format(minutes)}</span>
        <span className="text-[10px] text-emerald-500 uppercase font-black tracking-widest mt-2">Min</span>
      </div>
      <span className="text-2xl font-black opacity-10 pb-6">:</span>
      <div className="flex flex-col items-center">
        <span className="text-3xl md:text-5xl font-black tracking-tighter tabular-nums text-emerald-500/60">{format(seconds)}</span>
        <span className="text-[10px] text-emerald-500/40 uppercase font-black tracking-widest mt-2">Seg</span>
      </div>
    </div>
  );
};

export default Timer;
