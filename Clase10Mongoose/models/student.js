import mongoose, { mongo } from "mongoose";

const studentCollection = "estudiantes";

// creamos el schema de los estudiantes
const studentSchema = new mongoose.Schema({
  // nombre: String
  nombre: {
    type: String,
    require: true,
  },
  apellido: {
    type: String,
    require: true,
  },
  edad: {
    type: Number,
    require: true,
  },
  DNI: {
    type: String,
    require: true,
    unique: true, // Para evitar los duplicados
  },
  curso: {
    type: String,
    require: true,
  },
  nota: {
    type: Number,
    require: true,
  },
  ingreso: {
    type: Boolean,
  },
});

// generar un modelo, que nos va a permitir usarlo para realizar operaciones sobre los documentos
export const studentModel = mongoose.model(studentCollection, studentSchema); // se le pasa la colección y el esquema
