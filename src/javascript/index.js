import { renderList } from "./render.js";
import { updateCounter, toggleClearAllBtn } from "./utils.js";
import { loadTasksLocalStorage, saveTasksLocalStorage } from "./storage.js";
import { completeEditing } from "./tasks.js";

const state = {
  tasks: [],
  taskInput: document.getElementById("taskInput"),
  editTaskInput: document.getElementById("editTaskInput"),
  btnAddTask: document.getElementById("btnAddTask"),
  counterLength: document.querySelector('#counter'),
  clearAllBtn: document.querySelector('#clearAll'),
  btnConfirmEdit: document.getElementById("btnConfirmEdit"),
  tarefaAtualParaEdicao: null
}
const maxLength = taskInput.getAttribute('maxLength')

function addTask(taskText) {
  const {tasks, taskInput, counterLength} = state
  if (taskText !== "") {
    const newTask = {
      id: verificarMaiorId() + 1, //para não repetir o número do id quando excluído e depois adicionado nova task.
      text: taskText,
      completed: false,
    };

    tasks.unshift(newTask);
    taskInput.value = "";

    counterLength.textContent = `0 / ${maxLength}`
    toggleClearAllBtn(state)
    renderList(state);
  }
}

function verificarMaiorId() {
  let maiorId = 0;
  for (let i = 0; i < state.tasks.length; i++) {
    if (state.tasks[i].id > maiorId) maiorId = state.tasks[i].id;
  }
  return maiorId;
}

//EVENTOS

window.addEventListener('load', () => {
  const loadedTasks = loadTasksLocalStorage();
  state.tasks.push(...loadedTasks)
  renderList(state)
})

taskInput.addEventListener('input', function () {
  updateCounter(this, state)
})

editTaskInput.addEventListener('input', function(){
  updateCounter(this, state)
})

state.clearAllBtn.addEventListener('click', () => {
  while (state.tasks.length > 0) {
    state.tasks.pop()
  }
  saveTasksLocalStorage(state)
  renderList(state)
})

btnConfirmEdit.addEventListener("click", (e) => {
  e.preventDefault()
  if (state.tarefaAtualParaEdicao !== null) {
    completeEditing(state);
  }
});

state.btnAddTask.addEventListener("click", (e) => {
  e.preventDefault()
  const taskText = taskInput.value.trim();
  addTask(taskText);
});

state.editTaskInput.addEventListener('keyup', (e) => {
  const key = e.which || e.keyCode
  const isEnterPressed = key === 13

  if (isEnterPressed) {
    completeEditing(state);
    toggleClearAllBtn(state)
  }
})