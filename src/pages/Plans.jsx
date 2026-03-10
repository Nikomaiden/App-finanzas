import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Check, X, Gem, Zap } from 'lucide-react'

const COLORS_APP = {
  bg: '#F9FAFB',
  card: '#FFFFFF',
  accent: '#6366F1',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  success: '#10B981',
  error: '#EF4444',
}

const CURRENT_PLAN = 'gratuito'

const FREE_BENEFITS = [
  { text: 'Registro manual de transacciones', included: true },
  { text: 'Categorías personalizadas', included: true },
  { text: 'Dashboard con gráfico de torta', included: true },
  { text: 'Historial de transacciones', included: true },
  { text: 'Metas de ahorro básicas', included: true },
  { text: 'Exportar a PDF / Excel', included: false },
  { text: 'Sin anuncios', included: false },
  { text: 'Sin límite de categorías', included: false },
]

const PREMIUM_BENEFITS = [
  { text: 'Registro manual de transacciones', included: true },
  { text: 'Categorías personalizadas', included: true },
  { text: 'Dashboard con gráfico de torta', included: true },
  { text: 'Historial de transacciones', included: true },
  { text: 'Metas de ahorro básicas', included: true },
  { text: 'Exportar a PDF / Excel', included: true },
  { text: 'Sin anuncios', included: true },
  { text: 'Sin límite de categorías', included: true },
]

const PLANS = [
  {
    id: 'gratuito',
    label: 'Gratuito',
    subtitle: 'Para siempre',
    price: '$0',
    period: '/ mes',
    icon: <span style={{ fontSize: '22px' }}>₿</span>,
    iconBg: '#EEF2FF',
    benefits: FREE_BENEFITS,
    isGradient: false,
  },
  {
    id: 'premium',
    label: 'Premium',
    subtitle: 'Todo incluido',
    price: '$19.900',
    period: 'COP / mes',
    icon: <Gem size={22} color="white" />,
    iconBg: 'rgba(255,255,255,0.2)',
    benefits: PREMIUM_BENEFITS,
    isGradient: true,
  },
]

export default function Plans() {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef(null)

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft
    const width = e.target.offsetWidth
    const index = Math.round(scrollLeft / width)
    setActiveIndex(index)
  }

  const scrollTo = (index) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.offsetWidth * index,
        behavior: 'smooth',
      })
      setActiveIndex(index)
    }
  }

  const handleUpgrade = () => {
    alert('Próximamente — pasarela de pago 🚀')
  }

  return (
    <div style={{
      backgroundColor: COLORS_APP.bg, minHeight: '100vh',
      fontFamily: 'Inter, sans-serif', padding: '24px 0 100px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <button
            onClick={() => navigate('/profile')}
            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '4px', color: COLORS_APP.textSecondary }}
          >
            <ChevronRight size={22} style={{ transform: 'rotate(180deg)' }} />
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: COLORS_APP.textPrimary }}>Planes</h1>
            <p style={{ margin: 0, fontSize: '13px', color: COLORS_APP.textSecondary }}>Desliza para comparar</p>
          </div>
        </div>

        {/* Dots indicadores */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {PLANS.map((plan, index) => (
            <button
              key={plan.id}
              onClick={() => scrollTo(index)}
              style={{
                width: activeIndex === index ? '24px' : '8px',
                height: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer',
                backgroundColor: activeIndex === index ? COLORS_APP.accent : COLORS_APP.border,
                transition: 'all 0.3s ease', padding: 0,
              }}
            />
          ))}
        </div>

      </div>

      {/* Carrusel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          display: 'flex', overflowX: 'scroll', scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none', msOverflowStyle: 'none',
          width: '100%', maxWidth: '400px',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <style>{`::-webkit-scrollbar { display: none; }`}</style>

        {PLANS.map((plan) => (
          <div
            key={plan.id}
            style={{
              minWidth: '100%', scrollSnapAlign: 'start',
              padding: '16px 16px 0',
              boxSizing: 'border-box',
            }}
          >
            <div style={{
              borderRadius: '24px', padding: '28px 24px',
              background: plan.isGradient
                ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'
                : COLORS_APP.card,
              boxShadow: plan.isGradient
                ? '0 8px 24px rgba(99,102,241,0.35)'
                : '0 1px 8px rgba(0,0,0,0.06)',
              border: CURRENT_PLAN === plan.id
                ? plan.isGradient ? '2px solid #FCD34D' : `2px solid ${COLORS_APP.accent}`
                : '2px solid transparent',
              position: 'relative', overflow: 'hidden',
            }}>

              {/* Decoración fondo premium */}
              {plan.isGradient && (
                <>
                  <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)' }} />
                  <div style={{ position: 'absolute', bottom: '-30px', left: '-10px', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.06)' }} />
                </>
              )}

              {/* Header card */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '14px',
                    backgroundColor: plan.iconBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {plan.icon}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: plan.isGradient ? 'white' : COLORS_APP.textPrimary }}>{plan.label}</p>
                    <p style={{ margin: 0, fontSize: '13px', color: plan.isGradient ? 'rgba(255,255,255,0.7)' : COLORS_APP.textSecondary }}>{plan.subtitle}</p>
                  </div>
                </div>
                {CURRENT_PLAN === plan.id ? (
                  <span style={{
                    backgroundColor: plan.isGradient ? '#FCD34D' : '#EEF2FF',
                    color: plan.isGradient ? '#92400E' : COLORS_APP.accent,
                    fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px',
                  }}>
                    ACTUAL
                  </span>
                ) : plan.isGradient ? (
                  <span style={{
                    backgroundColor: 'rgba(255,255,255,0.2)', color: 'white',
                    fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px',
                  }}>
                    RECOMENDADO
                  </span>
                ) : null}
              </div>

              {/* Precio */}
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '36px', fontWeight: '800', color: plan.isGradient ? 'white' : COLORS_APP.textPrimary }}>{plan.price}</span>
                <span style={{ fontSize: '14px', color: plan.isGradient ? 'rgba(255,255,255,0.7)' : COLORS_APP.textSecondary }}> {plan.period}</span>
              </div>

              {/* Beneficios */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: plan.isGradient && CURRENT_PLAN !== 'premium' ? '24px' : '0' }}>
                {plan.benefits.map(({ text, included }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                      backgroundColor: plan.isGradient ? 'rgba(255,255,255,0.2)' : included ? '#ECFDF5' : '#FEF2F2',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {included || plan.isGradient
                        ? <Check size={12} color={plan.isGradient ? 'white' : COLORS_APP.success} strokeWidth={3} />
                        : <X size={12} color={COLORS_APP.error} strokeWidth={3} />
                      }
                    </div>
                    <span style={{ fontSize: '13px', color: plan.isGradient ? 'rgba(255,255,255,0.9)' : included ? COLORS_APP.textPrimary : COLORS_APP.textSecondary }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Botón upgrade */}
              {plan.isGradient && CURRENT_PLAN !== 'premium' && (
                <button
                  onClick={handleUpgrade}
                  style={{
                    width: '100%', padding: '14px', border: 'none', borderRadius: '14px',
                    fontSize: '15px', fontWeight: '700', cursor: 'pointer',
                    backgroundColor: 'white', color: COLORS_APP.accent, marginTop: '24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                >
                  <Zap size={18} color={COLORS_APP.accent} />
                  Mejorar a Premium
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}