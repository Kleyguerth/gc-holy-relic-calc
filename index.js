'use strict'

function calc() {
    const cost = parseInt(document.getElementById('custo-incerto').value, 10);
    const probability = parseInt(document.getElementById('chance-sucesso').value, 10) / 100;
    const maxFails = parseInt(document.getElementById('maximo-falhas').value, 10);
    const currentFails = parseInt(document.getElementById('falhas-atuais').value, 10);

    if (isNaN(cost) || isNaN(probability) || isNaN(maxFails) || isNaN(currentFails)) {
        return clear();
    }

    const guarantee = calcGuarantee(cost, probability, currentFails, maxFails);
    const expected = calcExpected(cost, probability, currentFails, maxFails);

    document.getElementById('custo-garantido').textContent = guarantee;
    document.getElementById('esperado-incerto').textContent = expected;
    document.getElementById('melhor-botao').textContent = guarantee > expected ? 'Incerto' : 'Garantido';

    document.getElementById('results').style.display = 'block';
}

function calcGuarantee(cost, probability, currentFails, maxFails) {
    const firstGuarantee = Math.floor(cost / probability);
    const difference = firstGuarantee - cost;
    const reductionPerFail = difference / maxFails;

    return Math.floor(firstGuarantee - (reductionPerFail * currentFails));
}

function calcExpected(c, p, i, n) {
    return Math.round((c * (1 - Math.pow(1 - p, 1+n-i) )) / p);
}

function clear() {
    document.getElementById('results').style.display = 'none';
}

calc();