const form = document.querySelector('#task-form')
const clearBtn = document.querySelector('.clear-tasks')
const heading = document.querySelector('h5')
const taskList = document.querySelector('.collection')
const taskInput = document.querySelector('#task')
const subjectInput = document.querySelector('#subject')
const filter = document.querySelector('#filter')


loadEventListeners()

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded',getTasks)
    form.addEventListener('submit', addTask)
    clearBtn.addEventListener('click',clearTasks)
    taskList.addEventListener('click',removeTask)
    filter.addEventListener('keyup',filterTask)
}

function getTasks(){
    let tasks
}
function addTask(e) {
    //check if the value is empty
    if(taskInput.value==''||subjectInput.value==''){
        alert('a field is empty')
        return
    }
    //create li element
    const li = document.createElement('li')
    //add class
    li.className = 'collection-item'
    //create text child and append to li
    li.appendChild(document.createTextNode(taskInput.value))
    li.appendChild(document.createTextNode(' | '))
    li.appendChild(document.createTextNode(subjectInput.value))
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
    storeInStorage(taskInput.value,subjectInput.value)
    taskInput.value = ''
    subjectInput.value = ''
    e.preventDefault()
}

function storeInStorage(task,subject){
    let tasks
    let subjects
    if(localStorage.getItem("tasks")===null){
        tasks=[]
        subjects=[]
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        subjects = JSON.parse(localStorage.getItem('subjects'))
    }
    tasks.push(task)
    subjects.push(subject)
    localStorage.setItem('tasks',JSON.stringify(tasks))
    localStorage.setItem('subjects',JSON.stringify(subjects))
}
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        removeTaskStorage(e.target.parentElement.parentElement)
        e.target.parentElement.parentElement.remove()
    }
}
function removeTaskStorage(taskItem){
    let tasks
    let subjects
    if(localStorage.getItem("tasks")===null){
        tasks=[]
        subjects=[]
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        subjects = JSON.parse(localStorage.getItem('subjects'))
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent.substring(0,taskItem.textContent.indexOf(' | ')) === task){
            tasks.splice(index,1)
            subjects.splice(index,1)
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
    localStorage.setItem('subjects',JSON.stringify(subjects))
}

function clearTasks(e){
    if(confirm('Are You Sure You Want To Remove All Tasks?')){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild)
        }
        localStorage.clear()
    }
}

function filterTask(e){
    const text = e.target.value.toLowerCase()
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = taskList.firstChild.textContent
        if(item.toLowerCase().indexOf(text)!=-1){
            taskList.style.display = 'block'
        } else {
            taskList.style.display = 'none'
        }
    })
}

function onClick(e) {
    //alert(`Event Type: ${e.type}`)
    heading.textContent = `MouseX: ${e.offsetX} MouseY: ${e.offsetY}`
    var ran = Math.floor(Math.random() * 255) + 1
    document.body.style.background = `rgb(${e.offsetX},${e.offsetY},${ran}`
}