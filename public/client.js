const socket = io();

let firstname;

let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");

do {
  firstname = prompt("Please enter your name: ");
} while (!firstname || firstname.trim() === "");

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: firstname,
    message: message.trim(),
  };

  //Append the message
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  //Send to the server

  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");
  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
  mainDiv.innerHTML = markup;

  messageArea.appendChild(mainDiv);
}

//Receive mssg that are coming

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
