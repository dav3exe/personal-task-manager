
import { Routes, Route } from 'react-router-dom'
import './App.css'
import CoverPage from './pages/CoverPage'
import MyTask from './pages/MyTask'
import NewTask from './pages/NewTask'
import AuthPage from './pages/AuthPage'
import VerifyEmail from './pages/VerifyEmail'
import ProtectedRoute from './universal/ProtectedRoute'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'


function App() {


  return (
    <>
    <Routes>
      <Route path="/" element = {<CoverPage/>}/>
      <Route path="/auth" element = {<AuthPage/>}/>
      <Route path="/verify-email" element = {<VerifyEmail/>}/>
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />

      <Route element={<ProtectedRoute/>}>
        <Route path="/my-tasks" element = {<MyTask/>}/>
        <Route path="/new-task" element = {<NewTask/>}/>
        <Route path="/edit-task/:id" element = {<NewTask/>}/>
      </Route>

    </Routes>
    </>
  )
}

export default App
