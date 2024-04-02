import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {getAuth, onAuthStateChanged} from "firebase/auth"
export default function Header() {
    const [pageState, setPageState] = useState("Sign in"); 
    const auth = getAuth(); 
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location.pathname);
    function pathMatchRoute(route){
        if(route === location.pathname){
            return true;
        }
    }

    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
        if(user){
          setPageState("Profile");
        }else{
          setPageState("Sign in");
        }
      })
    }, [auth]);

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
        <div className='flex'>
            <img src='https://t3.ftcdn.net/jpg/03/92/80/46/240_F_392804645_tUQxo5EgPXvFGxn5OQguX1BiYlI6lCOV.jpg' alt="Logo of Save the children" className='h-5 cursor-pointer'
            onClick={()=>navigate("/")}
            />
            <h2 className="text-blue-900 flex justify-between">
              <div>
              <b >Uni<span className='text-yellow-300'>Info</span></b> 
              </div>
            </h2>
        </div>

        <div>
            <ul className='flex space-x-10'>
                <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-transparent ${pathMatchRoute("/") && 'text-black border-b-red-600'}` 
            } 
            onClick={()=>navigate("/")}
            >Home</li>
                <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-transparent ${pathMatchRoute("/content") && 'text-black border-b-red-600'}` 
            }
            onClick={()=>navigate("/content")}
            >Courses</li>
                <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-transparent
                 ${(pathMatchRoute("/sign-in") || pathMatchRoute("/sign-in")) && "text-black border-b-red-600"}` 
            } 
            onClick={()=>navigate("/profile")}
            >{pageState}</li>
            <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-transparent ${pathMatchRoute("/aboutMe") && 'text-black border-b-red-600'}` 
            }
            onClick={()=>navigate("/aboutMe")}
            >About Me</li>
            </ul>
        </div>
      </header>
    </div>
  )
}
