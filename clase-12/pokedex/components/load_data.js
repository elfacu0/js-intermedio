import { getPokemon, getPokemonList } from '../repository/pokemon.js';

export async function getPokemonData(id = 1) {
    const storedPokemon =
        JSON.parse(localStorage.getItem('pokemonStored')) || {};
    if (id in storedPokemon) {
        return storedPokemon[id];
    } else {
        const pokemon = await getPokemon(id);
        const allStoredPokemon = storedPokemon;
        allStoredPokemon[id] = pokemon;
        localStorage.setItem('pokemonStored', JSON.stringify(allStoredPokemon));
        return pokemon;
    }
}

export async function getPokemonListData() {
    const pokemonListStored = JSON.parse(
        localStorage.getItem('pokemonListStored')
    );
    if (pokemonListStored) {
        return pokemonListStored;
    } else {
        const pokemonList = await getPokemonList();
        localStorage.setItem('pokemonListStored', JSON.stringify(pokemonList));
        return pokemonList;
    }
}
