import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Radio, BatteryMedium, ShieldCheck, ArrowLeft, Loader, Thermometer } from 'lucide-react';

// Genera un puntaje aleatorio entre min y max (inclusive)
const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Simula métricas de hardware del dispositivo
const generateDeviceMetrics = () => {
  const antennaScore  = randomBetween(0, 100);
  const cpuScore      = randomBetween(0, 100);
  const batteryScore  = randomBetween(0, 100);
  const networkScore  = randomBetween(0, 100);
  // Promedio ponderado: la antena tiene más peso (40%), cpu (30%), batería (15%), red (15%)
  const overall = Math.round(
    antennaScore * 0.40 +
    cpuScore     * 0.30 +
    batteryScore * 0.15 +
    networkScore * 0.15
  );
  return { antennaScore, cpuScore, batteryScore, networkScore, overall };
};

const DiagnosticScanner = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  // Generamos las métricas UNA SOLA VEZ al montar el componente
  const metricsRef = useRef(generateDeviceMetrics());

  const steps = [
    { id: 0, text: 'Iniciando diagnóstico del equipo...', icon: <ShieldCheck size={24} /> },
    { id: 1, text: 'Comprobando conexión a red WOM 5G...', icon: <Radio size={24} /> },
    { id: 2, text: 'Revisando salud de la batería...', icon: <BatteryMedium size={24} /> },
    { id: 3, text: 'Analizando módulos de antena y hardware...', icon: <Cpu size={24} /> },
    { id: 4, text: 'Generando reporte de diagnóstico...', icon: <Loader size={24} className="spin" /> },
  ];

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setProgress(((currentStep + 1) / (steps.length - 1)) * 100);
      }, 2200);
      return () => clearTimeout(timer);
    } else {
      setProgress(100);
      const timer = setTimeout(() => {
        // Enviamos el puntaje final a App.jsx
        onComplete(metricsRef.current.overall);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [currentStep, onComplete, steps.length]);

  return (
    <div className="diagnostic-container fade-in" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', marginTop: '10px' }}>
        <button onClick={onCancel} style={{ marginRight: '15px', color: 'white' }}>
          <ArrowLeft size={24} />
        </button>
        <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Diagnóstico de Equipo</h2>
      </header>

      {/* Escáner Circular */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '-40px' }}>

        <div style={{ position: 'relative', width: '200px', height: '200px', marginBottom: '40px' }}>
          {/* Anillo exterior pulsante */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            borderRadius: '50%', border: '2px solid var(--primary)',
            opacity: 0.3, animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
          }} />
          {/* Anillo giratorio */}
          <div style={{
            position: 'absolute', top: '15px', left: '15px', right: '15px', bottom: '15px',
            borderRadius: '50%', border: '2px dashed var(--secondary)',
            animation: 'spin 10s linear infinite'
          }} />
          {/* Círculo central con ícono */}
          <div style={{
            position: 'absolute', top: '30px', left: '30px', right: '30px', bottom: '30px',
            borderRadius: '50%', backgroundColor: 'var(--bg-card)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 30px var(--primary-glow)', zIndex: 10
          }}>
            <div style={{ color: 'var(--primary)', animation: 'pulse 2s infinite' }}>
              {steps[currentStep].icon}
            </div>
          </div>
        </div>

        {/* Texto del paso actual */}
        <h3 key={currentStep} style={{ textAlign: 'center', marginBottom: '8px', fontSize: '1rem', animation: 'fadeIn 0.3s ease-out' }}>
          {steps[currentStep].text}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '25px' }}>
          Paso {currentStep + 1} de {steps.length}
        </p>

        {/* Barra de progreso */}
        <div style={{ width: '80%', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{
            width: `${progress}%`, height: '100%',
            background: 'linear-gradient(90deg, var(--secondary), var(--primary))',
            transition: 'width 0.5s ease-out'
          }} />
        </div>
        <p style={{ marginTop: '10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {Math.round(progress)}%
        </p>

      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ping {
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        .spin {
          animation: spin 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default DiagnosticScanner;
