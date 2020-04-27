import { getExchanges } from '../services/exchanges.js';
import { createBar } from '../components/comparationBar.js';
import { createChart } from '../components/valueChart.js';
const currencyOutput = document.querySelector('.output-currencies');
const currencyInput = document.querySelector('.input-currency');
const date = document.querySelector('#date');
let d = new Date();
const monthAux = d.getMonth().length > 1 ? d.getMonth() : '0' + d.getMonth();
const TODAY = `${d.getFullYear()}-${monthAux}-${d.getDate()}`;
date.defaultValue = TODAY;

let bar = createBar();
let chart = createChart();
let historyRates = {};
date.addEventListener('change', setExchanges);
currencyInput.addEventListener('change', setExchanges);

async function setExchanges(e) {
    let exchanges = await getExchanges(date.value, currencyInput.value);
    exchanges = exchanges.rates;
    setBar(exchanges);
    setChart(historyRates, false);
    populateCurrencyOutput(exchanges);
}

export function setBar(exchanges) {
    const labels = [];
    const data = [];
    for (let [key, value] of Object.entries(exchanges)) {
        if (1 / value > 0.1) {
            labels.push(key);
            data.push(1 / value);
        }
    }
    bar.data.labels = labels;
    bar.data.datasets[0].data = data;
    bar.update();
}

export function setChart(exchanges, first = true) {
    if (first) {
        historyRates = exchanges;
    }
    const BASE = currencyInput.value;
    const labels = [];
    const data = [];
    for (let [key, value] of Object.entries(exchanges.rates)) {
        labels.push(key);
        data.push(value[BASE]);
    }
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
}

export function populateCurrencyInput(exchangesRates) {
    currencyInput.innerHTML = '';
    Object.entries(exchangesRates.rates).forEach((currencyName) => {
        var currency = document.createElement('option');
        currency.text = currencyName[0];
        currency.value = currencyName[0];
        if (currency.value == 'USD') {
            currency.selected = true;
        }
        currencyInput.add(currency);
    });
}

export function populateCurrencyOutput(exchanges) {
    currencyOutput.innerHTML = '';
    Object.entries(exchanges).forEach((currencyName) => {
        var currency = document.createElement('li');
        currency.innerText = `${currencyName[0]} : ${currencyName[1]}`;
        currencyOutput.appendChild(currency);
    });
}
