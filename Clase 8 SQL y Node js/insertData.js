import { options } from "./options/mySqulConfig.js";
import knex from "knex";

const database = knex(options);

// insertar un dato
const coches = [
  { name: "Volvo", price: 2300 },
  { name: "Audi", price: 3000 },
  { name: "Ford", price: 4500 },
  { name: "Mercedez", price: 5000 },
];

database("cars")
  .insert(coches)
  .then(() => console.log("Data agregada"))
  .catch((err) => console.log(err))
  .finally(() => database.destroy());
