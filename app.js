import { collection, addDoc, getFirestore, getDocs, getDoc, doc, query, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js"; 

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

// Add todos to database
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
    getItems()

}

// viene de la forma para crear un nuevo todo
document.querySelector('#new-todo').addEventListener('submit', addItem)


// getting the itmes from firebase
let items = []
async function getItems() {
  const q = query(collection(db, 'todo-items'))
  const todoSnapshot = onSnapshot(q, (querySnapshot) => {

    querySnapshot.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data()
      })
    })
    
    generateItems(items)
    
  })
  console.log(items);
  
};

// Creating the DOM list
const generateItems = function(items){
 


  let itemHTML = ''
  items.map(item => {
    itemHTML += `
    <div class="todo-item">
              <div class="check">
                <div data-id="${item.id}" class="check-mark ${item.status == 'complited' ? 'checked' : ''}">
                  <img src="./images/icon-check.svg" alt="" />
                </div>
              </div>
              <div class="todo-text">${item.text}</div>
            </div>
    
    `
   
  }); 
  
  document.querySelector('.todo-items').innerHTML = itemHTML
  createEventListeners()
}

const createEventListeners = function(){
  let todoCheckMarks = document.querySelectorAll('.todo-item .check-mark');
  todoCheckMarks.forEach( checkMark => {
    checkMark.addEventListener('click', function(){
      markCompleted(checkMark.dataset.id)
    })
  })
  
}

async function markCompleted(id){
 
    const item = doc(db, 'todo-items', id)
    const docSnap = await getDoc(item);
    
    if (docSnap.exists()) {
      let status = docSnap.data().status;
      if (status === 'active') {
            await updateDoc(item, {
            status: 'complited'
          })
          
         } else if (status === 'complited') {
          await updateDoc(item, {
            status: 'active'
          })
          
         }
    } else {
      console.log("No such document!");
    }
    
    
console.log(docSnap.data().status);

}

 const filteredTodos = async function(items){
  
  const todoFiltered = items.filter(function(todo){
    return todo.includes(todo.status == 'complited')
  })
    console.log(todoFiltered);
  
}
filteredTodos(items)
getItems()
console.log(items.id);