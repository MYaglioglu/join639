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
    document.getElementById('edit-separator').style.display = 'inline-flex'
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
function deleteEditSubtask(subtaskId) {
    const indexToDelete = subtasks.findIndex(subtask => subtask.id === subtaskId);

    if (indexToDelete !== -1) {
        subtasks.splice(indexToDelete, 1);

        const subtaskElement = document.getElementById(subtaskId);
        if (subtaskElement) {
            subtaskElement.parentElement.parentElement.remove();
        }
    }
}

/**
 * Allows the user to edit a subtask.
 * @param {number} i - The index or unique identifier for the subtask.
 */
function editEditedSubtask(i) {
    const subtaskValueElement = document.querySelector(`.edit-subtask-value[data-subtask-id="${i}"]`);
    subtaskValueElement.setAttribute('contenteditable', 'true');
    /* subtaskValueElement.focus();  */
}