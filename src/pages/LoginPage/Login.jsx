import  React , {useState} from "react"
import axios from 'axios';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Layouts from "@/Layouts/Layouts";
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';


function Login() {
  const navigate = useNavigate()
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [login , setLogin] = useState({
    username:'',
    password:''
  })
  const [errors , setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()

    const validateError = {}

    if(!login.username.trim()){
      validateError.username = "UserName Cannot Be Empty"
    }else if(login.username.length <= 5 ){
      validateError.username = "UserName Must Contains 5 character"
    }if(!login.password.trim()){
      validateError.password = "Password Cannot be Empty"
    }else if(!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(login.password)){
      validateError.password = "Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
    }
    setErrors(validateError)
    if(Object.keys(validateError).length === 0){

      const instance = axios.create({
        baseURL:`${BASE_URL}/api/token`,
      })
  
      instance.post('',login)
      .then((response) =>{
      if(response.status === 200){
        const refresh_token = response.data.refresh
        const access_token = response.data.access
        const access_decoded = jwtDecode(access_token);
        localStorage.setItem('access_token',response.data.access)
        localStorage.setItem('refresh_token',response.data.refresh)
        localStorage.setItem('userId',access_decoded.id);
        localStorage.setItem('username',access_decoded.username);
        navigate('/')
        toast.success('Succesfully Logined')
      }
      
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
  return (
    

    <Layouts>

    <div className=' flex justify-center  content-center items-center h-screen ' > 
          <Card className="w-[350px] bg-white ">
      <CardHeader>
        
        <div className=" text-black " >
          <CardTitle>Login Form</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} >
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label  className="text-black" htmlFor="name">Username</Label>
              <Input onChange={(e) => setLogin({...login , username:e.target.value})}  id="username" placeholder="Enter your Username" />
              {errors.username && <span className=' text-red-700 font-bold ' > {errors.username} </span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label  className="text-black"  htmlFor="password">Password</Label>
              <Input  onChange={(e) => setLogin({...login , password:e.target.value})} id="password" type="password" placeholder="Enter  your Password" />
              {errors.password && <span className=' text-red-700 font-bold ' > {errors.password} </span>}
            </div>
            <div   className="flex flex-col space-y-1.5" >
                <Button  variant="blackvariant" >
                    Register
                </Button>
            </div>
          </div>
        </form>
          
        
      </CardContent>
    </Card>

    <Toaster
          position="top-center"
          reverseOrder={false}
          />

    </div>
    </Layouts>
  
  )
}

export default Login
