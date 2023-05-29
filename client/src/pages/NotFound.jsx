import React from 'react'
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center h-[100vh]'>
      <div className='flex text-7xl font-bold mb-2'>
      <h1 className='flex gap-2'>
        <FaExclamationTriangle /> <span>404</span>
      </h1>
      </div>
      <h4>Sorry, there is nothing here</h4>
      <button 
      className='text-slate-600'
      onClick={()=>navigate(-2)}>Go Back</button>
    </div>
  )
}

export default NotFound