const searchInput = document.getElementById("search");
const container = document.getElementById("Pokemon_card_container");
const filterTypeBtn = document.getElementById("filter-type");
const filterRegionBtn = document.getElementById("filter-region");
const typeSelect = document.getElementById("type");
const regionSelect = document.getElementById("region");

let allPokemon = [];

// Region mapping based on Pokémon IDs
const regionRanges = {
    Kanto: [1, 151],
    Johto: [152, 251],
    Hoenn: [252, 386],
    Sinnoh: [387, 493],
    Unova: [494, 649],
    Kalos: [650, 721],
    Alola: [722, 898],
    Galar: [899, 1000],
    Paldea: [1001, 1075],
};

// Function to create cards
function createCard(pokemon) {
    let card = document.createElement("div");
    card.classList.add('card-inner');
    card.innerHTML = `
        <div class="card-front">
            <div class="id">${pokemon.id}</div>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" onerror="handleImageErrorFront(this);" />
            <div class="name">${pokemon.name}</div>
            <div class="type">${pokemon.types[0].type.name}</div>
        </div>
        <div class="card-back">
            <img src="${pokemon.sprites.back_default}" alt="${pokemon.name}" onerror="handleImageErrorBack(this);" />
            <div class="name">${pokemon.name}</div>
            <div class="ability">${pokemon.abilities[0].ability.name}</div>
        </div>
    `;
    return card;
}

// Function to filter by region
function filterByRegion(selectedRegion) {
    let filteredPokemon = allPokemon.filter(pokemon => {
        if (selectedRegion === "all") return true;
        const [start, end] = regionRanges[selectedRegion] || [];
        return pokemon.id >= start && pokemon.id <= end;
    });

    // Clear the container before displaying the filtered results
    container.innerHTML = "";

    // Append filtered cards
    filteredPokemon.forEach(pokemon => {
        let card = createCard(pokemon);
        container.appendChild(card);
    });
}

// Function to filter by type
function filterByType(selectedType) {
    let filteredPokemon = allPokemon.filter(pokemon => {
        return selectedType === "all" || pokemon.types.some(type => type.type.name === selectedType);
    });

    // Clear the container before displaying the filtered results
    container.innerHTML = "";

    // Append filtered cards
    filteredPokemon.forEach(pokemon => {
        let card = createCard(pokemon);
        container.appendChild(card);
    });
}

// Event listener for type filter
filterTypeBtn.addEventListener('click', function () {
    const selectedType = typeSelect.value;
    filterByType(selectedType); 
});

// Event listener for region filter
filterRegionBtn.addEventListener('click', function () {
    const selectedRegion = regionSelect.value;
    filterByRegion(selectedRegion);
});

// Event listener for search input
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

// Fetch Pokémon data for a specific range
async function fetchPokemonData(i) {
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let result = await data.json();
    return result;
}

// Fetch all Pokémon based on region selection
async function fetchPokemon(selectedRegion) {
    let regionStart = 1;
    let regionEnd = 1025; // Default is all regions

    if (selectedRegion !== "all") {
        [regionStart, regionEnd] = regionRanges[selectedRegion];
    }

    // Ensure the container and allPokemon array are cleared before each new fetch
    container.innerHTML = "";  
    allPokemon = [];  

    // Fetch Pokémon based on region range
    for (let i = regionStart; i <= regionEnd; i++) {
        let pokemon = await fetchPokemonData(i);
        allPokemon.push(pokemon);
        let card = createCard(pokemon);
        container.appendChild(card);
    }
}

// Fetch Pokémon based on initial region selection (default is "all")
const selectedRegion = regionSelect.value;
fetchPokemon(selectedRegion);

// Listen for changes in the region selection and update the Pokémon list accordingly
regionSelect.addEventListener('change', (event) => {
    const selectedRegion = event.target.value;
    fetchPokemon(selectedRegion);  
});
