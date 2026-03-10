import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { BarChart, Bar, XAxis } from 'recharts'
import { User, Gem, Plus } from 'lucide-react'

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

const PIE_COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

const MOCK_DATA = {
  gastos: {
    total: 4000000,
    balance: 2000000,
    pie: [
      { name: 'Comida', value: 1200000 },
      { name: 'Transporte', value: 800000 },
      { name: 'Suscripciones', value: 500000 },
      { name: 'Entretenimiento', value: 900000 },
      { name: 'Otros', value: 600000 },
    ],
    bars: [
      { day: 'LUN', value: 320000 },
      { day: 'MAR', value: 150000 },
      { day: 'MIÉ', value: 480000 },
      { day: 'JUE', value: 200000 },
      { day: 'VIE', value: 390000 },
      { day: 'SAB', value: 600000 },
      { day: 'HOY', value: 280000 },
    ],
  },
  ingresos: {
    total: 6000000,
    balance: 6000000,
    pie: [
      { name: 'Salario', value: 4500000 },
      { name: 'Freelance', value: 1000000 },
      { name: 'Otros', value: 500000 },
    ],
    bars: [
      { day: 'LUN', value: 0 },
      { day: 'MAR', value: 4500000 },
      { day: 'MIÉ', value: 0 },
      { day: 'JUE', value: 1000000 },
      { day: 'VIE', value: 0 },
      { day: 'SAB', value: 500000 },
      { day: 'HOY', value: 0 },
    ],
  },
  deudas: {
    total: 1500000,
    balance: 1500000,
    pie: [
      { name: 'Tarjeta', value: 800000 },
      { name: 'Préstamo', value: 700000 },
    ],
    bars: [
      { day: 'LUN', value: 0 },
      { day: 'MAR', value: 300000 },
      { day: 'MIÉ', value: 0 },
      { day: 'JUE', value: 500000 },
      { day: 'VIE', value: 0 },
      { day: 'SAB', value: 700000 },
      { day: 'HOY', value: 0 },
    ],
  },
}

const formatCurrency = (value) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value)

const TABS = ['gastos', 'ingresos', 'deudas']
const TAB_LABELS = { gastos: 'Gastos', ingresos: 'Ingresos', deudas: 'Deudas' }
const TAB_COLORS = { gastos: COLORS_APP.error, ingresos: COLORS_APP.success, deudas: COLORS_APP.accent }
const TAB_MESSAGES = {
  gastos: 'Este mes has gastado',
  ingresos: 'Este mes has ganado',
  deudas: 'Total en deudas',
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('gastos')
  const [showModal, setShowModal] = useState(false)

  const data = MOCK_DATA[activeTab]

  return (
    <div style={{
      backgroundColor: COLORS_APP.bg, minHeight: '100vh', display: 'flex',
      justifyContent: 'center', alignItems: 'flex-start', fontFamily: 'Inter, sans-serif',
      padding: '24px 16px 100px',
    }}>
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Header */}
        <div style={{
          backgroundColor: COLORS_APP.card, borderRadius: '20px', padding: '20px',
          boxShadow: '0 1px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => navigate('/profile')} style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#EEF2FF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <User size={20} color={COLORS_APP.accent} />
            </div>
            </button>
            <div>
              <p style={{ margin: 0, fontSize: '12px', color: COLORS_APP.textSecondary }}>Bienvenido</p>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: COLORS_APP.textPrimary }}>Hola, Usuario 👋</p>
            </div>
          </div>
          <button onClick={() => navigate('/plans')} style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#EEF2FF',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Gem size={20} color={COLORS_APP.accent} />
          </div>
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          backgroundColor: COLORS_APP.card, borderRadius: '20px', padding: '6px',
          boxShadow: '0 1px 8px rgba(0,0,0,0.06)', display: 'flex', gap: '4px',
        }}>
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flex: 1, padding: '10px', borderRadius: '14px', border: 'none', cursor: 'pointer',
              fontSize: '13px', fontWeight: '600', transition: 'all 0.2s',
              backgroundColor: activeTab === tab ? TAB_COLORS[tab] : 'transparent',
              color: activeTab === tab ? 'white' : COLORS_APP.textSecondary,
            }}>
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>

        {/* Resumen + Torta */}
        <div style={{
          backgroundColor: COLORS_APP.card, borderRadius: '20px', padding: '24px',
          boxShadow: '0 1px 8px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        }}>
          <p style={{ margin: 0, fontSize: '14px', color: COLORS_APP.textSecondary }}>{TAB_MESSAGES[activeTab]}</p>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: TAB_COLORS[activeTab] }}>
            {formatCurrency(data.total)}
          </p>

          {/* Gráfico torta con balance en el centro */}
          <div style={{ position: 'relative', width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.pie}
                  cx="50%" cy="50%"
                  innerRadius={65} outerRadius={95}
                  paddingAngle={3} dataKey="value"
                >
                  {data.pie.map((_, index) => (
                    <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>

            {/* Balance en el centro */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center', pointerEvents: 'none',
            }}>
              <p style={{ margin: 0, fontSize: '11px', color: COLORS_APP.textSecondary }}>Balance</p>
              <p style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: COLORS_APP.success }}>
                {formatCurrency(data.balance)}
              </p>
            </div>
          </div>
        </div>

        {/* Gráfico de barras */}
        <div style={{
          backgroundColor: COLORS_APP.card, borderRadius: '20px', padding: '20px',
          boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
        }}>
          <p style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: COLORS_APP.textPrimary }}>
            Esta semana
          </p>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={data.bars} barSize={28}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: COLORS_APP.textSecondary }} />
              <Tooltip formatter={(value) => formatCurrency(value)} cursor={{ fill: 'transparent' }} />
              <Bar dataKey="value" fill={TAB_COLORS[activeTab]} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Botón flotante */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: 'fixed', bottom: '28px', right: '28px',
          width: '56px', height: '56px', borderRadius: '50%', border: 'none',
          backgroundColor: COLORS_APP.accent, color: 'white', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(99,102,241,0.4)', zIndex: 100,
        }}
      >
        <Plus size={26} />
      </button>

      {/* Modal agregar gasto (provisional) */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200,
        }}
          onClick={() => setShowModal(false)}
        >
          <div style={{
            backgroundColor: COLORS_APP.card, borderRadius: '24px 24px 0 0',
            padding: '28px 24px', width: '100%', maxWidth: '400px',
          }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '700', color: COLORS_APP.textPrimary }}>
              Agregar {TAB_LABELS[activeTab].slice(0, -1)}
            </h2>
            <p style={{ color: COLORS_APP.textSecondary, fontSize: '14px' }}>
              Formulario de transacción — lo construimos en el siguiente paso 🚀
            </p>
            <button onClick={() => setShowModal(false)} style={{
              marginTop: '16px', width: '100%', padding: '12px', borderRadius: '12px',
              border: 'none', backgroundColor: COLORS_APP.accent, color: 'white',
              fontSize: '15px', fontWeight: '600', cursor: 'pointer',
            }}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}