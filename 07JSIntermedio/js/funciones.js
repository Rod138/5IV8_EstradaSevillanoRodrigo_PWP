//Ejercicio 1
function ejercicio1() {
    var x1 = parseFloat(document.getElementById("e1-num1").value);
    var x2 = parseFloat(document.getElementById("e1-num2").value);

    if (x1 === x2) {
        document.getElementById("e1-output").innerHTML = "El resultado de " + x1 + " * " + x2 + " es: " + (x1 * x2);
    }
    else if (x1 > x2) {
        document.getElementById("e1-output").innerHTML = "El resultado de " + x1 + " - " + x2 + " es: " + (x1 - x2);
    }
    else {
        document.getElementById("e1-output").innerHTML = "El resultado de " + x1 + " + " + x2 + " es: " + (x1 + x2);
    }
}
function borrarE1() {
    document.getElementById("e1-num1").value = "";
    document.getElementById("e1-num2").value = "";
    document.getElementById("e1-output").innerHTML = "Esperando datos...";
}

//Ejercicio 2
function ejercicio2() {
    var x1 = parseFloat(document.getElementById("e2-num1").value);
    var x2 = parseFloat(document.getElementById("e2-num2").value);
    var x3 = parseFloat(document.getElementById("e2-num3").value);

    if (x1 >= x2 && x1 >= x3) {
        document.getElementById("e2-output").innerHTML = "El número mayor es: " + x1;
    }
    else if (x2 >= x1 && x2 >= x3) {
        document.getElementById("e2-output").innerHTML = "El número mayor es: " + x2;
    }
    else {
        document.getElementById("e2-output").innerHTML = "El número mayor es: " + x3;
    }
}
function borrarE2() {
    document.getElementById("e2-num1").value = "";
    document.getElementById("e2-num2").value = "";
    document.getElementById("e2-num3").value = "";
    document.getElementById("e2-output").innerHTML = "Esperando datos...";
}

//Ejercicio 3
function ejercicio3() {
    var salario = parseFloat(document.getElementById("e3-salario").value);
    var horas = parseFloat(document.getElementById("e3-horas").value);
    var pagoTotal = 0;

    if (horas <= 40) {
        pagoTotal = horas * salario;
        document.getElementById("e3-output").innerHTML = "El pago total es: $" + pagoTotal.toFixed(2) + ". No se hicieron horas extras.";
    }

    if (horas > 40 && horas <= 48) {
        var horasExtra = horas - 40;
        pagoTotal = (40 * salario) + (horasExtra * salario * 2);
        document.getElementById("e3-output").innerHTML = "El pago total es: $" + pagoTotal.toFixed(2) + ". Se hicieron " + horasExtra + " horas extras.";
    }

    if (horas > 48) {
        var horasExtraTriple = horas - 48;
        pagoTotal = (40 * salario) + (8 * salario * 2) + (horasExtraTriple * salario * 3);
        document.getElementById("e3-output").innerHTML = "El pago total es: $" + pagoTotal.toFixed(2) + ". Se hicieron " + (horasExtraTriple + 8) + " horas extras.";
    }
}
function borrarE3() {
    document.getElementById("e3-salario").value = "";
    document.getElementById("e3-horas").value = "";
    document.getElementById("e3-output").innerHTML = "Esperando datos...";
}

//Ejercicio 4
function ejercicio4() {
    var salario = parseFloat(document.getElementById("e4-salario").value);
    var antiguedad = parseInt(document.getElementById("e4-antiguedad").value);
    var utilidad = 0;

    if (antiguedad < 1) {
        utilidad = salario * 0.05;
    }

    if (antiguedad >= 1 && antiguedad < 2) {
        utilidad = salario * 0.07;
    }

    if (antiguedad >= 2 && antiguedad < 5) {
        utilidad = salario * 0.10;
    }

    if (antiguedad >= 5 && antiguedad < 10) {
        utilidad = salario * 0.15;
    }

    if (antiguedad >= 10) {
        utilidad = salario * 0.20;
    }
    document.getElementById("e4-output").innerHTML = "La utilidad que va a recibir es de: $" + utilidad.toFixed(2);
}
function borrarE4() {
    document.getElementById("e4-salario").value = "";
    document.getElementById("e4-antiguedad").value = "";
    document.getElementById("e4-output").innerHTML = "Esperando datos...";
}