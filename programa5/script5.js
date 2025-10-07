document.getElementById('hamburger-menu').addEventListener("click", function () {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('open');
});

let inputNMD = document.getElementById('inputNMD');

let calcular = document.getElementById('calcular');
let limpiar = document.getElementById('limpiar');

let resultados1 = document.getElementById('resultados1');
let calculations = document.getElementById('calculations');

limpiar.addEventListener("click", () => {
    inputNMD.value = '';
    calculations.innerHTML = '';
    resultados1.innerHTML = '';
});

calcular.addEventListener("click", () => {
    try {
        calculations.innerHTML = '';
        resultados1.innerHTML = '';

        let nmd = parseFloat(inputNMD.value);

        if (!esEntero(nmd)) {
            throw new Error("el valor de nmd debe ser un número entero");
        }

        if (isNaN(nmd) || nmd < 0) {
            throw new Error("Entrada inválida");
        }

        const cabecera = `
            <tr>
                <td>Contador</td>
                <td>rNHPG</td>
                <td>THR</td>
                <td>TPS</td>
                <td>TH</td>
            </tr>
        `;

        calculations.innerHTML += cabecera;

        simularGranja(nmd);
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

function simularGranja(nmd) {
    
    let pvuh = 1.5;
    let pvup = 5;
    
    let cd = 0;
    let thr = 0;
    let th = 0;
    let tps = 0;

    let gnt = 0;
    let ipd = 0;

    let rnhpg = 0;
    let nhpg = 0;
    let reh = 0;
    let rep = 0;

    while (cd < nmd) {

        cd = cd + 1;
        rnhpg = Math.random();

        if (rnhpg >= 0.0 && rnhpg <= 0.37) {
            nhpg = 0;
        } else if (rnhpg > 0.37 && rnhpg <= 0.74) {
            nhpg = 1;
        } else if (rnhpg > 0.74 && rnhpg <= 0.92) {
            nhpg = 2;
        } else if (rnhpg > 0.92 && rnhpg <= 0.98) {
            nhpg = 3;
        } else {
            nhpg = 4;
        }

        while (nhpg > 0) {
            reh = Math.random();

            if (reh >= 0 && reh <= 0.2) {
                thr = thr + 1;
            } else if (reh > 0.2 && reh <= 0.5) {
                rep = Math.random();
                if (rep > 0.2) {
                    tps = tps + 1;
                }
            } else {
                th = th + 1;
            }
            nhpg = nhpg - 1;
        }

        const data = `
            <tr>
                <td>${cd}</td>
                <td>${rnhpg.toFixed(2)}</td>
                <td>${thr}</td>
                <td>${tps}</td>
                <td>${th}</td>
            </tr>
        `;

        calculations.innerHTML += data;
    }

    gnt = (th*pvuh) + (tps*pvup);
    ipd = gnt / nmd;

    const result = `
        <p>
            En ${cd} días:
        </p>
        <p>
            Total Huevos Rotos: ${thr}
        </p> 
        <p>
            Total Huevos: ${th}
        </p> 
        <p>
            Total Pollos que Sobreviven: ${tps}
        </p> 
        <p>
            Ganancia Neta Total: Bs. ${gnt.toFixed(2)}
        </p> 
        <p>
            Ingreso Promedio Diario: Bs. ${ipd.toFixed(2)}
        </p> 
    `;

    resultados1.innerHTML += result;
}