import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import back from '../assets/back.png'
import { useNavigate } from 'react-router-dom';
import { useCreateTask, useUpdateTask } from '../hooks/useApi';
import Modal from '../components/Modal';
// import { useTaskActivePage } from '../context/ActivePageContext';
import { useParams } from 'react-router-dom';
import { useGetTaskById } from '../hooks/useApi';

const NewTask = () => {
    const navigate = useNavigate()

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("Casual");
    const [ inputError, setInputError ] = useState("")

    const [modal, setModal] = useState<{
        show: boolean;
        type: "success" | "error";
        message: string;
    }>({ show: false, type: "success", message: "" });

    // const { setActivePage } = useTaskActivePage()

    const { mutate: createTask, isPending } = useCreateTask();
    const { mutate: updateTask } = useUpdateTask();

    const { id } = useParams();
    const isEditMode = !!id;
    

    const { data: task } = useGetTaskById(id || "");


    useEffect(() => {
        if (task) {
            setTitle(task.title ?? "");
            setDescription(task.description ?? "");
            setTag(task.tag ?? "");
        }
    }, [task]);

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
        return setInputError("Please provide a TITLE and DESCRIPTION!")
    }
    

    if (isEditMode) {
        updateTask({
            _id: id!,
            data: {
              title,
              description,
              tag,
              completed: task?.completed ?? false,
            },
            
        },
        {
        onSuccess: () => {
            setModal({
                show: true,
                type: "success",
                message: "Task updated!",
            });
  
            setTitle("");
            setDescription("");
            setTag("");
  
        },
  
        onError: () => {
            setModal({
                show: true,
                type: "error",
                message: "Failed to update task.",
        });
      },
        }
    );

    } else {
        createTask(
            {
              title,
              description,
              tag,
            },
        {
        onSuccess: () => {
            setModal({
                show: true,
                type: "success",
                message: "Task created!",
            });
  
            setTitle("");
            setDescription("");
            setTag("");
  
        },
  
        onError: () => {
            setModal({
                show: true,
                type: "error",
                message: "Failed to create task.",
        });
      },
    }
  );
}
};

    const handleCloseModal = () => {
    const isSuccess = modal.type === "success";

    setModal((prev) => ({ ...prev, show: false }));

    if (isSuccess) {
      setTimeout(() => {
        navigate("/my-tasks");
      }, 200)
    }
  };
    

  return (
    <div>
        <NavBar/>
        <div className=' px-[5%] md:px-[10%] pt-10 lg:px-[20%] flex flex-col gap-10'>
            <div className='flex gap-4 items-center'
            onClick={ ()=>navigate("/my-tasks") }>
                <div className='hover:scale-130 transform'>
                    <img src={back} alt="" 
                    className='w-[15px] h-[30px]'/>
                </div>

                <h1 className='text-[40px] font-medium '>{task ? "Edit Task" : "New Task"}</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-8'>
                    <div>
                        <p className='text-[18px] text-[#9C9C9C] pl-6'>Task Title</p>
                        <div className='w-full h-[60px] border border-[hsla(0,1%,72%,0.5)]  rounded'>
                            <input type="text"
                            value={title} 
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setInputError("")
                            }}
                            className='w-full h-full px-6 outline-0'
                            placeholder='E.g Project Defense, Assignment ...'/>
                        </div>
                        <p className="text-red-500">{inputError}</p>
                    </div>
                    <div>
                        <p className='text-[18px] text-[#9C9C9C] pl-6'>Description</p>
                        <div className='w-full h-[220px] border border-[hsla(0,1%,72%,0.5)]  rounded relative'>
                            <textarea  
                            className='w-full h-full px-6 outline-0 py-4 appearance-none resize-none'
                            placeholder='Briefly describe your task...'
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                setInputError("")
                            }}/>
                        </div>
                        <p className="text-red-500">{inputError}</p>
                    </div>
                    <div>
                        <label htmlFor="tags" className='text-[18px] text-[#9C9C9C] pl-6'>Tags</label>
                        <select name="tags" id="tags"
                         className={`w-full h-[60px] border border-[hsla(0,1%,72%,0.5)]  rounded outline-0  pl-6 `}
                         value={tag}
                         onChange={(e) => setTag(e.target.value)}>
                            <option value="Casual" className='text-[#73C3A6]'>Casual</option>
                            <option value="Important" className='text-[#73C3A6] text-amber-200'>Important</option>
                            <option value="Urgent" className='text-[#73C3A6] text-[#F38383]'>Urgent</option>
                        </select>
                    </div>
                </div>
                <button className='w-full h-[60px] bg-[#974FD0] text-[#FAF9FB] font-medium rounded mt-15 hover:bg-[#7234a5] transition'
                type='submit'
                disabled={isPending}>
                    {isPending ? "Creating..." : "Done"}
                </button>
            </form>

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

        </div>
      {modal.show && (
        <Modal
          type={modal.type}
          message={modal.message}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default NewTask