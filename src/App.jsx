import { useState } from 'react';
import Home from './components/Home';
import DiagnosticScanner from './components/DiagnosticScanner';
import ResultOffer from './components/ResultOffer';
import PhoneCatalog from './components/PhoneCatalog';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [deviceScore, setDeviceScore] = useState(null);

  // Deriva el tier a partir del score para pasarlo al catálogo
  const getTier = (score) => {
    if (score === null) return 'mid';
    if (score <= 45) return 'bad';
    if (score <= 80) return 'mid';
    return 'good';
  };

  const goToDiagnostic = () => setCurrentScreen('diagnostic');

  const goToResults = (score) => {
    setDeviceScore(score);
    setCurrentScreen('results');
  };

  const goToCatalog = () => setCurrentScreen('catalog');

  const goHome = () => {
    setDeviceScore(null);
    setCurrentScreen('home');
  };

  return (
    <>
      {currentScreen === 'home' && (
        <Home onStartDiagnostic={goToDiagnostic} />
      )}
      {currentScreen === 'diagnostic' && (
        <DiagnosticScanner onComplete={goToResults} onCancel={goHome} />
      )}
      {currentScreen === 'results' && (
        <ResultOffer
          score={deviceScore}
          onBackHome={goHome}
          onViewCatalog={goToCatalog}
        />
      )}
      {currentScreen === 'catalog' && (
        <PhoneCatalog
          tier={getTier(deviceScore)}
          onBack={() => setCurrentScreen('results')}
        />
      )}
    </>
  );
}

export default App;
