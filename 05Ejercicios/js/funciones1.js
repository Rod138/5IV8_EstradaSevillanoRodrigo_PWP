function validarn(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\d .]/;

    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

// Ejercicio 1
//Función para calcular el interés y delimitar el número de decimales
function interes() {
    var valor = document.getElementById("cantidadi").value;
    var parseo = parseFloat(valor);
    if (!Number.isNaN(parseo)) {
        var interes = parseo * 0.085;
        var total = (interes + parseo).toFixed(2);
        document.getElementById("saldoi").value = "$" + total;
    }
    else {
        alert("Debe ingresar un número")
    }
}
function borrari() {
    document.getElementById("cantidadi").value = "";
    document.getElementById("saldoi").value = "";
}

// Ejercicio 2
function comisiones() {
    var sueldoBase = parseFloat(document.getElementById("sueldoBase").value);
    var venta1 = parseFloat(document.getElementById("venta1").value);
    var venta2 = parseFloat(document.getElementById("venta2").value);
    var venta3 = parseFloat(document.getElementById("venta3").value);

    if (Number.isNaN(sueldoBase) || Number.isNaN(venta1) || Number.isNaN(venta2) || Number.isNaN(venta3)) {
        alert("Debe ingresar números en todos los campos")
        return;
    }
    if (sueldoBase < 8364) {
        alert("Debe ingresar un sueldo mayor al mínimo ($8,364)");
        return;
    }
    var comision = (venta1 + venta2 + venta3) * 0.10;
    var total = (sueldoBase + comision).toFixed(2);
    document.getElementById("comisionTotal").value = "$" + comision;
    document.getElementById("totalMensual").value = "$" + total;
}
function borrarc() {
    document.getElementById("sueldoBase").value = "";
    document.getElementById("venta1").value = "";
    document.getElementById("venta2").value = "";
    document.getElementById("venta3").value = "";
    document.getElementById("comisionTotal").value = "";
    document.getElementById("totalMensual").value = "";
}

// Ejercicio 3
function cDescuento() {
    var totalCompra = parseFloat(document.getElementById("totalCompra").value);
    if (Number.isNaN(totalCompra)) {
        alert("Debe ingresar un número en el campo de 'Total de la compra'");
        return;
    }
    var descuento = (totalCompra * 0.15).toFixed(2);
    var totalPagar = (totalCompra - descuento).toFixed(2);
    document.getElementById("descuento").value = "$" + descuento;
    document.getElementById("totalPagar").value = "$" + totalPagar;
}
function borrard() {
    document.getElementById("totalCompra").value = "";
    document.getElementById("descuento").value = "";
    document.getElementById("totalPagar").value = "";
}

// Ejercicio 4
function cCalificacion() {
    var parcial1 = parseFloat(document.getElementById("parcial1").value);
    var parcial2 = parseFloat(document.getElementById("parcial2").value);
    var parcial3 = parseFloat(document.getElementById("parcial3").value);
    var examenFinal = parseFloat(document.getElementById("examenFinal").value);
    var trabajoFinal = parseFloat(document.getElementById("trabajoFinal").value);
    if (Number.isNaN(parcial1) || Number.isNaN(parcial2) || Number.isNaN(parcial3) || Number.isNaN(examenFinal) || Number.isNaN(trabajoFinal)) {
        alert("Debe ingresar números en todos los campos");
        return;
    }
    if (parcial1 > 10 || parcial2 > 10 || parcial3 > 10 || examenFinal > 10 || trabajoFinal > 10) {
        alert("Las calificaciones deben ser del 0 al 10");
        return;
    }
    var promedioParciales = ((parcial1 + parcial2 + parcial3) / 3).toFixed(2);
    var calificacionFinal = ((promedioParciales * 0.55) + (examenFinal * 0.3) + (trabajoFinal * 0.15)).toFixed(2);
    document.getElementById("promedioParciales").value = "$" + promedioParciales;
    document.getElementById("calificacionFinal").value = "$" + calificacionFinal;
}
function borrarcalf() {
    document.getElementById("parcial1").value = "";
    document.getElementById("parcial2").value = "";
    document.getElementById("parcial3").value = "";
    document.getElementById("examenFinal").value = "";
    document.getElementById("trabajoFinal").value = "";
    document.getElementById("promedioParciales").value = "";
    document.getElementById("calificacionFinal").value = "";
}

// Ejercicio 5
function validarnP(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\d]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}
function porcentaje() {
    var numHombres = parseInt(document.getElementById("numHombres").value);
    var numMujeres = parseInt(document.getElementById("numMujeres").value);
    if (Number.isNaN(numHombres) || Number.isNaN(numMujeres)) {
        alert("Debe ingresar números enteros");
        return;
    }
    var total = numHombres + numMujeres;
    var porcentajeHombres = (100 * numHombres / total).toFixed(2);
    var porcentajeMujeres = (100 * numMujeres / total).toFixed(2);
    document.getElementById("porcentajeHombres").value = porcentajeHombres + "%";
    document.getElementById("porcentajeMujeres").value = porcentajeMujeres + "%";
}
function borrarp() {
    document.getElementById("numHombres").value = "";
    document.getElementById("numMujeres").value = "";
    document.getElementById("porcentajeHombres").value = "";
    document.getElementById("porcentajeMujeres").value = "";
}

// Ejercicio 6
function calcularEdad() {
    var fechaNacimiento = new Date(document.getElementById("fechaNacimiento").value);
    if (!fechaNacimiento.getTime()) return;

    var hoy = new Date();
    var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    var mesDiff = hoy.getMonth() - fechaNacimiento.getMonth();
    var diaDiff = hoy.getDate() - fechaNacimiento.getDate();

    if (fechaNacimiento > hoy) {
        alert("Debe ingresar una fecha anterior a hoy");
        return;
    }

    if (mesDiff < 0 || (mesDiff === 0 && diaDiff < 0)) {
        edad--;
    }
    document.getElementById("edad").value = edad + " años";
}
function borrare() {
    document.getElementById("fechaNacimiento").value = "";
    document.getElementById("edad").value = "";
}