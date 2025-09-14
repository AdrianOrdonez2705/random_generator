const notP = document.getElementById("cantidad");
const notXo = document.getElementById("Xo");
const notK = document.getElementById("k");
const notC = document.getElementById("c");

let linear = true;
let uno = true;

let P, Xo, k, c;
let a, g, m;
let algorithm = 'lineal';

const results = document.getElementById("results");
const generar = document.getElementById("generar");
const limpiar = document.getElementById("limpiar");
const algoSubtitle = document.getElementById("algoSubtitle");
const formulas = document.getElementById("formulas");

limpiar.addEventListener('click', () => {
    notP.value = '';
    notXo.value = '';
    notK.value = '';
    notC.value = '';
    results.innerHTML = '';
});

document.querySelectorAll('input[name="algoritmo"]').forEach((radio) => {
    radio.addEventListener('change', () => {
        if (document.getElementById('lineal').checked) {
            algorithm = 'lineal';
            algoSubtitle.textContent = 'Algoritmo Lineal';
            formulas.style.display = 'none';
            linear = true;
            notC.style.display = 'inline-block';
        } else if (document.getElementById('multiplicativo').checked) {
            algorithm = 'multiplicativo';
            algoSubtitle.textContent = 'Algoritmo Multiplicativo';
            formulas.style.display = 'block';
            linear = false;
            notC.style.display = 'none';
        }
    });
});

document.querySelectorAll('input[name="formula"]').forEach((radio) => {
    radio.addEventListener('change', () => {
        if (document.getElementById('uno').checked) {
            algorithm = 'multiplicativo';
            linear = false;
            uno = true;
        } else if (document.getElementById('dos').checked) {
            algorithm = 'multiplicativo';
            linear = false;
            uno = false;
        }
    });
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
        
        if (isNaN(P) || isNaN(Xo) || isNaN(k)) {
            throw new Error("Entrada inválida");
        }

        if ((P < 1) || (Xo < 1) || (k < 1)) {
            throw new Error("Los valores no deben ser negativos");
        }

        if (!esEntero(P) || !esEntero(Xo) || !esEntero(k)) {
            throw new Error("Los valores deben ser números enteros positivos")
        }

        if (linear === true) {
            c = parseFloat(notC.value);
            if (!esPrimo(c) || isNaN(c) || !esEntero(c)) {
                throw new Error("c debe ser primo, positivo y entero");
            }

            a = 1 + (4 * k);
            g = Math.log(P) / Math.log(2);
            m = Math.pow(2, g);
            calculateResultsLinear();
        }

        if (linear === false) {
            if (uno === true) {
                a = 3 + (8 * k);
            } else if (uno === false) {
                a = 5 + (8 * k);
            }

            g = (Math.log(P) / Math.log(2)) + 2;
            m = Math.pow(2, g);
            calculateResultsMultiplicativo();
        }

    } catch (error) {
        const errorMessage = `
            <tr>
                <td colspan="3">Error: ${error.message}</td>
            </tr>
        `;
        results.innerHTML = errorMessage;
    }
});

function calculateResultsLinear() {
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

function calculateResultsMultiplicativo() {
    for (let i = 0; i < P + 1; i++) {
        let x = (a * Xo) % m;
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
