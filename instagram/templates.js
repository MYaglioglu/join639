function storysHtml(story) {
    return /*html*/ `
        <div class="story">
            <img class="story-images" src=${story['image']} alt="">
            <p class="story-font">${story['name']}</p>
        </div>
    `;
}


function proposalsHtml(proposal, p) {
    return /*html*/ `
    <div class="proposal-middle-section">
        <div class="profile-middle-section">
            <div><img class="profile-middle-section-image" src=${proposal['image']} alt="">
                </div>
            <div>
                <div class="profile-font">${proposal['name']}</div>
                <div class="profile-font-1">${proposal['description']}</div>
            </div>
        </div>
        <div>
            <p id="change-text${p}" onclick="changeFollowStatus(${p})" class="follow-btn"><b>${proposal['button']}</b></p>
        </div>
    </div>
`;
}


function postHtml(i, post) {
    return /*html*/ `
    <div class="postcontainer" id="post${i}">
        <div class="postcontainer-top-section">
            <div><img class="postcontainer-profile-image" src=${post['profileImage']} alt="">
            </div>
            <div>
                <div class="profile-font">${post['author']}</div>
                <div class="location-font">${post['location']}</div>
            </div>
        </div>
        <img class="post-image" src=${post['image']} alt="">  
    </div>
`;
}


function actionHtml(i, post) {
    return /*html*/ `
    <div id="action-section">
    <div class="action-icons-section">
        <div class="action-icons-left">
            <img id="heart${i}" onclick="changeLike(${i})" class="action-icon" src="${post['like']}" alt="heart">
            <img onclick="switchToInputField(${i})" class="action-icon" src=${post['iconComment']} alt="">
            <img onclick="addComment(${i})" class="action-icon" src=${post['iconMessage']} alt="">
        </div>
        <div class="action-icons-right">
        <img id="bookmark${i}" onclick="changeBookmark(${i})" class="action-icon" src="${post['bookmark']}"alt="">
        </div>
    </div>
    <div class="likes">Gefällt <samp id="likes${i}">${post['amountlikes']}</samp> Mal</div>
    </div>
`;
}


function commentsHtml(i, post) {
    return /*html*/ `
    <div id="comments-section">
    <div class="comments-box">
        <div class="comments"><b>${post['followerName1']}</b> ${post['followerComment1']}
        </div>
        <div class="comments"><b>${post['followerName2']}</b> ${post['followerComment2']}
        </div>
        <div id="newcomment${i}"></div>
    </div>
    <div class="hours">
        ${post['time']}
    </div>
    <div class="input-section">
        <input id="input${i}" class="input-field" type="text" placeholder="Kommentieren...">
        <div onclick="addComment(${i})" class="addpost">Posten
        </div>
    </div>
    <div class="border"></div>
    </div>
`;
}