function render() {
    load();
    let postContent = document.getElementById('postcontainer');
    postContent.innerHTML = '';

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        postContent.innerHTML += postHtml(i, post);
        postContent.innerHTML += actionHtml(i, post);
        postContent.innerHTML += commentsHtml(i, post);
        newComment(i);
    }
    renderStorys();
    renderProposals();
}


function renderStorys() {
    let content = document.getElementById('storys');
    content.innerHTML = '';

    for (let s = 0; s < storys.length; s++) {
        const story = storys[s];

        content.innerHTML += storysHtml(story);
    }
}


function renderProposals() {
    let content = document.getElementById('right-sidebar');
    content.innerHTML = '';

    for (let p = 0; p < proposals.length; p++) {
        const proposal = proposals[p];

        content.innerHTML += proposalsHtml(proposal, p);
    }
}


function newComment(i) {
    let newcomment = document.getElementById(`newcomment${i}`);
    newcomment.innerHTML = '';

    for (let j = 0; j < posts[i]['comments'].length; j++) {
        const comment = posts[i]['comments'][j];
        newcomment.innerHTML +=
        /*html*/`<div class="newcomment"><b>dan191</b> ${comment}
                    <button class="delete-btn" onclick="deleteComment(${i}, ${j})">x
                    </button>
                </div>`;
    }
}


function addComment(i) {
    let input = document.getElementById(`input${i}`);

    if (input.value.length < 1) {
        showToast('Bitte gib zuerst einen Kommentar ein!', 2000);
    } else posts[i].comments.push(input.value);
    render();
    save();
}


function deleteComment(i, j) {
    posts[i].comments.splice(j, 1);
    render();
    save();
}


function save() {
    let postsAsText = JSON.stringify(posts);
    localStorage.setItem('posts', postsAsText);
}


function load() {
    let postsAsText = localStorage.getItem('posts');

    if (postsAsText) {
        posts = JSON.parse(postsAsText);
    }
}


// function changeLike(i) {
//     let heartImage = document.getElementById(`heart${i}`).src;
//     let likeCounter = document.getElementById(`likes${i}`).innerHTML;

//     if (posts[i]['likestatus'] === true) {
//         heartImage = `img/favorite.png`;
//         posts[i]['amountlikes']--;
//         likeCounter = `Gefällt ${posts[i]['amountlikes']} Mal`;
//         posts[i]['likestatus'] = false;
//         posts[i]['like'] = 'img/favorite.png';
//     } else {
//         heartImage = `img/red-icons8-60.png`;
//         posts[i]['amountlikes']++;
//         likeCounter = `Gefällt ${posts[i]['amountlikes']} Mal`;
//         posts[i]['likestatus'] = true;
//         posts[i]['like'] = 'img/red-icons8-60.png';
//     }
//     localStorage.setItem('posts', JSON.stringify(posts));
//     render();
// }


function changeLike(i) {
    let post = posts[i];
    post.likestatus = !post.likestatus; //Das likestatus-Attribut des Beitrags wird umgekehrt (true wird zu false und umgekehrt), um den Like-Status des Beitrags zu aktualisieren.
    if (post.likestatus) {  //Danach wird überprüft, ob der Beitrag bereits geliked wurde oder nicht, indem das likestatus-Attribut des Beitrags überprüft wird.
        post.amountlikes++; //Wenn der Beitrag bereits geliked wurde (likestatus ist true), werden der Like-Zähler, das Herz-Icon und das like-Attribut des Beitrags aktualisiert
        document.getElementById(`heart${i}`).src = 'img/red-icons8-60.png';
        document.getElementById(`likes${i}`).innerHTML = `Gefällt ${post.amountlikes} Mal`;
        post.like = 'img/red-icons8-60.png';
    } else { //Andernfalls werden diese Elemente aktualisiert, um anzuzeigen, dass der Like entfernt wurde.
        post.amountlikes--;
        document.getElementById(`heart${i}`).src = 'img/favorite.png';
        document.getElementById(`likes${i}`).innerHTML = `Gefällt ${post.amountlikes} Mal`;
        post.like = 'img/favorite.png';
    }
    localStorage.setItem('posts', JSON.stringify(posts));
    render();
}


function changeBookmark(i) {
    image = document.getElementById(`bookmark${i}`);

    if (image.src.match('defaultb')) {
        posts[i]['bookmark'] = 'img/white-bookmark.png';
    } else {
        posts[i]['bookmark'] = 'img/defaultb.png';
    }
    localStorage.setItem('posts', JSON.stringify(posts));
    render();
}


function switchToInputField(i) {
    let input = document.getElementById(`input${i}`);
    input.select();
}


function changeFollowStatus(i) {
    let button = document.getElementById(`change-text${i}`);
    if (button.textContent === "Gefolgt") {
        button.innerHTML = `Folgen`;
        showToast(`Du folgst "${proposals[i]['name']}" nicht mehr!`, 2000);
    } else {
        button.innerHTML = "Gefolgt";
        showToast(`Du folgst jetzt "${proposals[i]['name']}"!`, 2000);
    }
}
/**
 * macht was es soll
 * @param {*} message - ee
 * @param {*} duration - wew
 */
function showToast(message, duration) {
    let toast = document.getElementById("toast");
    toast.innerText = message;
    toast.style.opacity = 1;
    setTimeout(function () {
        toast.style.opacity = 0;
    }, duration);
}

/**
 * Addiert zwei Zahlen und gibt das Ergebnis zurück.
 *
 * @param {number} a - Die erste Zahl.
 * @param {number} b - Die zweite Zahl.
 * @returns {number} - Das Ergebnis der Addition.
 */
function add(a, b) {
    return a + b;
}
