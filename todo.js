const Todolist = [];
let editIndex = -1;

renderTodolist();

function renderTodolist() {
  let todoHTML = '';
  for (let i = 0; i < Todolist.length; i++) {
    const todoObject = Todolist[i];
    const { name, duedate, completed = false } = todoObject;

    const styleText = completed
      ? 'text-decoration: line-through; color: #423930;'
      : 'text-decoration: none; color: #302215;';

    todoHTML += `
      <div class="task-item">
        <input type="checkbox"
               class="check-task"
               ${completed ? 'checked' : ''}
               onclick="toggleComplete(this, ${i})">
        <span class="todo-name" style="${styleText}">${name}</span>
        <span class="todo-date" style="${styleText}">${duedate || ''}</span>
        <button onclick="edittodo(${i})" class="icon-btn">✏️</button>
        <button onclick="Todolist.splice(${i},1); renderTodolist();" class="icon-btn">🗑️</button>
      </div>`;
  }
  document.querySelector('.js-todo-list').innerHTML = todoHTML;
}

function addtodo() {
  const input = document.querySelector('.js-todo');
  const list = input.value.trim();
  const dateElement = document.querySelector('.js-duedate');
  const due = dateElement.value;

  if (!list) return;

  if (editIndex === -1) {
   
    Todolist.push({ name: list, duedate: due, completed: false });
  } else {
   
    Todolist[editIndex] = {
      ...Todolist[editIndex],
      name: list,
      duedate: due
    };
    editIndex = -1;
  }

  input.value = '';
  dateElement.value = '';
  renderTodolist();
}

function edittodo(index) {
  const todoObject = Todolist[index];
  document.querySelector('.js-todo').value = todoObject.name;
  document.querySelector('.js-duedate').value = todoObject.duedate || '';
  editIndex = index;
}

function toggleComplete(checkbox, index) {
  
  Todolist[index].completed = checkbox.checked;

  renderTodolist();
}


document.getElementById('clearBtn').addEventListener('click', function () {
  for (let i = Todolist.length - 1; i >= 0; i--) {
    if (Todolist[i].completed) {
      Todolist.splice(i, 1);
    }
  }
  renderTodolist();
});


document.getElementById('resetBtn').addEventListener('click', function () {
  Todolist.length = 0;
  renderTodolist();
});
