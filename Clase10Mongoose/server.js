// Conectarse a la base de datos usando mongoose - importamos Mongoose
import mongoose from "mongoose";
import { studentModel } from "./models/student.js";

// La URL donde se está esjecutando nuestra base de datos
const URL = "mongodb://127.0.0.1:27017/colegio";

//conectamos a la base de datos
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
console.log("base de datos conectada");

const operacionesCrud = async () => {
  try {
    const newStudents = [
      {
        nombre: "Pedro",
        apellido: "Mei",
        edad: 21,
        dni: "31155898",
        curso: "1A",
        nota: 7,
      },
      {
        nombre: "Ana",
        apellido: "Gonzalez",
        edad: 32,
        dni: "27651878",
        curso: "1A",
        nota: 8,
      },
      {
        nombre: "José",
        apellido: "Picos",
        edad: 29,
        dni: "34554398",
        curso: "2A",
        nota: 6,
      },
      {
        nombre: "Lucas",
        apellido: "Blanco",
        edad: 22,
        dni: "30355874",
        curso: "3A",
        nota: 10,
      },
      {
        nombre: "María",
        apellido: "García",
        edad: 36,
        dni: "29575148",
        curso: "1A",
        nota: 9,
      },
      {
        nombre: "Federico",
        apellido: "Perez",
        edad: 41,
        dni: "320118321",
        curso: "2A",
        nota: 5,
      },
      {
        nombre: "Tomas",
        apellido: "Sierra",
        edad: 19,
        dni: "38654790",
        curso: "2B",
        nota: 4,
      },
      {
        nombre: "Carlos",
        apellido: "Fernández",
        edad: 33,
        dni: "26935670",
        curso: "3B",
        nota: 2,
      },
      {
        nombre: "Fabio",
        apellido: "Pieres",
        edad: 39,
        dni: "4315388",
        curso: "1B",
        nota: 9,
      },
      {
        nombre: "Daniel",
        apellido: "Gallo",
        edad: 25,
        dni: "37923460",
        curso: "3B",
        nota: 2,
      },
    ];
    // guardar los estudiantes
    let resultado = await studentModel.insertMany(newStudents);
    // console.log(resultado);
    // guardar 1 solo documento
    /*let result = await studentModel.create({});
    console.log(result);*/
    // read de la colección estudiantes
    let students = await studentModel.find().sort({ nombre: 1 });
    // console.log(students);
    // obtener el estudiante más joven
    let younger = await studentModel
      .find({}, { nombre: 1, edad: 1, _id: 0 })
      .sort({ edad: 1 })
      .limit(1);
    // console.log(younger);
    let students2A = await studentModel.find(
      { curso: "2A" },
      { nombre: 1, curso: 1, _id: 0 }
    );
    // console.log(students2A);
    // El 2do alumno más joven
    let younger2 = await studentModel
      .find({}, { nombre: 1, edad: 1, _id: 0 })
      .sort({ edad: 1 })
      .limit(1)
      .skip(1);
    // console.log(younger2);
    // Estudiantes que sacaron 10
    let nota10 = await studentModel.find(
      { nota: 10 },
      { nombre: 1, nota: 1, _id: 0 }
    );
    // console.log(nota10);
    // El promedio de notas del total de los alumnos
    // agregación - puedo crear grupos y agruparlos de acuerdo a cierta característica
    let promedioNotas = await studentModel.aggregate([
      // agrupar a todos los estudiantes en 1 solo grupo
      {
        $group: {
          // defino las propiedades de cada grupo
          _id: "todos",
          promedio: { $avg: "$nota" },
        },
      },
    ]);
    // console.log(promedioNotas);
    // Promedio de notas de los estudiantes de 1A
    const promedio1A = await studentModel.aggregate([
      // agrupar a todos los estudiantes en 1 solo grupo
      {
        $group: {
          // defino las propiedades de cada grupo
          _id: "$curso",
          promedio: { $avg: "$nota" },
        },
      },
      // filtrar el grupo donde el curso es 1A
      {
        $match: {
          _id: "1A",
        },
      },
    ]);
    // console.log(promedio1A);
    // actualizar dni de Lucas Blanco
    let studentUpdate = await studentModel.updateOne(
      {
        nombre: "Lucas",
        apellido: "Blanco",
      },
      { $set: { dni: "20355688" } }
    );
    //console.log(studentUpdate);
    // Agregar un campo ingreso a todos los documentos
    let result = await studentModel.updateMany(
      {},
      { $set: { ingreso: false } }
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
operacionesCrud();
