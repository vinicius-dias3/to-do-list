const tasks = []
const taskInput = document.getElementById('taskInput')

function addTask(taskText){
    taskText = taskInput.value.trim()
    //método trim, elimina espaço antes e depois da string

    if(taskText !== ''){
        const newTask = {
            id: verificarMaiorId() + 1,
            text: taskText,
            completed: false,
        };

        tasks.unshift(newTask);
        taskInput.value = '';
        renderList();
        console.log(tasks);
    }
}


function verificarMaiorId (){
    let maiorId = 0
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id > maiorId) maiorId = tasks[i].id
    }
    return maiorId
};

const btnAddTask = document.getElementById('btnAddTask');
btnAddTask.addEventListener('click', (addTask))

taskInput.addEventListener('keyup', (e)=> {
    const taskText = e.target.value
    const key = e.which || e.keyCode
    const isEnterPressed = key === 13

    if(isEnterPressed) addTask(taskText)
})

function renderList (){
    const taskList = document.querySelector('#taskList');
    taskList.innerHTML = '';

    for(const task of tasks) {
        let listItem = document.createElement('li');
        listItem.innerHTML = `<p>${task.text}</p>`;
        let taskContent = listItem.querySelector('p')
        taskContent.addEventListener('click', () => completeTask(listItem, task.id));
        if(task.completed){
            listItem.classList.add('completed');
            showBtnMenu(listItem, task);
        } 

        taskList.appendChild(listItem);
    }
}

function completeTask (listItem, taskId){
    const task = tasks.find(t => t.id === taskId);

    !task.completed ? task.completed = true : task.completed = false;
    listItem.classList.toggle('completed');
    showBtnMenu(listItem, task)
}

function showBtnMenu(listItem, task){
    const btnMenu = document.createElement('button')
    btnMenu.innerHTML = '<i class="fas fa-ellipsis-v"></i>'
    task.completed
    ? listItem.appendChild(btnMenu) 
    : listItem.removeChild(listItem.childNodes[1]);
    btnMenu.addEventListener('click', ()=> {
        renderOption(task, listItem)
    })
}

function renderOption(task, listItem){
    let option = document.createElement('ul')
    option.classList.add('option')
    option.innerHTML = `<li><h3>${task.text}</h3></li>
                        <li id="edit">Edit</li>
                        <li id="remove">Remove</li>
                        <li id="search-web">Seach the web</li>
                        <li id="copy-text">Copy text</li>`
    listItem.appendChild(option);

    let removeBtn = option.querySelector('#remove')
    removeBtn.addEventListener('click', ()=> removeTask(listItem, task))
    option.addEventListener('mouseleave', ()=> listItem.removeChild(option))
}

function removeTask (listItem, task){
    listItem.remove(listItem)
    const index = tasks.findIndex(t => t.id === task.id)
    if(index !== -1) tasks.splice(index, 1)
    
    console.log(tasks)
}