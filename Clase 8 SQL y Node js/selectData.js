import { options } from "./options/mySqulConfig.js";
import knex from "knex";

const database = knex(options);

// SELECT * FROM cars
database
  .from("cars")
  .select("*")
  .then((result) => {
    const coches = result.map((element) => ({ ...element }));
    console.log(coches);
  })
  .catch((err) => console.log(err))
  .finally(() => database.destroy());

// Select con filtros
// SELECT * FROM cars WHERE price>2000
database
  .from("cars")
  .select("*")
  .where("price", ">", 2000)
  .then((result) => {
    const coches = result.map((element) => ({ ...element }));
    console.log(coches);
  })
  .catch((err) => console.log(err))
  .finally(() => database.destroy());
