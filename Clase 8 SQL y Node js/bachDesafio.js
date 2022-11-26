import { options } from "./options/mySqulConfig.js"; // Debería crear otro option para otra database, ecommerce
import knex from "knex";

const database = knex(options);

const operationsDb = async () => {
  // validamos si la tabla de datos ya existe en la base de datos
  const tableExists = await database.schema.hasTable("articulos");
  if (tableExists) {
    await database.schema.dropTable("articulos");
  }
  await database.schema.createTable("artículos", (table) => {
    table.increments("id");
    table.string("nombre", 15).nullable(false);
    table.string("código", 15).nullable(false);
    table.float("precio");
    table.integer("stock");
  });

  // insertar articulos
  await database("articulos").insert(articulosArray); // no tengo nada en articulosArray

  // listar la tabla mostrando los resultados en la consola
  const result = await database("articulos").select("*");
  const productos = result.map((elm) => ({ ...elm }));
  console.log(productos);

  database.destroy();

  // borrar el articulo con el id 3
  await database("articulos").where("id", 3).del();
};

operationsDb;
import knex from "knex";

class ContenedorSql {
  Constructor(options, tableName) {
    this.database = knex(options);
    this.table = tableName;
  }
  async gestAll() {
    const result = await this.database("articulos").select("*");
    const productos = result.map((elm) => ({ ...elm }));
    return productos;
  }
}
