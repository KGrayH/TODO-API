const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

let todos = [
    {
        id: 1,
        name: "Sample todo",
        priority: "high",
        isComplete: false,
        isFun: true
    }
];
app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(t => t.id === todoId);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Todo is not found' });
    }
});
app.post('/todos', (req, res) => {
    const newTodo = {
        id: Date.now(),
        ...req.body
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});
app.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === todoId);
    if (index !== -1) {
        todos.splice(index, 1);
        res.json({ message: 'Todo is deleted' });
    } else {
        res.status(404).json({ error: 'Todo is not found' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
});