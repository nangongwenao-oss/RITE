import React from 'react';
import { GlassCard } from './ui/GlassCard';
import { BookOpen, Skull, Zap } from 'lucide-react';

interface CapabilityTrainingProps {
  onBack: () => void;
}

const SEVEN_SINS = [
    { title: 'Greed (贪婪)', desc: 'Data theft simulation & Data Loss Prevention strategies.', level: 'Hard', xp: 500 },
    { title: 'Pride (傲慢)', desc: 'Misconfiguration exploits due to overconfidence.', level: 'Medium', xp: 350 },
    { title: 'Sloth (懒惰)', desc: 'Patch management failures and legacy system risks.', level: 'Easy', xp: 200 },
    { title: 'Envy (嫉妒)', desc: 'Insider threat detection and behavioral analysis.', level: 'Hard', xp: 600 },
];

export const CapabilityTraining: React.FC<CapabilityTrainingProps> = ({ onBack }) => {
  return (
    <div className="space-y-6 pb-20 p-4">
      <h2 className="text-2xl font-bold text-white">Capability Forge</h2>
      
      {/* Personalized Gap Filling */}
      <GlassCard title="Priority Gap: Strategic Research" className="border-red-500/30">
        <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-full bg-red-900/40 flex items-center justify-center border border-red-500/50">
                <Zap className="w-6 h-6 text-red-400" />
            </div>
            <div>
                <h4 className="font-bold text-sm text-white">Strategic Alignment 101</h4>
                <p className="text-xs text-gray-400 mt-1">Aligning cyber goals with business outcomes.</p>
                <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-red-500/20 text-red-300 text-[10px] rounded border border-red-500/20">Critical</span>
                    <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-[10px] rounded">20 min</span>
                </div>
            </div>
        </div>
      </GlassCard>

      <div className="flex items-center justify-between mt-6 mb-2">
         <h3 className="text-lg font-bold text-matrix-gold">Seven Deadly Sins (七宗罪)</h3>
         <span className="text-xs text-gray-400">Completion: 3/7</span>
      </div>

      <div className="space-y-3">
        {SEVEN_SINS.map((sin, idx) => (
            <GlassCard key={idx} className="active:scale-[0.98] transition-transform">
                <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                         <Skull className={`w-5 h-5 ${sin.level === 'Hard' ? 'text-red-400' : sin.level === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`} />
                         <div>
                             <h4 className="text-sm font-bold text-white">{sin.title}</h4>
                             <p className="text-xs text-gray-400 mt-1">{sin.desc}</p>
                         </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-matrix-gold font-mono text-xs">+{sin.xp} XP</span>
                        <button className="mt-2 text-[10px] border border-matrix-border px-2 py-1 rounded hover:bg-white/10">
                            DEPLOY
                        </button>
                    </div>
                </div>
            </GlassCard>
        ))}
      </div>

      <GlassCard title="Tech Frontier (Latest)" className="mt-6">
        <div className="space-y-3">
            <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-200">LLM Security Top 10 Risks</span>
            </div>
            <div className="flex items-center gap-3 pb-1">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-200">Quantum Safe Cryptography Migration</span>
            </div>
        </div>
      </GlassCard>
    </div>
  );
};