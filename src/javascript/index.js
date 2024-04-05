const tasks = [];
let taskInput = document.getElementById("taskInput");
let btnAddTask = document.getElementById("btnAddTask");
let btnConfirmEdit = document.getElementById("btnConfirmEdit");
let tarefaAtualParaEdicao = null;

function addTask(taskText) {
  if (btnAddTask.innerText === "Add task") {
    if (taskText !== "") {
      taskText = taskInput.value.trim(); //método trim, elimina espaço antes e depois da string
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
  }
}

function completeTask(listItem, taskId) {
  const task = tasks.find((t) => t.id === taskId);

  !task.completed ? (task.completed = true) : (task.completed = false);
  listItem.classList.toggle("completed");
  showBtnMenu(listItem, task);
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
  //opção 2. parece mais correto
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

  let removeBtn = option.querySelector("#remove");
  removeBtn.addEventListener("click", () => removeTask(listItem, task));
  option.addEventListener("mouseleave", () => listItem.removeChild(option));

  const searchWeb = option.querySelector("#search-web");
  searchWeb.addEventListener("click", () => listItem.removeChild(option));

  const editBtn = option.querySelector("#edit");
  editBtn.addEventListener("click", () => {
    listItem.removeChild(option);
    editTask(task);
  });

  const copyTextBtn = option.querySelector("#copy-text");
  copyTextBtn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(task.text);
    listItem.removeChild(option);
  });
}

function removeTask(listItem, task) {
  listItem.remove();
  const index = tasks.findIndex((t) => t.id === task.id);
  if (index !== -1) tasks.splice(index, 1);
}

function editTask(task) {
  tarefaAtualParaEdicao = task;
  taskInput.value = task.text;
  taskInput.select();
  btnAddTask.style.display = "none";
  btnConfirmEdit.style.display = "inline-block";
}

function completeEditing(task) {
  if (taskInput.value !== "") {
    task.text = taskInput.value;
    btnAddTask.style.display = "inline-block";
    btnConfirmEdit.style.display = "none";
    taskInput.value = "";
    renderList();

    tarefaAtualParaEdicao = null;
  }
}

//EVENTOS
btnConfirmEdit.addEventListener("click", () => {
  if (tarefaAtualParaEdicao !== null) {
    completeEditing(tarefaAtualParaEdicao);
  }
});

btnAddTask.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    addTask(taskText);
  });
  