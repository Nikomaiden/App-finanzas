import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import {lazy, Suspense} from 'react'
import Loading from './components/Loading'

const Auth = lazy(() => import('./pages/Auth'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Profile = lazy(() => import('./pages/Profile'))
const Plans = lazy(() => import('./pages/Plans'))

function App() {
  const token = localStorage.getItem('token')

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/plans" element={<Plans />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App