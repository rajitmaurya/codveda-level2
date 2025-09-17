const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const filters = document.querySelectorAll('.filter');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(filter = 'all') {
  taskList.innerHTML = '';
  tasks.forEach((task, i) => {
    if (filter === 'completed' && !task.completed) return;
    if (filter === 'pending' && task.completed) return;

    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = task.text;
    span.onclick = () => {
      tasks[i].completed = !tasks[i].completed;
      saveTasks();
      renderTasks(filter);
    };

    const edit = document.createElement('button');
    edit.textContent = 'Edit';
    edit.className = 'edit';
    edit.onclick = () => {
      const newText = prompt('Edit task:', task.text);
      if (newText) {
        tasks[i].text = newText;
        saveTasks();
        renderTasks(filter);
      }
    };

    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.className = 'delete';
    del.onclick = () => {
      tasks.splice(i, 1);
      saveTasks();
      renderTasks(filter);
    };

    li.appendChild(span);
    li.appendChild(edit);
    li.appendChild(del);
    taskList.appendChild(li);
  });
}

addBtn.onclick = () => {
  if (taskInput.value.trim() !== '') {
    tasks.push({ text: taskInput.value, completed: false });
    saveTasks();
    taskInput.value = '';
    renderTasks();
  }
};

filters.forEach(btn => {
  btn.onclick = () => {
    filters.forEach(f => f.classList.remove('active'));
    btn.classList.add('active');
    renderTasks(btn.dataset.filter);
  };
});

renderTasks();
