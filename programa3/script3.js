document.getElementById('hamburger-menu').addEventListener("click", function () {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('open');
});

let inputNMJ = document.getElementById('inputNMJ');

let calcular = document.getElementById('calcular');
let limpiar = document.getElementById('limpiar');

let resultados1 = document.getElementById('resultados1');
let calculations = document.getElementById('calculations');

limpiar.addEventListener("click", () => {
    inputNMJ.value = '';
    calculations.innerHTML = '';
    resultados1.innerHTML = '';
});

calcular.addEventListener("click", () => {
    try {
        calculations.innerHTML = '';
        resultados1.innerHTML = '';

        let nmj = parseFloat(inputNMJ.value);

        if (!esEntero(nmj)) {
            throw new Error("el valor de nmj debe ser un número entero");
        }

        if (isNaN(nmj) || nmj < 0) {
            throw new Error("Entrada inválida");
        }

        const cabecera = `
            <tr>
                <td>Contador</td>
                <td>GNETA</td>
                <td>rDADO1</td>
                <td>rDADO2</td>
                <td>DADO1</td>
                <td>DADO2</td>
                <td>SDADOS</td>
                <td>NJCASA</td>
                <td>PJC</td>
            </tr>
        `;

        calculations.innerHTML += cabecera;

        simularDados(nmj);
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

function simularDados(nmj) {

    let CJ = 0;
    let IUJ = 2;
    let CUS7 = 5;

    let GNETA = 0;
    let NJCASA = 0;
    let DADO1 = 0;
    let DADO2 = 0;

    let rDADO1 = 0;
    let rDADO2 = 0;
    let SDADOS = 0;
    let PJC = 0;

    while (CJ < nmj) {

        CJ = CJ + 1;
        GNETA = GNETA + IUJ;
        rDADO1 = Math.random();
        rDADO2 = Math.random();
        DADO1 = Math.round(1 + (5 * rDADO1));
        DADO2 = Math.round(1 + (5 * rDADO2));
        SDADOS = DADO1 + DADO2;

        if (SDADOS === 7) {
            GNETA = GNETA - CUS7;
        } else {
            NJCASA = NJCASA + 1;
        }

        PJC = (NJCASA / nmj) * 100;

        const data = `
            <tr>
                <td>${CJ}</td>
                <td>Bs. ${GNETA}</td>
                <td>${rDADO1.toFixed(2)}</td>
                <td>${rDADO2.toFixed(2)}</td>
                <td>${DADO1}</td>
                <td>${DADO2}</td>
                <td>${SDADOS}</td>
                <td>${NJCASA}</td>
                <td>${PJC.toFixed(2)}%</td>
            </tr>
        `;

        calculations.innerHTML += data;
    }

    const result = `
        <p>
            En ${nmj} juegos, la ganacia neta es Bs. ${GNETA}, 
            el número de juegos que gana la casa es ${NJCASA}
            y el porcentaje de juegos que gana la casa es del 
            ${PJC.toFixed(2)} %
        </p> 
    `;

    resultados1.innerHTML += result;
}