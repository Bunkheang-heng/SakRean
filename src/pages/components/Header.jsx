import React from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
export default function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location.pathname);
    function pathMatchRoute(route){
        if(route === location.pathname){
            return true;
        }
    }
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
        <div>
            <img src="https://i.stci.uk/sites/www.savethechildren.net/themes/stcui/img/stc_logo.svg" alt="Logo of Save the children" className='h-5 cursor-pointer'
            onClick={()=>navigate("/")}
            />
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
            >Content</li>
                <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-transparent ${pathMatchRoute("/sign-in") && 'text-black border-b-red-600'}` 
            } 
            onClick={()=>navigate("/sign-in")}
            >Sign in</li>
            </ul>
        </div>
      </header>
    </div>
  )
}
