const taskInput = document.querySelector('.task-input input'),
taskBox = document.querySelector('.task-box');

//Get local storage to do list
let todos = JSON.parse(localStorage.getItem('todo-list'));

//Display todo items in list
function displayTodo() {
    let li = '';
    if(todos) {
        todos.forEach((todo, id) => {
            //If to do item is completed, set isCompleted value to checked
            let isCompleted = todo.status == 'completed' ? 'checked' : '';
            li += `<li class="task">
                    <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                        <p class="${isCompleted}">${todo.name}</p>
                    </label>
                    <div class="settings">
                        <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                        <ul class="task-menu">
                            <li><i class="uil uil-pen"></i>Edit</li>
                            <li><i class="uil uil-trash-alt"></i>Delete</li>
                        </ul>
                    </div>
                </li>`;
        });
    }
    taskBox.innerHTML = li;
}
displayTodo();

function showMenu(selectedTask) {
    //Get task menu
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add('show');
    document.addEventListener('click', event => {
        //Remove show class from task menu on click
        if(event.target.tagName != 'I' || event.target != selectedTask) {
            taskMenu.classList.remove('show');
        }
    })
}

function updateStatus(selectedTask) {
    //Get text from task name
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add('checked');
        //Update status of selectedTask to completed
        todos[selectedTask.id].status = 'completed';
    } else {
        taskName.classList.remove('checked');
        //Update status of selectedTask to pending
        todos[selectedTask.id].status = 'pending';
    }
    localStorage.setItem('todo-list', JSON.stringify(todos));
}

//Allow task to be added using the enter key, and prevent user from submitting an empty value
taskInput.addEventListener('keyup', event => {
    let userTask = taskInput.value.trim();
    if(event.key == 'Enter' && userTask) {
        if(!todos) { //If todos does not exist, pass an empty array to todos
            todos= [];
        }
        taskInput.value = '';
        let taskInfo = {name: userTask, status: 'pending'};
        todos.push(taskInfo); //Add new task to todos
        localStorage.setItem('todo-list', JSON.stringify(todos));
        displayTodo();
    }
});