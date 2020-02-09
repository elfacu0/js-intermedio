let id = 1;
let pokemonImgs = [];
const pokemonContainer = document.querySelector(".pokemon");
const pokemonChangeImages = pokemonContainer.querySelector(".pokemon-images");
const pokemonName = pokemonContainer.querySelector(".pokemonName");
const pokemonImage = pokemonContainer.querySelector(".pokemonImg");
const pokemonWeight = pokemonContainer.querySelector(".pokemonWeight");
const pokemonHeight = pokemonContainer.querySelector(".pokemonHeight");
const pokemonTypes = pokemonContainer.querySelector(".pokemonTypes");

function changeImages() {
    removeImageButtons();
    let validImages = Object.entries(pokemonImgs)
        .filter(a => {
            if (a[1] != null) {
                return a[1]
            }
        })
    validImages.forEach(e => {
        const button = document.createElement("button");
        button.addEventListener("click", () => {
            pokemonImage.src = e[1];
        });
        pokemonChangeImages.appendChild(button);
    });
}

export function showPokemon(response) {
    pokemonName.innerHTML = response.name;
    pokemonImgs = response.sprites;
    pokemonImage.src = response.sprites.front_default;
    pokemonHeight.innerHTML = `Height : ${response.height}`;
    pokemonWeight.innerHTML = `Weight : ${response.weight}`;
    response.types.forEach(e => {
        let pokemonType = document.createElement("span");
        pokemonType.innerText = e.type.name;
        pokemonTypes.appendChild(pokemonType);
    });
    changeImages();
}

export function populateList(pokemones,callback) {
    const pokemonList = document.querySelector(".pokemonList");
    pokemones.results.forEach((pokemon, i) => {
        const pokemonName = document.createElement("p");
        pokemonName.innerHTML = pokemon.name;
        (function (i) {
            pokemonName.addEventListener("click", () => {
                removeTypes();
                id = i+1;
                callback(i + 1);
            });
        })(i);
        pokemonList.appendChild(pokemonName);
    });
}

export function pokemonHandler(callback) {
    const nextPokemon = document.querySelector(".nextPokemon");
    const previousPokemon = document.querySelector(".previousPokemon");
    nextPokemon.addEventListener("click", () => {
        if (id <= 800) {
            removeTypes();
            id++;
            callback(id);
        }
    });
    previousPokemon.addEventListener("click", () => {
        if (id > 1) {
            removeTypes();
            id--;
            callback(id);
        }
    });
}

function removeTypes() {
    pokemonTypes.innerHTML = "";
}

function removeImageButtons() {
    pokemonChangeImages.innerHTML = "";
}
