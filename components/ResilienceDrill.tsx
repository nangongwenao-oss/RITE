import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { DRILL_SCENARIOS } from '../constants';
import { Play, Activity, FileText, Loader2, RefreshCw } from 'lucide-react';
import { generateDrillReport } from '../services/geminiService';
import { DrillResult } from '../types';

export const ResilienceDrill: React.FC = () => {
  const [activeDrill, setActiveDrill] = useState<string | null>(null);
  const [isDrilling, setIsDrilling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<DrillResult | null>(null);
  const [aiReport, setAiReport] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);

  const startDrill = (id: string) => {
    setActiveDrill(id);
    setIsDrilling(true);
    setProgress(0);
    setResult(null);
    setAiReport('');

    // Simulate Drill Progress
    const interval = setInterval(() => {
        setProgress(prev => {
            if (prev >= 100) {
                clearInterval(interval);
                finishDrill();
                return 100;
            }
            return prev + 5;
        });
    }, 150);
  };

  const finishDrill = () => {
    setIsDrilling(false);
    // Mock Result Generation based on "User Skill"
    setResult({
        mttr: Math.floor(Math.random() * 40) + 10,
        mttd: Math.floor(Math.random() * 10) + 2,
        decisionScore: Math.floor(Math.random() * 30) + 60,
    });
  };

  const handleGenerateAIReport = async () => {
    if (!result || !activeDrill) return;
    setLoadingAi(true);
    const scenario = DRILL_SCENARIOS.find(s => s.id === activeDrill);
    const report = await generateDrillReport(scenario?.title || "Unknown Drill", result);
    setAiReport(report);
    setLoadingAi(false);
  };

  const reset = () => {
      setActiveDrill(null);
      setResult(null);
  };

  if (activeDrill && isDrilling) {
      return (
          <div className="flex flex-col items-center justify-center h-[80vh] p-6 space-y-6">
              <Activity className="w-16 h-16 text-red-500 animate-pulse" />
              <h2 className="text-xl font-bold text-white uppercase tracking-widest text-center">
                  Simulation In Progress
              </h2>
              <p className="text-matrix-gold font-mono">{DRILL_SCENARIOS.find(s => s.id === activeDrill)?.title}</p>
              
              <div className="w-full bg-gray-800 h-4 rounded-full overflow-hidden border border-gray-600">
                  <div 
                    className="bg-red-600 h-full transition-all duration-300 relative" 
                    style={{width: `${progress}%`}}
                  >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
              </div>
              <p className="text-xs text-gray-400 font-mono">Injecting various attack vectors...</p>
          </div>
      )
  }

  if (result) {
      return (
          <div className="p-4 space-y-6 pb-20">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">After Action Report</h2>
                <button onClick={reset} className="p-2 bg-white/5 rounded-full"><RefreshCw className="w-4 h-4 text-gray-400"/></button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                  <GlassCard className="flex flex-col items-center justify-center py-4 bg-green-900/10 border-green-500/30">
                      <span className="text-gray-400 text-[10px] uppercase">MTTD (min)</span>
                      <span className="text-2xl font-bold text-matrix-green">{result.mttd}</span>
                  </GlassCard>
                  <GlassCard className="flex flex-col items-center justify-center py-4 bg-yellow-900/10 border-yellow-500/30">
                      <span className="text-gray-400 text-[10px] uppercase">MTTR (min)</span>
                      <span className="text-2xl font-bold text-matrix-gold">{result.mttr}</span>
                  </GlassCard>
                  <GlassCard className="flex flex-col items-center justify-center py-4 bg-blue-900/10 border-blue-500/30">
                      <span className="text-gray-400 text-[10px] uppercase">Score</span>
                      <span className="text-2xl font-bold text-blue-400">{result.decisionScore}</span>
                  </GlassCard>
              </div>

              <GlassCard title="AI Commander Analysis" className="min-h-[200px]">
                  {!aiReport ? (
                      <div className="text-center py-8">
                          <p className="text-sm text-gray-400 mb-4">Generate a comprehensive analysis using RITE logic.</p>
                          <button 
                            onClick={handleGenerateAIReport}
                            disabled={loadingAi}
                            className="bg-matrix-gold text-black font-bold text-sm px-6 py-2 rounded shadow-[0_0_15px_rgba(255,215,0,0.3)] flex items-center gap-2 mx-auto disabled:opacity-50"
                          >
                             {loadingAi ? <Loader2 className="animate-spin w-4 h4" /> : <FileText className="w-4 h-4" />}
                             Generate Analysis
                          </button>
                      </div>
                  ) : (
                      <div className="text-sm text-gray-300 leading-relaxed font-mono whitespace-pre-wrap">
                          {aiReport}
                      </div>
                  )}
              </GlassCard>
          </div>
      )
  }

  return (
    <div className="space-y-6 pb-20 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">War Games</h2>
        <div className="px-2 py-1 bg-red-500/20 border border-red-500/50 rounded text-[10px] text-red-300 font-bold uppercase animate-pulse">
            Live Range Active
        </div>
      </div>
      
      <p className="text-xs text-gray-400 mb-4">Select a scenario to test your resilience metrics (MTTD/MTTR).</p>

      <div className="space-y-4">
        {DRILL_SCENARIOS.map((drill) => (
            <GlassCard key={drill.id} className="group cursor-pointer hover:border-matrix-gold transition-colors" >
                <div className="flex justify-between items-center">
                    <div>
                        <div className="flex gap-2 items-center mb-1">
                            <h3 className="text-sm font-bold text-white group-hover:text-matrix-gold transition-colors">{drill.title}</h3>
                            <span className={`text-[10px] px-1.5 rounded border ${
                                drill.difficulty === 'Hard' ? 'border-red-500 text-red-500' : 'border-yellow-500 text-yellow-500'
                            }`}>{drill.difficulty}</span>
                        </div>
                        <p className="text-xs text-gray-400 w-5/6">{drill.description}</p>
                    </div>
                    <button 
                        onClick={() => startDrill(drill.id)}
                        className="h-10 w-10 rounded-full bg-matrix-base border border-matrix-border flex items-center justify-center group-hover:bg-matrix-gold group-hover:text-black transition-all"
                    >
                        <Play className="w-4 h-4 fill-current" />
                    </button>
                </div>
            </GlassCard>
        ))}
      </div>

      <GlassCard title="Competitions (竞演)">
        <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-xs text-gray-300">1. CyberRITE Global Cup</span>
            <span className="text-xs font-mono text-matrix-gold">Rank: 42</span>
        </div>
        <div className="flex justify-between items-center py-2">
            <span className="text-xs text-gray-300">2. Internal Red Team Ops</span>
            <span className="text-xs font-mono text-gray-500">Pending</span>
        </div>
      </GlassCard>
    </div>
  );
};