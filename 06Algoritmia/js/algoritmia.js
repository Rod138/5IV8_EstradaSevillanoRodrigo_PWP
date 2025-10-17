//Problema 1
function validar1(e) {
    var tecla = e.keyCode || e.which;
    var caracter = String.fromCharCode(tecla);
    var patron = /^[A-Za-z ]$/;

    if (tecla === 8) return true;

    if (!patron.test(caracter)) {
        e.preventDefault();
        return false;
    }
    return true;
}
function problema1() {
    var p1input = document.getElementById("p1-input").value;
    var arreglo = (p1input.split(" ")).reverse();
    if (arreglo.length < 2 || p1input === "") {
        alert("Debe ingresar dos o mas palabras")
        return;
    }
    var p1output = "";
    for (var i = 0; i < arreglo.length; i++) {
        if (arreglo[i] === "") {
            alert("Debe ingresar mínimo dos palabras con un solo espacio entre ellas")
            return;
        }
        p1output = p1output + arreglo[i] + " ";
    }
    document.getElementById("p1-output").innerHTML = p1output;
}
function borrar1() {
    document.getElementById("p1-input").value = "";
    document.getElementById("p1-output").innerHTML = "Esperando datos...";
}

//Problema 2
function validar2(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\d .]/;

    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}
function problema2() {
    //Profe
    // Primero necesitamos los valores
    var p2_x1 = document.querySelector("#p2_x1").value;
    var p2_x2 = document.querySelector("#p2_x2").value;
    var p2_x3 = document.querySelector("#p2_x3").value;
    var p2_x4 = document.querySelector("#p2_x4").value;
    var p2_x5 = document.querySelector("#p2_x5").value;

    var p2_y1 = document.querySelector("#p2_x1").value;
    var p2_y2 = document.querySelector("#p2_y2").value;
    var p2_y3 = document.querySelector("#p2_y3").value;
    var p2_y4 = document.querySelector("#p2_y4").value;
    var p2_y5 = document.querySelector("#p2_y5").value;

    //Creamos los vectores
    var v1 = [p2_x1, p2_x2, p2_x3, p2_x4, p2_x5];
    var v2 = [p2_y1, p2_y2, p2_y3, p2_y4, p2_y5];

    v1 = v1.sort(function (a, b) { return b - a });
    v2 = v2.sort(function (a, b) { return b - a });

    v2 = v2.reverse();

    var p2_producto = 0;
    for (var i = 0; i < v1.length; i++) {
        p2_producto += v1[i] * v2[i];
    }

    document.querySelector("#p2_resultado").textContent = "El producto escalar mínimo es: " + p2_producto;
}
function borrar2() {
    document.querySelector("#p2_resultado").textContent = "";
    document.querySelector("#p2_x3").textContent = "";
    document.querySelector("#p2_x2").textContent = "";
    document.querySelector("#p2_x1").textContent = "";
    document.querySelector("#p2_x4").textContent = "";
    document.querySelector("#p2_x5").textContent = "";

    document.querySelector("#p2_x1").textContent = "";
    document.querySelector("#p2_y2").textContent = "";
    document.querySelector("#p2_y3").textContent = "";
    document.querySelector("#p2_y4").textContent = "";
    document.querySelector("#p2_y5").textContent = "";
}

//Problema 3
function validar3(e) {
    var tecla = e.keyCode || e.which;
    var caracter = String.fromCharCode(tecla);
    var patron = /^[A-Z,]$/;

    if (tecla === 8) return true;

    if (!patron.test(caracter)) {
        e.preventDefault();
        return false;
    }
    return true;
}
function problema3() {
    var p3input = document.getElementById("p3-input").value.trim();

    if (p3input === "") {
        alert("Debe ingresar dos o más palabras separadas por coma");
        return;
    }
    var arreglo = p3input.split(",");
    if (arreglo.length < 2) {
        alert("Debe ingresar al menos dos palabras separadas por una coma");
        return;
    }
    for (var palabra of arreglo) {
        if (palabra === "") {
            alert("No debe haber comas seguidas o al final");
            return;
        }
    }
    var mayorUnicos = 0;
    var palabraMayor = "";
    for (var palabra of arreglo) {
        var letras = palabra.split("");
        var unicos = new Set(letras);
        var cantidad = unicos.size;

        if (cantidad > mayorUnicos) {
            mayorUnicos = cantidad;
            palabraMayor = palabra;
        }
        else if (cantidad === mayorUnicos) {
            palabraMayor = palabraMayor + ", " + palabra
        }
    }
    document.getElementById("p3-output").innerHTML = `La/s palabra/s con más caracteres únicos es/son "${palabraMayor}" con ${mayorUnicos} caracteres únicos.`;
}
function borrar3() {
    document.getElementById("p3-input").value = "";
    document.getElementById("p3-output").innerHTML = "Esperando datos...";
}