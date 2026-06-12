import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import pfp from '../assets/icon.png'
// import { ActiveContext } from "../context/ActivePageContext"
import { useNavigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'

const NavBar = () => {

  const navigate = useNavigate()
  // const activeContext = useContext(ActiveContext)
  // if (!activeContext) return ("No content")

  // const { activePage, setActivePage } = activeContext


  const location = useLocation();
  const isNewTaskPage = location.pathname === "/new-task";
  const isMyTasksPage = location.pathname === "/my-tasks";

  // const navLinkClass = (path: string) => 
  //   `transition-colors duration-300 hover:text-[#1A3C34] ${
  //     isActive(path) ? "text-[#7234a5]" : "text-[#838585]"
  //   }`;

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // setActivePage("Cover Page");
    navigate("/")
  }
  
  const handleNewTaskClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate("/new-task")
    // setActivePage("New Task");
  }

  const handleAllTasksClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate("/my-tasks")
    // setActivePage("My Task");
  }

  return (
    <div className='w-screen h-[80px] md:h-[80px] flex items-center justify-between px-[3%] md:px-[10%] lg:px-[20%] border-b-[0.5px] border-b-[#B8B6B6] navResponsive'>
        <div className='flex items-center gap-1 md:gap-3'
        onClick={handleLogoClick}>
          <div>
            <img src={logo} alt="logo" 
            className='w-[30px] h-[30px] md:w-[39px] md:h-[41px]'/>
          </div>
            <h3 className='text-[20px] md:text-[27px] font-semibold text-[#2D0050]'>TaskDuty</h3>
        </div>

        <div className='flex items-center gap-2 md:gap-10'>
        <nav className='flex gap-4 md:gap-6 font-medium text-[16px] md:text-[22px]'>

          {
            (!isNewTaskPage) && (

              <Link to="/new-task" onClick={handleNewTaskClick}
              className='hover:text-[#974FD0] transition'>New Task</Link>
            )
          }
          {
            (!isMyTasksPage) && (

              <Link to="/my-tasks" onClick={handleAllTasksClick}
              className='hover:text-[#974FD0] transition'>All Tasks</Link>
            )
          }

        </nav>

        <div>
          <img src={pfp} alt="" 
          className='w-[50px] h-[50px] md:w-[60px] md:h-[60px]'/>
        </div>

        </div>

    </div>
  )
}

export default NavBar