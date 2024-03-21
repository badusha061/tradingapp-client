import React, { useReducer, useState } from 'react'
import { Button } from "@/components/ui/button"
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

function Navbar() {

    const navigate =  useNavigate()
    const userId = JSON.parse(localStorage.getItem('userId'));
    const handleLogin = () => {
        navigate('/login')
    }
 

    const handleRegister = () => {
        navigate('/register')
    }
    const UserName =  localStorage.getItem('username');
    const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        toast.success('SuccessFully Logout')
        forceUpdate()
    }

  return (
    <header className="pb-6 bg-white lg:pb-0">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
  
        <nav className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">

            <NavLink to="/" >
                    <img className="w-auto h-8 lg:h-10" src="https://i.pinimg.com/474x/75/eb/a7/75eba7058f3942931d5097afe551b8a8.jpg" alt="" />
            </NavLink>
                

            </div>

            <div className=" flex justify-between gap-4  " >
                {userId ? (
                    <>
                    <div className=' flex   gap-4' >
                        <p className=' text-black  font-medium text-lg' > {UserName} </p>
                         <Button onClick={handleLogout} variant="blackvariant"  >
                            Logout
                        </Button> 
                    </div>
                    </>
                ):(
                    <>
                <div>
                <Button onClick={handleLogin} variant="blackvariant"  >
                    Login
                </Button>   
                </div>
                <div>
                <Button onClick={handleRegister} variant="blackvariant"  >
                    Register
                </Button>  
                </div>
                    </>
                )}

            </div>
        </nav>

        <Toaster
          position="top-center"
          reverseOrder={false}
          />

    </div>
</header>

  )
}

export default Navbar
