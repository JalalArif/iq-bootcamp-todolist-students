
//selectors

const todoInput=document.querySelector('.todo-input')
const todoDeadline=document.querySelector('#todo-deadline')
const todoButton=document.querySelector('.todo-button')
const todoList=document.querySelector('.todo-list')
const todayDate=document.querySelector('.currentDate')

let currentDate=new Date();
todayDate.innerText=currentDate.toDateString()

document.addEventListener('DOMContentLoaded',getTodos)
todoButton.addEventListener('click',function(event){
     event.preventDefault()

    
     const todoDiv=document.createElement('div')
     todoDiv.classList.add('todo')

     const newTodo=document.createElement('li')
     newTodo.innerText= `Task is : ${todoInput.value} .  Deadline ${todoDeadline.value}`
     newTodo.classList.add('todo-item')
     todoDiv.appendChild(newTodo)

     saveLocalTodos(todoInput.value)

     const completedButton=document.createElement('button')
     completedButton.innerHTML='<i class="fas fa-check"></i>'
     completedButton.classList.add('complete-btn')
     todoDiv.appendChild(completedButton )

     const trashButton=document.createElement('button')
     trashButton.innerHTML='<i class="fas fa-trash"></i>'
     trashButton.classList.add('trash-btn')
     todoDiv.appendChild(trashButton)
     todoList.appendChild(todoDiv)

     todoInput.value="";
     todoDeadline.value="";

})


todoList.addEventListener('click',function(event){
     const item=event.target;

     if(item.classList[0]==="trash-btn"){
          const todo=item.parentElement;
          todo.classList.add("fall")
          removeLocalTodos(todo)
          todo.addEventListener("transitioned",function(){
               todo.remove();  
          })
           
     }  

     if(item.classList[0]==="complete-btn"){
     const todo=item.parentElement;
     todo.classList.toggle("completed")

     } 
})



function saveLocalTodos(todo){
     let todos;
     if(localStorage.getItem("todos")===null){
          todos=[];
 
     }
          else{
               todos=JSON.parse(localStorage.getItem("todos"))
          }

     todos.push(todo);
     localStorage.setItem("todos",JSON.stringify(todos));
     

}

function getTodos(){
      
     let todos;
     if(localStorage.getItem("todos")===null){
          todos=[];
 
     }
          else{
               todos=JSON.parse(localStorage.getItem("todos"))
          }

     todos.forEach(function(todo) {

     const todoDiv=document.createElement('div')
     todoDiv.classList.add('todo') 

     const newTodo=document.createElement('li')
     newTodo.innerText= `Task is : ${todo} .  Deadline ${todo}`
     newTodo.classList.add('todo-item')
     todoDiv.appendChild(newTodo)

     const completedButton=document.createElement('button')
     completedButton.innerHTML='<i class="fas fa-check"></i>'
     completedButton.classList.add('complete-btn')
     todoDiv.appendChild(completedButton )

     const trashButton=document.createElement('button')
     trashButton.innerHTML='<i class="fas fa-trash"></i>'
     trashButton.classList.add('trash-btn')
     todoDiv.appendChild(trashButton)
     todoList.appendChild(todoDiv)

          
     });


}

function removeLocalTodos(todo){

     let todos;
     if(localStorage.getItem("todos")===null){
          todos=[];
 
     }
          else{
               todos=JSON.parse(localStorage.getItem("todos"))
          }
     const todoIndex=todo.children[0].innerText;
     todos.splice(todos.indexOf(todoIndex),1);
     localStorage.setItem("todos",JSON.stringify(todos))

}


