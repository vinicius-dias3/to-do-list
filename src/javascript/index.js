const tasks = []

function addTask(){
    const taskInput = document.getElementById('taskInput')
    const taskText = taskInput.value.trim()
    //método trim, elimina espaço antes e depois da string

    if(taskText !== ''){
        const newTask = {
            id: tasks.length + 1,
            text: taskText,
            completed: false
        };

        tasks.unshift(newTask)
        taskInput.value = ''
        console.log(tasks)
        renderList()
    }
}

const btnAddTask = document.getElementById('btnAddTask');
btnAddTask.addEventListener('click', (addTask))

function renderList (){
    const taskList = document.querySelector('#taskList');
    taskList.innerHTML = '';
    for(const task of tasks) {
        taskList.innerHTML += `<li class="task"><button>${task.text}</button></li>`
    }
    // completeTask()
}

taskList.addEventListener('click', (event)=> {
    console.log(event)
    console.log(event.target)
    if(event.target.parentNode.classList.contains('task')){
        // event.target.style.color = 'grey';
        event.target.classList.toggle('completed')
        // let checkIcon = document.createElement('i')
        // checkIcon.classList.add('fas', 'fa-check')
        // event.target.appendChild(checkIcon)
        // updateTasks()
    } 
})