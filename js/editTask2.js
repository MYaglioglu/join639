/**
 * Renders and displays the selected contacts.
 */
function renderDisplayChosenContacts() {
    let chosenContactsContainer = document.getElementById('edit-chosen-contacts');
    chosenContactsContainer.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const isSelected = selectedContacts[contact.id];

        if (isSelected) {
            let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
            chosenContactsContainer.innerHTML += renderDisplayChosenContactsHTML(contact, initials);
        }
    }
}


/**
 * Renders the HTML for a chosen contact with its initials.
 * 
 * @function
 * @param {Object} contact - The contact information.
 * @param {string} contact.bgcolor - The background color for the initials div.
 * @param {string} initials - The initials of the contact.
 * @returns {string} - The rendered HTML string.
 */
function renderDisplayChosenContactsHTML(contact, initials) {
    return /*html*/`
        <div class="chosen-contact">
            <div class="initial" style="background-color: ${contact.bgcolor}">${initials}</div>
        </div>
    `;
}


/**
 * Loads and displays the chosen contacts.
 */
function loadDisplayChosenContacts() {
    const chosenContactsContainer = document.getElementById('edit-chosen-contacts');
    let htmlContent = '';

    for (const id in selectedContacts) {
        if (selectedContacts.hasOwnProperty(id)) {
            const contact = contacts.find(c => c.id === parseInt(id));
            if (contact) {
                const initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
                htmlContent += loadDisplayChosenContactsHTML(contact, initials);
            }
        }
    }
    chosenContactsContainer.innerHTML = htmlContent;
}


/**
 * Generiert und gibt einen HTML-String für die Anzeige ausgewählter Kontakte zurück.
 *
 * @param {Object} contact - Das Kontaktobjekt mit notwendigen Informationen.
 * @param {string} contact.bgcolor - Hintergrundfarbe für die Initialen.
 * @param {string} initials - Initialen des Kontakts.
 *
 * @returns {string} HTML-String zur Darstellung des ausgewählten Kontakts.
 */
function loadDisplayChosenContactsHTML(contact, initials) {
    return /*html*/`
        <div class="chosen-contact">
            <div class="initial" style="background-color: ${contact.bgcolor}">${initials}</div>
        </div>
    `;
}


/**
 * Toggles the category container's display status and updates category dropdown's visual state.
 */
function loadToggleCategoryContainer() {
    let editSelectText = document.querySelector('.edit-select-text');
    editSelectText.style.display = 'inline';

    let editSelectedCategory = document.getElementById('edit-selected-category-display');
    editSelectedCategory.textContent = '';

    let editCategoryContainer = document.getElementById('edit-loaded-categories');
    let editCategoryDropdown = document.querySelector('.edit-category-dropdown');

    if (editCategoryContainer.style.display === 'block') {
        editCategoryContainer.style.display = 'none';
        editCategoryDropdown.classList.remove('expanded');
    } else {
        editCategoryContainer.style.display = 'block';
        editCategoryDropdown.classList.add('expanded');
        editRenderCategorys();
    }
}


/**
 * Renders the categories for editing.
 */
function editRenderCategorys() {
    let editCategoryContainer = document.getElementById('edit-loaded-categories');
    editCategoryContainer.innerHTML = '';

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i].name;

        editCategoryContainer.innerHTML += /* html */`
        <div class="category" onclick="categorySelected('${category}')">${category}</div>
        `;
    }
}


/**
 * Loads the provided category into the selected category.
 * @param {Object} element - The element containing category data.
 */
function loadRenderCategory(element) {
    const category = element.category;
    selectedCategory = category;
}


/**
 * Handles the logic when a category is selected.
 * @param {string} category - The name of the selected category.
 */
function categorySelected(category) {
    selectedCategory = category;
    let selectedCategoryDisplay = document.getElementById('edit-selected-category-display');
    selectedCategoryDisplay.textContent = `${selectedCategory}`;

    let selectText = document.querySelector('.edit-select-text');
    selectText.style.display = 'none';

    let categoryContainer = document.getElementById('edit-loaded-categories');
    categoryContainer.style.display = 'none';

    let categoryDropdown = document.querySelector('.edit-category-dropdown');
    categoryDropdown.classList.remove('expanded');
}


/**
 * Opens the subtask input and updates relevant display elements.
 */
function openSubtaskInput() {
    document.querySelector('.open-subtask-button').style.display = 'none';
    document.getElementById('edit-subtask-input').focus();
    document.getElementById('edit-separator').classList.add('inline-flex');
    let otherButtons = document.querySelectorAll('.add-subtask-button');
    for (let i = 0; i < otherButtons.length; i++) {
        otherButtons[i].style.display = 'inline-block';
    }
}


/**
 * Closes the subtask input and resets the relevant display elements.
 */
function closeSubtaskInput() {
    document.querySelector('.open-subtask-button').style.display = 'inline-block';
    document.querySelector('.new-subtask-textfield').value = '';
    document.getElementById('edit-separator').style.display = 'none'
    let otherButtons = document.querySelectorAll('.add-subtask-button');
    for (let i = 0; i < otherButtons.length; i++) {
        otherButtons[i].style.display = 'none';
    }
}


/**
 * Deletes a subtask based on its ID.
 * @param {number|string} subtaskId - The ID of the subtask to delete.
 */
function deleteEditSubtask(indexToDelete) {
    let task = currentSelectedTask;
    if (indexToDelete >= 0 && indexToDelete < task.subtasks.length) {
        task.subtasks.splice(indexToDelete, 1);
        let subtaskElement = document.getElementById(`subtask-container-${indexToDelete}`);
        if (subtaskElement) {
            subtaskElement.remove();
        }
    }
}

/**
 * Allows the user to edit a subtask.
 * @param {number} i - The index or unique identifier for the subtask.
 */
function editEditedSubtask(i) {
    let subtaskElement = document.getElementById(i);
    if (subtaskElement) {
        subtaskElement.contentEditable = true;
        subtaskElement.focus();
    }
    let subtaskContainer = document.getElementById(`subtask-container-${i}`);
    if (subtaskContainer) {
        addEditingClasses(subtaskContainer);
    }
}


/**
 * Applies editing classes and styles to the given container. It handles specific 
 * UI changes for entering the editing mode like showing/hiding certain elements 
 * and modifying some styles.
 * 
 * @param {HTMLElement} container - The container element to which editing styles and classes will be applied.
 * 
 * @example
 * let divElement = document.querySelector(".my-container");
 * addEditingClasses(divElement);
 */
function addEditingClasses(container) {
    addClasses(container);
    setDisplay(container.querySelector(".edit-subtask-dot"), "none");
    setDisplay(container.querySelector(".edit-save-subtask-button"), "block");
    setDisplay(container.querySelector(".edit-delete-subtask-button"), "block");
    setDisplay(container.querySelector(".separator3"), "block");
}


/**
 * Adds specific CSS classes and styles to the given container element.
 * @param {HTMLElement} container - The DOM element to which classes and styles will be added.
 */
function addClasses(container) {
    container.classList.add("editing-mode", "no-hover");
    container.style.borderBottom = "1px solid #4589FF";
}



/**
 * Sets the display style of a DOM element. *
 * @function
 * @name setDisplay
 * @param {HTMLElement|null} element - The DOM element to modify.
 * @param {string} value - The CSS display value to set (e.g. 'none', 'block').
 */
function setDisplay(element, value) {
    if (element) {
        element.style.display = value;
    }
}


/**
 * Finishes the editing mode for a given subtask.
 *
 * @function
 * @name finishEditing
 * @param {string|number} i - The unique identifier (or index) for the subtask.
 * 
 * @description
 * This function achieves the following steps:
 * 1. Gets the subtask element with the provided ID and disables its content editing.
 * 2. Removes editing-related classes from the subtask's container.
 * 3. Saves the edited title.
 *
 * @example
 * finishEditing(3);  // finishes editing for the subtask with id '3'
 */
function finishEditing(i) {
    let subtaskElement = document.getElementById(i);
    if (subtaskElement) {
        subtaskElement.contentEditable = false;
    }
    let subtaskContainer = document.getElementById(`subtask-container-${i}`);

    if (subtaskContainer) {
        removeEditingClasses(subtaskContainer);
    }
    saveEditedTitle();
}


/**
 * Removes a class from the given element and optionally sets a CSS style property and value.
 *
 * @param {HTMLElement} element - The DOM element from which the class will be removed.
 * @param {string} className - The class name to be removed from the element.
 * @param {string} [styleProperty] - The CSS property to set. If not provided, this step is skipped.
 * @param {string} [styleValue=''] - The value for the CSS property. If `styleProperty` is provided but `styleValue` isn't, it sets the property value to an empty string.
 *
 * @example
 * removeClassAndStyle(document.querySelector('.my-div'), 'hide', 'display', 'block');
 */
function removeClassAndStyle(element, className, styleProperty, styleValue) {
    if (element) {
        element.classList.remove(className);
        if (styleProperty) {
            element.style[styleProperty] = styleValue;
        }
    }
}


/**
 * Removes editing-related classes and styles from the given container element.
 * Specifically, it:
 * - Removes "editing-mode" and "no-hover" classes.
 * - Resets the borderBottom style.
 * - Changes the display styles for the child elements with the classes:
 *   ".edit-subtask-dot", ".edit-save-subtask-button", ".edit-delete-subtask-button", and ".separator3".
 *
 * @param {HTMLElement} container - The container element from which editing-related classes and styles are to be removed.
 */
function removeEditingClasses(container) {
    ['editing-mode', 'no-hover'].forEach(cls => container.classList.remove(cls));
    container.style.borderBottom = "";

    removeClassAndStyle(container.querySelector(".edit-subtask-dot"), "", "display", "inline-block");
    removeClassAndStyle(container.querySelector(".edit-save-subtask-button"), "", "display", "none");
    removeClassAndStyle(container.querySelector(".edit-delete-subtask-button"), "", "display", "none");
    removeClassAndStyle(container.querySelector(".separator3"), "", "display", "none");
}


/**
 * Speichert den bearbeiteten Titel des aktuellen Tasks.
 * Wenn der aktuelle Task nicht definiert ist oder keine Subtasks hat,
 * wird ein Fehler in der Konsole angezeigt.
 * 
 * @function
 * @returns {void} Gibt nichts zurück.
 * @throws {Error} Wenn currentTask nicht definiert ist oder keine subtasks hat.
 */
function saveEditedTitle() {
    let currentTask = todos[currentTaskId];
    if (!currentTask || !currentTask.subtasks) {
        console.error("currentTask ist nicht definiert oder hat keine subtasks.");
        return;
    }
    currentTask.subtasks = processAndSaveSubtasks(currentTask);
}