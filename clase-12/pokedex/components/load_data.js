import {
    getPokemon,
    getPokemonList
} from './api.js'

export async function getPokemonData(id = 1) {
    const pokemonStored = JSON.parse(localStorage.getItem('pokemonStored')) || {}
    if (id in pokemonStored) {
        return pokemonStored[id];
    } else {
        const pokemon = await getPokemon(id);
        const allPokemonStored = pokemonStored;
        allPokemonStored[id] = pokemon;
        localStorage.setItem('pokemonStored', JSON.stringify(allPokemonStored));
        return pokemon
    }
}

export async function getPokemonListData() {
    const pokemonListStored = JSON.parse(localStorage.getItem('pokemonListStored'));
    if (pokemonListStored) {
        return pokemonListStored
    } else {
        const pokemonList = await getPokemonList();
        localStorage.setItem('pokemonListStored', JSON.stringify(pokemonList));
        return pokemonList
    }
}

