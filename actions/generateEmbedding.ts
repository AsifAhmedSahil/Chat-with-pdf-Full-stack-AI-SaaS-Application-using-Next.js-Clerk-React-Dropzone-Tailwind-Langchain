'use server'

import { generateEmbeddingsInPineconeVectorStore } from "@/lib/langchain"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function generateEmbedding(docId: string){
    // protect this route with clerk
    auth().protect()

    // turn PDF to embedding****
    await generateEmbeddingsInPineconeVectorStore(docId)

    revalidatePath("/dashboard")

    return {completed: true}
}