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
import ManagementTeacher from './pages/Admin/ManagementTeacher'
import ManagementCourse from './pages/Admin/ManagementCourse'
import StudentPage from './pages/Student/StudentPage'
import TeacherPage from './pages/Teacher/TeacherPage'
import StudentListCoursePage from './pages/Student/StudentListCoursePage'
import BGIcon from './assets/scattered-forcefields.svg';
import TeacherListCoursePage from './pages/Teacher/TeacherListCoursePage'

function App() {
  return (
    <div className='w-screen h-screen relative'>
      <img src={BGIcon} className='fixed top-0 left-0 w-screen h-screen' />
      <div className="w-20 h-20 bg-gradient-to-r from-yellow-300 via-red-400 to-pink-500 rounded-full animate-pulse fixed top-[0px]"></div>
      <div className="w-20 h-20 bg-gradient-to-r from-yellow-300 via-red-400 to-pink-500 rounded-full animate-pulse fixed bottom-[0px] right-[0px]"></div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/manage-students" element={<ManagementStudent />} />
          <Route path="/admin/manage-teachers" element={<ManagementTeacher />} />
          <Route path="/admin/manage-courses" element={<ManagementCourse />} />

          <Route path="/student" element={<StudentPage />} />
          <Route path="/student/list-courses" element={<StudentListCoursePage />} />

          <Route path="/teacher" element={<TeacherPage />} />
          <Route path="/teacher/list-courses" element={<TeacherListCoursePage />} />
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
