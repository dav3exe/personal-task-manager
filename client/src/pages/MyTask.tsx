import React, { useContext } from 'react'
import NavBar from '../components/NavBar'
import plus from '../assets/plus.png'
// import { ActivePageProvider, useTaskActivePage } from '../context/ActivePageContext'
import FetchData from '../components/FetchData'
import { useNavigate } from 'react-router-dom'
// import { ActiveContext } from '../context/ActivePageContext'

const MyTask = () => {
    const navigate = useNavigate()
    // const { setActivePage } = useTaskActivePage()

  return (
    <div>
        {/* <ActivePageProvider> */}
        <NavBar/>
        <div className='w-full h-screen px-[5%] md:px-[10%] lg:px-[20%] pt-10 flex flex-col gap-7 '>
            <div className='flex justify-between items-center'>
                <h1 className='text-[40px] font-medium'>My Tasks</h1>
                <button className='text-[#974FD0]  flex items-center gap-1 hover:underline'
                onClick={() => {
                  navigate("/new-task")
                  // setActivePage("New Task");
                }}>
                    <span>
                        <img src={plus} alt="" 
                        className='w-[20px] h-[20px]'/>
                    </span> Add New Task</button>
            </div>

            <div>
                <FetchData/>
            </div>

        </div>
        {/* </ActivePageProvider> */}
    </div>
  )
}

export default MyTask