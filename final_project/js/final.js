/*Login & Register*/ 
const registerform = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
let userData = JSON.parse(localStorage.getItem("namelist")) || [
    {
        id: 1,
        name: "Andrilius",
        password: "12345"
    },
    {
        id: 2,
        name: "Pedro",
        password: "12345"
    },
    {
        id: 3,
        name: "Modrex",
        password: "12345"
    },
    {
        id: 4,
        name: "Tipar",
        password: "12345"
    }
];

function renderNameList() {
    const namelistSpan = document.getElementById("namelist");
    if (!namelistSpan) return;
}

renderNameList();

if (registerform) {
    registerform.addEventListener("submit", function(event) {
        event.preventDefault();
        const nameInput = document.getElementById("nameInput");
        const passwordInput = document.getElementById("passwordInput");

        if (!nameInput.value.trim() || !passwordInput.value.trim()) {
            alert("Please fill in all fields.");
            return;
        }

        const NewUser = {
            id : userData.length + 1,
            name: nameInput.value,
            password: passwordInput.value
        };

        userData.push(NewUser);
        
        localStorage.setItem("namelist", JSON.stringify(userData));
        console.log(userData);
        renderNameList();
        window.location.href = "login.html";
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const nameInput = document.getElementById("nameInput");
        const passwordInput = document.getElementById("passwordInput");

        if (!nameInput.value.trim() || !passwordInput.value.trim()) {
            alert("Please fill in all fields.");
            return;
        }

        const user = userData.find(u => u.name === nameInput.value);
        if (!user) {
            alert("User not found. Please register first.");
            return;
        }

        if (user.password !== passwordInput.value) {
            alert("Incorrect password.");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "index.html";
    });
}

/* Index */

const messageinput = document.getElementById("messageinput");
let message = JSON.parse(localStorage.getItem("messagelist")) || [
    {
        id: 1,
        user: userData[0],
        text: "yes",
        likes: "12345",
        replies: "7000",
        timestamp: "6/12/2026, 6:41:40 PM"
    },
    {
        id: 2,
        user: userData[1],
        text: "Hello",
        likes: "223",
        replies: "44443",
        timestamp: "6/12/2022, 6:41:40 PM"
    },
    {
        id: 3,
        user: userData[2],
        text: "Niche",
        likes: "69",
        replies: "7765",
        timestamp: "6/12/2022, 0:41:40 PM"
    },
    {
        id: 4,
        user: userData[3],
        text: "Funny",
        likes: "32",
        replies: "432",
        timestamp: "6/12/2077, 3:13:40 PM"
    }
];


if (messageinput) {
    messageinput.addEventListener('submit', function (e) {
        e.preventDefault();
        const textarea = document.getElementById('idea');
        if (!textarea || !textarea.value.trim()) {
            alert('Please enter a message before posting.');
            if (textarea) textarea.focus();
            return;
        }

        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || userData[0];
        const newMsg = {
            id: message.length + 1,
            user: currentUser,
            text: textarea.value.trim(),
            likes: 0,
            replies: 0,
            timestamp: new Date().toLocaleString()
        };

        message.unshift(newMsg);
        localStorage.setItem('messagelist', JSON.stringify(message));
        rendermessage();
    });
}

function rendermessage() {
    const messagelist = document.getElementById("messagelist");
    if (!messagelist) return;

    let tableContent = "";

    for (let i = 0; i < message.length; i++) {
        const msg = message[i];
        tableContent += `
           <div class="card">
                <div class="px-3 pt-4 pb-2">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <a href="#" class="nav-link link-dark">
                                <svg class="bi me-2" width="30" height="30"><use xlink:href="#people-circle"/></svg>
                            </a>
                            <div>
                                <h5 class="card-title mb-0"><h5 href="#"> @${msg.user && msg.user.name ? msg.user.name : 'User'}
                                    </h5></h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <p class="fs-6 fw-light text-muted">
                        ${msg.text ? msg.text : 'No message text provided.'}
                    </p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                                <span class="me-3 small text-muted d-flex align-items-center"><i class="bi bi-heart-fill text-danger me-1"></i>${msg.likes || 0}</span>
                                <span class="me-3 small text-muted d-flex align-items-center"><i class="bi bi-reply-fill me-1"></i>${msg.replies || 0}</span>
                        </div>
                        <div>
                            <small class="text-muted">${msg.timestamp}</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    messagelist.innerHTML = tableContent;
}

function renderfollowlist() {
    const followlist = document.getElementById("followlist");
    if (!followlist) return;

    let tableContent = "";

    for (let i = 0; i < message.length; i++) {
        const userdata = userData[i];
        const msg = message[i];
        tableContent += `
           <div class="hstack gap-2 mb-3">
                <div class="avatar">
                    <a href="profile.html" class="nav-link active">
                        <svg class="bi me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg>
                    </a>
                </div>
                <div class="overflow-hidden">
                    <a class="h6 mb-0" href="#!" id="username">${userdata.name}</a>
                    <p class="mb-0 small text-truncate" id="username">@${userdata.name}</p>
                </div>

                <a class="btn btn-primary-soft rounded-circle icon-md ms-auto" href="#">   
                <i class="fa-solid fa-plus"></i></a>
            </div>
        `;
    }
    followlist.innerHTML = tableContent;
}

const exitBtn = document.getElementById("logout");
if (exitBtn) {
    exitBtn.addEventListener("click", function(event) {
        event.preventDefault();
       
        message = [];
        userData = [];
       
        localStorage.removeItem('messagelist');
        localStorage.removeItem('namelist');
        localStorage.removeItem('currentUser');
        
        if (typeof rendermessage === 'function') rendermessage();
        if (typeof renderNameList === 'function') renderNameList();
        
        window.location.href = "login.html";
    });
}

rendermessage();
if (typeof renderfollowlist === 'function') renderfollowlist();

/* Profile */

let profile = JSON.parse(localStorage.getItem("profile")) || [
    {
        id: 1,
        user: userData[0],
        description: "this place sucks",
        following: "12345",
        followers: "7000",
    },
    {
        id: 2,
        user: userData[1],
        description: "My name is",
        following: "4343",
        followers: "434",
    },
    {
        id: 3,
        user: userData[2],
        description: "I work at indomaqet",
        folowing: "32",
        followers: "344334",
    },
    {
        id: 4,
        user: userData[3],
        description: "I love indonesia",
        following: "43",
        followers: "4343",
    }
];

function renderProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    if (!currentUser) return;

    const prof = profile.find(p => p.user && p.user.name === currentUser.name) || profile[0] || {};

    const usernameText = document.getElementById('usernameText');
    const descEl = document.getElementById('description');
    const followersCount = document.getElementById('followersCount');
    const followingCount = document.getElementById('followingCount');

    if (usernameText) usernameText.textContent = currentUser.name;
    if (descEl) descEl.textContent = prof.description || '';

    const followers = prof.followers || prof.folowing || prof.following || '0';
    const following = prof.following || prof.folowing || prof.followers || '0';

    if (followersCount) followersCount.textContent = followers;
    if (followingCount) followingCount.textContent = following;
}

renderProfile();
