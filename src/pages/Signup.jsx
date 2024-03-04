import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import OAuth from './components/OAuth';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {db} from '../firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name:'',
  });

  const {name, email, password } = formData;
  const navigate = useNavigate();

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e){

    e.preventDefault()
    try {
      const auth = getAuth();
      const userCrodential = await createUserWithEmailAndPassword(auth, email, password); 
      updateProfile(auth.currentUser, {
        displayName: name
      })
      const user = userCrodential.user
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy)
      navigate("/");
      toast.success("Registration successfull"); 

    } catch (error) {
      toast.error("There's an error in registration")
    }

  }

  return (
    <section className="flex justify-center items-center h-screen ">
      <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20 mt-10 ml-5">
        <h1 className="text-3xl text-center mt-6 font-bold mb-7">Sign up</h1>
        <form onSubmit={onSubmit}>
        <input
            type="text"
            className="w-full px-4 py-2 text-xl border-gray-300 rounded transition ease-in-out mb-6"
            id="name"
            value={name}
            onChange={onChange}
            placeholder="Full Name"
          />
          <input
            type="email"
            className="w-full px-4 py-2 text-xl border-gray-300 rounded transition ease-in-out"
            id="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
          />
          <div className="relative mb-6">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full px-4 py-2 text-xl border-gray-300 rounded transition ease-in-out mt-6"
              id="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
            />
            {showPassword ? (
              <FaRegEyeSlash
                className="absolute right-3 top-9 text-xl cursor-pointer"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            ) : (
              <FaRegEye
                className="absolute right-3 top-9 text-xl cursor-pointer"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            )}
          </div>
          <div className="flex justify-between whitespace-nowrap sm:text-lg">
            <p className="mb-6">
               Have an account?<span> </span>
              <Link to="/sign-in" className="text-red-600 hover:text-red-400">
                Sign up
              </Link>
            </p>
            <p>
              <Link to="/forgot-password" className="text-blue-600 hover:text-blue-400">
                Forgot password?
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="bg-blue-600 w-full pt-3 pb-3 active:opacity-70 text-white text-lg"
          >
            Sign up
          </button>
          <div className="my-4 before:border-t flex before:flex-1 items-center before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
            <p className="text-center font-semibold mx-4">OR</p>
          </div>
        </form>
        <OAuth />
      </div>
    </section>
  );
}
