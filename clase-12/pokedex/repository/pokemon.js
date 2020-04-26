const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const LIMIT = 800;

export function getPokemon(id = 1) {
    const url = `${BASE_URL}${id}`;
    return fetch(url).then((response) => response.json());
}

export function getPokemonList() {
    const url = `${BASE_URL}?offset=0&limit=${LIMIT}`;
    return fetch(url).then((response) => response.json());
}
