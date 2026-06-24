import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar'
import plus from '../assets/plus.png'
import FetchTrashData from '../components/FetchTrashData';
import back from '../assets/back.png'

const TrashTask = () => {
    const navigate = useNavigate();

  return (
    <div>
        <NavBar/>
        <div className='w-full h-screen px-[5%] md:px-[10%] lg:px-[20%] pt-10 flex flex-col gap-7 '>
            <div className='flex justify-between items-center'>
            <div className='flex gap-4 items-center'
            onClick={ ()=>navigate("/my-tasks") }>
                <div className='hover:scale-130 transform'>
                    <img src={back} alt="" 
                    className='w-[15px] h-[30px]'/>
                </div>

                <h1 className='text-[40px] font-medium '>Trash</h1>
            </div>
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
                <FetchTrashData/>
            </div>

        </div>
    </div>
  )
}

export default TrashTask