const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

// Load saved to-do items from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTodos);

const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("You must write something in your to-do list.");
        return false;
    }

    const li = createTodoElement(inputText);
    todoList.appendChild(li);

    saveTodoToLocalStorage(inputText);
    inputBox.value = "";
};

addBtn.addEventListener('click', addTodo);

// Add a listener for the "Enter" key on the input box using 'keydown'
inputBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

const editTodo = (e) => {
    const target = e.target;

    // Check if the "Remove" button was clicked
    if (target.classList.contains('deleteBtn')) {
        const li = target.closest('li');
        const p = li.querySelector('p').innerText;
        todoList.removeChild(li);
        removeTodoFromLocalStorage(p);
    }

    // Check if the "Edit" button was clicked
    if (target.classList.contains('editBtn')) {
        const li = target.closest('li');
        const p = li.querySelector('p');
        inputBox.value = p.innerText;
        todoList.removeChild(li);
        removeTodoFromLocalStorage(p.innerText);
    }
};

todoList.addEventListener('click', editTodo);

function createTodoElement(text) {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = text;
    li.appendChild(p);

    // Create edit button
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    li.appendChild(editBtn);
    editBtn.classList.add("btn", "editBtn");

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    li.appendChild(deleteBtn);
    deleteBtn.classList.add("btn", "deleteBtn");

    return li;
}

function saveTodoToLocalStorage(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        const li = createTodoElement(todo);
        todoList.appendChild(li);
    });
}

function removeTodoFromLocalStorage(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(t => t !== todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
