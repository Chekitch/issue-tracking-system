
import './App.css'
import Login from './components/Login/Login'
import { Routes, Route } from 'react-router-dom'
import NotFound from './components/NotFound/NotFound'
import Dashboard from './components/Dashboard/Dashboard'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </>
  )
}

export default App
