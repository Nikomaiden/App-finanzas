import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { User, Mail, Lock, LogOut, ChevronRight, Camera, Eye, EyeOff, X, Gem } from 'lucide-react'

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

// 👇 Datos de ejemplo - reemplazar con datos reales del backend
const MOCK_USER = {
  name: 'Usuario',
  email: 'usuario_de_ejemplo@email.com',
  plan: 'gratuito',
  avatar: null,
}

export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(MOCK_USER)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [editingName, setEditingName] = useState(false)
  const [tempName, setTempName] = useState(user.name)
  const [successMessage, setSuccessMessage] = useState('')

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/auth')
  }

  const handleSaveName = () => {
    setUser({ ...user, name: tempName })
    setEditingName(false)
    showSuccess('Nombre actualizado correctamente')
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setUser({ ...user, avatar: reader.result })
      reader.readAsDataURL(file)
    }
  }

  const onSubmitPassword = async (data) => {
    // TODO: conectar con backend
    setShowPasswordModal(false)
    reset()
    showSuccess('Contraseña actualizada correctamente')
  }

  const showSuccess = (msg) => {
    setSuccessMessage(msg)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  return (
    <div style={{
      backgroundColor: COLORS_APP.bg, minHeight: '100vh',
      fontFamily: 'Inter, sans-serif', padding: '24px 16px 100px',
      display: 'flex', justifyContent: 'center',
    }}>
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '4px', color: COLORS_APP.textSecondary }}
          >
            <ChevronRight size={22} style={{ transform: 'rotate(180deg)' }} />
          </button>
        <a href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: COLORS_APP.textPrimary }}>Mi perfil</h1>
        </a>
        </div>

        {/* Mensaje de éxito */}
        {successMessage && (
          <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #6EE7B7', borderRadius: '12px', padding: '12px 16px' }}>
            <p style={{ color: COLORS_APP.success, fontSize: '13px', margin: 0, fontWeight: '500' }}>✅ {successMessage}</p>
          </div>
        )}

        {/* Avatar + nombre */}
        <div style={{
          backgroundColor: COLORS_APP.card, borderRadius: '24px',
          padding: '28px 24px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
        }}>

          {/* Foto de perfil */}
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '90px', height: '90px', borderRadius: '50%',
              backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center',
              justifyContent: 'center', overflow: 'hidden', border: `3px solid ${COLORS_APP.accent}`,
            }}>
              {user.avatar
                ? <img src={user.avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <User size={40} color={COLORS_APP.accent} />
              }
            </div>
            <label style={{
              position: 'absolute', bottom: 0, right: 0,
              width: '28px', height: '28px', borderRadius: '50%',
              backgroundColor: COLORS_APP.accent, display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(99,102,241,0.4)',
            }}>
              <Camera size={14} color="white" />
              <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
            </label>
          </div>

          {/* Nombre editable */}
          {editingName ? (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%' }}>
              <input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                style={{
                  flex: 1, padding: '10px 14px', border: `1.5px solid ${COLORS_APP.accent}`,
                  borderRadius: '12px', fontSize: '15px', outline: 'none',
                  backgroundColor: COLORS_APP.bg, color: COLORS_APP.textPrimary, textAlign: 'center',
                }}
              />
              <button onClick={handleSaveName} style={{
                padding: '10px 16px', backgroundColor: COLORS_APP.accent, color: 'white',
                border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              }}>
                Guardar
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '700', color: COLORS_APP.textPrimary }}>
                {user.name}
              </p>
              <button onClick={() => setEditingName(true)} style={{
                border: 'none', background: 'none', cursor: 'pointer',
                fontSize: '13px', color: COLORS_APP.accent, fontWeight: '500',
              }}>
                Editar nombre
              </button>
            </div>
          )}

          {/* Email */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={15} color={COLORS_APP.textSecondary} />
            <p style={{ margin: 0, fontSize: '14px', color: COLORS_APP.textSecondary }}>{user.email}</p>
          </div>
        </div>

        {/* Plan actual */}
        <div style={{
          backgroundColor: COLORS_APP.card, borderRadius: '20px',
          padding: '20px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
        }}>
          <p style={{ margin: '0 0 14px', fontSize: '13px', fontWeight: '600', color: COLORS_APP.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Plan actual
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                backgroundColor: user.plan === 'premium' ? '#FEF3C7' : '#EEF2FF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Gem size={20} color={user.plan === 'premium' ? '#F59E0B' : COLORS_APP.accent} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: COLORS_APP.textPrimary }}>
                  {user.plan === 'premium' ? 'Plan Premium' : 'Plan Gratuito'}
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: COLORS_APP.textSecondary }}>
                  {user.plan === 'premium' ? 'Todas las funciones activas' : 'Funciones básicas'}
                </p>
              </div>
            </div>
            {user.plan === 'gratuito' && (
              <button onClick={() => navigate('/plans')} style={{
                padding: '8px 14px', backgroundColor: COLORS_APP.accent, color: 'white',
                border: 'none', borderRadius: '10px', fontSize: '12px', fontWeight: '600', cursor: 'pointer',
              }}>
                Mejorar
              </button>
            )}
          </div>
        </div>

        {/* Opciones */}
        <div style={{
          backgroundColor: COLORS_APP.card, borderRadius: '20px',
          boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden',
        }}>
          {/* Cambiar contraseña */}
          <button
            onClick={() => setShowPasswordModal(true)}
            style={{
              width: '100%', padding: '18px 20px', border: 'none', borderBottom: `1px solid ${COLORS_APP.border}`,
              backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Lock size={17} color={COLORS_APP.accent} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '500', color: COLORS_APP.textPrimary }}>Cambiar contraseña</span>
            </div>
            <ChevronRight size={18} color={COLORS_APP.textSecondary} />
          </button>

          {/* Cerrar sesión */}
          <button
            onClick={handleLogout}
            style={{
              width: '100%', padding: '18px 20px', border: 'none',
              backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LogOut size={17} color={COLORS_APP.error} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '500', color: COLORS_APP.error }}>Cerrar sesión</span>
            </div>
            <ChevronRight size={18} color={COLORS_APP.textSecondary} />
          </button>
        </div>

      </div>

      {/* Modal cambiar contraseña */}
      {showPasswordModal && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200,
        }}
          onClick={() => { setShowPasswordModal(false); reset() }}
        >
          <div style={{
            backgroundColor: COLORS_APP.card, borderRadius: '24px 24px 0 0',
            padding: '28px 24px', width: '100%', maxWidth: '400px',
          }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header modal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: COLORS_APP.textPrimary }}>
                Cambiar contraseña
              </h2>
              <button onClick={() => { setShowPasswordModal(false); reset() }} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                <X size={22} color={COLORS_APP.textSecondary} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmitPassword)} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

              {/* Contraseña actual */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: COLORS_APP.textPrimary, marginBottom: '8px' }}>
                  Contraseña actual
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('currentPassword', { required: 'Ingresa tu contraseña actual' })}
                    style={{
                      width: '100%', padding: '12px 40px 12px 14px',
                      border: `1.5px solid ${errors.currentPassword ? COLORS_APP.error : COLORS_APP.border}`,
                      borderRadius: '12px', fontSize: '14px', outline: 'none',
                      boxSizing: 'border-box', backgroundColor: COLORS_APP.bg,
                    }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer' }}>
                    {showPassword ? <EyeOff size={16} color={COLORS_APP.textSecondary} /> : <Eye size={16} color={COLORS_APP.textSecondary} />}
                  </button>
                </div>
                {errors.currentPassword && <p style={{ color: COLORS_APP.error, fontSize: '12px', marginTop: '4px' }}>{errors.currentPassword.message}</p>}
              </div>

              {/* Nueva contraseña */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: COLORS_APP.textPrimary, marginBottom: '8px' }}>
                  Nueva contraseña
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('newPassword', {
                      required: 'Ingresa la nueva contraseña',
                      minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                    })}
                    style={{
                      width: '100%', padding: '12px 40px 12px 14px',
                      border: `1.5px solid ${errors.newPassword ? COLORS_APP.error : COLORS_APP.border}`,
                      borderRadius: '12px', fontSize: '14px', outline: 'none',
                      boxSizing: 'border-box', backgroundColor: COLORS_APP.bg,
                    }}
                  />
                  <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer' }}>
                    {showNewPassword ? <EyeOff size={16} color={COLORS_APP.textSecondary} /> : <Eye size={16} color={COLORS_APP.textSecondary} />}
                  </button>
                </div>
                {errors.newPassword && <p style={{ color: COLORS_APP.error, fontSize: '12px', marginTop: '4px' }}>{errors.newPassword.message}</p>}
              </div>

              <button type="submit" style={{
                width: '100%', padding: '14px', border: 'none', borderRadius: '14px',
                fontSize: '15px', fontWeight: '700', cursor: 'pointer',
                backgroundColor: COLORS_APP.accent, color: 'white', marginTop: '4px',
              }}>
                Actualizar contraseña
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}