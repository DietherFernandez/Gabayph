import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Home, Search } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  const { navigate, openSearchModal } = useApp();

  return (
    <div className="py-12 max-w-lg mx-auto text-center space-y-4 animate-in fade-in duration-200">
      <div className="w-16 h-16 rounded-full bg-ios-navy/10 dark:bg-blue-900/30 text-ios-navy dark:text-blue-400 flex items-center justify-center mx-auto mb-2">
        <Compass className="w-8 h-8" />
      </div>

      <span className="text-xs font-bold uppercase tracking-wider text-red-500 bg-red-50 dark:bg-red-950/50 px-2.5 py-1 rounded-full">
        Error 404: Pahina ay Hindi Nahanap
      </span>

      <h1 className="text-2xl font-bold text-ios-lightText dark:text-ios-darkText tracking-tight">
        Nawawala ba ang iyong hinahanap?
      </h1>

      <p className="text-xs sm:text-sm text-ios-lightMuted dark:text-ios-darkMuted leading-relaxed max-w-sm mx-auto">
        Paumanhin, ang pahinang iyong tinutungo ay hindi umiiral o nailipat sa ibang seksyon ng GabayPH directory.
      </p>

      <div className="flex items-center justify-center gap-2 pt-2">
        <Button variant="primary" size="md" onClick={() => navigate('/')}>
          <Home className="w-4 h-4" /> Bumalik sa Home
        </Button>
        <Button variant="secondary" size="md" onClick={openSearchModal}>
          <Search className="w-4 h-4" /> Maghanap ng Serbisyo
        </Button>
      </div>
    </div>
  );
};
