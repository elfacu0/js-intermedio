const BASE_URL = 'https://api.exchangeratesapi.io/';
let d = new Date();
const TODAY = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

class exchange {
    constructor(base, date, rates) {
        this.base = base;
        this.date = date;
        this.rates = rates;
    }
}
class exchanges {
    constructor() {
        this.bases = {};
    }
    addExchange(exchange, date) {
        const { base } = exchange;
        if (!this.bases[base]) {
            this.bases[base] = {};
        }
        if (!this.bases[base][date]) {
            this.bases[base][date] = exchange;
        }
        console.log(this.bases);
    }
}

let allExchanges = new exchanges();
export async function getExchanges(date = TODAY, base = 'USD') {
    if (!date) date = TODAY;
    if (allExchanges.bases[base] && allExchanges.bases[base][date]) {
        console.log('ACTIVO');
        return allExchanges.bases[base][date];
    }
    let response = await fetch(`${BASE_URL}${date}?base=${base}`);
    let data = await response.json();
    const { rates } = data;
    const actualExchange = new exchange(base, date, rates);
    allExchanges.addExchange(actualExchange, date);
    return data;
}

export async function getHistoricalRates(date = TODAY, base = 'USD') {
    let response = await fetch(
        `${BASE_URL}history?start_at=2020-01-01&end_at=${date}&base=${base}`
    );
    let data = await response.json();
    return data;
}
