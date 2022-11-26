import { normalize, schema, denormalize } from "normalizr";

const empresa = {
  id: "1000",
  nombre: "Coderhouse",
  gerente: {
    id: "2",
    nombre: "Pedro",
    apellido: "Mei",
    DNI: "20442639",
    direccion: "CABA 457",
    telefono: "1567811544",
  },
  encargado: {
    id: "3",
    nombre: "Pablo",
    apellido: "Blanco",
    DNI: "20442640",
    direccion: "CABA 458",
    telefono: "1567811545",
  },
  empleados: [
    {
      id: "1",
      nombre: "Nicole",
      apellido: "Gonzalez",
      DNI: "20442638",
      direccion: "CABA 456",
      telefono: "1567811543",
    },
    {
      id: "2",
      nombre: "Pedro",
      apellido: "Mei",
      DNI: "20442639",
      direccion: "CABA 457",
      telefono: "1567811544",
    },
    {
      id: "3",
      nombre: "Pablo",
      apellido: "Blanco",
      DNI: "20442640",
      direccion: "CABA 458",
      telefono: "1567811545",
    },
    {
      id: "4",
      nombre: "Ana",
      apellido: "Rojo",
      DNI: "20442641",
      direccion: "CABA 459",
      telefono: "1567811546",
    },
    {
      id: "5",
      nombre: "Lucia",
      apellido: "Sorbo",
      DNI: "20442642",
      direccion: "CABA 460",
      telefono: "1567811547",
    },
    {
      id: "6",
      nombre: "Jose",
      apellido: "Pieres",
      DNI: "20442643",
      direccion: "CABA 461",
      telefono: "1567811548",
    },
    {
      id: "7",
      nombre: "Maria",
      apellido: "Lopez",
      DNI: "20442644",
      direccion: "CABA 462",
      telefono: "1567811549",
    },
  ],
};

// Definir esquemas para normalizar - buscamos el esquema con la mayor anidación
// Vamos a hacer el esquema para empleados
const employeeSchema = new schema.Entity("employees"); // como segundo parámetro se le pasa el 2do schema en su interior, si lo tiene

const companySchema = new schema.Entity("companies", {
  gerente: employeeSchema,
  encargado: employeeSchema,
  empleados: [employeeSchema],
});

// aplicamos normalizacion
// 1er parámetro es la data que quiero normalizar, el objeto original
// 2do parámetro es el esquema más global, el más grande
const normalizedData = normalize(empresa, companySchema);
console.log(JSON.stringify(normalizedData, null, "\t"));

// como el frontend obtiene esa info
// 1er parámetro se pasa el result
// 2do parámetro es el schema más global
// 3er indicar los grupos que armé para armar la normalización
const normalData = denormalize(
  normalizedData.result,
  companySchema,
  normalizedData.entities
);
console.log(JSON.stringify(normalData, null, "\t"));
