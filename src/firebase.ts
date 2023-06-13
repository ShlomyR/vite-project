import { initializeApp } from "firebase/app";

import { 
    getFirestore, 
    collection,
    query,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
    getDocs, } from "firebase/firestore";
import { onUnmounted, ref } from "vue";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: "G-C4TW73MH0M"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const usersCollection = query(collection(db, "users"));

export const createUser = async (user:any) => {
    const docRef = await addDoc(collection(db, "users"), user);
    console.log("Document written with ID from firebase.ts: ", docRef.id);
    return docRef;
};

export const getUser = async (id:any) => {
    const docRef = doc(db, "users");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    return console.log("Document data:", docSnap.data());
    } else {
    return console.log("No such document!");
    }
};

export const updateUser = async(id:any, user:any) => {
    const userRef = doc(db, user,id );
    return await updateDoc(userRef, { fromWeb: true });
};

export const deleteUser =async (id:any) => {
    return await deleteDoc(doc(db, "users",id));
};

export const useLoadUsers = async () => {
    const users:any = ref([])
    const querySnapshot = await getDocs(collection(db, "users"));
    const close:any = querySnapshot.forEach((doc) => {
        users.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        console.log(doc.id, " => ", doc.data());
    });
    onUnmounted(close)
    return users
};