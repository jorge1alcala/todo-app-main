import { collection, addDoc, getFirestore, getDocs } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js"; 

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXZBz5HUjp83nA1FaB0if0qLBztqhkkAc",
  authDomain: "todo-app-react-60a96.firebaseapp.com",
  projectId: "todo-app-react-60a96",
  storageBucket: "todo-app-react-60a96.appspot.com",
  messagingSenderId: "547046939684",
  appId: "1:547046939684:web:38094ce4b7184f26390cb1",
  measurementId: "G-82JN9S8PM2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addItem(e){
  e.preventDefault();
  console.log(e);
    console.log(e.target.elements.newTodo.value)
  
    try {
      const docRef = await addDoc(collection(db, 'todo-items'), {
        text: e.target.elements.newTodo.value,
        status: 'active'
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  
  
    e.target.elements.newTodo.value = ''
}

document.querySelector('#new-todo').addEventListener('submit', addItem)

// async function getMovies() {
//   const movieCol = collection(db, 'movies');
//   const moviesSnapshot = await getDocs(movieCol);
//   const tempMovies = moviesSnapshot.docs.map((doc) => {
//      return {id: doc.id, ...doc.data()};
// })
// dispatch(setMovies(tempMovies));
// };