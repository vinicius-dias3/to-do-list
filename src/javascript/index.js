const tasks = []
const taskInput = document.getElementById('taskInput')

function addTask(taskText){
    taskText = taskInput.value.trim()
    //método trim, elimina espaço antes e depois da string

    if(taskText !== ''){
        const newTask = {
            id: tasks.length + 1,
            text: taskText,
            completed: false
        };

        tasks.unshift(newTask);
        taskInput.value = '';
        renderList();
        console.log(tasks);
    }
}

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
        listItem.textContent = task.text;
        listItem.addEventListener('click', () => completeTask(listItem, task.id));
        if(task.completed){
            listItem.classList.add('completed');
            console.log(listItem)
            showBtnMenu(listItem, task);
        } 

        taskList.appendChild(listItem);
    }
}

function completeTask (listItem, taskId){
    const task = tasks.find(t => {
        return t.id === taskId
    });
    !task.completed ? task.completed = true : task.completed = false;
    listItem.classList.toggle('completed');
    console.log(listItem)
    console.log(task);
    showBtnMenu(listItem, task)
}

function showBtnMenu(listItem, task){
    const btnMenu = document.createElement('button')
    btnMenu.innerHTML = '<i class="fas fa-ellipsis-v"></i>'
    
    task.completed
    ? listItem.appendChild(btnMenu) 
    : listItem.removeChild(listItem.childNodes[1]);
    btnMenu?.addEventListener('click', ()=> console.log('teste'))
}