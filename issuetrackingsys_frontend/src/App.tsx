
import './App.css'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Login from './core/auth/components/Login/index.tsx'
import { useAppSelector } from './store/hooks.ts'
import { setAuthToken } from './core/api/axios-config.ts'
import SubprojectPage from './features/subprojects/components/SubprojectList/index.tsx'
import Dashboard from './pages/DashboardPage/index.tsx'
import NotFound from './pages/NotFoundPage/index.tsx'
import Layout from './features/Sidebar/Layout.tsx'
import ParentProjectList from './features/projects/components/ProjectList/index.tsx'
import UserList from './features/user/components/UserList/index.tsx'
import RoleList from './features/roles/components/RoleList/index.tsx'
import PermissionList from './features/permissions/components/PermissionList/index.tsx'

function App() {

  const token = useAppSelector((state) => state.auth.token);
  setAuthToken(token);

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>} />

        <Route element={<ProtectedRoutes/>}>
          <Route element={<Layout/>}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/projects' element={<ParentProjectList />} />
            <Route path='/projects/:projectId/subprojects' element={<SubprojectPage />} />
            <Route path='/users' element={<UserList />} />
            <Route path='/roles' element={<RoleList />} />
            <Route path='/permissions' element={<PermissionList />} />
            <Route path='*' element={<NotFound/>} />
          </Route>
        </Route>

  
      </Routes>
    </>
  )
}

export default App
