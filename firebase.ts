
import {getApps,initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyCRx8T-hsl27ch-pz-r501mljq5pQ8y5Ww",
    authDomain: "chat-with-pdf-7dfee.firebaseapp.com",
    projectId: "chat-with-pdf-7dfee",
    storageBucket: "chat-with-pdf-7dfee.appspot.com",
    messagingSenderId: "199405894555",
    appId: "1:199405894555:web:9adfb6a138afcb6c727f3e"
  };

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()

  const db = getFirestore(app)
  const storage = getStorage(app)

  export {db,storage}