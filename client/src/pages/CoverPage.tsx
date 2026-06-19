import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import hero from '../assets/hero.png'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";
import Modal from '../components/Modal';

const CoverPage = () => {
  const navigate = useNavigate()
  const {isLoggedIn} = useAuth()
  const [modal, setModal] = useState<{
      show: boolean;
      type: "login"
      message: string;
  }>({ show: false, type: "login", message: "Please login to be able to access your tasks..." })

  const handleShowModal = () => {
    setModal((prev) => ({ ...prev, show: true }));
  }

  const handleCloseModal = () => {
    setModal((prev) => ({ ...prev, show: false }));
    navigate("/auth")
  }

  return (
    <div>
      <NavBar/>
      <div className='px-[5%] md:px-[10%] lg:px-[20%] flex flex-col-reverse lg:flex-row md:flex-col-reverse md:items-center  gap-20 md:gap-30 py-30 justify-between pt-20 coverResponsive'>
      <div className='flex flex-col gap-5'>
        <h1 className='font-medium text-[30px] lg:text-[42px] coverH1'>Manage your Tasks on 
          <br/>
          <span className='text-[#974FD0]'>TaskDuty</span></h1>
        <p className=' lg:w-[400px] text-[17px] text-[#737171] font-normal coverP'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non tellus, sapien, morbi ante nunc euismod ac felis ac. Massa et, at platea tempus duis non eget. Hendrerit tortor fermentum bibendum mi nisl semper porttitor. Nec accumsan.
        </p>
      <div>
        <button className='text-[16px] px-[22px] py-[8px] bg-[#974FD0] rounded-[8px] text-white hover:bg-[#7234a5] transition'
        onClick={()=> isLoggedIn ? navigate('/my-tasks') : handleShowModal()}>Go to My Tasks</button>
      </div>
      </div>

      <div>
        <img src={hero} alt="" 
        className='w-[408px] h-[386px] coverImg'/>
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

export default CoverPage