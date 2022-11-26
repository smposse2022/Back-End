import { faker } from "@faker-js/faker";
const { datatype } = faker;
class ContenedorMemoria {
  constructor() {
    this.users = [];
  }

  getAll() {
    return this.users;
  }

  save(newUser) {
    newUser.id = datatype.uuid();
    this.users.push(newUser);
    return newUser;
  }

  deleteById(id) {
    let index = this.users.findIndex((obj) => obj.id == id);
    this.users.splice(index, 1);
    return `Usuario con id ${id} eliminado`;
  }
}

export { ContenedorMemoria };
