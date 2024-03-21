import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import Layouts from '../../Layouts/Layouts.jsx'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
import { Button } from "@/components/ui/button"
import { CirclePlus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate()
    const userId = JSON.parse(localStorage.getItem('userId'));
    const [selectedStocks , setSelectedStocks] = useState([])
    const[stocks , setStocks] = useState([])
    console.log(userId);
    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    const GetNifty50 = () => {
        const instance = axios.create({
            baseURL:`${BASE_URL}/api/list`,
          })
        instance.get('')  
        .then((response) => {
            if(response.status === 200){
                setStocks(response.data)
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        GetNifty50()
    },[BASE_URL])
  
    const options = stocks.map(item => ({
      value: item,
      label:item
    }));
    
    const handleOption = (selections) => {
      const selected = selections.map((options) => options.value)
        setSelectedStocks(selected)
    }

    const handleStocks = (e) => {
      if(userId){

      if(selectedStocks.length === 0){
        toast.error('Must Have Atleast One Stock')
        return false
      }
      const instance = axios.create({
        baseURL:`${BASE_URL}/api/userlist`,
      })
      instance.post('',selectedStocks)
      .then((response) => {
        if(response.status === 200){
          let data = response.data
          console.log(data);
          navigate('/stocks', {state:{data}})
        }
      })
      .catch((error) => {
          console.log(error);
      })
    }else{
      toast.error('Please Login')
      navigate('/login')
      return False
    }


    }

  return (
  <>
    <Layouts>

    <div className=' container max-auto h-[400px] w-1/2 ' >
      <div>

      <h1 className="mb-4 text-1xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-lg dark:text-white">SELECT NIFTY 50 STOCKS</h1>
          <label className="font-semibold text-sm text-black " htmlFor="position">Select </label>
            <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
            onChange={handleOption}
            />

      </div>

    <div className=' flex justify-around  mt-44 ' >
      <Button onClick={handleStocks}   variant="whitevariant" >
            <CirclePlus />
            ADD YOUR STOCK WATCH LIST
      </Button>       
    </div>
  </div>

      <Toaster
          position="top-center"
          reverseOrder={false}
          />

    </Layouts>
    
  </>

  )
}

export default HomePage
