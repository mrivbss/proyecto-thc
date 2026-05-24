import React from 'react';
import { ArrowLeft, ShoppingCart, CheckCircle2, Zap, Star } from 'lucide-react';

// ─── Datos de teléfonos ───────────────────────────────────────────────────────
// Precios originales en CLP
const ALL_PHONES = {
  iphone17promax: {
    id: 'iphone17promax',
    name: 'iPhone 17 Pro Max',
    brand: 'Apple',
    img: '/phones/iphone17promax.png',
    price: 1495990,
    badge: '5G · Chip A19 Pro',
    specs: ['Pantalla 6.9" Super Retina XDR', 'Cámara 48MP Fusion', '5G mmWave + Sub-6GHz'],
    highlight: true,
  },
  iphone15: {
    id: 'iphone15',
    name: 'iPhone 15',
    brand: 'Apple',
    img: '/phones/iphone15.png',
    price: 719990,
    badge: '5G · Chip A16 Bionic',
    specs: ['Pantalla 6.1" Super Retina OLED', 'Cámara 48MP principal', '5G Sub-6GHz compatible'],
    highlight: false,
  },
  samsung_a56: {
    id: 'samsung_a56',
    name: 'Samsung Galaxy A56 5G',
    brand: 'Samsung',
    img: '/phones/samsung_a56.png',
    price: 869990,
    badge: '5G · Exynos 1580',
    specs: ['Pantalla 6.7" Super AMOLED', 'Cámara 50MP OIS', 'Batería 5000 mAh 45W'],
    highlight: false,
  },
  samsung_a07: {
    id: 'samsung_a07',
    name: 'Samsung Galaxy A07',
    brand: 'Samsung',
    img: '/phones/samsung_a07.png',
    price: 98990,
    badge: '4G LTE · Helio P35',
    specs: ['Pantalla 6.7" FHD+ LCD', 'Cámara triple 50MP', 'Batería 5000 mAh'],
    highlight: false,
  },
};

// ─── Catálogo por tier ────────────────────────────────────────────────────────
// bad  (≤45): reemplazo urgente, 45% dcto en boleta
// mid (46-80): upgrade 5G, 20% dcto en cambio
// good (≥81): premium upgrade, 10% dcto boleta x3 meses
const CATALOG_BY_TIER = {
  bad: {
    discount: 45,
    discountLabel: '45% Dcto.',
    discountNote: 'Pagando en tu boleta mensual WOM',
    accentColor: 'var(--danger)',
    headline: 'Renueva tu equipo ahora',
    subhead: 'Equipos compatibles con descuento exclusivo en tu boleta',
    phones: ['samsung_a07', 'samsung_a56'],
  },
  mid: {
    discount: 20,
    discountLabel: '20% Dcto.',
    discountNote: 'Al cambiar tu equipo por uno 5G compatible',
    accentColor: 'var(--warning)',
    headline: 'Teléfonos compatibles con 5G',
    subhead: 'Actualiza tu equipo y aprovecha al 100% nuestra red',
    phones: ['samsung_a56', 'iphone15'],
  },
  good: {
    discount: 10,
    discountLabel: '10% Dcto.',
    discountNote: 'En tu boleta mensual por 3 meses',
    accentColor: 'var(--success)',
    headline: 'Equipos premium para ti',
    subhead: 'Tu equipo es excelente, pero si quieres ir a lo más top:',
    phones: ['iphone15', 'iphone17promax'],
  },
};

// ─── Formatea precio en CLP ───────────────────────────────────────────────────
const formatCLP = (value) =>
  '$' + value.toLocaleString('es-CL');

// ─── Tarjeta de teléfono ──────────────────────────────────────────────────────
const PhoneCard = ({ phoneId, discount, accentColor }) => {
  const phone   = ALL_PHONES[phoneId];
  const original = phone.price;
  const finalPrice = Math.round(original * (1 - discount / 100));
  const savings    = original - finalPrice;

  return (
    <div
      className="card"
      style={{
        padding: 0, overflow: 'hidden', marginBottom: '16px',
        border: phone.highlight ? `1px solid ${accentColor}` : '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
      }}
    >
      {/* Badge de destacado */}
      {phone.highlight && (
        <div style={{
          position: 'absolute', top: '12px', right: '12px', zIndex: 2,
          backgroundColor: accentColor, borderRadius: '20px',
          padding: '3px 10px', fontSize: '0.7rem', fontWeight: 800,
          color: 'white', display: 'flex', alignItems: 'center', gap: '4px'
        }}>
          <Star size={11} fill="white" /> MÁS POPULAR
        </div>
      )}

      {/* Imagen del teléfono */}
      <div style={{
        background: 'linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        padding: '24px 20px 16px', minHeight: '180px',
      }}>
        <img
          src={phone.img}
          alt={phone.name}
          style={{
            maxHeight: '150px', maxWidth: '160px',
            objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.4))'
          }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px 18px' }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
          {phone.brand}
        </p>
        <h3 style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 800 }}>{phone.name}</h3>

        {/* Badge de conectividad */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '5px',
          backgroundColor: `${accentColor}20`, border: `1px solid ${accentColor}40`,
          borderRadius: '20px', padding: '3px 10px', marginBottom: '12px'
        }}>
          <Zap size={11} color={accentColor} fill={accentColor} />
          <span style={{ fontSize: '0.72rem', color: accentColor, fontWeight: 700 }}>{phone.badge}</span>
        </div>

        {/* Specs */}
        <ul style={{ padding: 0, margin: '0 0 14px', listStyle: 'none' }}>
          {phone.specs.map((spec, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '5px' }}>
              <CheckCircle2 size={13} color={accentColor} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{spec}</span>
            </li>
          ))}
        </ul>

        {/* Precios */}
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: '12px',
          padding: '12px 14px', marginBottom: '14px',
          border: `1px solid ${accentColor}30`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
              {formatCLP(original)}
            </span>
            <span style={{
              backgroundColor: accentColor, color: 'white',
              fontSize: '0.7rem', fontWeight: 800, borderRadius: '20px',
              padding: '2px 8px'
            }}>
              -{discount}%
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, color: 'white' }}>
            {formatCLP(finalPrice)}
          </p>
          <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: accentColor, fontWeight: 600 }}>
            Ahorras {formatCLP(savings)}
          </p>
        </div>

        <button
          className="btn-primary"
          style={{ background: `linear-gradient(135deg, ${accentColor}, var(--secondary))` }}
        >
          <ShoppingCart size={17} /> Agregar al carrito
        </button>
      </div>
    </div>
  );
};

// ─── Componente principal ─────────────────────────────────────────────────────
const PhoneCatalog = ({ tier, onBack }) => {
  const catalog = CATALOG_BY_TIER[tier] || CATALOG_BY_TIER.mid;

  return (
    <div
      className="fade-in"
      style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}
    >
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '6px', marginTop: '10px', flexShrink: 0 }}>
        <button onClick={onBack} style={{ marginRight: '14px', color: 'white', flexShrink: 0 }}>
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 style={{ fontSize: '1.1rem', margin: 0 }}>{catalog.headline}</h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '3px 0 0' }}>
            {catalog.subhead}
          </p>
        </div>
      </header>

      {/* Banner de descuento */}
      <div style={{
        background: `linear-gradient(135deg, ${catalog.accentColor}25, rgba(96,37,139,0.2))`,
        border: `1px solid ${catalog.accentColor}50`,
        borderRadius: '16px', padding: '12px 16px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        margin: '14px 0'
      }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tu descuento activo</p>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, color: catalog.accentColor }}>
            {catalog.discountLabel}
          </p>
        </div>
        <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'right', maxWidth: '55%', lineHeight: 1.4 }}>
          {catalog.discountNote}
        </p>
      </div>

      {/* Lista de teléfonos */}
      <div style={{ flex: 1 }}>
        {catalog.phones.map((phoneId) => (
          <PhoneCard
            key={phoneId}
            phoneId={phoneId}
            discount={catalog.discount}
            accentColor={catalog.accentColor}
          />
        ))}
      </div>
    </div>
  );
};

export default PhoneCatalog;
