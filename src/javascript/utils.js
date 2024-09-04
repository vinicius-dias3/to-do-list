function updateCounter(inputElement, state){
  let {counterLength, clearAllBtn} = state
  let currentLength = inputElement.value.length
  counterLength.textContent = `${currentLength} / ${inputElement.maxLength}`
  if(inputElement.value) {
    clearAllBtn.classList.add('disabled')
  }else{
    clearAllBtn.classList.remove('disabled')
  }
}

function toggleClearAllBtn (state){
  const { tasks, taskInput, editTaskInput, clearAllBtn } = state
  const hasTasks = tasks.length > 0
  const isInputEmpty = !taskInput.value && !editTaskInput.value
  if(hasTasks && isInputEmpty) {
    clearAllBtn.classList.remove('disabled')
  }else{
    clearAllBtn.classList.add('disabled')
  }
}

export { updateCounter, toggleClearAllBtn }