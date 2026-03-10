import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'

const COLORS_APP = {
  bg: '#F9FAFB',
  card: '#FFFFFF',
  accent: '#6366F1',
  accentHover: '#4F46E5',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  error: '#EF4444',
}

export default function Auth() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const handleToggle = (loginMode) => {
    setIsLogin(loginMode)
    setError('')
    reset()
  }

  const onSubmit = async (data) => {
    setLoading(true)
    setError('')
    try {
      // TODO: conectar con backend cuando esté listo
      // const res = await api.post('/auth/login', { email: data.email, password: data.password })
      // localStorage.setItem('token', res.data.token)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // simulación de carga
      localStorage.setItem('token', 'token-de-prueba')
      navigate('/dashboard')
    } catch (err) {
      setError('Ocurrió un error, intenta de nuevo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      backgroundColor: COLORS_APP.bg, minHeight: '100vh',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      fontFamily: 'Inter, sans-serif', padding: '24px 16px',
    }}>
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <div style={{
            width: '56px', height: '56px', backgroundColor: COLORS_APP.accent,
            borderRadius: '16px', display: 'inline-flex', alignItems: 'center',
            justifyContent: 'center', marginBottom: '16px',
          }}>
            <span style={{ color: 'white', fontSize: '26px' }}>₿</span>
          </div>
          <h1 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: '800', color: COLORS_APP.textPrimary }}>
            FinanzApp
          </h1>
          <p style={{ margin: 0, fontSize: '14px', color: COLORS_APP.textSecondary }}>
            {isLogin ? 'Bienvenido de vuelta 👋' : 'Crea tu cuenta gratis 🚀'}
          </p>
        </div>

        {/* Card principal */}
        <div style={{
          backgroundColor: COLORS_APP.card, borderRadius: '24px',
          padding: '28px 24px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          display: 'flex', flexDirection: 'column', gap: '20px',
        }}>

          {/* Tabs */}
          <div style={{
            display: 'flex', backgroundColor: COLORS_APP.bg,
            borderRadius: '14px', padding: '4px', gap: '4px',
          }}>
            {['Iniciar sesión', 'Registrarse'].map((label, i) => (
              <button
                key={label}
                onClick={() => handleToggle(i === 0)}
                style={{
                  flex: 1, padding: '10px', borderRadius: '10px', border: 'none',
                  fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s',
                  backgroundColor: isLogin === (i === 0) ? COLORS_APP.card : 'transparent',
                  color: isLogin === (i === 0) ? COLORS_APP.textPrimary : COLORS_APP.textSecondary,
                  boxShadow: isLogin === (i === 0) ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {/* Nombre - solo en registro */}
            {!isLogin && (
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: COLORS_APP.textPrimary, marginBottom: '8px' }}>
                  Nombre completo
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color={COLORS_APP.textSecondary} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    placeholder="Juan Pérez"
                    {...register('name', { required: 'El nombre es obligatorio' })}
                    style={{
                      width: '100%', padding: '12px 14px 12px 40px',
                      border: `1.5px solid ${errors.name ? COLORS_APP.error : COLORS_APP.border}`,
                      borderRadius: '12px', fontSize: '14px', outline: 'none',
                      boxSizing: 'border-box', backgroundColor: COLORS_APP.bg,
                      color: COLORS_APP.textPrimary,
                    }}
                  />
                </div>
                {errors.name && <p style={{ color: COLORS_APP.error, fontSize: '12px', marginTop: '4px' }}>{errors.name.message}</p>}
              </div>
            )}

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: COLORS_APP.textPrimary, marginBottom: '8px' }}>
                Correo electrónico
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color={COLORS_APP.textSecondary} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  placeholder="juan@email.com"
                  {...register('email', {
                    required: 'El correo es obligatorio',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo inválido' }
                  })}
                  style={{
                    width: '100%', padding: '12px 14px 12px 40px',
                    border: `1.5px solid ${errors.email ? COLORS_APP.error : COLORS_APP.border}`,
                    borderRadius: '12px', fontSize: '14px', outline: 'none',
                    boxSizing: 'border-box', backgroundColor: COLORS_APP.bg,
                    color: COLORS_APP.textPrimary,
                  }}
                />
              </div>
              {errors.email && <p style={{ color: COLORS_APP.error, fontSize: '12px', marginTop: '4px' }}>{errors.email.message}</p>}
            </div>

            {/* Contraseña */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: COLORS_APP.textPrimary, marginBottom: '8px' }}>
                Contraseña
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color={COLORS_APP.textSecondary} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password', {
                    required: 'La contraseña es obligatoria',
                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                  })}
                  style={{
                    width: '100%', padding: '12px 40px 12px 40px',
                    border: `1.5px solid ${errors.password ? COLORS_APP.error : COLORS_APP.border}`,
                    borderRadius: '12px', fontSize: '14px', outline: 'none',
                    boxSizing: 'border-box', backgroundColor: COLORS_APP.bg,
                    color: COLORS_APP.textPrimary,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                >
                  {showPassword ? <EyeOff size={16} color={COLORS_APP.textSecondary} /> : <Eye size={16} color={COLORS_APP.textSecondary} />}
                </button>
              </div>
              {errors.password && <p style={{ color: COLORS_APP.error, fontSize: '12px', marginTop: '4px' }}>{errors.password.message}</p>}
            </div>

            {/* Olvidaste contraseña */}
            {isLogin && (
              <div style={{ textAlign: 'right', marginTop: '-6px' }}>
                <a href="#" style={{ fontSize: '13px', color: COLORS_APP.accent, textDecoration: 'none', fontWeight: '500' }}>
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            )}

            {/* Error general */}
            {error && (
              <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', padding: '10px 14px' }}>
                <p style={{ color: COLORS_APP.error, fontSize: '13px', margin: 0 }}>{error}</p>
              </div>
            )}

            {/* Botón submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '14px', border: 'none', borderRadius: '14px',
                fontSize: '15px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer',
                backgroundColor: loading ? COLORS_APP.textSecondary : COLORS_APP.accent,
                color: 'white', marginTop: '4px', transition: 'background-color 0.2s',
              }}
            >
              {loading ? 'Cargando...' : isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: COLORS_APP.border }} />
              <span style={{ fontSize: '12px', color: COLORS_APP.textSecondary }}>o continúa con</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: COLORS_APP.border }} />
            </div>

            {/* Google */}
            <button
              type="button"
              style={{
                width: '100%', padding: '13px', border: `1.5px solid ${COLORS_APP.border}`,
                borderRadius: '14px', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
                backgroundColor: COLORS_APP.card, color: COLORS_APP.textPrimary,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.5 26.8 36 24 36c-5.2 0-9.7-2.9-11.3-7.1l-6.5 5C9.5 39.6 16.3 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.2-2.3 4-4.2 5.2l6.2 5.2C41 35.2 44 30 44 24c0-1.3-.1-2.7-.4-4z"/>
              </svg>
              Continuar con Google
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}