const form = document.querySelector('#task-form')
const clearBtn = document.querySelector('.clear-tasks')
const card = document.querySelector('card')
const heading = document.querySelector('h5')
const doc = document.querySelector('.container')
const taskList = document.querySelector('.collection')
const taskInput = document.querySelector('#task')
const filter = document.querySelector('#filter')


loadEventListeners()

function loadEventListeners() {
    form.addEventListener('submit', addTask)
    clearBtn.addEventListener('click',clearTasks)
    taskList.addEventListener('click',removeTask)
    filter.addEventListener(('keyup'),filterTask)
}

function addTask(e) {
    //check if the value is empty
    if(taskInput.value==''){
        alert('add task')
        return
    }
    //create li element
    const li = document.createElement('li')
    //add class
    li.className = 'collection-item'
    //create text child and append to li
    li.appendChild(document.createTextNode(taskInput.value))
    //create new link element
    const link = document.createElement('a')
    //add class
    link.className = 'delete-item secondary-content'
    //add icon
    link.innerHTML = '<i class="fa fa-remove"></i>'
    //apend link to li
    li.appendChild(link)
    //append li to ul
    taskList.appendChild(li)
    taskInput.value = ''
    e.preventDefault()
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove()
    }
}

function clearTasks(e){
    if(confirm('Are You Sure You Want To Remove All Tasks?')){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild)
        }
    }
}

function filterTask(e){
    const item = taskList.firstChild.textContent
    if(item.toLowerCase().indexOf(text)!=-1){
        taskList.style.display = 'block'
    } else {
        taskList.style.display = 'none'
    }
}

function onClick(e) {
    //alert(`Event Type: ${e.type}`)
    heading.textContent = `MouseX: ${e.offsetX} MouseY: ${e.offsetY}`
    var ran = Math.floor(Math.random() * 255) + 1
    document.body.style.background = `rgb(${e.offsetX},${e.offsetY},${ran}`
}