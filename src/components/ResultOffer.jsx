import React from 'react';
import {
  AlertTriangle, Gift, X, CheckCircle2, ChevronRight,
  RefreshCcw, Star, ShieldAlert, Zap, Clock, Cpu
} from 'lucide-react';

// ─── Configuración de generaciones de dispositivo ─────────────────────────────
const GENERATIONS = [
  {
    id: 'old',
    label: 'Muy antiguo',
    sublabel: 'Anterior a 2018',
    description: 'Hardware obsoleto, antenas sin soporte 4G/5G, rendimiento muy limitado.',
    emoji: '📟',
    range: '≤ 45 pts',
    color: 'var(--danger)',
    bg: 'rgba(255, 59, 48, 0.12)',
  },
  {
    id: 'mid',
    label: 'Relativamente actual',
    sublabel: '2018 – 2022',
    description: 'Soporte 4G parcial, antenas con limitaciones en bandas 5G y en interiores.',
    emoji: '📱',
    range: '46 – 80 pts',
    color: 'var(--warning)',
    bg: 'rgba(255, 184, 0, 0.12)',
  },
  {
    id: 'new',
    label: 'Último modelo',
    sublabel: '2023 en adelante',
    description: 'Hardware moderno, antenas 5G completas, máximo rendimiento en la red WOM.',
    emoji: '🚀',
    range: '≥ 81 pts',
    color: 'var(--success)',
    bg: 'rgba(0, 210, 106, 0.12)',
  },
];

// ─── Lógica de rangos ──────────────────────────────────────────────────────────
const getOfferConfig = (score) => {
  if (score <= 45) {
    return {
      tier: 'old',
      generationIdx: 0,
      label: 'Dispositivo muy antiguo',
      headerIcon: <ShieldAlert size={40} />,
      headerBg: 'rgba(255, 59, 48, 0.12)',
      headerColor: 'var(--danger)',
      headerTitle: 'Diagnóstico Crítico',
      headerSub: 'Tu equipo presenta fallas graves de hardware',
      antennaMsg: 'Las antenas de tu equipo son incompatibles con la red 4G/5G de WOM. La experiencia de conectividad se ve severamente afectada.',
      offerTitle: 'Oferta Especial para ti',
      offerBody: 'Sabemos que tu equipo te está fallando. Para que sigas disfrutando de la red más atrevida de Chile, te tenemos esta oferta irrechazable:',
      discountLabel: '45% Dcto.',
      discountSub: 'En un smartphone nuevo, pagando cómodamente en tu boleta mensual',
      ctaText: 'Renovar mi equipo ahora',
      accentColor: 'var(--danger)',
      gradientBg: 'linear-gradient(135deg, rgba(255,59,48,0.15) 0%, rgba(96,37,139,0.2) 100%)',
      borderColor: 'var(--danger)',
    };
  } else if (score <= 80) {
    return {
      tier: 'mid',
      generationIdx: 1,
      label: 'Dispositivo relativamente actual',
      headerIcon: <AlertTriangle size={40} />,
      headerBg: 'rgba(255, 184, 0, 0.12)',
      headerColor: 'var(--warning)',
      headerTitle: 'Diagnóstico Moderado',
      headerSub: 'Tu equipo puede mejorar su rendimiento en la red',
      antennaMsg: 'Tu equipo es de una generación intermedia. Sus módulos de antena limitan el acceso completo a la red 5G. Es posible que notes lentitud en zonas de alta cobertura.',
      offerTitle: 'Mejora tu experiencia',
      offerBody: 'Detectamos que tu equipo no está aprovechando al 100% nuestra red. Cambia a un dispositivo compatible y nota la diferencia desde el primer día:',
      discountLabel: '20% Dcto.',
      discountSub: 'En el cambio de tu teléfono por un modelo compatible con 5G',
      ctaText: 'Ver teléfonos compatibles',
      accentColor: 'var(--warning)',
      gradientBg: 'linear-gradient(135deg, rgba(255,184,0,0.12) 0%, rgba(96,37,139,0.2) 100%)',
      borderColor: 'var(--warning)',
    };
  } else {
    return {
      tier: 'new',
      generationIdx: 2,
      label: 'Dispositivo de último modelo',
      headerIcon: <Star size={40} />,
      headerBg: 'rgba(0, 210, 106, 0.12)',
      headerColor: 'var(--success)',
      headerTitle: '¡Tu equipo está top!',
      headerSub: 'Diagnóstico sin problemas críticos detectados',
      antennaMsg: 'Tus antenas y módulos de hardware son plenamente compatibles con nuestra red 5G. ¡Sigue disfrutando la mejor conexión de Chile!',
      offerTitle: '¡Un regalo de WOM para ti!',
      offerBody: 'Porque tienes un equipo de calidad y eres parte de nuestra familia, queremos premiar tu fidelidad con un beneficio exclusivo:',
      discountLabel: '10% Dcto.',
      discountSub: 'En tu boleta mensual durante los próximos 3 meses',
      ctaText: 'Activar mi descuento',
      accentColor: 'var(--success)',
      gradientBg: 'linear-gradient(135deg, rgba(0,210,106,0.12) 0%, rgba(96,37,139,0.2) 100%)',
      borderColor: 'var(--success)',
    };
  }
};

// ─── Tarjeta de generación del dispositivo ────────────────────────────────────
const DeviceGenerationCard = ({ activeIdx, accentColor }) => {
  return (
    <div className="card" style={{ padding: '18px 16px', marginBottom: '15px' }}>
      <p style={{
        fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px',
        textTransform: 'uppercase', letterSpacing: '1px'
      }}>
        Generación del dispositivo
      </p>

      {/* Línea de tiempo visual */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        {/* Línea conectora de fondo */}
        <div style={{
          position: 'absolute', top: '20px', left: '10%', right: '10%',
          height: '3px', backgroundColor: 'rgba(255,255,255,0.08)',
          borderRadius: '2px', zIndex: 0
        }} />
        {/* Línea de progreso activa */}
        <div style={{
          position: 'absolute', top: '20px', left: '10%',
          width: activeIdx === 0 ? '0%' : activeIdx === 1 ? '40%' : '80%',
          height: '3px', backgroundColor: accentColor,
          borderRadius: '2px', zIndex: 1,
          transition: 'width 1s ease-out',
          boxShadow: `0 0 8px ${accentColor}80`
        }} />

        {/* Nodos */}
        <div style={{ display: 'flex', justifyContent: 'space-around', position: 'relative', zIndex: 2 }}>
          {GENERATIONS.map((gen, idx) => {
            const isActive = idx === activeIdx;
            const isPast   = idx < activeIdx;
            return (
              <div
                key={gen.id}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%' }}
              >
                {/* Círculo del nodo */}
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  backgroundColor: isActive ? gen.color : isPast ? `${gen.color}40` : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${isActive ? gen.color : isPast ? `${gen.color}60` : 'rgba(255,255,255,0.1)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem', marginBottom: '10px',
                  boxShadow: isActive ? `0 0 16px ${gen.color}60` : 'none',
                  transition: 'all 0.4s ease',
                }}>
                  {gen.emoji}
                </div>
                {/* Etiqueta */}
                <p style={{
                  margin: 0, fontSize: '0.72rem', fontWeight: isActive ? 800 : 400,
                  color: isActive ? gen.color : 'var(--text-muted)',
                  textAlign: 'center', lineHeight: 1.3
                }}>
                  {gen.label}
                </p>
                <p style={{
                  margin: '3px 0 0', fontSize: '0.65rem',
                  color: isActive ? `${gen.color}cc` : 'rgba(255,255,255,0.2)',
                  textAlign: 'center'
                }}>
                  {gen.sublabel}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Descripción de la categoría activa */}
      <div style={{
        backgroundColor: `${GENERATIONS[activeIdx].color}12`,
        border: `1px solid ${GENERATIONS[activeIdx].color}40`,
        borderRadius: '12px', padding: '12px 14px',
        display: 'flex', gap: '10px', alignItems: 'flex-start'
      }}>
        <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{GENERATIONS[activeIdx].emoji}</span>
        <div>
          <p style={{ margin: '0 0 4px', fontWeight: 700, fontSize: '0.9rem', color: GENERATIONS[activeIdx].color }}>
            {GENERATIONS[activeIdx].label}
          </p>
          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {GENERATIONS[activeIdx].description}
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Fila de métrica individual ───────────────────────────────────────────────
const MetricRow = ({ label, value, status }) => {
  const color =
    status === 'ok'      ? 'var(--success)' :
    status === 'warning' ? 'var(--warning)' : 'var(--danger)';
  const StatusIcon = status === 'ok' ? CheckCircle2 : AlertTriangle;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
      <StatusIcon size={16} color={color} style={{ flexShrink: 0 }} />
      <span style={{ flex: 1, fontSize: '0.88rem', color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ fontWeight: 700, color, fontSize: '0.88rem' }}>{value}%</span>
    </div>
  );
};

// ─── Componente principal ─────────────────────────────────────────────────────
const ResultOffer = ({ score, onBackHome, onViewCatalog }) => {
  const safeScore = score ?? 50;
  const cfg = getOfferConfig(safeScore);

  // Métricas individuales derivadas del puntaje global (con variación pequeña)
  const seed = safeScore; // usamos el score como semilla pseudo-estable
  const batteryVal = Math.min(100, Math.max(10, seed + Math.round(Math.sin(seed * 3) * 10)));
  const networkVal = Math.min(100, Math.max(10, seed + Math.round(Math.cos(seed * 2) * 8)));
  const antennaVal = Math.min(100, Math.max(5,  seed + Math.round(Math.sin(seed * 5) * 15)));

  const getStatus = (v) => v >= 81 ? 'ok' : v >= 46 ? 'warning' : 'bad';

  return (
    <div
      className="results-container fade-in"
      style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflowY: 'auto' }}
    >
      {/* Botón cerrar */}
      <button
        onClick={onBackHome}
        style={{ position: 'absolute', top: '20px', right: '20px', color: 'var(--text-muted)', zIndex: 10 }}
      >
        <X size={24} />
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '30px' }}>

        {/* Cabecera dinámica */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '76px', height: '76px', borderRadius: '50%',
            backgroundColor: cfg.headerBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px', color: cfg.headerColor,
            boxShadow: `0 0 20px ${cfg.accentColor}30`
          }}>
            {cfg.headerIcon}
          </div>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '5px' }}>{cfg.headerTitle}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{cfg.headerSub}</p>
        </div>

        {/* Puntaje global */}
        <div className="card" style={{ padding: '14px 18px', marginBottom: '15px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Puntaje de hardware
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '4px', marginBottom: '10px' }}>
            <span style={{ fontSize: '3rem', fontWeight: 900, color: cfg.accentColor, lineHeight: 1 }}>
              {safeScore}
            </span>
            <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>/100</span>
          </div>
          <div style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              width: `${safeScore}%`, height: '100%',
              background: `linear-gradient(90deg, ${cfg.borderColor}, ${cfg.accentColor})`,
              borderRadius: '4px', boxShadow: `0 0 8px ${cfg.accentColor}60`
            }} />
          </div>
          <p style={{ fontSize: '0.8rem', color: cfg.accentColor, marginTop: '8px', fontWeight: 700 }}>
            {cfg.label}
          </p>
        </div>

        {/* ⭐ NUEVA Tarjeta de generación del dispositivo */}
        <DeviceGenerationCard activeIdx={cfg.generationIdx} accentColor={cfg.accentColor} />

        {/* Detalle de métricas */}
        <div className="card" style={{ padding: '14px 16px', marginBottom: '15px' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Detalle del diagnóstico
          </p>
          <MetricRow label="Conexión de red WOM"  value={networkVal}  status={getStatus(networkVal)} />
          <MetricRow label="Salud de batería"      value={batteryVal}  status={getStatus(batteryVal)} />
          <MetricRow label="Módulo de antena / RF" value={antennaVal}  status={getStatus(antennaVal)} />

          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '12px', marginTop: '8px',
            display: 'flex', gap: '10px', alignItems: 'flex-start'
          }}>
            <AlertTriangle size={15} color={cfg.accentColor} style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
              {cfg.antennaMsg}
            </p>
          </div>
        </div>

        {/* Oferta Comercial */}
        <div
          className="card"
          style={{
            background: cfg.gradientBg,
            border: `1px solid ${cfg.borderColor}`,
            marginBottom: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ backgroundColor: cfg.accentColor, padding: '6px', borderRadius: '8px' }}>
              <Gift size={20} color="white" />
            </div>
            <h3 style={{ fontSize: '1.05rem', margin: 0 }}>{cfg.offerTitle}</h3>
          </div>

          <p style={{ fontSize: '0.88rem', marginBottom: '14px', lineHeight: 1.5, color: 'var(--text-muted)' }}>
            {cfg.offerBody}
          </p>

          <div style={{
            backgroundColor: 'rgba(0,0,0,0.3)', padding: '14px', borderRadius: '12px',
            textAlign: 'center', marginBottom: '15px',
            border: `1px solid ${cfg.borderColor}40`
          }}>
            <h2 style={{ color: cfg.accentColor, margin: '0 0 4px', fontSize: '2rem', fontWeight: 900 }}>
              {cfg.discountLabel}
            </h2>
            <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              {cfg.discountSub}
            </p>
          </div>

          <button
            className="btn-primary"
            onClick={onViewCatalog}
            style={{ marginBottom: '10px', background: `linear-gradient(135deg, ${cfg.accentColor}, var(--secondary))` }}
          >
            {cfg.ctaText} <ChevronRight size={20} />
          </button>
          <button
            className="btn-secondary"
            onClick={onBackHome}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
          >
            <RefreshCcw size={18} /> Volver al inicio
          </button>
        </div>

      </div>
    </div>
  );
};

export default ResultOffer;
