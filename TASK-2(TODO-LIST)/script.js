// Get elements
const addTaskButton = document.getElementById('add-task');
const taskInput = document.getElementById('task-input');
const taskDate = document.getElementById('task-date');
const taskPriority = document.getElementById('task-priority');
const taskCategory = document.getElementById('task-category');
const taskLists = document.querySelector('.task-lists');
const searchInput = document.getElementById('search-input');
const themeToggle = document.getElementById('theme-toggle');
const themeLabel = document.querySelector('.theme-switch label');

// Tasks array
let tasks = [];

// Render tasks
function renderTasks() {
    taskLists.innerHTML = '';

    const groupedTasks = {
        work: [],
        personal: [],
        other: []
    };

    tasks.forEach(task => {
        groupedTasks[task.category].push(task);
    });

    Object.keys(groupedTasks).forEach(category => {
        if (groupedTasks[category].length > 0) {
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'list-header';
            categoryHeader.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            taskLists.appendChild(categoryHeader);

            groupedTasks[category].forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.className = `task-item ${task.priority} ${task.completed ? 'completed' : ''}`;
                taskItem.innerHTML = `
                    <input type="checkbox" ${task.completed ? 'checked' : ''}>
                    <span>${task.text} (Due: ${task.date})</span>
                    <button class="delete-task">Delete</button>
                `;
                taskItem.querySelector('input[type="checkbox"]').addEventListener('change', () => {
                    task.completed = !task.completed;
                    renderTasks();
                });
                taskItem.querySelector('.delete-task').addEventListener('click', () => {
                    tasks = tasks.filter(t => t !== task);
                    renderTasks();
                });
                taskLists.appendChild(taskItem);
            });
        }
    });
}

// Add Task
addTaskButton.addEventListener('click', () => {
    if (taskInput.value.trim() !== '' && taskDate.value !== '' && taskPriority.value !== '' && taskCategory.value !== '') {
        tasks.push({
            text: taskInput.value,
            date: taskDate.value,
            priority: taskPriority.value,
            category: taskCategory.value,
            completed: false
        });
        taskInput.value = '';
        taskDate.value = '';
        taskPriority.value = '';
        taskCategory.value = '';
        renderTasks();
    }
});

// Search Tasks
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    document.querySelectorAll('.task-item').forEach(taskItem => {
        const text = taskItem.textContent.toLowerCase();
        taskItem.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

// Toggle Theme
themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeLabel.textContent = 'Switch to Light Mode';
    } else {
        themeLabel.textContent = 'Switch to Dark Mode';
    }
});

// Initial Setup (Set default to Light Mode)
if (document.body.classList.contains('dark-mode')) {
    themeLabel.textContent = 'Switch to Light Mode';
} else {
    themeLabel.textContent = 'Switch to Dark Mode';
}

// Initial rendering of tasks
renderTasks();
