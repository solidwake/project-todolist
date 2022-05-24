const taskInput = document.querySelector('.task-input input');

//Allow task to be added using the 'enter' key, and prevent user from submitting an empty value
taskInput.addEventListener('keyup', e => {
    let userTask = taskInput.value.trim();
    if(e.key == 'Enter' && userTask) {
        let todos = localStorage.getItem('todo-list');
        if(!todos) { //If todos does not exist, pass an empty array to todos
            todos= [];
        }
        let taskInfo = {name: userTask, status: 'pending'};
        todos.push(taskInfo); //Add new task to todos
        localStorage.setItem('todo-list', JSON.stringify(todos))
    }
});