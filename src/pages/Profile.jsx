import React, { useState } from 'react'
import {getAuth, updateCurrentUser, updateProfile} from "firebase/auth"
import {  useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { PiStudent } from "react-icons/pi";
import { Link } from 'react-router-dom';
export default function Profile() {
  const auth = getAuth(); 
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false); 
  const [formData, setFormData] = useState({
    name : auth.currentUser.displayName,
    email : auth.currentUser.email,
  });

  function onLogout(){
    auth.signOut()
    navigate('/')
  }

  function onChange(e){
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.id]:e.target.value
    }))
  }

 async function onSubmit(){
    try {
      if(auth.currentUser.displayName !== name){
        await updateProfile(auth.currentUser, {
          displayName:name, 
        });

        const docRef = doc(db,"users", auth.currentUser.uid)
        await updateDoc(docRef, {
          name,
        })

      }

      toast.success("Edit sucessfully");

    }catch(e){
      toast.e("Could not update the profile")
    }

  }

  const {name, email} = formData;

  return (
    <>
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center mt-10 font-bold'>My Admin</h1>
        <div className='w-full md:w-[50%] mt-6 px-3 '>
          <form>
              <input type="text" id='name' value={name} disabled={!changeDetail} onChange={onChange} className={`w-full px-4 py-2 text-xl text-gray-700
               bg-white border border-gray-300 rounded transition ease-in-out mb-6 ${changeDetail && "bg-red-500 focus:bg-red-200"}`} />
               
              <input type="email" id='email' value={email} disabled className='w-full px-4 py-2 text-xl text-gray-700
               bg-white border border-gray-300 rounded transition ease-in-out mb-6' />

               <div className='flex justify-between whitespace-nowrap text-lg '>
                <p className='flex items-center mb-6'>Do you want to change your info?
                  <span className='text-red-600 hover:text-red-900 transition ease-in-out duration-200 ml-1 cursor-pointer' 
                    onClick={()=> {
                      changeDetail && onSubmit()
                     setChangeDetail((prevState) => !prevState)}}
                  >
                    {changeDetail ? "Apply change" : "Edit"}
                  </span>
                </p>
                <p onClick={onLogout} className='text-red-600 hover:text-blue-500 transition ease-in-out duration-200 cursor-pointer'>
                  Sign out
                </p>
               </div>
          </form>
          <button type="submit" className='w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm 
          font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>
            <Link to="/create-listing" className='flex justify-center items-center'>
            <PiStudent className='mr-2 text-3xl bg-black rounded-full p-1 border-2'/>
            Creating Courses
            </Link>
          </button>
          <button type="submit" className='w-full bg-yellow-600 text-white mt-6 uppercase px-7 py-3 text-sm 
          font-medium rounded shadow-md hover:bg-yellow-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>
           <Link to="/updatecourse">
           Update Courses
           </Link>
          </button>
        </div>
      </section>
    </>
  )
}
