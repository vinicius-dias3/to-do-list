const loadTasksLocalStorage = () => {
    const storedTasks = JSON.parse(localStorage.getItem('todoList')) || []
    return storedTasks
}

const saveTasksLocalStorage = ({tasks}) => {
    localStorage.setItem('todoList', JSON.stringify(tasks))
}

export { loadTasksLocalStorage, saveTasksLocalStorage }