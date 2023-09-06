"use client";

import { Button, Input } from '@vercel/examples-ui';
import { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';

export default function Home() {

  const [goal, setGoal] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [isloading, setIsLoading] = useState<boolean>(false);

  const handleGoalChange = async (e:any) => {
    setGoal(e.target.value);
  }

  const handleTimeChange = async (e:any) => {
    setTime(e.target.value);
  }

  const handleSetIsLoading = async(value: boolean) => {
    setIsLoading(value);
  }

  const handleSubmitGoal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
        
    setIsLoading(true);
    const response = await fetch('/api/plan', {
      method: 'POST',
      body: JSON.stringify({ goal, time}),
    })

    console.log(response);
    
    if(response.ok)
    {
      const blobData = await response.blob();
      const excelUrl = window.URL.createObjectURL(blobData);

      const link = document.createElement('a');
      link.href = excelUrl;
      link.download = 'plan.xlsx';
      link.click();

      window.URL.revokeObjectURL(excelUrl); 
    }
    else
    {
      alert("Error downloading the file. Please try again");
    }     
    
    setIsLoading(false);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {isloading ? (<div><RotatingLines
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="96"
                      visible={isloading}
                    /><p>Downloading</p></div>) : <h2 className="text-2xl font-semibold m-auto" >Enter goal with a short description and time in months to get a plan.</h2>
        }
      </div>

      <form onSubmit={handleSubmitGoal}>
        <textarea name='prompt-goal-value' id='prompt-goal-value' className='w-3/4 h-36 border-4' placeholder='Enter goal' onChange={handleGoalChange}></textarea>
        <div className="z-10 w-2/3 items-center justify-center font-mono lg:flex m-auto">
          <Input name='prompt-time-value' id='prompt-time-value' className='w-32 border-4' placeholder='Enter time' onChange={handleTimeChange}></Input>
          <Button type="submit" className='text-primary-blue rouded-full bg-slate-500 min-w-[130px] m-7' disabled={isloading}>Get Plan</Button>
        </div>
      </form>      
    </main>
  )
}
