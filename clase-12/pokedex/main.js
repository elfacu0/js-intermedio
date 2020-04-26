const pokemonContainer = document.querySelector('.pokemon');
const pokemonName = pokemonContainer.querySelector('.pokemonName');
const pokemonImage = pokemonContainer.querySelector('.pokemonImg');
const pokemonWeight = pokemonContainer.querySelector('.pokemonWeight');
const pokemonHeight = pokemonContainer.querySelector('.pokemonHeight');
const pokemonTypes = pokemonContainer.querySelector('.pokemonTypes');
const pokemonChangeImages = pokemonContainer.querySelector('.pokemon-images');
const nextPokemonHandler = document.querySelector('.nextPokemon');
const previousPokemonHandler = document.querySelector('.previousPokemon');
const pokemonList = document.querySelector('.pokemonList');
let pokemonImgs = [];
let id = 1;

function init() {
    getPokemon(id);
    getPokemonList();
    nextPokemonHandler.addEventListener('click', () => {
        id++;
        removeTypes();
        getPokemon(id);
    });
    previousPokemonHandler.addEventListener('click', () => {
        id--;
        removeTypes();
        getPokemon(id);
    });
}

function getPokemon(id = 1) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    fetch(url)
        .then((response) => response.json())
        .then((response) => showPokemon(response));
}

function getPokemonList() {
    const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=800';
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then((response) => populateList(response.results));
}

function populateList(pokemones) {
    pokemones.forEach((pokemon, i) => {
        const p = document.createElement('p');
        p.innerHTML = pokemon.name;
        (function () {
            p.addEventListener('click', () => {
                removeTypes();
                getPokemon(i + 1);
            });
        })(i);
        pokemonList.appendChild(p);
    });
}

function changeImages() {
    removeImageButtons();
    let validImages = Object.entries(pokemonImgs).filter((a) => {
        return a[1] || undefined;
    });
    validImages.forEach((e) => {
        const button = document.createElement('button');
        button.addEventListener('click', () => {
            pokemonImage.src = e[1];
        });
        pokemonChangeImages.appendChild(button);
    });
}

function showPokemon(response) {
    pokemonName.innerHTML = response.name;
    pokemonImgs = response.sprites;
    pokemonImage.src = response.sprites.front_default;
    pokemonHeight.innerHTML = `Height : ${response.height}`;
    pokemonWeight.innerHTML = `Weight : ${response.weight}`;
    response.types.forEach((e) => {
        let span = document.createElement('span');
        span.innerText = e.type.name;
        pokemonTypes.appendChild(span);
    });
    changeImages();
}

function removeTypes() {
    pokemonTypes.innerHTML = '';
}

function removeImageButtons() {
    pokemonChangeImages.innerHTML = '';
}

init();
