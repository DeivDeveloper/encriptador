function mostrarRespuesta(mostrar) {
    const respuestaEncontrada = document.querySelector(".resultado__encontrado");
    const respuestaNoEncontrada = document.querySelector(
        ".resultado__no__encontrado"
    );
    if (mostrar == true) {
        respuestaNoEncontrada.style.display = "none";
        respuestaEncontrada.style.display = "flex"
        respuestaEncontrada.style.flexDirection = "column";
        respuestaEncontrada.style.justifyContent = "space-between";
        respuestaEncontrada.style.height = "100%";
        respuestaEncontrada.style.width = "85%";
    } else {
        respuestaEncontrada.style.display = "none";
        respuestaNoEncontrada.style.display = "block";
    }
    return;
}

function limpiarCampoTexto() {
    document.querySelector("#campoTexto").value = "";
    return;
}

function verificarReglasMensaje(mensaje) {
    let permisoPermitido = true;
    let permisoDenegado = false;

    let soloMinusculas = /^[a-z\s]*$/;
    let tieneAcentos = /[áéíóúüñ]/;
    let tieneCaracteresEspeciales = /[^a-z\sáéíóúüñ]/i;

    let esMinuscula = soloMinusculas.test(mensaje);
    let contieneAcentos = tieneAcentos.test(mensaje);
    let contieneEspeciales = tieneCaracteresEspeciales.test(mensaje);

    if (
        esMinuscula == false ||
        contieneAcentos == true ||
        contieneEspeciales == true
    ) {
        return permisoDenegado;
    } else {
        return permisoPermitido;
    }
}

function asignarTextoRespuesta(texto) {
    let respuesta = document.querySelector("#respuesta");
    respuesta.textContent = texto;
    return;
}

function habilitarBotonCopiar(permiso) {
    let botonCopiar = document.querySelector(".boton__copiar");
    if (permiso == true) {
        document.getElementById('copiar').removeAttribute('disabled');
    } else {
        document.querySelector('#copiar').setAttribute('disabled', 'true');
    }
}

function mensajeError() {
    asignarTextoRespuesta(
        "Lo siento, el texto no puede contener mayúsculas, caracteres especiales ni acentos. Por favor, inténtalo de nuevo."
    );
    habilitarBotonCopiar(false)
    mostrarRespuesta(true);
}

function mensajeEncriptado(mensaje) {
    let resultado = '';
    for (let i = 0; i < mensaje.length; i++) {
        if (mensaje[i] == "e") {
            resultado += "enter";
        } else if (mensaje[i] == "i") {
            resultado += "imes";
        } else if (mensaje[i] == "a") {
            resultado += "ai";
        } else if (mensaje[i] == "o") {
            resultado += "ober";
        } else if (mensaje[i] == "u") {
            resultado += "ufat";
        } else {
            resultado += mensaje[i];
        }
    }
    return resultado;
}

function encriptar() {
    let resultado = "";
    let mensaje = document.getElementById("campoTexto").value;

    if (mensaje.length == "") {
        mostrarRespuesta(false);
    } else if (verificarReglasMensaje(mensaje) == false) {
        mensajeError();
    } else {
        habilitarBotonCopiar(true);
        resultado = mensajeEncriptado(mensaje);
        asignarTextoRespuesta(resultado);
        mostrarRespuesta(true);
    }
    return;
}

function mensajeDesencriptado(mensaje) {
    mensaje = mensaje.split("enter").join("e");
    mensaje = mensaje.split("imes").join("i");
    mensaje = mensaje.split("ai").join("a");
    mensaje = mensaje.split("ober").join("o");
    mensaje = mensaje.split("ufat").join("u");

    return mensaje;
}

function desencriptar() {
    let resultado = "";
    let mensaje = document.getElementById("campoTexto").value;

    if (mensaje == "") {
        mostrarRespuesta(false);
    } else if (verificarReglasMensaje(mensaje) == false) {
        mensajeError();
    } else {
        habilitarBotonCopiar(true);
        resultado = mensajeDesencriptado(mensaje);
        asignarTextoRespuesta(resultado);
        mostrarRespuesta(true);
    }
    return;
}

function copiar() {
    let url = document.querySelector('#respuesta');
    if (url.disabled == true) {
        return;
    } else {
        navigator.clipboard.writeText(url.textContent);
        return;
    }
}

function condicionesIniciales() {
    limpiarCampoTexto();
    mostrarRespuesta(false);
    return;
}

condicionesIniciales();
