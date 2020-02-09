export function getPokemon(id = 1) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return fetch(url)
        .then(response => response.json());
}

export function getPokemonList() {
    const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=800";
    return fetch(url)
        .then((response) => response.json())
}
