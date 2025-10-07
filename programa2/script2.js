document.getElementById('hamburger-menu').addEventListener("click", function () {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('open');
});

let inputNMAX = document.getElementById('inputNMAX');

let calcular = document.getElementById('calcular');
let limpiar = document.getElementById('limpiar');

let resultados1 = document.getElementById('resultados1');
let calculations = document.getElementById('calculations');

limpiar.addEventListener("click", () => {
    inputNMAX.value = '';
    calculations.innerHTML = '';
    resultados1.innerHTML = '';
});

calcular.addEventListener("click", () => {
    try {
        calculations.innerHTML = '';
        resultados1.innerHTML = '';

        let nmax = parseFloat(inputNMAX.value);

        if (!esEntero(nmax)) {
            throw new Error("el valor de nmax debe ser un número entero");
        }

        if (isNaN(nmax) || nmax < 0) {
            throw new Error("Entrada inválida");
        }

        const cabecera = `
            <tr>
                <td>Contador</td>
                <td>XC1</td>
                <td>XC2</td>
                <td>XC3</td>
                <td>ZC</td>
                <td>X1</td>
                <td>X2</td>
                <td>X3</td>
                <td>Z</td>
            </tr>
        `;

        calculations.innerHTML += cabecera;

        simularMaximo(nmax);
    } catch (e) {
        const error = `
            <tr>
                <td colspan="9">Error: ${e.message}</td>
            </tr>
        `;
        calculations.innerHTML += error;
    }
});

function esEntero(num) {
    return Number.isInteger(num);
}

function simularMaximo(nmax) {

    let C = 0;
    let Z = 0;

    let X1 = 0;
    let X2 = 0;
    let X3 = 0;

    let XC1 = 0;
    let XC2 = 0;
    let XC3 = 0;
    let ZC = 0;

    let rxc1 = 0;
    let rxc2 = 0;
    let rxc3 = 0;

    while (C < nmax) {

        C = C + 1;
        rxc1 = Math.random();
        XC1 = 10 * rxc1;
        rxc2 = Math.random();
        XC2 = Math.round(100 * rxc2);

        if (XC1 + XC2 >= 2) {
            rxc3 = Math.random();
            XC3 = 1 + rxc3;
            ZC = (2 * XC1) + (3 * XC2) - XC3;
            if (ZC > Z) {
                Z = ZC;
                X1 = XC1;
                X2 = XC2;
                X3 = XC3;
            }
        }


        const data = `
            <tr>
                <td>${C}</td>
                <td>${XC1.toFixed(2)}</td>
                <td>${XC2}</td>
                <td>${XC3.toFixed(2)}</td>
                <td>${ZC.toFixed(2)}</td>
                <td>${X1.toFixed(2)}</td>
                <td>${X2}</td>
                <td>${X3.toFixed(2)}</td>
                <td>${Z.toFixed(2)}</td>
            </tr>
        `;

        calculations.innerHTML += data;
    }

    const result = `
        <p>En ${nmax} iteraciones, Z máximo es ${Z.toFixed(2)}</p> 
    `;

    resultados1.innerHTML += result;
}