
'use client'

import { generateEmbedding } from "@/actions/generateEmbedding";
import { db, storage } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useState } from "react"
import {v4 as uuidv4} from "uuid" 

export enum StatusText {
    UPLOADING = 'Uploading File',
    UPLOADED = "File Uploaded Successfully",
    SAVING = "Saving file to database",
    GENERATING = "Generating AI Embedding , This will only take a few Second"
}

export type Status = StatusText[keyof StatusText];

function useUpload() {
    const [progress,setProgress] = useState<number | null>(null)
    const [fileId,setFileId] = useState<string | null>(null)
    const [status,setStatus] = useState<Status | null>(null)
    const {user} = useUser();
    const router = useRouter();

    const handleUpload = async (file:File) =>{
        if(!file || !user) return;

        // TODO: FREE/PRO limitation...

        const fileToUploadTo = uuidv4()
        // console.log(fileToUploadTo,"********")

        const storageRef = ref(storage,`users/${user.id}/files/${fileToUploadTo}`)

        const uploadTask= uploadBytesResumable(storageRef,file);

        uploadTask.on('state_changed',(snapshot) =>{
            const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )
            setStatus(StatusText.UPLOADING)
            setProgress(percent);
        },
    (error) =>{
        console.log('Error uploading file',error)
    },
    async () =>{
        setStatus(StatusText.UPLOADED);

        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)

        setStatus(StatusText.SAVING);
        await setDoc(doc(db,"users",user.id,"files",fileToUploadTo),{
            name:file.name,
            size:file.name,
            type:file.name,
            downloadUrl:downloadUrl,
            ref: uploadTask.snapshot.ref.fullPath,
            createdAt: new Date()
        })

        setStatus(StatusText.GENERATING)
         // generating AI embedding
         await generateEmbedding(fileToUploadTo)

        setFileId(fileToUploadTo)
        console.log(fileId,"*******")
    }
    )


    }
    
    return {progress,status,fileId,handleUpload}
 
}

export default useUpload
