function calcular() {
    try {
        pantallaString = pantalla.textContent;
        const resultado = eval(pantallaString);
        if (resultado === Infinity || Number.isNaN(resultado)) {
            pantalla.textContent = "Error";
        } else {
            let resultadoLimiteCaracteres = resultado.toString().slice(0, 9); // limita el resultado a 9 caracteres
            pantalla.textContent = resultadoLimiteCaracteres;
        }
    } catch (error) {
        console.error("ERROR: ", error);
        pantalla.textContent = "Error";
    }
}

function limpiarPantalla() {
    pantalla.innerHTML = "";
}

function validarNumeroCaracteres(pantallaString) {
    let valido = true;
    if (pantallaString.length > 9) {
        valido = false;
    }
    return valido;
}

function validarCaracter(ultimoCaracter, teclaActual) {
    const simbolos = [".", "+", "-", "*", "/"];
    if (simbolos.includes(ultimoCaracter) && simbolos.includes(teclaActual)) {
        return false;
    }
    return true;
}

let pantallaString = "";
let pantalla = document.getElementById("pantalla");

/* símbolos */
const botonIgual = document.getElementById("boton-igual");

/* especiales */
const botonBorrado = document.getElementById("boton-borrar");

botonIgual.addEventListener("click", () => {
    calcular();
    adecuarTamannoFuente();
});

botonBorrado.addEventListener("click", limpiarPantalla);

const tecla = document.querySelectorAll(".tecla");
for (const t of tecla) {
    t.addEventListener("click", () => {
        restaurarTamannoFuente();
        let ultimo = pantalla.textContent.slice(-1);
        if (validarNumeroCaracteres(pantalla.textContent) && validarCaracter(ultimo, t.textContent)) {
            pantalla.innerHTML += t.textContent;
        } else {
            alert("No se puede añadir dos símbolos seguidos / Se alcanzó el límite de caracteres");
            limpiarPantalla();
        }
    });
}

// adecua el tamaño de la fuente (cuando se muestra el resultado)
function adecuarTamannoFuente() {
    const rootVariables = getComputedStyle(document.documentElement);
    const tamanno = Number.parseFloat(rootVariables.getPropertyValue('--space-5'));

    const tamannoAdecuado = tamanno / 2;

    pantalla.style.fontSize = tamannoAdecuado + "rem";
}

// resetea el tamaño de la fuente (cuando se vuelve a teclear)
function restaurarTamannoFuente() {
    const rootVariables = getComputedStyle(document.documentElement);
    const tamanno = Number.parseFloat(rootVariables.getPropertyValue('--space-5'));

    pantalla.style.fontSize = tamanno + "rem";
}

