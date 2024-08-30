const inputBox = document.getElementById('inputBox')
const addBtn = document.getElementById('addBtn')
const todoList = document.getElementById('todoList')

const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("You must write something in your to do ")
        return false;
    }
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

  

    //create edit button
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    li.appendChild(editBtn);
    editBtn.classList.add("btn", "editBtn");
    
  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Remove";
  li.appendChild(deleteBtn);
  deleteBtn.classList.add("btn","deleteBtn");


    todoList.appendChild(li);
    inputBox.value = "";
    saveLocatTodos(inputText);
    }
    addBtn.addEventListener('click', addTodo);

    const editTodo = (e) => {
        const target = e.target;
    
        // Check if the "Remove" button was clicked
        if (target.classList.contains('deleteBtn')) {
            const li = target.closest('li');
            todoList.removeChild(li);
        }
    
        // Check if the "Edit" button was clicked
        if (target.classList.contains('editBtn')) {
            const li = target.closest('li');
            const p = li.querySelector('p');
            inputBox.value = p.innerText;
            todoList.removeChild(li);
        }
    };
    
todoList.addEventListener('click', editTodo);
const saveLocatTodos = (todo) => {
    let todos = [];
    todos = JSON.parse(localStorage.getItem("todos"))
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    // console.log(todos)
        
    }