//inicializar socket del lado del cliente
const socket = io();
let user;
let chatBox = document.querySelector("#chatBox");
let messagesLog = document.querySelector("#messagesLog");
Swal.fire({
  title: "Hola fan de Berni!",
  input: "text",
  text: "Que genio que sos, como te conectaste che. Ponete un nombre",
  inputValidator: (value) => {
    return !value && "Ponete un nombre carajo";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  console.log(`Tu nombre de usuario es ${user}`);

  socket.emit("userConnect", user);
});

chatBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", {
        user: user,
        message: chatBox.value,
      });
      chatBox.value = "";
    }
  }
});

socket.on("messagesLog", (data) => {
  let messages = "";

  data.forEach((chat) => {
    messages += `${chat.user}: ${chat.message}</br>`;
  });

  messagesLog.innerHTML = messages;
});

socket.on("newUser", data => {
  Swal.fire({
    text: `${data} se ha unido al chat`,
    toast: true,
    position: "top-right",
  });
});
