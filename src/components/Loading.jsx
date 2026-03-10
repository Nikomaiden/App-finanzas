export default function Loading() {
  return (
    <div style={{
      backgroundColor: '#F9FAFB', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, sans-serif', gap: '16px',
    }}>

      {/* Logo animado */}
      <div style={{
        width: '56px', height: '56px', backgroundColor: '#6366F1',
        borderRadius: '16px', display: 'flex', alignItems: 'center',
        justifyContent: 'center', animation: 'pulse 1.5s infinite',
      }}>
        <span style={{ color: 'white', fontSize: '26px' }}>₿</span>
      </div>

      {/* Spinner */}
      <div style={{
        width: '32px', height: '32px', border: '3px solid #E5E7EB',
        borderTop: '3px solid #6366F1', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />

      <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>
        Cargando...
      </p>

      {/* Estilos de animación */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}