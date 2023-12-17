"use strict";
/* =====> ARRAYS <===== */
let titles = [];
let notes = [];
let trashTitles = [];
let trashNotes = [];
let archiveTitles = [];
let archiveNotes = [];
loadNotes();


function show() {
    document.getElementById(`note-header`).classList.remove(`display-none`);
    document.getElementById(`note-footer`).classList.remove(`display-none`);
}

function hide() {
    document.getElementById(`note-header`).classList.add(`display-none`);
    document.getElementById(`note-footer`).classList.add(`display-none`);

}

/* =====> AUTO GROW TEXTAREA <===== */
const textarea = document.getElementById("note");
textarea.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
});

const titlearea = document.getElementById("title");
titlearea.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
});

/* =====> DEFAULT NOTE <===== */
function renderNotes() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    loadTrashNotes();
    loadArchiveNotes();

    if (titles == 0) {
        document.getElementById('content').classList.remove('content');
        content.innerHTML += emptyHomeHtml();
    } else {

        for (let i = 0; i < titles.length; i++) {
            const title = titles[i];
            const note = notes[i];
            document.getElementById('content').classList.add('content');


            content.innerHTML += /*html*/`
        <div class="added-note">
            <div class="added-note-header"> 
                <textarea readonly id="title-${i}" class="added-note-title">${title}</textarea>
            </div>
            <div class="added-note-input">
                <textarea readonly id="note-${i}" class="added-note-note">${note}</textarea>
            </div>
            <div class="added-note-footer">
                <img onclick="editNote(${i})" id="edit-btn-${i}" class="action-icon" title="Bearbeiten" src="img/edit-64.png" alt="">
                <img onclick="saveNote(${i})" id="save-btn-${i}" class="action-icon" title="Speichern" style="display: none;" src="img/save-64.png" alt="">
                <img onclick="homeToArchive(${i})" class="action-icon" title="Archivieren" src="img/download-64.png" alt="">
                <img onclick="homeToTrash(${i})" class="action-icon" title="Löschen" src="img/delete-64.png" alt="">
            </div>
        </div>
        `;
        }
    }
}

/* =====> LANDING PAGE <===== */
function openHome() {
    document.getElementById('main-container').classList.remove('display-none');
    document.getElementById('content').classList.remove('display-none');
    document.getElementById('archive').classList.add('display-none');
    document.getElementById('trash-onload').classList.add('display-none');
    document.getElementById('trash').classList.add('display-none');
    document.getElementById('korb').classList.add('display-none');
    renderNotes();
}

/* =====> TRASH NOTE <===== */
function openTrash() {
    document.getElementById('content').classList.add('display-none');
    document.getElementById('main-container').classList.add('display-none');
    document.getElementById('archive').classList.add('display-none');
    document.getElementById('trash-onload').classList.remove('display-none');
    document.getElementById('trash').classList.remove('display-none');
    document.getElementById('korb').classList.remove('display-none');

    let content = document.getElementById('trash');
    content.innerHTML = '';
    loadTrashNotes();

    if (trashTitles == 0) {
        document.getElementById('trash').classList.remove('content');
        content.innerHTML += emptyTrashHtml();
    } else {
        for (let i = 0; i < trashTitles.length; i++) {
            const ttitle = trashTitles[i];
            const tnote = trashNotes[i];
            document.getElementById('trash').classList.add('content');
            content.innerHTML += /*html*/`
        <div class="added-note">
            <div class="added-note-header">
                <textarea readonly id="title" class="added-note-title">${ttitle}</textarea>
            </div>
            <div class="added-note-input">
                <textarea readonly id="note" class="added-note-note">${tnote}</textarea>
            </div>
            <div class="added-note-footer">
                <img onclick="trashToHome(${i})" class="action-icon" title="Wiederherstellen" src="img/upload-64.png" alt="">
                <img onclick="trashToNirvana(${i})" class="action-icon" title="Endgültig löschen" src="img/delete-64.png" alt="">
            </div>
        </div>
        `;
        }
    }
    renderTrash();
}

function renderTrash() {
    document.getElementById('korb').innerHTML = /*html*/`<h2><i>Notizen im Papierkorb werden nach 30 Tagen gelöscht.</i></h2>
    <p onclick="deleteTrash()"><b>Papierkorb leeren</b></p>
`;
}

function emptyHomeHtml() {
    return /*html*/ `
        <div class="empty-page">
            <img src="img/light-bulb-2-64.png" alt="">
            <h2>Hier werden hinzugefügte Notizen angezeigt</h2>
        </div>
    `;
}

function emptyArchiveHtml() {
    return /*html*/ `
        <div class="empty-page">
            <img src="img/download-64.png" alt="">
            <h2>Hier werden archivierte Notizen angezeigt</h2>
        </div>
    `;
}

function emptyTrashHtml() {
    return /*html*/ `
        <div class="empty-page">
            <img src="img/delete-64.png" alt="">
            <h2>Keine Notizen im Papierkorb</h2>
        </div>
    `;
}

/* =====> ARCHIVE NOTE <===== */
// function openArchive() {
//     document.getElementById('archive').classList.remove('display-none');
//     document.getElementById('main-container').classList.add('display-none');
//     document.getElementById('content').classList.add('display-none');
//     document.getElementById('trash').classList.add('display-none');

//     let content = document.getElementById('archive');
//     content.innerHTML = '';
//     loadArchiveNotes();

//     for (let i = 0; i < archiveTitles.length; i++) {
//         const atitle = archiveTitles[i];
//         const anote = archiveNotes[i];

//         content.innerHTML += /*html*/`
//         <div class="added-note">
//             <div class="added-note-header">
//                 <textarea readonly id="title" class="added-note-title">${ttitle}</textarea>
//             </div>
//             <div class="added-note-input">
//                 <textarea readonly id="note" class="added-note-note">${tnote}</textarea>
//             </div>
//             <div class="added-note-footer">
//                 <img onclick="archiveToHome(${i})" class="action-icon" title="Wieder aktivieren" src="img/upload-64.png" alt=""> 
//                 <img onclick="archiveToTrash(${i})" class="action-icon" title="Löschen" src="img/delete-64.png" alt=""></img>          
//             </div>
//         </div>
//         `;
//     }
// }

function openArchive() {
    const archive = document.getElementById('archive');
    archive.classList.remove('display-none');
    document.querySelectorAll('#main-container, #content, #trash-onload, #trash, #korb').forEach(el => el.classList.add('display-none'));

    archive.innerHTML = '';
    loadArchiveNotes();

    if (archiveTitles == 0) {
        document.getElementById('archive').classList.remove('content');
        archive.innerHTML += emptyArchiveHtml();
    } else {
        archiveTitles.forEach((atitle, i) => {
            const anote = archiveNotes[i];
            document.getElementById('archive').classList.add('content');
            archive.innerHTML += /*html*/`
            <div class="added-note">
            <div class="added-note-header">
                <textarea readonly id="title" class="added-note-title">${atitle}</textarea>
            </div>
            <div class="added-note-input">
                <textarea readonly id="note" class="added-note-note">${anote}</textarea>
            </div>
            <div class="added-note-footer">
                <img onclick="archiveToHome(${i})" class="action-icon" title="Wieder aktivieren" src="img/upload-64.png" alt="">
                <img onclick="archiveToTrash(${i})" class="action-icon" title="Löschen" src="img/delete-64.png" alt="">
            </div>
        </div>
        `;
        })
    };
}

/* =====> ADD AND DELETE NOTE <===== */
// function addNote() {   
//     let title = document.getElementById('title');
//     let note = document.getElementById('note');

//     if (title.value.length && note.value.length > 0) {
//         titles.push(title.value);
//         notes.push(note.value);
//     } else {
//         alert('Please fill out all Fields!')
//     }

//     title.value = '';
//     note.value = '';
//     renderNotes();
//     saveNotes();
// }

function addNote() {
    const titleInput = document.getElementById('title');
    const noteInput = document.getElementById('note');
    const addtitle = titleInput.value.trim();
    const addnote = noteInput.value.trim();

    if (addtitle && addnote) {
        titles.push(addtitle);
        notes.push(addnote);
        titleInput.value = '';
        noteInput.value = '';
        renderNotes();
        saveNotes();
        hide();
    } else {
        alert('Please fill out all fields!');
    }
}

function editNote(i) {
    document.getElementById(`title-${i}`).readOnly = false;
    document.getElementById(`note-${i}`).readOnly = false;
    document.getElementById(`edit-btn-${i}`).style.display = 'none';
    document.getElementById(`save-btn-${i}`).style.display = 'inline-block';
    document.getElementById(`title-${i}`).focus();
}

function saveNote(i) {
    const updatedTitle = document.getElementById(`title-${i}`).value;
    const updatedNote = document.getElementById(`note-${i}`).value;
    titles.splice(i, 1, updatedTitle);
    notes.splice(i, 1, updatedNote);
    document.getElementById(`title-${i}`).readOnly = true;
    document.getElementById(`note-${i}`).readOnly = true;
    document.getElementById(`edit-btn-${i}`).style.display = 'inline-block';
    document.getElementById(`save-btn-${i}`).style.display = 'none';
    saveNotes();
}

function homeToTrash(i) {
    trashTitles.push(titles[i]);
    trashNotes.push(notes[i]);
    titles.splice(i, 1);
    notes.splice(i, 1);
    saveTrashNotes();
    saveNotes();
    renderNotes();
    saveArchiveNotes();
}

function homeToArchive(i) {
    archiveTitles.push(titles[i]);
    archiveNotes.push(notes[i]);
    titles.splice(i, 1);
    notes.splice(i, 1);
    saveArchiveNotes();
    saveTrashNotes();
    saveNotes();
    renderNotes();
}

function trashToNirvana(i) {
    trashTitles.splice(i, 1);
    trashNotes.splice(i, 1);
    saveTrashNotes();
    openTrash();
}

function deleteTrash(i) {
    trashTitles.splice(i);
    trashNotes.splice(i);
    saveTrashNotes();
    openTrash();
}

function trashToHome(i) {
    titles.push(trashTitles[i]);
    notes.push(trashNotes[i]);
    trashTitles.splice(i, 1);
    trashNotes.splice(i, 1);
    saveNotes();
    saveTrashNotes();
    openTrash();
}

function archiveToTrash(i) {
    trashTitles.push(archiveTitles[i]);
    trashNotes.push(archiveNotes[i]);
    archiveTitles.splice(i, 1);
    archiveNotes.splice(i, 1);
    saveTrashNotes();
    saveArchiveNotes();
    saveNotes();
    openArchive();
}

function archiveToHome(i) {
    titles.push(archiveTitles[i]);
    notes.push(archiveNotes[i]);
    archiveTitles.splice(i, 1);
    archiveNotes.splice(i, 1);
    saveNotes();
    saveArchiveNotes();
    openArchive();
}

/* =====> LOCAL STORAGE <===== */
// function saveNotes() {
//     let titlesAsText = JSON.stringify(titles);
//     localStorage.setItem('titles', titlesAsText)
//     let notesAsText = JSON.stringify(notes);
//     localStorage.setItem('notes', notesAsText)
// }

// function saveTrashNotes() {
//     let trashTitlesAsText = JSON.stringify(trashTitles);
//     localStorage.setItem('trashTitles', trashTitlesAsText)
//     let trashNotesAsText = JSON.stringify(trashNotes);
//     localStorage.setItem('trashNotes', trashNotesAsText)
// }

// function saveArchiveNotes() {
//     let archiveTitlesAsText = JSON.stringify(archiveTitles);
//     localStorage.setItem('archiveTitles', archiveTitlesAsText)
//     let archiveNotesAsText = JSON.stringify(archiveNotes);
//     localStorage.setItem('archiveNotes', archiveNotesAsText)
// }

function saveToLocalStorage(key, value) {
    let valueAsText = JSON.stringify(value);
    localStorage.setItem(key, valueAsText);
}

function saveNotes() {
    saveToLocalStorage('titles', titles);
    saveToLocalStorage('notes', notes);
}

function saveTrashNotes() {
    saveToLocalStorage('trashTitles', trashTitles);
    saveToLocalStorage('trashNotes', trashNotes);
}

function saveArchiveNotes() {
    saveToLocalStorage('archiveTitles', archiveTitles);
    saveToLocalStorage('archiveNotes', archiveNotes);
}

function loadNotes() {
    let titlesAsText = localStorage.getItem('titles');
    let notesAsText = localStorage.getItem('notes');
    if (titlesAsText && notesAsText) {
        titles = JSON.parse(titlesAsText);
        notes = JSON.parse(notesAsText);
    }
}

function loadTrashNotes() {
    let trashTitlesAsText = localStorage.getItem('trashTitles');
    let trashNotesAsText = localStorage.getItem('trashNotes');
    if (trashTitlesAsText && trashNotesAsText) {
        trashTitles = JSON.parse(trashTitlesAsText);
        trashNotes = JSON.parse(trashNotesAsText);
    }
}

function loadArchiveNotes() {
    let archiveTitlesAsText = localStorage.getItem('archiveTitles');
    let archiveNotesAsText = localStorage.getItem('archiveNotes');
    if (archiveTitlesAsText && archiveNotesAsText) {
        archiveTitles = JSON.parse(archiveTitlesAsText);
        archiveNotes = JSON.parse(archiveNotesAsText);
    }
}


/* =====> HAMBURGER<===== */
let hamburger = document.querySelector('.hamburger');
let navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll('.nav-link').forEach(n => n.
    addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }))