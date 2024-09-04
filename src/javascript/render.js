import { saveTasksLocalStorage } from "./storage.js";
import { completeTask, removeTask, editTask} from "./tasks.js";

function renderList(state) {
  const { tasks } = state
  const taskList = document.querySelector("#taskList");
  taskList.innerHTML = "";

  for (const task of tasks) {
    let listItem = document.createElement("li");
    listItem.innerHTML = `<p>${task.text}</p>`;
    let taskContent = listItem.querySelector("p");
    taskContent.addEventListener("click", () => completeTask(listItem,task.id, state));

    if (task.completed) {
      listItem.classList.add("completed");
      showBtnMenu(listItem, task, state);
    }

    taskList.appendChild(listItem);
    saveTasksLocalStorage(state)
  }
}

function showBtnMenu(listItem, task, state) {
  if (task.completed) {
    const btnMenu = document.createElement("button");
    btnMenu.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
    listItem.appendChild(btnMenu);
    btnMenu.addEventListener("click", () => renderOption(listItem, task, state));
  } else {
    const btnMenu = listItem.querySelector('button')
    btnMenu.remove();
  }
}

function renderOption(listItem, task, state) {
  let option = document.createElement("ul");
  option.classList.add("option");
  option.innerHTML = `<li><h3>${task.text}</h3></li>
                        <li id="edit">Edit <i class="fa-regular fa-pen-to-square"></i></li>
                        <li id="remove">Remove <i class="fa-regular fa-trash-can"></i></li>
                        <li id="search-web"><a href="https://www.google.com/search?q=${task.text}" target="_blank">Search the web</a><i class="fas fa-search"></i></li>
                        <li id="copy-text">Copy text <i class="fa-regular fa-copy"></i></li>`;
  listItem.appendChild(option);
  
  option.querySelector("#remove").addEventListener("click", () => removeTask(listItem, task, state)); //OK
  option.querySelector("#search-web").addEventListener("click", () => listItem.removeChild(option)); //OK
  
  option.querySelector("#edit").addEventListener("click", () => {
    listItem.removeChild(option);
    editTask(task, state);
  });
  
  option.querySelector("#copy-text").addEventListener("click", async () => {
    await navigator.clipboard.writeText(task.text);
    listItem.removeChild(option);
  });

  function closeOption(event){
    if(listItem.contains(option) && !option.contains(event.target)){
      listItem.removeChild(option)
      document.removeEventListener('click', closeOption)
    }
  }
  
  setTimeout(()=> {
    document.addEventListener('click', closeOption)
  }, 1)
}

export { renderList, showBtnMenu, renderOption }