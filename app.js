const taskInput = document.querySelector('.task-input input'),
taskBox = document.querySelector('.task-box');

//Get local storage to do list
let todos = JSON.parse(localStorage.getItem('todo-list'));

//Display todo items in list
function displayTodo() {
    let li = '';
    if(todos) {
        todos.forEach((todo, id) => {
            li += `<li class="task">
                    <label for="${id}">
                        <input type="checkbox" id="${id}">
                        <p>${todo.name}</p>
                    </label>
                    <div class="settings">
                        <i class="uil uil-ellipsis-h"></i>
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

//Allow task to be added using the 'enter' key, and prevent user from submitting an empty value
taskInput.addEventListener('keyup', enter => {
    let userTask = taskInput.value.trim();
    if(enter.key == 'Enter' && userTask) {
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