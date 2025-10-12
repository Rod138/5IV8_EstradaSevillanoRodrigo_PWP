// Ejercicio 1
function validarn(e){
    var teclado = (document.all)? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\d .]/;

    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}
//Función para calcular el interés
//Delimitar el número de decimales
function interes(){
    var valor = document.getElementById("cantidadi").value;

    var parseo = parseFloat(valor);
    alert(parseo)
    var interes = parseo*0.085; //Límite a 2 decimales
    alert(interes)
    var total = interes + parseo;
    alert(total)
    document.getElementById("saldoi").value = "$ " + total; //Límite a 2 decimales
}
function borrari(){
    document.getElementById("cantidadi").value = "";
    document.getElementById("saldoi").value = "";
}

// Ejercicio 2

// Ejercicio 3

// Ejercicio 4

// Ejercicio 5

// Ejercicio 6