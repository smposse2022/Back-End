import admin from "firebase-admin";
import { readFileSync } from "fs";
// generar llave para poder conectarnos de manera segura a nuestra app de Firebase
// Vinculamos esa clave con nuestro serv principal
const serviceAccount = JSON.parse(readFileSync("./fireBaseKey.json"));
console.log(serviceAccount);

// Inicializamos Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://coderbackend-818d2.firebaseio.com",
});
console.log("Base conectada");

const operacionesCrud = async () => {
  // generar una instancia de la base de datos
  const db = admin.firestore();
  // definir la colección con la que vamos a trabajar
  const userCollection = db.collection("usuarios");
  // guardar un documento en la colección de usuarios
  const doc = userCollection.doc();
  /*await doc.create({ nombre: "Juan", edad: 28 });
  console.log("user created");
  // guardar varios documentos - batch
  let batch = db.batch();
  const usuarios = [
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
  ];
  usuarios.forEach((usuario) => {
    const docRef = db.collection("usuarios").doc(); // creamos una instancia del documento que vamos a guardar
    batch.set(docRef, usuario);
  });
  await batch.commit(); // ejecutamos el batch
  // Read
  let response = await userCollection.get();
  let docs = response.docs; //los documentos de la coleccion users.
  let users = docs.map((doc) => ({
    id: doc.id,
    nombre: doc.data().nombre,
    apellido: doc.data().edad,
  }));
  console.log(users);
  // update
  const docId = "j8Tidp3e7mV9n31mM2Rl";
  const docRef = db.collection("usuarios").doc(docId);
  await docRef.update({ edad: 23 });*/
  // delete
  const docId = "j8Tidp3e7mV9n31mM2Rl";
  const docRef = db.collection("usuarios").doc(docId);
  await docRef.delete();
};
operacionesCrud();
