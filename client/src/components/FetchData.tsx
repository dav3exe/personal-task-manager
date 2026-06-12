import { useEffect, useState } from 'react';
import { getTasks } from '../services/api'
import { useNavigate } from 'react-router-dom';
import { useDeleteTask, useGetTasks, useUpdateTask } from '../hooks/useTasksApi';
import { CircleLoader } from 'react-spinners';
import editIcon from '../assets/edit icon.png'
import deleteIcon from '../assets/delete icon.png'
import tickIcon from '../assets/icons8-tick-48.png'
import Modal from './Modal';
import notFound from '../assets/notFound.png'


type Task = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  tag: string
}

const FetchData = () => {
  const navigate = useNavigate();

  const [modal, setModal] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });

  const { mutate: mutateTask } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();

  const [statusFilter, setStatusFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState("All");
  
  const { data, isLoading, isError } = useGetTasks();

    if (isLoading) {
      return (
            <div className='flex justify-center items-center min-h-[400px]'>
                <CircleLoader color='#1A3C34' size={100} />
            </div>
      )
    }

    if (isError) return <div>Something went wrong.</div>

    if (!data || data.length === 0) {
      return (
        <div>No tasks found</div>
      )
    }

    const markCompleted = (task: Task)=> {
      mutateTask({
        _id: task._id,
        data: {
          title: task.title,
          description: task.description,
          tag: task.tag,
          completed: true,
        },
      });
    }

    const markIncomplete = (task: Task)=> {
      mutateTask({
        _id: task._id,
        data: {
          title: task.title,
          description: task.description,
          tag: task.tag,
          completed: false,
        },
      });
    }

    const handleDelete = (task: Task)=> {

        deleteTask(task._id, {
          onSuccess: () => {
            setModal({
              show: true,
              type: "success",
              message: "Task deleted!",
            });
          },

          onError: () => {
            setModal({
              show: true,
              type: "error",
              message: "Something went wrong. Please try again.",
            });
          }
    })


    }

    const handleCloseModal = () => {
    const isSuccess = modal.type === "success";

    setModal((prev) => ({ ...prev, show: false }));

    if (isSuccess) {
      navigate("/my-tasks");
    }
  };

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
    <div className='flex flex-col gap-15 items-center'>
      <div className="flex gap-4 w-full justify-end mb-6">

  
  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="border border-[hsla(0,1%,72%,0.5)] px-4 py-2 rounded"
  >
    <option value="All">All Status</option>
    <option value="Completed">Completed</option>
    <option value="Incomplete">Incomplete</option>
  </select>

  
  <select
    value={tagFilter}
    onChange={(e) => setTagFilter(e.target.value)}
    className="border border-[hsla(0,1%,72%,0.5)] px-4 py-2 rounded"
  >
    <option value="All">All Tags</option>
    <option value="Casual">Casual</option>
    <option value="Important">Important</option>
    <option value="Urgent">Urgent</option>
  </select>

</div>
      {
        filteredTasks.map((result)=> {
          return (
            <div key={result._id} 
            className='w-full border border-[hsla(0,1%,72%,0.5)] px-3 rounded'>
              <div className='flex justify-between border-b border-[hsla(0,1%,72%,0.5)] py-3'>
                <div className='flex items-end gap-1'>
                  <p className={` text-[17px] ${result.tag === "Urgent" ? `text-[#F38383]` : result.tag === "Important" ? `text-amber-400` : `text-[#73C3A6]`}` }>{result.tag}</p>

                </div>

                <div className='flex gap-2 md:gap-5'>
                  <button className='px-[12px] py-[8px] md:px-[22px] md:py-[8px] items-center bg-[#974FD0] hover:bg-[#7234a5] flex gap-2 text-white rounded-[8px] transition'>
                    <img src={editIcon} alt="completed" 
                    className='w-[20px] h-[20px] md:w-[24px] md:h-[24px]'
                    onClick={() => navigate(`/edit-task/${result._id}`)}/>
                    Edit
                    </button>

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

              <button
              className='hover:underline text-[#974FD0]'
              onClick={()=> result.completed ? markIncomplete(result) : markCompleted(result)}>{
                result.completed ? "Mark as incomplete" : "Mark completed"
              }
              </button>

            </div>
          )
        })
      }
      {modal.show && (
        <Modal
          type={modal.type}
          message={modal.message}
          onClose={handleCloseModal}
        />
      )}

      { filteredTasks.length > 0 && (
            <div className='w-full text-center pb-8'>
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
                  <p className='text-2xl md:text-3xl font-bold'>NO TASK FOUND</p>
                  <button
                    type='button'
                    className='bg-[#974FD0] hover:bg-[#7234a5] transition w-[140px] h-[62px] p-[10px] rounded-[10px] text-white text-[18px] font-[400]'
                    onClick={handleClear}
                  >
                    Clear Filter
                  </button>
                </div>
              )}

    </div>

  )
}

export default FetchData