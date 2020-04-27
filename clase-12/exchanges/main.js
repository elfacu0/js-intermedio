import { getExchanges, getHistoricalRates } from './services/exchanges.js';
import {
    populateCurrencyInput,
    populateCurrencyOutput,
    setBar,
    setChart,
} from './components/ui.js';

async function setup() {
    let exchanges = await getExchanges();
    let historicalRates = await getHistoricalRates();
    populateCurrencyInput(exchanges);
    populateCurrencyOutput(exchanges.rates);
    setBar(exchanges.rates);
    setChart(historicalRates);
}

setup();
