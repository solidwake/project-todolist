const taskInput = document.querySelector('.task-input input'),
filters = document.querySelectorAll('.filters span'),
clearAll = document.querySelector('.clear-btn'),
taskBox = document.querySelector('.task-box');

let editId;
let isEditedTask = false;
//Get local storage to do list
let todos = JSON.parse(localStorage.getItem('todo-list'));

filters.forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('span.active').classList.remove('active');
        button.classList.add('active');
        displayTodo(button.id);
    });
})

//Display to do items in list
function displayTodo(filter) {
    let li = '';
    if(todos) {
        todos.forEach((todo, id) => {
            //If to do item is completed, set isCompleted value to checked
            let isCompleted = todo.status == 'completed' ? 'checked' : '';
            if(filter == todo.status || filter == 'all') {
                li += `<li class="task">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                            <p class="${isCompleted}">${todo.name}</p>
                        </label>
                        <div class="settings">
                            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                            <ul class="task-menu">
                                <li onclick="editTask(${id}, '${todo.name}')"><i class="uil uil-pen"></i>Edit</li>
                                <li onclick="deleteTask(${id})"><i class="uil uil-trash-alt"></i>Delete</li>
                            </ul>
                        </div>
                    </li>`;
            }
        });
    }
    taskBox.innerHTML = li || `<span>No tasks at this time</span>`;
}
displayTodo('all');

function showMenu(selectedTask) {
    //Get task menu
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add('show');
    document.addEventListener('click', event => {
        //Remove show class from task menu on click
        if(event.target.tagName != 'I' || event.target != selectedTask) {
            taskMenu.classList.remove('show');
        }
    });
}

function editTask(taskId, taskName) {
    editId = taskId;
    isEditedTask = true;
    taskInput.value = taskName;
    displayTodo('all');
}

function deleteTask(deleteId) {
    //Remove selected task from to do array
    todos.splice(deleteId, 1);
    localStorage.setItem('todo-list', JSON.stringify(todos));
    displayTodo('all');
}

clearAll.addEventListener('click', () => {
    //Remove all items from to do array
    todos.splice(0, todos.length);
    localStorage.setItem('todo-list', JSON.stringify(todos));
    displayTodo('all');
})

function updateStatus(selectedTask) {
    //Get text from task name
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add('checked');
        //Update status of selected task to completed
        todos[selectedTask.id].status = 'completed';
    } else {
        taskName.classList.remove('checked');
        //Update status of selected task to pending
        todos[selectedTask.id].status = 'pending';
    }
    localStorage.setItem('todo-list', JSON.stringify(todos));
}

//Allow task to be added using the enter key, and prevent user from submitting an empty value
taskInput.addEventListener('keyup', event => {
    let userTask = taskInput.value.trim();
    if(event.key == 'Enter' && userTask) {
        if(!isEditedTask) { //If isEditedTask is not true 
            if(!todos) { //If todos does not exist, pass an empty array to todos
                todos= [];
            }
            let taskInfo = {name: userTask, status: 'pending'};
            todos.push(taskInfo); //Add new task to todos
        } else {
            isEditedTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = '';
        localStorage.setItem('todo-list', JSON.stringify(todos));
        displayTodo('all');
    }
});