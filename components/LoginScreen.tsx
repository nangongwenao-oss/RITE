import React, { useState } from 'react';
import { Lock, User, ShieldCheck } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate Network Delay for Security
    setTimeout(() => {
      if (username === 'luoyuan881105' && password === '123456') {
        onLogin();
      } else {
        setError('Invalid credentials. Access Denied.');
        // Haptic feedback simulation
        if (navigator.vibrate) navigator.vibrate(200);
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-matrix-base relative p-6">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-matrix-gold rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-matrix-green rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
      </div>

      <div className="mb-8 text-center z-10">
        <div className="flex justify-center mb-4">
            <ShieldCheck className="w-16 h-16 text-matrix-gold" />
        </div>
        <h1 className="text-3xl font-bold text-white tracking-widest">CyberRITE</h1>
        <p className="text-gray-400 text-sm mt-2">Digital Resilience Leadership Platform</p>
      </div>

      <GlassCard className="w-full max-w-sm z-10">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs uppercase text-gray-400 mb-1">Identity</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-matrix-base/50 border border-matrix-border rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-matrix-gold transition-colors"
                placeholder="Username"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase text-gray-400 mb-1">Key</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-matrix-base/50 border border-matrix-border rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-matrix-gold transition-colors"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-500/50 text-red-200 text-xs p-3 rounded flex items-center">
              <span className="mr-2">⚠️</span> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold uppercase tracking-wider text-sm transition-all duration-300 ${
              loading
                ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                : 'bg-gradient-to-r from-matrix-gold to-yellow-600 text-black hover:shadow-[0_0_15px_rgba(255,215,0,0.5)]'
            }`}
          >
            {loading ? 'Authenticating...' : 'Access System'}
          </button>
        </form>
      </GlassCard>

      <p className="mt-8 text-xs text-gray-600">Restricted Access. Authorized Personnel Only.</p>
    </div>
  );
};