let todos = [{
    'id': 0,
    'title': 'Putzen',
    'category': 'Design',
    'status': 'todo'
}, {
    'id': 1,
    'title': 'Kochen',
    'category': 'Sales',
    'status': 'todo'
}, {
    'id': 2,
    'title': 'Einkaufen',
    'category': 'Tech',
    'status': 'todo'
}, {
    'id': 3,
    'title': 'Einkaufen',
    'category': 'Tech',
    'status': 'feedback'
}, {
    'id': 4,
    'title': 'Putzen',
    'category': 'Sales',
    'status': 'todo'
}, {
    'id': 5,
    'title': 'Einkaufen',
    'category': 'Backoffice',
    'status': 'feedback'
}, {
    'id': 6,
    'title': 'Einkaufen',
    'category': 'Tech',
    'status': 'done'
}
];

let currentDraggedElement;
let currentFilter = '';

function updateHTML() {
    todo();
    inProgress();
    feedback();
    done();    
    noTasks()
}

function todo() {
    let filteredTodo = todos.filter(task => task['status'] === 'todo' && (task.title.toLowerCase().includes(currentFilter) || task.category.toLowerCase().includes(currentFilter)));
    const todoContainer = document.getElementById('todo');
    todoContainer.innerHTML = '';

    if (filteredTodo.length === 0) {
        todoContainer.innerHTML += noTasks();
    } else {
        filteredTodo.forEach(task => {
            todoContainer.innerHTML += generateTodoHTML(task);
        });
    }
}

function inProgress(){
    let filteredInProgress = todos.filter(task => task['status'] === 'inprogress' && (task.title.toLowerCase().includes(currentFilter) || task.category.toLowerCase().includes(currentFilter)));
    const inProgressContainer = document.getElementById('in-progress');
    inProgressContainer.innerHTML = '';

    if (filteredInProgress.length === 0) {
        inProgressContainer.innerHTML += noTasks();
    } else {
        filteredInProgress.forEach(task => {
            inProgressContainer.innerHTML += generateTodoHTML(task);
        });
    }
}

function feedback(){
    let filteredFeedback = todos.filter(task => task['status'] === 'feedback' && (task.title.toLowerCase().includes(currentFilter) || task.category.toLowerCase().includes(currentFilter)));
    const feedbackContainer = document.getElementById('feedback');
    feedbackContainer.innerHTML = '';

    if (filteredFeedback.length === 0) {
        feedbackContainer.innerHTML += noTasks();
    } else {
        filteredFeedback.forEach(task => {
            feedbackContainer.innerHTML += generateTodoHTML(task);
        });
    }
}

function done(){
    let filteredDone = todos.filter(task => task['status'] === 'done' && (task.title.toLowerCase().includes(currentFilter) || task.category.toLowerCase().includes(currentFilter)));
    const doneContainer = document.getElementById('done');
    doneContainer.innerHTML = '';

    if (filteredDone.length === 0) {
        doneContainer.innerHTML += noTasks();
    } else {
        filteredDone.forEach(task => {
            doneContainer.innerHTML += generateTodoHTML(task);
        });
    }
}

function noTasks(){
    return /*html*/`
        <div class="no-tasks-to-do">
            <div class="no-tasks-to-do-text">No Tasks to do</div>
        </div>`;
}


function startDragging(id) {
    currentDraggedElement = id;
}

function generateTodoHTML(element) {
    return /*html*/`
    <div draggable="true" ondragstart="startDragging(${element['id']})" class="content-container">
        <div class="content-container-inner">
            <div class="category">${element.category}</div>
            <div class="title-content">
                <div class="title">${element.title}</div>
                <div class="content">Modify the contents of the main website...</div>
            </div>
            <div class="subtasks-container">
                <div class="progress-bar-container">
                    <div class="progress-bar"></div>
                </div>
                <div class="subtasks">1/2 Subtasks</div>
            </div>
            <div class="prio-container">
                <div class="user-container">
                    <div class="user-marked blue">SM</div>
                    <div class="user-marked media negativ-gap">EF</div>
                </div>
                <div class="prio-icon"><img src="./img/prio-low.png" alt=""></div>
            </div>
        </div>
    </div>`;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    todos[currentDraggedElement]['status'] = status;
    updateHTML();
}

function filterTasks(searchTerm, status) {
    let filteredTasks = todos.filter(task => {
        return task.status === status && (task.title.includes(searchTerm) || task.category.includes(searchTerm));
    });
    return filteredTasks;
}

function setFilter() {
    let searchText = document.getElementById('input-field');
    currentFilter = searchText.value.toLowerCase();
    updateHTML();
    searchText.value = '';
}

