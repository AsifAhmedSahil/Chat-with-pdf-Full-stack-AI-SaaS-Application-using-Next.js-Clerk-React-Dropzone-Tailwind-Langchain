import {ChatOpenAI} from "@langchain/openai"
import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import {OpenAIEmbeddings} from "@langchain/openai"
import {createStuffDocumentsChain} from "langchain/chains/combine_documents"
import {ChatPromptTemplate} from "@langchain/core/prompts"
import {createRetrievalChain} from "langchain/chains/retrieval"
import {createHistoryAwareRetriever} from "langchain/chains/history_aware_retriever"
import { HumanMessage , AIMessage} from "@langchain/core/messages"
import pineconeClient from "./pinecone";
import {PineconeStore} from "@langchain/pinecone";
import {PineconeConflictError} from "@pinecone-database/pinecone/dist/errors"
import { Index , RecordMetadata } from "@pinecone-database/pinecone";
import { adminDb } from "@/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";

// initialize the openai model with api key and model name

const model  =new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    modelName:"gpt-4o"
})

export const indexName = "sahilai"


async function namespaceExists(index: Index<RecordMetadata>,namespace:string){
    if(namespace === null){
        throw new Error("No name space value provided.");
        
    }
    const {namespaces} = await index.describeIndexStats();
    return namespaces?.[namespace] !== undefined;
}

export async function generateDocs(docId : string){
    const {userId} = await auth();

    if(!userId){
        throw new Error("user not found!");
    }

    console.log("------ fetching the download URL from firebase-----");

    const firebaseRef  = await adminDb.collection("users").doc(userId).collection("files").doc(docId).get()

    const downloadUrl =firebaseRef.data()?.downloadUrl

    if(!downloadUrl){
        throw new Error("Download url not found!")
    }

    console.log(`--- Download URL fetch successfully: ${downloadUrl} ----`)

    // fetch the pdf from generated downlaod URL
    const response  =await fetch(downloadUrl);

    // laod PDF to the pdf document object
    const data = await response.blob();

    // load the pdf document from the spcified path
    console.log("--- Loading PDf document...---")
    const loader = new PDFLoader(data)
    const docs = await loader.load()

    // spliting the loader document into smaller parts for easier processing**
    console.log("----spliting the documents into smaller parts ----")
    const splitter = new RecursiveCharacterTextSplitter();
    const splitDocs = await splitter.splitDocuments(docs)
    console.log(`---split into ${splitDocs.length} parts ---`)

    return splitDocs
}

// main function*****
export async function generateEmbeddingsInPineconeVectorStore(docId:string){
    const {userId} = await auth();

    if(!userId){
        throw new Error("user not found!");
    }

    let pineconeVectorStore;

    // generate embeddings for split documents
    console.log("--- Generateing embedding...---");
    const embeddings = new OpenAIEmbeddings();

    const index = await pineconeClient.index(indexName)

    const namespaceAlreadyExists = await namespaceExists(index,docId);

    if(namespaceAlreadyExists){
        console.log(`----- Namespace ${docId} already exists, reusing embedding... -----`);

        pineconeVectorStore = await PineconeStore.fromExistingIndex(embeddings,{
            pineconeIndex: index,
            namespace: docId
        })

        return pineconeVectorStore
    }else{
        // if the namespace does not exists, then download the PDF file from firebase store & save the download URL & generate embeddings and store them in the pinecone vector store

        const splitDocs =  await generateDocs(docId)
    }




}