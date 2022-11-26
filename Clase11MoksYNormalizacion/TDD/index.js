class Calculadora {
  static sumar(a, b) {
    if (!a || !b) return console.log("debes pasar 2 argumentos");
    if (!Number.isInteger(a))
      return console.log("El primer argumento debe ser un número entero");
    if (!Number.isInteger(b))
      return console.log("El segundo argumento debe ser un número entero");
    else {
      const result = a + b;
      console.log(result);
      return result;
    }
  }
}
Calculadora.sumar(24, 70);

// Posibles fallas o posibles validaciones
// que la funcion sumar sea un metodo dentro de una clase
// que el metodo sumar lo pueda llamar sin instanciar la clase
// que el metodo sumar reciba 2 parametros
// que los parametros sean de tipo numérico
// que la suma se realice correctamente
// que la función retorne un valor
