
// document.addEventListener('DOMContentLoaded', function () {
//     let backButton = document.querySelector('.arrow-container');

//     if (backButton) {
//         backButton.addEventListener('click', function () {
//             let visitedPages = JSON.parse(localStorage.getItem('visitedPages'));

//             if (visitedPages && visitedPages.length > 1) {
//                 // Entferne die aktuelle Seite aus der Liste der besuchten Seiten
//                 visitedPages.pop();
//                 // Nimm die letzte Seite aus der Liste (die aktuelle Seite wurde entfernt)
//                 let previousPage = visitedPages[visitedPages.length - 1];
//                 localStorage.setItem('visitedPages', JSON.stringify(visitedPages));
//                 window.location.href = previousPage;
//             } else {
//                 // Fallback to a default page if no previousPage is stored
//                 window.location.href = 'index.html';
//             }
//         });
//     }

//     // Speichere die aktuelle Seite im Local Storage
//     let currentURL = window.location.href;
//     let visitedPages = JSON.parse(localStorage.getItem('visitedPages')) || [];

//     // Halte maximal 2 Einträge im Local Storage
//     if (visitedPages.length >= 2) {
//         visitedPages.shift(); // Entferne den ältesten Eintrag
//     }

//     visitedPages.push(currentURL);
//     localStorage.setItem('visitedPages', JSON.stringify(visitedPages));
// });


document.addEventListener('DOMContentLoaded', function () {
    setupBackButton();
    saveVisitedPage();
});

function setupBackButton() {
    let backButton = document.querySelector('.arrow-container');

    if (backButton) {
        backButton.addEventListener('click', navigateBack);
    }
}

function navigateBack() {
    let visitedPages = JSON.parse(localStorage.getItem('visitedPages'));

    if (visitedPages && visitedPages.length > 1) {
        visitedPages.pop();
        let previousPage = visitedPages[visitedPages.length - 1];
        localStorage.setItem('visitedPages', JSON.stringify(visitedPages));
        window.location.href = previousPage;
    } else {
        window.location.href = 'index.html';
    }
}

function saveVisitedPage() {
    let currentURL = window.location.href;
    let visitedPages = JSON.parse(localStorage.getItem('visitedPages')) || [];

    if (visitedPages.length >= 2) {
        visitedPages.shift();
    }
    visitedPages.push(currentURL);
    localStorage.setItem('visitedPages', JSON.stringify(visitedPages));
}


// function showForgotRedirect() {
//     document.body.innerHTML += createForgotTemplate();

//     setTimeout(function () {
//         let successOverlay = document.getElementById('forgotOverlay');
//         document.body.removeChild(successOverlay);

//         let forgotContainer = document.getElementById('forgot-content');
//         forgotContainer.style.display = 'none';

//         let resetContent = document.getElementById('reset-content');
//         resetContent.innerHTML = generateResetContent();
//         resetContent.style.display = 'flex';
//         addBlurEvents();
//     }, 800);
// }

// function resetFormStyle() {
//     let signUpInfoBoxes = document.querySelectorAll('.log-in-info-box');
//     signUpInfoBoxes.forEach(box => {
//         box.style.borderColor = '#D1D1D1';
//     });
//     passwordMatchError.style.display = 'none';
// }


// document.addEventListener('DOMContentLoaded', function () {
//     const userEmail = localStorage.getItem('loggedInUserEmail');
//     const userPassword = localStorage.getItem('loggedInUserPassword');

//     if (userEmail && userPassword) {
//         emailInput.value = userEmail;
//         passwordInputCheck.value = userPassword;
//     }
// });


// let rememberCheck = document.getElementById('rememberCheck');
// rememberCheck.addEventListener('click', togglerememberCheck);

// let isChecked = false; // Variable, um den Zustand des Check-Bildes zu verfolgen

// // Prüfen, ob der Zustand in Local Storage gespeichert ist
// if (localStorage.getItem('rememberCheckState') === 'checked') {
//     isChecked = true;
//     rememberCheck.src = 'img/checked.png';
// }


// function togglerememberCheck() {
//     isChecked = !isChecked;
//     if (isChecked) {
//         // Ändere das Bild zu 'checked.png', wenn es zuvor auf 'check-button.png' geklickt wurde
//         rememberCheck.src = 'img/checked.png';
//         // Speichere die Login-Daten im Local Storage
//         localStorage.setItem('loggedInUserEmail', emailInput.value);
//         localStorage.setItem('loggedInUserPassword', passwordInputCheck.value);
//         localStorage.setItem('rememberCheckState', 'checked');
//         // Ändere den Hover-Effekt, wenn das Bild auf 'checked.png' gewechselt wird
//         rememberCheck.removeEventListener('mouseenter', applyHoverCheckedBackground);
//         rememberCheck.removeEventListener('mouseleave', removeHoverCheckedBackground);
//         rememberCheck.addEventListener('mouseenter', applyHoverCheckedBackground);
//         rememberCheck.addEventListener('mouseleave', removeHoverCheckedBackground);

//     } else {
//         // Ändere das Bild zu 'check-button.png', wenn es zuvor auf 'checked.png' geklickt wurde
//         rememberCheck.src = 'img/check-button.png';
//         // Entferne die Login-Daten aus dem Local Storage
//         localStorage.removeItem('loggedInUserEmail');
//         localStorage.removeItem('loggedInUserPassword');
//         localStorage.removeItem('rememberCheckState');
//         // Ändere den Hover-Effekt, wenn das Bild auf 'check-button.png' gewechselt wird
//         rememberCheck.removeEventListener('mouseenter', applyHoverCheckedBackground);
//         rememberCheck.removeEventListener('mouseleave', removeHoverCheckedBackground);
//         rememberCheck.addEventListener('mouseenter', applyHoverButtonBackground);
//         rememberCheck.addEventListener('mouseleave', removeHoverButtonBackground);
//     }
// }



// Event Listener für die Eingabe in das Passwort-Feld
// passwordInput.addEventListener('input', function () {
//     if (passwordInput.value.length > 0) {
//         passwordIcon.src = passwordInput.type === 'password' ? 'img/visibility_off.png' : 'img/visibility.png';
//     } else {
//         passwordIcon.src = 'img/lock.png';
//     }
// });

// passwordInput.addEventListener('input', function () {
//     if (passwordInput.value.length > 0) {
//         if (passwordInput.type === 'password') {
//             passwordIcon.src = 'img/visibility_off.png';
//         } else {
//             passwordIcon.src = 'img/visibility.png';
//         }
//     } else {
//         passwordIcon.src = 'img/lock.png';
//     }
// });



// // Event Listener für das Klicken auf das Passwort-Sichtbarkeits-Icon
// passwordIcon.addEventListener('click', function () {
//     if (passwordInput.type === 'password') {
//         passwordInput.type = 'text';
//         passwordIcon.src = 'img/visibility.png';
//     } else {
//         passwordInput.type = 'password';
//         passwordIcon.src = 'img/visibility_off.png';
//     }
// });


// // Event Listener für die Eingabe in das Bestätigungs-Passwort-Feld
// // confirmPasswordInput.addEventListener('input', function () {
// //     if (confirmPasswordInput.value.length > 0) {
// //         confirmPasswordIcon.src = confirmPasswordInput.type === 'password' ? 'img/visibility_off.png' : 'img/visibility.png';
// //     } else {
// //         confirmPasswordIcon.src = 'img/lock.png';
// //     }
// // });


// confirmPasswordInput.addEventListener('input', function () {
//     if (confirmPasswordInput.value.length > 0) {
//         if (confirmPasswordInput.type === 'password') {
//             confirmPasswordIcon.src = 'img/visibility_off.png';
//         } else {
//             confirmPasswordIcon.src = 'img/visibility.png';
//         }
//     } else {
//         confirmPasswordIcon.src = 'img/lock.png';
//     }
// });


// // Event Listener für das Klicken auf das Bestätigungs-Passwort-Sichtbarkeits-Icon
// confirmPasswordIcon.addEventListener('click', function () {
//     if (confirmPasswordInput.type === 'password') {
//         confirmPasswordInput.type = 'text';
//         confirmPasswordIcon.src = 'img/visibility.png';
//     } else {
//         confirmPasswordInput.type = 'password';
//         confirmPasswordIcon.src = 'img/visibility_off.png';
//     }
// });