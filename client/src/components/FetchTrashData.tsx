import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useGetTrashedTasks, useRestoreTask, useDeleteTask } from '../hooks/useApi';
import { CircleLoader } from 'react-spinners';
import tickIcon from '../assets/icons8-tick-48.png'
import notFound from '../assets/notFound.png'
import emptyTrash from '../assets/empty trash.png'
import restore from '../assets/restore.png'
import deleteIcon from '../assets/delete icon.png'
import ConfirmationModal from './ConfirmationModal';
import toast from 'react-hot-toast';



type Task = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  tag: string
}

const FetchTrashData = () => {
    const navigate = useNavigate();

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [confirmModalMode, setconfirmModalMode] = useState<"delete" | "trash">("delete")
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)

  const { mutate: deleteTask } = useDeleteTask();

  const [statusFilter, setStatusFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState("All");

  const { data, isLoading, isError } = useGetTrashedTasks();
  const { mutate: restoreTask } = useRestoreTask();

    if (isLoading) {
      return (
            <div className='flex justify-center items-center min-h-[400px]'>
                <CircleLoader color='#974FD0' size={50} />
            </div>
      )
    }

    if (isError) return <div>Something went wrong.</div>

    if (!data || data.length === 0) {
      return (
        <div className='flex items-center justify-center w-full h-90'>
          <p className='text-center w-60'>
            <span className=' text-2xl font-bold block text-[#974FD0]'>No Trashed Tasks!</span>
            <span className='block flex justify-center my-5'><img src={emptyTrash} alt="" /></span>
             Click on 
             <strong 
             className='text-[#974FD0] hover:underline'
             onClick={()=>navigate("/my-tasks")}> my tasks </strong> 
             to see all your tasks.</p>
        </div>
      )
    }


    const handleRestore = (task: Task)=> {

        restoreTask(task._id, {
          onSuccess: () => {
            toast.success("Task restored!", {
              style: {
                background: '#974FD0',  
                color: '#fff',
                border: '1px solid #7234a5',
                fontWeight: 500,
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#974FD0',
              },
            });
          },

          onError: () => {
            toast.error("Something went wrong. Please try again.", {
              style: {
                background: '#F38383',
                color: '#fff',
                border: '1px solid #d65a5a',
                fontWeight: 500,
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#F38383',
              },
            });
          }
    })


    }

        const handleDelete = (task: Task)=> {
            setSelectedTaskId(task._id)
            setconfirmModalMode("delete")
            setIsConfirmModalOpen(true)

    }

    const handleConfirm = () => {
        if (!selectedTaskId) return
        setIsConfirmModalOpen(false)
        if (confirmModalMode === 'delete') {
        deleteTask(selectedTaskId, {

          onSuccess: () => {
            setSelectedTaskId(null)
            toast.success("Task deleted!", {
              style: {
                background: '#974FD0',   
                color: '#fff',
                border: '1px solid #7234a5',
                fontWeight: 500,
              },
              iconTheme: {
                primary: '#fff',         
                secondary: '#974FD0',
              },
            });
          },

          onError: () => {
            toast.error("Something went wrong. Please try again.", {
              style: {
                background: '#F38383',
                color: '#fff',
                border: '1px solid #d65a5a',
                fontWeight: 500,
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#F38383',
              },
            });
          }
    })
        }
    }

    const handleCancel = () => {
        setIsConfirmModalOpen(false)
        setSelectedTaskId(null)
    }

const filteredTasks = data.filter((task) => {
  const matchesStatus =
    statusFilter === "All" ||
    (statusFilter === "Completed" && task.completed) ||
    (statusFilter === "Incomplete" && !task.completed);

  const matchesTag =
    tagFilter === "All" || task.tag === tagFilter;

  return matchesStatus && matchesTag;
});

const handleClear = () => {
  setTagFilter("All")
  setStatusFilter("All")
}

  return (
    <div className='flex flex-col gap-15 items-center pb-20'>
    <div className="flex gap-4 w-full justify-between items-center mb-6">

        <div>
            <p>{`Showing ${filteredTasks.length} of ${data.length} task${data.length > 1 ? `s` : ""}`}</p>
        </div>

    <div className='flex flex-col gap-5'>

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="border border-[hsla(0,1%,72%,0.5)] px-4 py-2 rounded-[8px]"
  >
    <option value="All">All Status</option>
    <option value="Completed">Completed</option>
    <option value="Incomplete">Incomplete</option>
  </select>

  
  <select
    value={tagFilter}
    onChange={(e) => setTagFilter(e.target.value)}
    className="border border-[hsla(0,1%,72%,0.5)] px-4 py-2 rounded-[8px]"
  >
    <option value="All">All Tags</option>
    <option value="Casual">Casual</option>
    <option value="Important">Important</option>
    <option value="Urgent">Urgent</option>
  </select>

    </div>

</div>

      {
        filteredTasks.map((result)=> {
          return (
            <div key={result._id} 
            className='w-full border border-[hsla(0,1%,72%,0.5)] px-3 rounded'>
              <div className='flex justify-between border-b border-[hsla(0,1%,72%,0.5)] py-3'>
                <div className='flex items-end gap-1'>
                  <p className={` text-[17px] ${result.tag === "Urgent" ? `text-[#F38383]` : result.tag === "Important" ? `text-amber-400`: `text-[#73C3A6]`}` }>{result.tag}</p>

                </div>

                <div className='flex gap-2 md:gap-5'>

                  <button className='px-[12px] py-[8px] md:px-[22px] md:py-[8px] items-center bg-[#974FD0] hover:bg-[#7234a5] flex gap-2 text-white rounded-[8px]  transition'
                  onClick={()=>handleRestore(result)}>
                    <img src={restore} alt="" 
                    className='w-[20px] h-[20px] md:w-[24px] md:h-[24px]'
                    
                    />Restore</button>

                  <button className='px-[12px] py-[8px] md:px-[22px] md:py-[8px] items-center border border-[#974FD0] flex gap-2 text-[#974FD0] rounded-[8px] hover:bg-red-400 transition'
                  onClick={()=>handleDelete(result)}>
                    <img src={deleteIcon} alt="" 
                    className='w-[20px] h-[20px] md:w-[24px] md:h-[24px]'
                    
                    />Delete</button>

                </div>
              </div>

              <div className='pt-2 pb-7'>
                <div className='flex items-center'>
                <h3 className='text-[25px] text-[#292929] font-medium'>{result.title}</h3>
                  {
                    result.completed && (
                  <div>
                    <img src={tickIcon} alt=""
                    className='w-8 h-8' />
                  </div>
                    )
                  }
                </div>
                <p className=' text-[#737171]'>{result.description}</p>
              </div>


            </div>
          )
        })
      }

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        mode={confirmModalMode}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
    />

      { filteredTasks.length >= 4 && (
            <div className='w-full text-center'>
                <a
                className='text-[#974FD0] hover:underline
                '
                  href="#"
                  onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
        
                }}>
                  Back to Top
                </a>
                </div>
      )
      }

                    {filteredTasks.length === 0 && (
                <div className='w-full items-center justify-center flex flex-col gap-5 py-10'>
                  <img src={notFound} alt="" />
                  <p className='text-2xl md:text-3xl font-bold'>No Task With Set Filter Found</p>
                  <button
                    type='button'
                    className='bg-[#974FD0] hover:bg-[#7234a5] transition w-[140px] h-[62px] p-[10px] rounded-[10px] text-white text[18px] font-[400]'
                    onClick={handleClear}
                  >
                    Clear Filter?
                  </button>
                </div>
              )}

    </div>

  )
}
export default FetchTrashData;