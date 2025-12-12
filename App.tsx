import React, { useState } from 'react';
import { ViewState } from './types';
import { LoginScreen } from './components/LoginScreen';
import { RITEDashboard } from './components/RITEDashboard';
import { CapabilityTraining } from './components/CapabilityTraining';
import { ResilienceDrill } from './components/ResilienceDrill';
import { LearningArchive } from './components/LearningArchive';
import { LayoutDashboard, Target, ShieldAlert, FileText } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.BENCHMARK);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.BENCHMARK:
        return <RITEDashboard onNavigateToTraining={() => setCurrentView(ViewState.TRAINING)} />;
      case ViewState.TRAINING:
        return <CapabilityTraining onBack={() => setCurrentView(ViewState.BENCHMARK)} />;
      case ViewState.DRILL:
        return <ResilienceDrill />;
      case ViewState.ARCHIVE:
        return <LearningArchive />;
      default:
        return <RITEDashboard onNavigateToTraining={() => setCurrentView(ViewState.TRAINING)} />;
    }
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-matrix-base text-white font-sans selection:bg-matrix-gold selection:text-black">
      {/* Main Content Area */}
      <main className="max-w-md mx-auto min-h-screen relative shadow-2xl bg-[#1a243d]">
        {/* Top Status Bar Decoration */}
        <div className="h-1 w-full bg-gradient-to-r from-matrix-base via-matrix-gold to-matrix-base"></div>
        
        {renderContent()}

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-[#161e33]/90 backdrop-blur-lg border-t border-white/10 max-w-md mx-auto z-50">
          <div className="flex justify-around items-center h-16">
            <button 
              onClick={() => setCurrentView(ViewState.BENCHMARK)}
              className={`flex flex-col items-center p-2 transition-colors ${currentView === ViewState.BENCHMARK ? 'text-matrix-gold' : 'text-gray-500'}`}
            >
              <LayoutDashboard className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium">RITE</span>
            </button>
            <button 
              onClick={() => setCurrentView(ViewState.TRAINING)}
              className={`flex flex-col items-center p-2 transition-colors ${currentView === ViewState.TRAINING ? 'text-matrix-gold' : 'text-gray-500'}`}
            >
              <Target className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium">Train</span>
            </button>
            <button 
              onClick={() => setCurrentView(ViewState.DRILL)}
              className={`flex flex-col items-center p-2 transition-colors ${currentView === ViewState.DRILL ? 'text-matrix-gold' : 'text-gray-500'}`}
            >
              <ShieldAlert className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium">Drill</span>
            </button>
            <button 
              onClick={() => setCurrentView(ViewState.ARCHIVE)}
              className={`flex flex-col items-center p-2 transition-colors ${currentView === ViewState.ARCHIVE ? 'text-matrix-gold' : 'text-gray-500'}`}
            >
              <FileText className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium">Archive</span>
            </button>
          </div>
        </nav>
      </main>
    </div>
  );
};

export default App;