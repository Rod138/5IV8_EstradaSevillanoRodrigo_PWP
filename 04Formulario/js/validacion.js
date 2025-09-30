/*
Javascript es un lenguaje multiparadigma
Acepta la programación Funcional, Estructurada, POO, Evento
Dentro de JS, no existe el tipado de variables

Solo existen 3 tipos de variables de acuerdo al estandar ES6:
VAR, LET, CONST
*/

function validar(formulario) {
    //Campo de nombre
    var checkStr = formulario.nombre.value;
    //Validar mínimo y máximo de carácteres
    if (checkStr.length < 4 || checkStr.length > 40) {
        alert("Por favor escribe mínimo cuatro caracteres y máximo 40 en el campo del nombre");
        formulario.nombre.focus();
        return false;
    }
    //Validar que se ingresen solo letras
    var abcOK = /^[A-Za-zÑñ]+$/;
    if (!abcOK.test(checkStr)) {
        alert("Escribe únicamente letras en el campo del nombre");
        formulario.nombre.focus();
        return false;
    }

    //Campo de edad
    var checkEdad = formulario.edad.value;
    //Validar que se ingresen solo números
    var numOK = /^\d+$/;
    if (!numOK.test(checkEdad)) {
        alert("Escriba únicamente números en el campo edad");
        formulario.edad.focus();
        return false;
    }
    //Validar mínimo y máximo de edad
    if (checkEdad < 0 || checkEdad > 100) {
        alert("Su edad debe ser positiva y menor que 100");
        formulario.edad.focus();
        return false;
    }

    //Campo de email
    var checkEmail = formulario.correo.value;
    //Vamos a crear una función de una expresión regular para validar el correo electrónico: texto.texto@texto.texto
    var emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailOK.test(checkEmail)) {
        alert("Correo electrónico no válido")
        formulario.correo.focus()
        return false;
    }
    return true
}