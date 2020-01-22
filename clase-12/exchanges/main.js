const currencyOutput = document.querySelector(".output-currencies");
const currencyInput = document.querySelector(".input-currency");
const date = document.querySelector("#date");
let exchanges = {};

date.addEventListener("click", () => {
    console.log("ASD");
    getExchanges(date.value, currencyInput.value);
});

currencyInput.addEventListener("change", () => {
    getExchanges(date.value, currencyInput.value);
});

function populateCurrencyInput(exchangesRates) {
    currencyInput.innerHTML = "";
    Object.entries(exchangesRates).forEach(currencyName => {
        var currency = document.createElement("option");
        currency.text = currencyName[0];
        currency.value = currencyName[0];
        currencyInput.add(currency);
    });
}

function getExchanges(date, base = "USD") {
    fetch(`https://api.exchangeratesapi.io/${date}?base=${base}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            exchanges = response.rates;
            if (currencyInput.childElementCount <= 1) {
                populateCurrencyInput(response.rates);
            }
            populateCurrencyOutput(response.rates);
        });
}

function populateCurrencyOutput() {
    currencyOutput.innerHTML = "";
    Object.entries(exchanges).forEach(currencyName => {
        var currency = document.createElement("li");
        currency.innerText = `${currencyName[0]} : ${currencyName[1]}`;
        currencyOutput.appendChild(currency);
    });
}
