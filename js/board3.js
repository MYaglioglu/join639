/**
 * Generates the overall task HTML representation.
 * @param {Object} element - The task data.
 * @param {string} priorityImageSrc - The source URL of the priority image.
 * @param {string} assignedToHTML - The HTML representation of assigned users.
 * @param {string} progressBar - The HTML representation of the progress bar.
 * @param {string} numberTasks - The HTML representation of the number of tasks.
 * @param {string} allTasks - The HTML representation of all tasks.
 * @returns {string} The generated HTML for the overall task.
 */
function renderSlideCardHTML(element, priorityImageSrc, assignedToHTML, subtasksHTML) {
    const backgroundColor = getCategoryBackgroundColor(element.category);
    return /*html*/ `
    <div id="slide-container" class="slide-container">
    <div id="task-slide-container${element.id}" class="task-slide-container">
        <div class="task-slide-headline">
            <div class="task-slide-headline-left" style="background-color: ${backgroundColor};"><span class="task-slide-category">${element.category}</span></div>
            <div id="task-slide-close" onclick="closeCard(${element.id}), loadData()" class="task-slide-headline-right"><img src="./img/close.png" alt="Schließen"></div>
        </div>
        <span id="task-slide-title" class="task-slide-title">${element.title}</span>
        <span id="task-slide-description" class="task-slide-description">${element.description}</span>
        <div class="task-slide-due-date-container">
            <span class="task-slide-due-date">Due date: </span>
            <span id="task-slide-due-date" class="task-slide-due-date-date">${element.dueDate}</span>
        </div>
        <div class="task-slide-prio-container">
            <span class="task-slide-prio-text">Priority: </span>
            <div class="task-slide-prio-text-img">
                <span class="task-slide-prio-text-">${element.priority}</span>
                <img id="task-slide-prio-img" src="${priorityImageSrc}" alt="">
            </div>
        </div>
        <div class="task-slide-assigned-container">
            <span class="task-slide-assigned-test">Assigned To:</span>
            <div class="task-slide-assigned-user-container">
            <div class="task-slide-assigned-user-container">
        <div class="task-slide-assigned-user-contact">
            ${assignedToHTML}
            <button class="task-slide-btn" type="checkbox" disabled></button>
        </div>
    </div>
    <div>
        </div>
            <div class="task-slide-subtasks-container">
                <span class="task-slide-subtasks-text">Subtasks</span>
                <div class="task-slide-subtasks-tasks" id="subtasksContainer">
                    ${subtasksHTML}
                </div>
            </div>
            <div class="task-slide-delete-edit-container">
                <div class="task-slide-delete">
                    <img class="task-slide-delete-edit-img" src="./img/delete.png" alt="">
                    <span onclick="deleteTask(${element.id})" class="task-slide-delete-text">Delete</span>
                </div>
                <div class="task-slide-placeholder"></div>
                <div class="task-slide-edit">
                    <img class="task-slide-delete-edit-img" src="./img/edit.png" alt="">
                    <span onclick="editTask(${element.id})" class="task-slide-edit-text">Edit</span>
                </div>
            </div>
        </div>
    </div>
    `;
}