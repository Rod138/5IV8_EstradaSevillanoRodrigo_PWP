/*
JS maneja variables del siguiente modo:

var -> una variable de acceso local y global dependiendo de donde se declare
let -> es una variable "protegida", solo se puede hacer uso dentro de la funcion o bloque donde se declara
const -> es una variable que no puede cambiar su valor, es constante

var x = "hola";

if (true) {
    let x = "habia una vez";
    console.log(x);
}

//Como usamos las funciones
function suma(n1, n2) {
    return n1 + n2;
}

console.log(`Esta suma es de: ${suma(5, 3)}`);



//Las funciones flecha, nos ayudan a poder realizar operaciones de una forma mucho mas sencilla, de acuerdo a la siguiente estructura
//"cadena" -> id, clase, metodo, nombre, atributo
const suma = (n1,n2) => n1 + n2;

console.log(`Esta suma es de: ${suma(5,3)}`);

*/
const razasDePerros = [
    "Pastor aleman",
    "Labrador retriever",
    "Bulldog frances",
    "Beagle",
    "Chihuahua",
    "Dalmata",
    "Salchicha",
    "Pug"
];
/*
for(let i = 0; i< razasDePerros.length; i++){
    console.log(razasDePerros[i]);
}

//for of
for(const raza of razaDepPerros){
    console.log(raza);
}

//for in
for(const indice in razasDePerros){
    console.log(razasDePerros[indice]);
}


//for each itera sobre los elementos del arreglo y no devuelve nada
//todos los forEah son funciones flecha por defecto
razasDePerros.forEach(raza => console.log(raza));
//la estructura general del forEach es la siguiente
// argumento.forEach((raza, indice, arregloOriginal) => {codigo a ejecutar})
razasDePerros.forEach((raza, indice, razaDepPerros) => console.log(raza));


// funcion map => iterar sobre los elementos del arreglo y regresa un arreglo diferente con el cual podemos jugar
const razaDepPerrosMayusculas = razasDePerros.map(raza => raza.toUpperCase());
console.log(razaDepPerrosMayusculas);

//Find -> nos permite realizar una busqueda de un elemento dentro del arreglo, si lo encuentra, lo retorna, si no manda un "undefined"
if(razasDePerros.find(raza => raza === "Chihuahua")){
    console.log("Se se encontró la raza");
    console.log(razasDePerros);
}else{
    razasDePerros.push("Chihuahua");
    console.log(razasDePerros);
}
*/
//FindIndex -> nos permite realizar una busqyeda de un elemento dentro del arreglo, si lo encuentra, regresa ek indice, sino regresa un -1, esta funcion es particularmente util cuando necesitamos modificar o eliminar de un arreglo original dentro de una copia del mismo
const indiceChihuahua = razasDePerros.findIndex(raza => raza === "Chihuahua");
if(indiceChihuahua > -1){
    //Si se encontro y esta dentro del arreglo
    console.log(razasDePerros[indiceChihuahua])
    //a parte le voy a decir que agregue un texto a este resultado
    razasDePerros[indiceChihuahua] += " (Es una raza de perros chuiquita y chillona)";
    console.log(razasDePerros[indiceChihuahua]);
    console.log(razasDePerros)
}