import { RITEScore, SixViewsScore, DrillScenario, LearningBadge } from './types';

// RITE Model Radar Data
export const USER_RITE_SCORE: RITEScore = {
  resilience: 65,
  integration: 45, // Low score to trigger recommendation
  technology: 80,
  offenseDefense: 85,
  talent: 50
};

export const INDUSTRY_AVG_SCORE: RITEScore = {
  resilience: 60,
  integration: 60,
  technology: 65,
  offenseDefense: 60,
  talent: 55
};

export const TARGET_SCORE: RITEScore = {
  resilience: 90,
  integration: 90,
  technology: 90,
  offenseDefense: 90,
  talent: 90
};

export const USER_SIX_VIEWS: SixViewsScore = {
  process: 72,
  effect: 68,
  method: 85,
  risk: 60,
  compliance: 90,
  culture: 55
};

export const DRILL_SCENARIOS: DrillScenario[] = [
  {
    id: '1',
    title: 'APT29 Supply Chain Attack',
    description: 'Simulate a sophisticated supply chain compromise in the CI/CD pipeline.',
    difficulty: 'Hard',
    type: 'APT'
  },
  {
    id: '2',
    title: 'LockBit 3.0 Ransomware',
    description: 'Critical database encryption incident. Negotiate or Restore?',
    difficulty: 'Hard',
    type: 'Ransomware'
  },
  {
    id: '3',
    title: 'Holiday DDoS Flood',
    description: 'L7 HTTP Flood targeting the authentication gateway during peak hours.',
    difficulty: 'Medium',
    type: 'DDoS'
  }
];

export const BADGES: LearningBadge[] = [
  { id: '1', name: 'System Integration Master', icon: '🔗', earned: false },
  { id: '2', name: 'RITE Leader', icon: '🏆', earned: true, date: '2023-10-15' },
  { id: '3', name: 'Defender of the Realm', icon: '🛡️', earned: true, date: '2023-11-01' },
];

export const QUOTES = [
  "Be prepared for danger in times of peace. — Wei Zheng",
  "The supreme art of war is to subdue the enemy without fighting. — Sun Tzu",
  "Resilience is not just bouncing back, it's bouncing forward.",
];