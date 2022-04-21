const addItem = event => {
    event.preventDefault();
    const text = document.getElementById('todo-input');
    return event + text;
};