console.log("javaSript funcionando");

socketClient = io();

let user;
Swal.fire({
  title: "Hola usuario",
  text: "Bienvenido, ingresa tu usuario",
  input: "text",
  allowOutsideClick: false,
}).then((response) => (user = response.value));

const campo = document.getElementById("messageField");

const prueba = document.getElementById("prueba");
prueba.innerHTML = `<p>Hola </p>`;

campo.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.key == "Enter") {
    socketClient.emit("message", {
      userName: user,
      message: campo.value,
    });
  }
});

const messageContainer = document.getElementById("messageContainer");

socketClient.on("historico", (data) => {
  let elements = "";
  data.forEach((el) => {
    elements =
      elements + `<p><strong>${el.userName}</strong>: ${el.message}</p>`;
  });
  messageContainer.innerHTML = elements;
});

socketClient.on("newUser", () => {
  Swal.fire({
    text: "Nuevo usuario conectado",
    toast: true,
  });
});
// fetch("/templates/tableData");

/*
Crear repo en Github
git init
git branch -M main
git status
Crear .gitignore - no subir nodeModules
git add .
git commit -m "Subiendo desafío ChatconWebsocket"
usar la linea de comando git remote add origin...
git push -u origin main

Iniciar sesion en Glitch
new proyect - import desde gitHub - copiamos el código del boton de code(verde) de gitHub
Definir el start - Agregamos un script en el package-json: "start": node/src/server.js
*/