import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { GlassCard } from './ui/GlassCard';
import { USER_RITE_SCORE, INDUSTRY_AVG_SCORE, TARGET_SCORE, USER_SIX_VIEWS } from '../constants';
import { AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

const data = [
  { subject: 'Resilience', A: USER_RITE_SCORE.resilience, B: INDUSTRY_AVG_SCORE.resilience, C: TARGET_SCORE.resilience, fullMark: 100 },
  { subject: 'Integration', A: USER_RITE_SCORE.integration, B: INDUSTRY_AVG_SCORE.integration, C: TARGET_SCORE.integration, fullMark: 100 },
  { subject: 'Technology', A: USER_RITE_SCORE.technology, B: INDUSTRY_AVG_SCORE.technology, C: TARGET_SCORE.technology, fullMark: 100 },
  { subject: 'Offense/Def', A: USER_RITE_SCORE.offenseDefense, B: INDUSTRY_AVG_SCORE.offenseDefense, C: TARGET_SCORE.offenseDefense, fullMark: 100 },
  { subject: 'Talent', A: USER_RITE_SCORE.talent, B: INDUSTRY_AVG_SCORE.talent, C: TARGET_SCORE.talent, fullMark: 100 },
];

interface RITEDashboardProps {
    onNavigateToTraining: () => void;
}

export const RITEDashboard: React.FC<RITEDashboardProps> = ({ onNavigateToTraining }) => {
  return (
    <div className="space-y-6 pb-20 p-4">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-2xl font-bold text-white">RITE Matrix</h2>
           <p className="text-gray-400 text-xs">Leadership Capability Assessment</p>
        </div>
        <div className="text-right">
            <span className="text-2xl font-mono text-matrix-gold">68.2</span>
            <p className="text-gray-500 text-[10px] uppercase">Composite Score</p>
        </div>
      </div>

      <GlassCard title="Capability Radar" className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#2C3E50" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar name="My Score" dataKey="A" stroke="#00C853" fill="#00C853" fillOpacity={0.4} />
            <Radar name="Industry" dataKey="B" stroke="#64748b" strokeDasharray="3 3" fill="transparent" />
            <Radar name="Target (Top 10%)" dataKey="C" stroke="#FFD700" fill="transparent" />
            <Legend wrapperStyle={{ fontSize: '10px', marginTop: '10px' }} />
          </RadarChart>
        </ResponsiveContainer>
      </GlassCard>

      <GlassCard title="Six Views Assessment (六个看)">
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(USER_SIX_VIEWS).map(([key, score]) => (
            <div key={key} className="flex flex-col p-2 bg-white/5 rounded border border-white/5">
                <div className="flex justify-between mb-1">
                    <span className="text-[10px] uppercase text-gray-400">View of {key}</span>
                    <span className={`text-xs font-bold ${score >= 80 ? 'text-matrix-green' : score < 60 ? 'text-red-400' : 'text-matrix-gold'}`}>{score}</span>
                </div>
                <div className="w-full bg-gray-700 h-1 rounded-full">
                    <div className={`h-1 rounded-full ${score >= 80 ? 'bg-matrix-green' : score < 60 ? 'bg-red-400' : 'bg-matrix-gold'}`} style={{ width: `${score}%`}}></div>
                </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* AI Insight */}
      <GlassCard className="bg-gradient-to-r from-matrix-base to-blue-900/20 border-blue-500/30">
        <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-500/20 rounded-full">
                <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div>
                <h4 className="text-sm font-bold text-blue-100 mb-1">AI System Analysis</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                    Critical gap detected in <span className="text-red-300 font-bold">Integration</span> capability. 
                    You are 15 points below industry average. 
                    Recommended immediate action: Review "Seven Sins" module regarding 'Silos'.
                </p>
                <button 
                    onClick={onNavigateToTraining}
                    className="mt-3 text-xs bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded text-white transition-colors"
                >
                    Start Remediation Plan
                </button>
            </div>
        </div>
      </GlassCard>
    </div>
  );
};