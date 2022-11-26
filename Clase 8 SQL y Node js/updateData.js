import { options } from "./options/mySqulConfig.js";
import knex from "knex";

const database = knex(options);

database
  .from("cars")
  .where("id", "=", 5)
  .update({ price: 2000 })
  .then(() => console.log("registro actualizado"))
  .catch((err) => console.log(err))
  .finally(() => database.destroy());
