
import { Routes, Route } from 'react-router-dom'
import './App.css'
import CoverPage from './pages/CoverPage'
import MyTask from './pages/MyTask'
import NewTask from './pages/NewTask'

function App() {


  return (
    <>
    <Routes>
      <Route path="/" element = {<CoverPage/>}/>
      <Route path="/my-tasks" element = {<MyTask/>}/>
      <Route path="/new-task" element = {<NewTask/>}/>
      <Route path="/edit-task/:id" element = {<NewTask/>}/>
    </Routes>
    </>
  )
}

export default App
