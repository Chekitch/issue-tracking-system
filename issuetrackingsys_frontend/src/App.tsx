
import './App.css'
import Login from './components/Login/Login'
import { Routes, Route } from 'react-router-dom'
import NotFound from './components/NotFound/NotFound'
import Dashboard from './components/Dashboard/Dashboard'
import ProtectedRoutes from './utils/ProtectedRoutes'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>} />

        <Route element={<ProtectedRoutes/>}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        <Route path='*' element={<NotFound/>} />
      </Routes>
    </>
  )
}

export default App
