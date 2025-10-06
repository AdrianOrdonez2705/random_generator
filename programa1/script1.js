document.getElementById('hamburger-menu').addEventListener("click", function () {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('open');
});

let inputT = document.getElementById('inputT');
let inputK = document.getElementById('inputK');
let inputi = document.getElementById('inputi');

let calcular = document.getElementById('calcular');
let limpiar = document.getElementById('limpiar');

let resultados1 = document.getElementById('resultados1');
let calculations = document.getElementById('calculations');

limpiar.addEventListener("click", () => {
    inputT.value = '';
    inputK.value = '';
    inputi.value = '';
    calculations.innerHTML = '';
    resultados1.innerHTML = '';
});

calcular.addEventListener("click", () => {
    try {
        calculations.innerHTML = '';
        resultados1.innerHTML = '';

        let T = parseFloat(inputT.value);
        let K = parseFloat(inputK.value);
        const i = parseFloat(inputi.value);

        if (!esDecimal(i)) {
            throw new Error("La tasa de interés debe ser un número entre 0 y 1.");
        }

        if (!esEntero(T)) {
            throw new Error("El tiempo en años debe ser entero");
        }

        const cabecera = `
            <tr>
                <td>Contador</td>
                <td>Interés anual</td>
                <td>Capital</td>
            </tr>
        `;

        calculations.innerHTML += cabecera;

        calcularPlazoFijo(T, K, i);
    } catch (e) {
        const error = `
            <tr>
                <td colspan="4">Error: ${e.message}</td>
            </tr>
        `;
        calculations.innerHTML += error;
    }
});

function esEntero(num) {
    return Number.isInteger(num);
}

function esDecimal(num) {
    return (num > 0 && num < 1);
}

function calcularPlazoFijo(T, K, i) {
    let I = 0;
    let C = 0;

    while (C < T) {
        C = C + 1;
        I = K * i;
        K = K + I;

        const data = `
            <tr>
                <td>${C}</td>
                <td>${I.toFixed(2)}</td>
                <td>${K.toFixed(2)}</td>
            </tr>
        `;

        calculations.innerHTML += data;
    }

    const result = `
        <p>El capital luego de ${T} años es $us ${K.toFixed(2)}</p>
    `;

    resultados1.innerHTML += result;
}