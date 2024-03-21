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
import Layouts from "@/Layouts/Layouts";
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate()
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [register , setRegister] = useState({
    username:'',
    password1:'',
    password2:'',
  })
  const [errors , setErrors] = useState({})
  const handleSubmit  = (e) => {
    e.preventDefault()

    const validateError = {}

    if(!register.username.trim()){
      validateError.username = "UserName Cannot be Empty"
    }
    if(register.username.length <= 5){
      validateError.username = "UserName Must be 5 character"
    }
    if(!register.password1.trim()){
      validateError.password1 = "Password Cannot be Empty"
    }else if(!register.password2.trim()){
      validateError.password2 = "Conform Password Cannot Be Empty"
    }else if(register.password1 != register.password2){
      validateError.password1 = "Password Do Not Match"
    }else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(register.password1)){
      validateError.password1 = "Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
    }
    setErrors(validateError)
    if(Object.keys(validateError).length === 0){

      const instance = axios.create({
        baseURL:`${BASE_URL}/api/user`,
      })
      
      instance.post('',register)
      .then((response) =>{
        if(response.status === 201){
          toast.success('SuccessFully Registered')
          navigate('/login')
        }
        
      })
      .catch((error) => {
        toast.error('UserName is Already Taken')
        return false
      })
      
    }
  }


  return (
    <Layouts>

    <div className=' flex justify-center  content-center items-center h-screen ' > 
          <Card className="w-[350px] bg-white ">
      <CardHeader>
        <div className=" text-black " >
          <CardTitle>Register Form</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} >
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label  className="text-black" htmlFor="name">Username</Label>
              <Input onChange={(e) => setRegister({...register , username:e.target.value})}  id="name" placeholder="Enter your Username" />
              {errors.username && <span className=' text-red-700 font-bold ' > {errors.username} </span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label  className="text-black"  htmlFor="password">Password</Label>
              <Input  onChange={(e) => setRegister({...register , password1:e.target.value})} id="password1" type="password" placeholder="Enter  your Password" />
              {errors.password1 && <span className=' text-red-700 font-bold ' > {errors.password1} </span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label  className="text-black" htmlFor="password">Conform Password</Label>
              <Input onChange={(e) => setRegister({...register , password2:e.target.value})} id="password2" type="password" placeholder="Conform Your Password" />
              {errors.password2 && <span className=' text-red-700 font-bold ' > {errors.password2} </span>}
            </div>
            <div   className="flex flex-col space-y-1.5" >
                <Button variant="blackvariant"   >
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

export default Register
