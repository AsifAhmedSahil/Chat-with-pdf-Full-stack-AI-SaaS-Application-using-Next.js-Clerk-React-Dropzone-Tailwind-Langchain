'use client'
import React from 'react'
import { Button } from './ui/button'
import {PlusCircleIcon} from "lucide-react"
import { useRouter } from 'next/navigation'

const PlaceholderButton = () => {
    const router = useRouter()
    const handleClick = () =>{
        router.push("/dashboard/upload")
    }
  return (
    <Button onClick={handleClick} className='flex flex-col items-center w-64 h-80 bg-gray-200 text-gray-400 rounded-xl drop-shadow-md'>
        <PlusCircleIcon className='h-16 w-16'/>
        <p>Add a document</p>
    </Button>
  )
}

export default PlaceholderButton