import {
    populateList,
    showPokemon,
    pokemonHandler
} from "./components/ui.js"
import {
    getPokemonListData,
    getPokemonData
} from "./components/load_data.js"

async function changePokemon(id) {
    const pokemon = await getPokemonData(id);
    showPokemon(pokemon);
}

async function setup() {
    const pokemonList = await getPokemonListData();
    populateList(pokemonList,changePokemon);
    changePokemon();
    pokemonHandler(changePokemon);
}

setup();
