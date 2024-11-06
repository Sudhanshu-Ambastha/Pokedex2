const searchInput = document.getElementById("search");
const container = document.getElementById("Pokemon_card_container");
const filterBtn = document.getElementById("filter");
const typeSelect = document.getElementById("type"); 

let allPokemon = []; 

function createCard(pokemon) {
    let card = document.createElement("div");
    card.classList.add('card-inner');
    card.innerHTML = `
        <div class="card-front">
            <div class="id">${pokemon.id}</div>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <div class="name">${pokemon.name}</div>
            <div class="type">${pokemon.types[0].type.name}</div>
        </div>
        <div class="card-back">
            <img src="${pokemon.sprites.back_default}" alt="${pokemon.name}">
            <div class="name">${pokemon.name}</div>
            <div class="ability">${pokemon.abilities[0].ability.name}</div>
        </div>
    `;
    return card;
}

function filterByType(selectedType) {
    let filteredPokemon = allPokemon.filter(pokemon => {
        return selectedType === "all" || pokemon.types.some(type => type.type.name === selectedType);
    });
    
    container.innerHTML = "";

    // Append filtered cards
    filteredPokemon.forEach(pokemon => {
        let card = createCard(pokemon);
        container.appendChild(card);
    });
}

filterBtn.addEventListener('click', function () {
    const selectedType = typeSelect.value;
    filterByType(selectedType); 
});

searchInput.addEventListener('keyup', function () {
    let searchValue = searchInput.value.toLowerCase();
    
    let allCards = container.querySelectorAll('.card-inner');
    allCards.forEach(function (card) {
        let cardName = card.querySelector(".name").textContent.toLowerCase();
        if (cardName.startsWith(searchValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

async function fetchPokemonData(i) {
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let result = await data.json();
    return result;
}

async function fetchPokemon() {
    for (let i = 1; i <= 1025; i++) {
        let pokemon = await fetchPokemonData(i);
        allPokemon.push(pokemon); 
        let card = createCard(pokemon);
        container.appendChild(card);
    }
}

fetchPokemon();
