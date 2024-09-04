import { renderList } from "./render.js";
import { saveTasksLocalStorage } from "./storage.js";
import { toggleClearAllBtn } from "./utils.js";

function completeTask(listItem, taskId, state) {
  const task = state.tasks.find((t) => t.id === taskId);

  !task.completed ? (task.completed = true) : (task.completed = false);
  listItem.classList.toggle("completed");
  saveTasksLocalStorage(state);
  renderList(state);
}

function removeTask(listItem, task, state) {
  listItem.remove();
  const index = state.tasks.indexOf(task)
  if (index !== -1) state.tasks.splice(index, 1);
  taskInput.focus()
  saveTasksLocalStorage(state)
}

function editTask(task, state) {
  const {taskInput, btnAddTask, editTaskInput, btnConfirmEdit, counterLength} = state
  taskInput.classList.add('hidden')
  btnAddTask.classList.add('hidden')
  editTaskInput.classList.remove('hidden')
  btnConfirmEdit.classList.remove('hidden')
  state.tarefaAtualParaEdicao = task;
  editTaskInput.value = task.text;
  editTaskInput.select();
  counterLength.textContent = `${editTaskInput.value.length} / ${editTaskInput.maxLength}`
  toggleClearAllBtn(state)
  
  let taskListItens = document.querySelectorAll('#taskList li')
  taskListItens.forEach(taskItem => {
    taskItem.classList.add('disabled')
  });
}

function completeEditing(state) {
  const { editTaskInput, btnConfirmEdit, taskInput, counterLength} = state
  const task = state.tarefaAtualParaEdicao
  if (editTaskInput.value !== "") {
    task.text = editTaskInput.value;
    editTaskInput.value = "";
    editTaskInput.classList.add('hidden')
    btnConfirmEdit.classList.add('hidden')
    taskInput.classList.remove('hidden')
    btnAddTask.classList.remove('hidden')
    taskInput.focus()
    toggleClearAllBtn(state)
    renderList(state);
    state.tarefaAtualParaEdicao = null;
    counterLength.textContent = `0 / ${editTaskInput.maxLength}`
  }
}

export { completeTask, removeTask, editTask, completeEditing};