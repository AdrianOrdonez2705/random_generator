document.getElementById('hamburger-menu').addEventListener("click", function () {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('open');
});

let inputNMH = document.getElementById('inputNMH');

let calcular = document.getElementById('calcular');
let limpiar = document.getElementById('limpiar');

let resultados1 = document.getElementById('resultados1');
let calculations = document.getElementById('calculations');

limpiar.addEventListener("click", () => {
    inputNMH.value = '';
    calculations.innerHTML = '';
    resultados1.innerHTML = '';
});

calcular.addEventListener("click", () => {
    try {
        calculations.innerHTML = '';
        resultados1.innerHTML = '';

        let nmh = parseFloat(inputNMH.value);

        if (!esEntero(nmh)) {
            throw new Error("el valor de nmh debe ser un número entero");
        }

        if(isNaN(nmh) || nmh < 0) {
            throw new Error("Entrada inválida");
        }

        const cabecera = `
            <tr>
                <td>Contador</td>
                <td>rLCLIE</td>
                <td>TARTV</td>
                <td>GNETA</td>
            </tr>
        `;

        calculations.innerHTML += cabecera;

        simularTienda(nmh);
    } catch (e) {
        const error = `
            <tr>
                <td colspan="6">Error: ${e.message}</td>
            </tr>
        `;
        calculations.innerHTML += error;
    }
});

function esEntero(num) {
    return Number.isInteger(num);
}

function simularTienda(nmh) {

    let CH = 0;

    let CVA = 50;
    let PVU = 75;
    let CFD = 300;
    let rLCLIE = 0;
    let LCLIE = 0;
    let ARTVC = 0;
    let rARTVC = 0;
    let TARTV = 0;
    let GNETA = 0;

    while (CH < nmh) {

        CH = CH + 1;
        rLCLIE = Math.random();
        LCLIE = Math.round(4 * rLCLIE);

        if (LCLIE !== 0) {
            while (LCLIE > 0) {
                rARTVC = Math.random();
                if (rARTVC >= 0 && rARTVC <= 0.2) {
                    ARTVC = 0;
                } else if (rARTVC > 0.2 && rARTVC <= 0.5) {
                    ARTVC = 1;
                } else if (rARTVC > 0.5 && rARTVC <= 0.9) {
                    ARTVC = 2;
                } else {
                    ARTVC = 3;
                }

                TARTV = TARTV + ARTVC;
                GNETA = TARTV * (PVU - CVA) - CFD;
                LCLIE = LCLIE - 1;
            }
        }

        const data = `
            <tr>
                <td>${CH}</td>
                <td>${rLCLIE.toFixed(2)}</td>
                <td>${TARTV}</td>
                <td>Bs. ${GNETA}</td>
            </tr>
        `;

        calculations.innerHTML += data;
    }

    const result = `
        <p>
            En ${nmh} horas, la ganancia neta es Bs. ${GNETA} y
            el total de artículos vendidos es de ${TARTV} artículos.
        </p> 
    `;

    resultados1.innerHTML += result;
}