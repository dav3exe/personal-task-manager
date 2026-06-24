import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useAuth } from '../context/AuthContext'
import { removeToken } from '../services/api'

const NavBar = () => {
  const navigate = useNavigate()
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useAuth()
  const location = useLocation()

  // const isNewTaskPage = location.pathname === "/new-task"
  // const isMyTasksPage = location.pathname === "/my-tasks"
  // const isMyTrashPage = location.pathname === "/my-trash"

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate("/")
  }

  // const handleNewTaskClick = (e: React.MouseEvent) => {
  //   e.preventDefault()
  //   navigate("/new-task")
  // }

  // const handleAllTasksClick = (e: React.MouseEvent) => {
  //   e.preventDefault()
  //   navigate("/my-tasks")
  // }

  // const handleTrashClick = (e: React.MouseEvent) => {
  //   e.preventDefault()
  //   navigate("/my-trash")
  // }

  const handleLoginToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isLoggedIn) {
      removeToken()
      setIsLoggedIn(false)
      setUser({ name: "", email: "" })
      navigate('/auth')
    } else {
      navigate('/auth')
    }
  }

return (
  <div className='border-b-[0.5px] border-b-[#B8B6B6]'>

    {/* Top Row */}
    <div className='w-full h-[80px] flex items-center justify-between px-[3%] md:px-[10%] lg:px-[20%]'>

      <div
        className='flex items-center gap-1 md:gap-3 cursor-pointer'
        onClick={handleLogoClick}
      >
        <img
          src={logo}
          alt="logo"
          className='w-[30px] h-[30px] md:w-[39px] md:h-[41px]'
        />

        <h3 className='text-[20px] md:text-[27px] font-semibold text-[#2D0050]'>
          TaskDuty
        </h3>
      </div>


      <div className='flex gap-5 items-center font-medium text-[14px] md:text-[17px]'>

        {isLoggedIn && (
          <p>Hi, {user.name.split(" ")[0]}</p>
        )}

        <button
          onClick={handleLoginToggle}
          className={!isLoggedIn
            ? "text-white bg-[#974FD0] px-4 py-2 rounded-lg"
            : "text-white bg-[#974FD0] hover:bg-red-500 px-4 py-2 rounded-lg"}
        >
          {!isLoggedIn ? "Login" : "Logout"}
        </button>

      </div>

    </div>


    {/* Links */}
    {isLoggedIn && (
      <nav className='flex justify-center gap-6 py-4 text-[15px] font-medium md:hidden'>

        <Link
          to="/new-task"
          className={`transition ${
            location.pathname === "/new-task"
              ? "text-[#974FD0] drop-shadow-[0_0_8px_#974FD0]"
              : "hover:text-[#974FD0]"
          }`}
        >
          New Task
        </Link>


        <Link
          to="/my-tasks"
          className={`transition ${
            location.pathname === "/my-tasks"
              ? "text-[#974FD0] drop-shadow-[0_0_8px_#974FD0]"
              : "hover:text-[#974FD0]"
          }`}
        >
          All Tasks
        </Link>


        <Link
          to="/my-trash"
          className={`transition ${
            location.pathname === "/my-trash"
              ? "text-[#974FD0] drop-shadow-[0_0_8px_#974FD0]"
              : "hover:text-[#974FD0]"
          }`}
        >
          Trash
        </Link>

      </nav>
    )}


    {/* Desktop Links */}
    {isLoggedIn && (
      <nav className='hidden md:flex justify-center gap-6 pb-4 font-medium text-[16px]'>

        <Link
          to="/new-task"
          className={`transition ${
            location.pathname === "/new-task"
              ? "text-[#974FD0] drop-shadow-[0_0_8px_#974FD0]"
              : "hover:text-[#974FD0]"
          }`}
        >
          New Task
        </Link>


        <Link
          to="/my-tasks"
          className={`transition ${
            location.pathname === "/my-tasks"
              ? "text-[#974FD0] drop-shadow-[0_0_8px_#974FD0]"
              : "hover:text-[#974FD0]"
          }`}
        >
          All Tasks
        </Link>


        <Link
          to="/my-trash"
          className={`transition ${
            location.pathname === "/my-trash"
              ? "text-[#974FD0] drop-shadow-[0_0_8px_#974FD0]"
              : "hover:text-[#974FD0]"
          }`}
        >
          Trash
        </Link>

      </nav>
    )}

  </div>
)
}

export default NavBar