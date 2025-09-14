const notP = document.getElementById("cantidad");
const notXo = document.getElementById("Xo");
const notK = document.getElementById("k");
const notC = document.getElementById("c");

let P, Xo, k, c;
let a, g, m;

const results = document.getElementById("results");
const generar = document.getElementById("generar");
const limpiar = document.getElementById("limpiar");

limpiar.addEventListener('click', () => {
    notP.value = '';
    notXo.value = '';
    notK.value = '';
    notC.value = '';
    results.innerHTML = '';
});

generar.addEventListener('click', () => {
    try {
        results.innerHTML = `
            <tr>
                <td>Nº</td>
                <td>Entero</td>
                <td>Número Pseudo-Aleatorio</td>
            </tr>
        `;
        
        P = parseFloat(notP.value);
        Xo = parseFloat(notXo.value);
        k = parseFloat(notK.value);
        c = parseFloat(notC.value);

        if (isNaN(P) || isNaN(Xo) || isNaN(k) || isNaN(c)) {
            throw new Error("Entrada inválida");
        }

        if (!esEntero(P) || !esEntero(Xo) || !esEntero(k) || !esEntero(c)) {
            throw new Error("Los valores deben ser números enteros positivos")
        }

        if (!esPrimo(c)) {
            throw new Error("c debe ser primo");
        }

        a = 1 + (4 * k);
        g = Math.log(P) / Math.log(2);
        m = Math.pow(2, g);

        calculateResults();

    } catch (error) {
        const errorMessage = `
            <tr>
                <td colspan="3">Error: ${error.message}</td>
            </tr>
        `;
        results.innerHTML = errorMessage;
    }
});

function calculateResults() {
    for (let i = 0; i < P + 1; i++) {
        let x = ((a * Xo) + c) % m;
        let r = (x / (m - 1)).toFixed(4);

        const tab = `
            <tr>
                <td>${i + 1}</td>
                <td>${x}</td>
                <td>${r}</td>
            </tr>
        `;

        results.innerHTML += tab;
        Xo = x;
    }
}

function esPrimo(num) {
    if (num <= 1) return false;

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }

    return true;
}

function esEntero(num) {
    return Number.isInteger(num);
}
