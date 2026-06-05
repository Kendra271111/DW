const form = document.getElementById("myForm");
const messagecard = [
    {
        id: 1,
        name: "Cmax",
        message: "YAyayaayay"
    }
];

function rendermessage() {
    const messageList = document.getElementById("messagelist");
    if (!messageList) return;

    let tableContent = "";

    for (let i = 0; i < messagecard.length; i++) {
        const message = messagecard[i];
        tableContent += `
            <div class="card mb-3 bg-primary text-white">
                <div class="card-header text-white">${message.name}</div>
                <div class="card-body">
                    <p class="card-text">${message.message}</p>
                </div>
            </div>
        `;
    }
    messageList.innerHTML = tableContent;
}

function updateTable() {
    rendermessage();
}

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const nameInput = document.getElementById("InputName1");
        const messageInput = document.getElementById("Message1");

        if (!nameInput.value.trim() || !messageInput.value.trim()) {
            alert("Please fill in all fields.");
            return;
        }

        const Newmessage = {
            id : messagecard.length + 1,
            name: nameInput.value,
            message: messageInput.value
        };

        messagecard.push(Newmessage);
        console.log(messagecard);
        nameInput.value = "";
        messageInput.value = "";
        updateTab
        le();
    });
}

rendermessage();