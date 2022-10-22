/*class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }
  // Métodos
  getFullName() {
    // Lo muestro por pantalla
    console.log(`${this.nombre} ${this.apellido}`);
  }
  addMascota(String) {
    this.mascotas.push(String);
  }
  countMascotas() {
    // Lo muestro por pantalla
    console.log(this.mascotas.length);
  }
  addBook(StringNombre, StringAutor) {
    this.libros.push({ nombre: StringNombre, autor: StringAutor });
  }
  getBookNames() {
    // Lo muestro por pantalla
    console.log(this.libros.map((libro) => libro.nombre));
  }
}

const usuario1 = new Usuario(
  "Juan",
  "Ramirez",
  [
    { nombre: "El psicoanalista", autor: "John Katzenbach" },
    { nombre: "El hechizo del agua", autor: "Florencia Bonelli" },
    { nombre: "Rota se camina igual", autor: "Lorena Pronsky" },
  ],
  ["Mila", "Harry"]
);
console.log(usuario1);
const usuario2 = new Usuario(
  "Mariana",
  "Bermudez",
  [
    { nombre: "Reseta tus intestinos", autor: "Facundo Pereyra" },
    { nombre: "Personas Decentes", autor: "Leonardo Padura" },
  ],
  ["Bartolo", "Scooby", "Jaime"]
);
usuario1.getFullName();
usuario1.addMascota("Pablo");
usuario1.countMascotas();
usuario1.addBook("Padre rico padre pobre", "Robert Kiyosaki");
usuario1.getBookNames();
*/

// async-await crea una función para poder trabajar con operaciones asíncronas, y poder manipular las respuestas de las Promesas también
const fs = require("fs");
const express = require("express");
const productRouter = require("./routes/productsRouter");
const handlebars = require("express-handlebars");
const path = require("path");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 8080;

// Crear el servidor
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// archivos static
app.use("public", express.static(__dirname + "/public")); // dirname busca la ruta en donde está la carpeta public, en el ambiente que ejecute

app.use("/api", productRouter); // Asocio una ruta principal con todas las rutas de los productos. Paso el productRouter como 2do parámetro

// levantar el servidor
const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`));

// Servidor de Websocket y lo conectamos con nuestro servidor de express
const io = new Server(server);
const historicoMessages = [];

io.on("connection", (socket) => {
  console.log("nuevo usuario conectado", socket.id);
  socket.broadcast.emit("newUser", "alguien más se conectó");
  socket.emit("historico", historicoMessages);
  socket.on("message", (data) => {
    console.log(data);
    historicoMessages.push(data);
    io.sockets.emit("historico", historicoMessages);
  });
});

// HandleBars
const folderViews = path.join(__dirname, "views");
console.log(folderViews);

// 1° Configurar nuestro motor de plantillas
// definir el motor
//          extensión, ejecutar el motor
app.engine("handlebars", handlebars.engine());

// 2° ubicar la carpeta donde vamos a colocar los templates de extensión .handlebars
//      el primer param es views, el 2do es la ruta
app.set("views", folderViews);

// 3° definir el motor para express
// primer param fijo es view engine, el 2do es el motor a usar, en este caso handlebars
app.set("view engine", "handlebars");
