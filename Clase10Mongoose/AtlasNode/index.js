import mongoose from "mongoose";
import { userModel } from "./models/user.js";
const URL =
  "mongodb+srv://smposse:Hotdog2022@cluster0.94d5car.mongodb.net/ecommerce?retryWrites=true&w=majority";
mongoose.connect(
  URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) throw new Error(`Conexion fallida ${error}`);
    console.log("conexion base de datos exitosa!");
  }
);

const operaciones = async () => {
  // insert
  const newUsers = [
    { nombre: "Lucas", apellido: "Blanco", dni: "30355874" },
    { nombre: "María", apellido: "García", dni: "29575148" },
    { nombre: "Tomas", apellido: "Sierra", dni: "38654790" },
    { nombre: "Carlos", apellido: "Fernández", dni: "26935670" },
  ];
  let resultado = await userModel.insertMany(newUsers);
  console.log(resultado);
};
operaciones();

let persistencia = "mongo"; // Si pongo mongo va a trabajar con mongo, si pongo firebase, trabajará con firebase, y así
// investigar patron factory e importaciones dinámicas
