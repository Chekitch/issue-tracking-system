
import './App.css'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Login from './core/auth/components/Login/index.tsx'
import { useAppSelector } from './store/hooks.ts'
import { setAuthToken } from './core/api/axios-config.ts'
import SubprojectPage from './features/subprojects/components/SubprojectList/index.tsx'
import Dashboard from './pages/DashboardPage/index.tsx'
import NotFound from './pages/NotFoundPage/index.tsx'

function App() {

  const token = useAppSelector((state) => state.auth.token);
  setAuthToken(token);

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>} />

        <Route element={<ProtectedRoutes/>}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/projects/:projectId/subprojects' element={<SubprojectPage />} />
        </Route>

        <Route path='*' element={<NotFound/>} />
      </Routes>
    </>
  )
}

export default App
