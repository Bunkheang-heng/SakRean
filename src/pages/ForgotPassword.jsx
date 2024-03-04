import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OAuth from './components/OAuth';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");



  function onChange(e) {
    setEmail(e.target.value);
  }

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20 mt-10 ml-5">
        <h1 className="text-3xl text-center mt-6 font-bold mb-6">Forget Password</h1>
        <form>
          <input
            type="email"
            className="w-full px-4 py-2 text-xl border-gray-300 rounded transition ease-in-out"
            id="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
          />
          <div className="flex justify-between whitespace-nowrap sm:text-lg">
            <p className="mb-6">
              Don't have an account or Have an account?<span> </span>
              <Link to="/sign-up" className="text-red-600 hover:text-red-400">
                Register
              </Link>
              <span className='ml-3 mr-3'>
                OR
              </span>
              <Link to="/sing-in" className="text-red-600 hover:text-red-400">
                Sign In
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="bg-blue-600 w-full pt-3 pb-3 active:opacity-70 text-white text-lg"
          >
            Send reset password
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
