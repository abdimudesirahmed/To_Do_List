"use strict";
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoTable = document.getElementById('todoTable');
const todoBody = document.getElementById('todoBody');
const todoId = document.getElementById('todoId');
let todos = [
    { id: 1, details: 'BOOTSTRAP', completed: true },
    { id: 2, details: 'JS', completed: true },
    { id: 3, details: 'HTML', completed: false },
    { id: 4, details: 'CSS', completed: false }
];
// Render the todos
function renderTodos() {
    todoBody.innerHTML = '';
    todos.forEach(todo => {
        const row = document.createElement('tr');
        row.className = todo.id % 2 === 0 ? 'odd:bg-orange-50 even:bg-orange-100' : 'even:bg-orange-100';
        const checkboxCell = document.createElement('td');
        checkboxCell.className = 'py-2 text-center';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-checkbox h-4 w-4 text-indigo-600';
        checkboxCell.appendChild(checkbox);
        const detailsCell = document.createElement('td');
        detailsCell.className = 'py-2 text-left';
        detailsCell.textContent = todo.details;
        if (todo.completed) {
            detailsCell.classList.add('line-through');
        }
        const actionCell = document.createElement('td');
        actionCell.className = 'py-2';
        const actionDiv = document.createElement('div');
        actionDiv.className = 'flex flex-row space-x-2';
        const deleteButton = document.createElement('h3');
        deleteButton.className = 'text-red-600 font-bold';
        deleteButton.textContent = 'Delete';
        const editButton = document.createElement('h3');
        editButton.className = 'text-blue-600 font-bold';
        editButton.textContent = 'Edit';
        actionDiv.appendChild(deleteButton);
        actionDiv.appendChild(editButton);
        actionCell.appendChild(actionDiv);
        row.appendChild(checkboxCell);
        row.appendChild(detailsCell);
        row.appendChild(actionCell);
        todoBody.appendChild(row);
    });
}
// Add todo
todoForm.addEventListener('submit', e => {
    e.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        const newTodo = {
            id: todos.length + 1,
            details: todoText,
            completed: false
        };
        todos.push(newTodo);
        renderTodos();
        todoInput.value = '';
    }
});
// Delete todo
todoBody.addEventListener('click', e => {
    const target = e.target;
    if (target.tagName === 'H3' && target.textContent === 'Delete') {
        const row = target.closest('tr');
        if (row) {
            const todoId = parseInt(row.dataset.todoId);
            todos = todos.filter(todo => todo.id !== todoId);
            renderTodos();
        }
    }
});
// Edit todo (placeholder implementation)
todoBody.addEventListener('click', e => {
    const target = e.target;
    if (target.tagName === 'H3' && target.textContent === 'Edit') {
        const row = target.closest('tr');
        if (row) {
            const todoId = parseInt(row.dataset.todoId);
            const todo = todos.find(todo => todo.id === todoId);
            if (todo) {
                const newDetails = prompt('Enter new details:', todo.details);
                if (newDetails !== null) {
                    todo.details = newDetails;
                    renderTodos();
                }
            }
        }
    }
});
// Initial render
renderTodos();
