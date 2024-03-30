import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './hooks/AuthContext'
import { ToastContainer } from 'react-toastify'
import AdminPage from './pages/Admin/AdminPage'
import ManagementStudent from './pages/Admin/ManagementStudent'
import LoadingSpinner from './hooks/LoadingSpinner'
import 'react-toastify/dist/ReactToastify.css';
import { LoadingProvider } from './hooks/LoadingContext'

function App() {
  return (
    <div className='w-screen h-screen relative'>
      <div className="w-20 h-20 bg-gradient-to-r from-yellow-300 via-red-400 to-pink-500 rounded-full animate-pulse fixed top-[0px]"></div>
      <div className="w-20 h-20 bg-gradient-to-r from-yellow-300 via-red-400 to-pink-500 rounded-full animate-pulse fixed bottom-[0px] right-[0px]"></div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/manage-students" element={<ManagementStudent />} />
        </Routes>
      </BrowserRouter>
    </div >
  )
}

function AppWrapper() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <App />
        <ToastContainer />
        <LoadingSpinner />
      </LoadingProvider>
    </AuthProvider>
  )
}

export default AppWrapper
