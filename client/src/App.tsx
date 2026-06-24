
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
import TrashTask from './pages/TrashTask'
import { Toaster } from "react-hot-toast"



function App() {


  return (
    <>
    <Toaster position='bottom-center'/>
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
        <Route path="/my-trash" element = {<TrashTask/>}/>
      </Route>

    </Routes>
    </>
  )
}

export default App
