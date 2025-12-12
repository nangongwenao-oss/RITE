import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { GlassCard } from './ui/GlassCard';
import { BADGES, QUOTES } from '../constants';
import { Award, UserPlus } from 'lucide-react';

const historyData = [
  { month: 'Jan', score: 45 },
  { month: 'Feb', score: 50 },
  { month: 'Mar', score: 55 },
  { month: 'Apr', score: 52 },
  { month: 'May', score: 60 },
  { month: 'Jun', score: 68 },
];

export const LearningArchive: React.FC = () => {
  const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  return (
    <div className="space-y-6 pb-20 p-4">
      <h2 className="text-2xl font-bold text-white">Personnel Dossier</h2>

      <GlassCard title="Spiral Ascent (Capability History)" className="h-[250px]">
         <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyData}>
                <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#19233C', borderColor: '#FFD700', fontSize: '12px' }} 
                    itemStyle={{ color: '#FFD700' }}
                />
                <Line type="monotone" dataKey="score" stroke="#00C853" strokeWidth={2} dot={{ r: 3, fill: '#00C853' }} activeDot={{ r: 6, fill: '#FFD700' }} />
            </LineChart>
         </ResponsiveContainer>
      </GlassCard>

      <GlassCard title="Honors & Badges">
          <div className="flex gap-4 overflow-x-auto pb-2">
              {BADGES.map(badge => (
                  <div key={badge.id} className={`flex flex-col items-center min-w-[80px] p-2 rounded border ${badge.earned ? 'bg-matrix-gold/10 border-matrix-gold/50' : 'bg-white/5 border-white/5 opacity-50'}`}>
                      <span className="text-2xl mb-1 grayscale-0">{badge.icon}</span>
                      <span className="text-[10px] text-center leading-tight text-gray-300">{badge.name}</span>
                  </div>
              ))}
          </div>
      </GlassCard>

      <GlassCard title="Passing the Torch (薪火相传)">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-blue-500/20 rounded-full">
                 <UserPlus className="w-6 h-6 text-blue-400" />
             </div>
             <div>
                 <p className="text-sm text-gray-300">Mentorship Contribution</p>
                 <div className="text-2xl font-bold text-white">12 <span className="text-xs font-normal text-gray-500">hours this month</span></div>
             </div>
          </div>
      </GlassCard>

      <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center italic text-gray-400 text-sm">
          "{randomQuote}"
      </div>
    </div>
  );
};