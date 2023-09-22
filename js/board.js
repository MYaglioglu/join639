let currentDraggedElement;
let currentFilter = '';

/**
 * Update the HTML for all task categories.
 * Calls functions to update HTML for each category.
 */
async function updateHTML() {
    await loadData();
    await loadContactsFromStorage();
    todo();
    inProgress();
    feedback();
    done();
    noTasks();
}

function refreshHTML() {
    todo();
    inProgress();
    feedback();
    done();
    noTasks();
}

let allTodos = [...todos];
allTodos = todos;

async function resetBackend() {
    await setItem('tasks', JSON.stringify(allTodos));
    await loadDatas();
}

async function loadDatas() {
    try {
        allTodos = JSON.parse(await getItem('tasks'));
        console.log('Tasks:', allTodos);
    } catch (e) {
        console.error('Loading error:', e);
    }
} 

async function pushData() {
    await setItem('tasks', JSON.stringify(todos));
}

async function loadData() {
    try {
        todos = JSON.parse(await getItem('tasks'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

async function loadContactsFromStorage() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

/**
 * Renders the assignees in the detail view.
 * @param {object} task the task whose information should be rendered
 */
function boardDetailViewAssignees(task) {

    let container = document.getElementById('board-detail-view-assignees');
    container.innerHTML = 'Assigned to:';

    for (let i = 0; i < task.assigned_to.length; i++) {
        const assignee = task.assigned_to[i];

        container.innerHTML += /*html*/ `
        
        <div>
            ${htmlTemplateAssigneeIcon(assignee)}
            ${assignee}
        </div> `;
    }
}

/**
 * Update the HTML for the "Todo" category based on the current filter.
 */
function todo() {
    let filteredTodo = todos.filter(task => task['status'] === 'todo' && (task.title.toLowerCase().includes(currentFilter) || task.category.toLowerCase().includes(currentFilter)));
    const todoContainer = document.getElementById('todo');
    todoContainer.innerHTML = '';
    if (filteredTodo.length === 0) {
        todoContainer.innerHTML += noTasks();
    } else {
        filteredTodo.forEach(task => {
            todoContainer.innerHTML += generateTasks(task);
        });
    }
}

/**
 * Update the HTML for the "In Progress" category based on the current filter.
 */
function inProgress() {
    let filteredInProgress = todos.filter(task => task['status'] === 'inprogress' && (task.title.toLowerCase().includes(currentFilter) || task.category.toLowerCase().includes(currentFilter)));
    const inProgressContainer = document.getElementById('in-progress');
    inProgressContainer.innerHTML = '';
    if (filteredInProgress.length === 0) {
        inProgressContainer.innerHTML += noTasks();
    } else {
        filteredInProgress.forEach(task => {
            inProgressContainer.innerHTML += generateTasks(task);
        });
    }
}

/**
 * Update the HTML for the "Feedback" category based on the current filter.
 */
function feedback() {
    let filteredFeedback = todos.filter(task => task['status'] === 'feedback' && (task.title.toLowerCase().includes(currentFilter) || task.category.toLowerCase().includes(currentFilter)));
    const feedbackContainer = document.getElementById('feedback');
    feedbackContainer.innerHTML = '';
    if (filteredFeedback.length === 0) {
        feedbackContainer.innerHTML += noTasks();
    } else {
        filteredFeedback.forEach(task => {
            feedbackContainer.innerHTML += generateTasks(task);
        });
    }
}

/**
 * Update the HTML for the "Done" category based on the current filter.
 */
function done() {
    let filteredDone = todos.filter(task => task['status'] === 'done' && (task.title.toLowerCase().includes(currentFilter) || task.category.toLowerCase().includes(currentFilter)));
    const doneContainer = document.getElementById('done');
    doneContainer.innerHTML = '';
    if (filteredDone.length === 0) {
        doneContainer.innerHTML += noTasks();
    } else {
        filteredDone.forEach(task => {
            doneContainer.innerHTML += generateTasks(task);
        });
    }
}

/**
 * Generate HTML for the "No Tasks" message.
 * @returns {string} HTML markup for no tasks message.
 */
function noTasks() {
    return /*html*/`
        <div class="no-tasks-to-do">
            <div class="no-tasks-to-do-text">No Tasks to do</div>
        </div>`;
}

/**
 * Generate HTML markup for a task element.
 * @param {Task} element - The task object to generate HTML for.
 * @returns {string} HTML markup for the task element.
 */
function generateTasks(element) {
    const priorityImageSrc = setPriorityImage(element.priority);
    assignedToHTML = renderAssigned(element);
    const { subtasksHTML, completedTasksCount } = renderSubtask(element);
    const allTasksCount = element.subtasks.length;
    const progress = (completedTasksCount / allTasksCount) * 100;
    const progressBar = progressBarHTML(element, progress);
    const numberTasks = numberTasksHTML(completedTasksCount);
    const allTasks = allTasksHTML(allTasksCount);
    const generatedHTML = generateTasksHTML(element, priorityImageSrc, assignedToHTML, progressBar, numberTasks, allTasks);
    return generatedHTML;
}

function extractInitials(name) {
    const names = name.split(' ');
    let initials = '';
    for (const n of names) {
        if (n.length > 0) {
            initials += n[0].toUpperCase();
        }
    }
    return initials;
}

function setPriorityImage(priority) {
    let imageSrc = '';
    if (priority === 'low') {
        imageSrc = './img/prio-low.png';
    } else if (priority === 'medium') {
        imageSrc = './img/prio-medium.png';
    } else if (priority === 'high') {
        imageSrc = './img/prio-high.png';
    }
    return imageSrc;
}

/**
 * Set the currently dragged element.
 * @param {number} id - The id of the element being dragged.
 */
function startDragging(id) {
    currentDraggedElement = id;
}

/**
 * Allow dropping elements on drop zones.
 * @param {Event} ev - The dragover event.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Move a task to a specified status.
 * @param {string} status - The status to move the task to.
 */
function moveTo(status) {
    todos[currentDraggedElement].status = status;
    pushData();
    loadData();
    updateHTML();
}

function polyfill() {
    let currentTask;
    // Define the dragstart event.
    document.addEventListener("dragstart", function (ev) {
        // Get the id of the element being dragged.
        const id = ev.target.id;
        // Set the current dragged element.
        currentTask = todos.find(task => task.id === id);
    });

    // Define the dragover event.
    document.addEventListener("dragover", function (ev) {
        // Prevent the default action.
        ev.preventDefault();
    });

    // Define the drop event.
    document.addEventListener("drop", function (ev) {
        // Get the status of the drop zone.
        const status = ev.target.getAttribute("data-status");

        // Move the task to the specified status.
        currentTask.status = status;
        pushData();
        loadData();
        updateHTML();
    });
}

/**
 * Filter tasks based on a search term and status.
 * @param {string} searchTerm - The search term to filter tasks.
 * @param {string} status - The status to filter tasks.
 * @returns {Task[]} Array of filtered tasks.
 */
function filterTasks(searchTerm, status) {
    let filteredTasks = todos.filter(task => {
        return task.status === status && (task.title.includes(searchTerm) || task.category.includes(searchTerm));
    });
    return filteredTasks;
}

/**
 * Set the current filter based on input value.
 */
function setFilter() {
    let searchText = document.getElementById('input-field');
    currentFilter = searchText.value.toLowerCase();
    searchText.value = '';
    updateHTML();
}

document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('input-field');
    const inputBtn = document.getElementById('search');

    input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            inputBtn.click();
        }
    });
});

/**
 * Close the task card.
 */
function closeCard() {
    document.getElementById('slide-container').classList.remove('slide-in');
    setTimeout(() => {
        document.getElementById('task-slide').classList.add('d-none');
    }, 800);
}

/**
 * Slideanimation for the task card.
 */
function slideCardAnimation() {
    document.getElementById('task-slide').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('slide-container').classList.add('slide-in');
    }, 50);
}

/**
 * Slide open the task card.
 */
function slideCard(id) {
    const slideCard = document.getElementById('task-slide');
    slideCard.innerHTML = renderSlideCard(id);
    slideCardAnimation();
}

/**
 * Generate HTML markup for the task slide card.
 * @returns {string} HTML markup for the task slide card.
 */
function renderSlideCard(id) {
    const element = todos[id];
    const priorityImageSrc = setPriorityImage(element.priority);
    assignedToHTML = renderSlideAssigned(element);
    subtasksHTML = renderSlideSubtask(element, id);
    const generateSlideHTML = renderSlideCardHTML(element, priorityImageSrc, assignedToHTML, subtasksHTML)
    return generateSlideHTML;
}

function deleteTask(id) {
    const indexToDelete = todos.findIndex(task => task.id === id);
    if (indexToDelete === -1) {
        return;
    }
    todos.splice(indexToDelete, 1);
    deleteCard(id);
    updateIDs();
    closeCard();
    pushData();
    refreshHTML();
}

function updateIDs() {
    for (let i = 0; i < todos.length; i++) {
        todos[i].id = i;
    }
}

function deleteCard(id) {
    const elementToRemove = document.getElementById(`board-card${id}`);
    if (elementToRemove) {
        elementToRemove.remove();
    }
}