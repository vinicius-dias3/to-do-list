const tasks = [];
let taskInput = document.getElementById("taskInput");
let editTaskInput = document.getElementById("editTaskInput");
let btnAddTask = document.getElementById("btnAddTask");
let btnConfirmEdit = document.getElementById("btnConfirmEdit");
let tarefaAtualParaEdicao = null;

const saveTasksLocalStorage = (tasks) => {
    localStorage.setItem('todoList', JSON.stringify(tasks))
}

const loadTasksLocalStorage = () => {
  const storedTasks = JSON.parse(localStorage.getItem('todoList')) || []
  return storedTasks
}

function addTask(taskText) {
    if (taskText !== "") {
      const newTask = {
        id: verificarMaiorId() + 1, //para não repetir o número do id quando excluído e depois adicionado nova task.
        text: taskText,
        completed: false,
      };

      tasks.unshift(newTask);
      taskInput.value = "";
      renderList();
    }
}

function verificarMaiorId() {
  let maiorId = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id > maiorId) maiorId = tasks[i].id;
  }
  return maiorId;
}

function renderList() {
  const taskList = document.querySelector("#taskList");
  taskList.innerHTML = "";

  for (const task of tasks) {
    let listItem = document.createElement("li");
    listItem.innerHTML = `<p>${task.text}</p>`;
    let taskContent = listItem.querySelector("p");
    taskContent.addEventListener("click", () =>
      completeTask(listItem, task.id)
    );
    if (task.completed) {
      listItem.classList.add("completed");
      showBtnMenu(listItem, task);
    }

    taskList.appendChild(listItem);
    saveTasksLocalStorage(tasks)
  }
}

function completeTask(listItem, taskId) {
  const task = tasks.find((t) => t.id === taskId);
  
  !task.completed ? (task.completed = true) : (task.completed = false);
  listItem.classList.toggle("completed");
  showBtnMenu(listItem, task);
  saveTasksLocalStorage(tasks)
}

function showBtnMenu(listItem, task) {
  if (task.completed) {
    const btnMenu = document.createElement("button");
    btnMenu.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
    listItem.appendChild(btnMenu);
    btnMenu.addEventListener("click", () => renderOption(listItem, task));
  } else {
    listItem.removeChild(listItem.childNodes[1]); //remove o btnMenu
  }
}

function renderOption(listItem, task) {
  let option = document.createElement("ul");
  option.classList.add("option");
  option.innerHTML = `<li><h3>${task.text}</h3></li>
                        <li id="edit">Edit <i class="fa-regular fa-pen-to-square"></i></li>
                        <li id="remove">Remove <i class="fa-regular fa-trash-can"></i></li>
                        <li id="search-web"><a href="https://www.google.com/search?q=${task.text}" target="_blank">Search the web</a><i class="fas fa-search"></i></li>
                        <li id="copy-text">Copy text <i class="fa-regular fa-copy"></i></li>`;
  listItem.appendChild(option);

  option.addEventListener("mouseleave", () => listItem.removeChild(option));
  option.querySelector("#remove").addEventListener("click", () => removeTask(listItem, task));
  option.querySelector("#search-web").addEventListener("click", () => listItem.removeChild(option));
  option.querySelector("#edit").addEventListener("click", () => {
    listItem.removeChild(option);
    editTask(task);
  });

  option.querySelector("#copy-text").addEventListener("click", async () => {
    await navigator.clipboard.writeText(task.text);
    listItem.removeChild(option);
  });
}

function removeTask(listItem, task) {
  listItem.remove();
  const index = tasks.indexOf(task)
  if (index !== -1) tasks.splice(index, 1);
  saveTasksLocalStorage(tasks)
}

function editTask(task) {
  taskInput.style.display = 'none'
  btnAddTask.style.display = "none";
  editTaskInput.style.display = 'inline-block'
  btnConfirmEdit.style.display = "inline-block";
  tarefaAtualParaEdicao = task;
  editTaskInput.value = task.text;
  editTaskInput.select();
}

function completeEditing(task) {
  if (editTaskInput.value !== "") {
    task.text = editTaskInput.value;
    editTaskInput.value = "";
    editTaskInput.style.display = 'none'
    btnConfirmEdit.style.display = "none";
    taskInput.style.display = 'inline-block'
    btnAddTask.style.display = "inline-block";
    taskInput.focus()
    renderList();

    tarefaAtualParaEdicao = null;
  }
}

//EVENTOS

window.addEventListener('load', ()=> {
  loadedTasks = loadTasksLocalStorage();
  tasks.push(...loadedTasks)
  renderList()
})

const clearAllBtn = document.querySelector('#clearAll')

clearAllBtn.addEventListener('click', ()=> {
  while(tasks.length > 0){
    tasks.pop()
  }
  saveTasksLocalStorage(tasks)
  renderList()
})

btnConfirmEdit.addEventListener("click", (e) => {
  e.preventDefault()
  if (tarefaAtualParaEdicao !== null) {
    completeEditing(tarefaAtualParaEdicao);
  }
});

btnAddTask.addEventListener("click", (e) => {
  e.preventDefault()
  const taskText = taskInput.value.trim();
  addTask(taskText);
});

editTaskInput.addEventListener('keyup', (e)=> {
  const key = e.which || e.keyCode
  const isEnterPressed = key === 13

  if(isEnterPressed) completeEditing(tarefaAtualParaEdicao);
})