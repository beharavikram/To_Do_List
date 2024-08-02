document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    loadTasks();

    // Add task event
    addTaskButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        addTask(taskText);
        taskInput.value = '';
        saveTasks();
    });

    // Add task function
    function addTask(text) {
        const li = document.createElement('li');
        li.textContent = text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            li.remove();
            saveTasks();
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(function(li) {
            tasks.push(li.textContent.replace('Delete', '').trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task));
    }
});
