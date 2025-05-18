async function deleteTodo(id) {
    await fetch(`/todos/${id}`, {
        method: 'DELETE'
    });
    fetchTodos();
}
async function fetchTodos() {
    const todoList = document.getElementById('todo-list');
    const res = await fetch('/todos');
    const todos = await res.json();
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `
            <span>${todo.name} - ${todo.priority}</span>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const addTodoForm = document.getElementById('add-todo-form');
    const todoName = document.getElementById('todo-name');
    const todoPriority = document.getElementById('todo-priority');

    addTodoForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newTodo = {
            name: todoName.value,
            priority: todoPriority.value,
            isComplete: false,
            isFun: true
        };
        const res = await fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        });
        if (res.ok) {
            await fetchTodos();
            todoName.value = '';
            todoPriority.value = '';
        } else {
            alert('Failed to add todo');
        }
    });
    fetchTodos();
});