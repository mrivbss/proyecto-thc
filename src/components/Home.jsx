import React from 'react';
import { Smartphone, Battery, Signal, Zap, ChevronRight, User } from 'lucide-react';

const Home = ({ onStartDiagnostic }) => {
  return (
    <div className="home-container fade-in" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', marginTop: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: 'var(--bg-card)', padding: '10px', borderRadius: '50%', border: '1px solid var(--secondary)' }}>
            <User size={24} color="var(--primary)" />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Hola,</p>
            <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Usuario WOM</h2>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Signal size={20} />
          <Battery size={20} />
        </div>
      </header>

      {/* Saldo y Gigas */}
      <div className="card" style={{ textAlign: 'center', padding: '30px 20px', borderTop: '4px solid var(--primary)' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '10px', fontSize: '0.9rem' }}>Tus Gigas Disponibles</p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '5px' }}>
          <h1 style={{ fontSize: '3.5rem', margin: 0, color: 'var(--text-main)' }}>85</h1>
          <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>GB</span>
        </div>
        <p style={{ marginTop: '15px', fontSize: '0.9rem' }}>Renueva en 15 días</p>
        
        <div style={{ marginTop: '25px', height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: '65%', height: '100%', backgroundColor: 'var(--primary)', borderRadius: '4px' }}></div>
        </div>
      </div>

      {/* Banner de Diagnóstico (El nuevo feature) */}
      <div 
        className="card" 
        style={{ 
          background: 'linear-gradient(145deg, #2a0a38 0%, #150524 100%)', 
          border: '1px solid var(--primary)', 
          marginTop: '10px',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
        onClick={onStartDiagnostic}
      >
        <div style={{ position: 'absolute', right: '-20px', top: '-20px', opacity: 0.1 }}>
          <Zap size={120} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ backgroundColor: 'var(--primary)', padding: '8px', borderRadius: '12px' }}>
              <Smartphone size={20} color="white" />
            </div>
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>¿Problemas de Señal?</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '10px' }}>
            Analiza el estado de tu equipo en segundos para mejorar tu conexión.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.95rem' }}>
            Iniciar Diagnóstico <ChevronRight size={18} />
          </div>
        </div>
      </div>

      {/* Otras opciones (Mock) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
        <div className="card" style={{ padding: '15px', textAlign: 'center', marginBottom: 0 }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>Pagar Cuenta</p>
        </div>
        <div className="card" style={{ padding: '15px', textAlign: 'center', marginBottom: 0 }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>Comprar Bolsa</p>
        </div>
      </div>

    </div>
  );
};

export default Home;
