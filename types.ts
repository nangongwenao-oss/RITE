export enum ViewState {
  LOGIN = 'LOGIN',
  BENCHMARK = 'BENCHMARK',
  TRAINING = 'TRAINING',
  DRILL = 'DRILL',
  ARCHIVE = 'ARCHIVE'
}

export interface RITEScore {
  resilience: number;
  integration: number;
  technology: number;
  offenseDefense: number;
  talent: number;
}

export interface SixViewsScore {
  process: number;
  effect: number;
  method: number;
  risk: number;
  compliance: number;
  culture: number;
}

export interface DrillScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'APT' | 'Ransomware' | 'DDoS';
}

export interface DrillResult {
  mttr: number; // Minutes
  mttd: number; // Minutes
  decisionScore: number;
  aiAnalysis?: string;
}

export interface LearningBadge {
  id: string;
  name: string;
  icon: string;
  earned: boolean;
  date?: string;
}