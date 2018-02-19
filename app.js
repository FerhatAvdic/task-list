// Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all eventListeners
loadEventListeners();

function loadEventListeners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks)
    //Add task event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //Clear tasks event
    clearBtn.addEventListener('click', clearTasks);
    //Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

//Load tasks to DOM from LS
function getTasks(e){
    //get from local storage
    let tasks = itemsFromLocalStorage('tasks');
    //Create List in HTML
    tasks.forEach(function(task){
        createTaskHTML(task);
    })
}


function addTask(e){
    if(taskInput.value===''){
        alert('Add a task');
    }
    //Create element
    createTaskHTML(taskInput.value);
    //store in local storage
    storeTaskInLocalStorage(taskInput.value);
    //clear input
    taskInput.value = '';
    e.preventDefault();
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure')) {
            //Remove from DOM
            e.target.parentElement.parentElement.remove();
            //Remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function clearTasks(e) {
    //taskList.innerHTML = '';

    //Faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    localStorage.removeItem('tasks');
}

function filterTasks(e) {
    //Get the filter value
    const text = e.target.value.toLowerCase();
    //Run trough the ul list
    document.querySelectorAll('.collection-item').forEach(function (task) {
        //get list item text
        const item = task.firstChild.textContent;
        //compare list item text with filter value
        if (item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}

//Create task DOM element
function createTaskHTML(task){
    //Create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    //append the link to li
    li.appendChild(link);
    //append the li to ul
    taskList.appendChild(li);
}

//Get tasks from local storage
function itemsFromLocalStorage(items) {
    if (localStorage.getItem(items) === null)
        return [];
    else
        return JSON.parse(localStorage.getItem(items));
}
//Store Task to local storage
function storeTaskInLocalStorage(task){
    //Get current task collection from local storage
    let tasks = itemsFromLocalStorage('tasks');
    //append the new task
    tasks.push(task);
    //overwrite the tasks in local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task from local storage
function removeTaskFromLocalStorage(taskItem){
    //get from local sotrage
    let tasks = itemsFromLocalStorage('tasks');
    //remove the taskItem
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    //overwrite tasks in local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
