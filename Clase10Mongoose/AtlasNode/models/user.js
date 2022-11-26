import mongoose from "mongoose";

// definir la colección donde vamos a guardar la info
const userCollection = "users";
// definir el esquema
const userSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  dni: String,
});

// generamos el modelo
export const userModel = mongoose.model(userCollection, userSchema);
