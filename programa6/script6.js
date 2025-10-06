document.getElementById('hamburger-menu').addEventListener("click", function () {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('open');
});

let inputNMD = document.getElementById('inputNMD');
let inputCBOD = document.getElementById('inputCBOD');

let calcular = document.getElementById('calcular');
let limpiar = document.getElementById('limpiar');

let resultados1 = document.getElementById('resultados1');
let calculations = document.getElementById('calculations');

limpiar.addEventListener("click", () => {
    inputNMD.value = '';
    inputCBOD.value = '';
    calculations.innerHTML = '';
    resultados1.innerHTML = '';
});

calcular.addEventListener("click", () => {
    try {
        calculations.innerHTML = '';
        resultados1.innerHTML = '';

        let nmd = parseFloat(inputNMD.value);
        let cbod = parseFloat(inputCBOD.value);

        if (!esEntero(nmd)) {
            throw new Error("el valor de nmd debe ser entero");
        }

        const cabecera = `
            <tr>
                <td>Contador</td>
                <td>INAZU</td>
                <td>DAZU</td>
                <td>DIT</td>
                <td>CDI</td>
                <td>PAZU</td>
            </tr>
        `;

        calculations.innerHTML += cabecera;

        simularBodega(nmd, cbod);
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

function simularBodega(nmd, cbod) {

    let cord = 100;
    let cui = 0.1;
    let cua = 3.5;
    let pvu = 5;

    let cd = 0;
    let inazu = 700;
    let gnt = 0;
    let dit = 0;
    let ctot = 0;
    let cdi = 0;
    let cta = inazu * cua;
    let cto = 100;
    let ibru = 0;

    let dazu = 0;
    let rdazu = 0;
    let tent = 0;
    let rtent = 0;
    let pazu = 0;

    while (cd < nmd) {
        cd = cd + 1;

        if (tent !== 0) {
            tent = tent - 1;
            if (tent === 0) {
                inazu = inazu + pazu;
                cto = cto + cord;
            }
        }

        if (cd % 7 === 0) {
            pazu = cbod - inazu;
            cta = cta + pazu * cua;
            rtent = Math.random();
            tent = Math.round(1 + (3 - 1) * rtent);
        }

        rdazu = Math.random();
        dazu = Math.round((-100) * Math.log(1 - rdazu));

        if (dazu > inazu) {
            dit = dit + dazu - inazu;
            ibru = ibru + inazu * pvu;
            inazu = 0;
        } else {
            ibru = ibru + dazu * pvu;
            inazu = inazu - dazu;
            cdi = cdi + inazu * cui;
        }

        const data = `
            <tr>
                <td>${cd}</td>
                <td>${inazu}</td>
                <td>${dazu}</td>
                <td>${dit}</td>
                <td>${cdi.toFixed(2)}</td>
                <td>${pazu}</td>
            </tr>
        `;

        calculations.innerHTML += data;
    }

    ctot = cdi + cta + cto;
    gnt = ibru - ctot;

    const result = `
        <p>
            La ganancia neta total es: Bs. ${gnt.toFixed(2)}
        </p>
        <p>
            El costo total es: Bs. ${ctot.toFixed(2)}
        </p>
        <p>
            La demanda insatisfecha total es: ${dit} Kg
        </p>
    `;

    resultados1.innerHTML += result;
}