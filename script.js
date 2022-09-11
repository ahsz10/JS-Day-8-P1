// Lab 8 part 1 Todo List and Local storage

//selectors
const todoInput= document.querySelector('.todo-input')
const todoBtn= document.querySelector('.todo-button')
const todoList= document.querySelector('.todo-list')

//Event listeners 
document.addEventListener("DOMContentLoaded", getLocalTodos);
todoBtn.addEventListener("click",addNewTodo);
todoList.addEventListener("click",checkDelete)

// Functions 

function addNewTodo(event){
  event.preventDefault()
  
  const newDiv= document.createElement("div");
  newDiv.classList.add("todo");
  
  const newLi = document.createElement("li");
  newLi.innerText=todoInput.value;
  newLi.classList.add("todo-item");
  newDiv.appendChild(newLi);

  saveListLocal(todoInput.value);
  
  const checkedBtn = document.createElement("button");
  checkedBtn.innerHTML = "<i class=\"fas fa-check\"></i>";
  checkedBtn.classList.add("checkBtn");
  newDiv.appendChild(checkedBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "<i class=\"fa-solid fa-xmark\"></i>";
  deleteBtn.classList.add("deleteBtn");
  newDiv.appendChild(deleteBtn);
  
  todoList.appendChild(newDiv);
  
  todoInput.value="";
}

function checkDelete(event){
  const item = event.target;
  if(item.classList[0] === "deleteBtn"){
    const deleteItem = item.parentElement;
    removeLocaltodos(deleteItem);
    deleteItem.remove();
  }
  
  if(item.classList[0] === "checkBtn"){
    const checkItem = item.parentElement;
    checkItem.classList.toggle("completed");
  }
}

function saveListLocal(todo){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos",JSON.stringify(todos));
}

function getLocalTodos(todo){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo){
    const newDiv= document.createElement("div");
    newDiv.classList.add("todo");
    
    const newLi = document.createElement("li");
    newLi.innerText=todo;
    newLi.classList.add("todo-item");
    newDiv.appendChild(newLi);
    
    const checkedBtn = document.createElement("button");
    checkedBtn.innerHTML = "<i class=\"fas fa-check\"></i>";
    checkedBtn.classList.add("checkBtn");
    newDiv.appendChild(checkedBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "<i class=\"fa-solid fa-xmark\"></i>";
    deleteBtn.classList.add("deleteBtn");
    newDiv.appendChild(deleteBtn);
    
    todoList.appendChild(newDiv);
    
  });
}

function removeLocaltodos(todo){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const localItemIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(localItemIndex),1);
  localStorage.setItem("todos", JSON.stringify(todos));
}