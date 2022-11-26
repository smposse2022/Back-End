const express = require("express");
const productRouter = require("./routes/productsRouter.js");
const handlebars = require("express-handlebars");
const path = require("path");
//const { Server } = require("socket.io");
const PORT = process.env.PORT || 8080;
const Contenedor = require("./products");

const listaProductos = new Contenedor("Productos.txt");

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
//const io = new Server(server);
//const historicoMessages = [];

// Configuración Websocket
/*io.on("connection", async (socket) => {
  console.log("nuevo usuario conectado", socket.id);
  // enviar todos los productos al usuario al conectarse
  socket.emit("products", await listaProductos.getAll());
  socket.broadcast.emit("newUser");
  socket.emit("historico", historicoMessages);
  socket.on("message", (data) => {
    console.log(data);
    historicoMessages.push(data); // o chatContainer.save - creando la clase
    io.sockets.emit("historico", historicoMessages); // // o chatContainer.getAll - creando la clase
  });
});*/

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
