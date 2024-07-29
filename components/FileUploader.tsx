'use client'
import { useCallback, useEffect } from 'react'
import {useDropzone} from 'react-dropzone'
import { CheckCircleIcon,CircleArrowDown,HammerIcon,RocketIcon,SaveIcon} from 'lucide-react'
import useUpload, { StatusText } from '@/hooks/useUpload'
import { useRouter } from 'next/navigation'

const FileUploader = () => {

  const {progress,status,fileId,handleUpload} = useUpload()
  const router = useRouter();
  console.log(fileId)

  useEffect(() =>{
    if(fileId){
      router.push(`/dashboard/files/${fileId}`)
    }
  } , [fileId,router])

    const onDrop = useCallback(async(acceptedFiles: File[]) => {
        // Do something with the files
        console.log(acceptedFiles)
        const file = acceptedFiles[0]
        if(file){
          await handleUpload(file)
          
        } else{
          // toast
        }
      }, [])

      const statusIcons: {
        [key in StatusText]: JSX.Element
      } = {
          [StatusText.UPLOADING]: (
            <RocketIcon className='h-20 w-20 text-indigo-600'/>
          ),
          [StatusText.UPLOADED]: (
            <CheckCircleIcon className='h-20 w-20 text-indigo-600'/>
          ),
          [StatusText.SAVING]: (
            <SaveIcon className='h-20 w-20 text-indigo-600'/>
          ),
          [StatusText.GENERATING]: (
            <HammerIcon className='h-20 w-20 text-indigo-600'/>
          ),

      }

      const {getRootProps, getInputProps, isDragActive,isFocused,isDragAccept} = useDropzone({onDrop,maxFiles:1 , accept: {
        "application/pdf" : [".pdf"]
      }})

      const uploadInProgress = progress != null && progress >= 0 && progress <=100;
      console.log(uploadInProgress)

  return (
    <div className='flex flex-col gap-4 max-w-7xl mx-auto'>
        {/* tommorrow task loading */}

        {
          uploadInProgress && (
            <div className='flex flex-col justify-center items-center gap-5'> 
              <div className="radial-progress" style={{ //@ts-ignore
               "--value": "70", "--size": "12rem", "--thickness": "2rem" }} role="progressbar">{progress} %</div>
             

              {/* render icons */}
              {
                //@ts-ignore
                statusIcons[status!]
              }


              {/* @ts-ignore */}
              <p>{status}</p>
            </div>
          )
        }

        

    {
      
    !uploadInProgress && (
      <div {...getRootProps()} className={`p-10 border-2 border-dashed border-indigo-600 w-[90%] text-center mt-10 text-indigo-600 h-96 flex items-center rounded-lg justify-center ${isFocused || isDragAccept ? "bg-indigo-300 ": "bg-indigo-100"}`}>
      <input {...getInputProps()} />
      <div className='flex flex-col items-center justify-center'>
      {
          isDragActive ?
          <>
          <RocketIcon className='h-20 w-20 animate-ping'/>
          <p>Drop the files here ...</p> 
          </>
          :
          <>
          <CircleArrowDown className='h-20 w-20 animate-bounce'/>
          <p>Drag and drop some files here, or click to select files</p>
          </>
        }
      </div>
    </div>
     )} 
        </div>
  )
}

export default FileUploader