const express = require("express");
const app = express();
app.listen(8080, () => console.log("running in port 8080"));
const fs = require("fs");
const Contenedor = require("./products");

const listaProductos = new Contenedor("./Productos.txt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del motor de plantillas
app.set("view engine", "ejs");

// Rutas Ejs
app.get("/", (req, res) => {
  res.render("layouts/home");
});

app.get("/products", async (req, res) => {
  try {
    res.render("layouts/productos", {
      products: await listaProductos.getAll(),
    });
  } catch (error) {
    res.status(500).send("Hubo un error en el servidor");
  }
});

app.post("/products", async (req, res) => {
  try {
    await listaProductos.save(req.body);
    res.redirect("/products");
  } catch (error) {
    res.status(500).send("Hubo un error en el servidor");
  }
});

/*app.post("/users", (req, res) => {
  const newUser = req.body;
  usuarios.push(newUser);
  console.log(usuarios);
  res.redirect("/");
});*/
