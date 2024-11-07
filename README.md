# Pokémon Search App

This is a simple Pokémon search app where users can filter Pokémon by type, region, and search for them by name. The app displays Pokémon data including their sprites, types, and abilities.

## Features

- **Filter by Type**: Allows filtering of Pokémon based on their type (e.g., Fire, Water, Grass, etc.).
- **Filter by Region**: Filters Pokémon based on their region (e.g., Kanto, Johto, Hoenn, etc.).
- **Search by Name**: Users can search for Pokémon by typing their name, and it will display matching results.
- **Pokémon Cards**: Each Pokémon is displayed with its ID, sprite, name, and type.

## How to Run the App

### Prerequisites

Make sure you have the following installed:
- A modern browser (Chrome, Firefox, Safari, etc.).
- An internet connection to fetch Pokémon data from the [PokéAPI](https://pokeapi.co/).

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Sudhanshu-Ambastha/Pokedex2.git
   ```
2. Open the `index.html` file in your browser to run the app.

## Files
- `index.html`: The main HTML file containing the structure of the app.
- `style.css`: The CSS file containing the styles for the app.
- `script.js`: The JavaScript file that handles the logic for fetching and displaying Pokémon data, and filtering by type and region.

## How It Works
1. Fetching Pokémon Data:

- The app fetches data from the PokéAPI, a free API that provides detailed Pokémon information.
- Pokémon data is fetched sequentially for each ID in the selected region's ID range (for example, Kanto includes Pokémon IDs 1 to 151).

2. Filtering:

- By Type: The app allows you to filter Pokémon by their type (e.g., Fire, Water, Grass, etc.). Only Pokémon that match the selected type will be displayed.
- By Region: The app allows you to filter Pokémon by region (e.g., Kanto, Johto, Hoenn, etc.). Pokémon will only be displayed if they belong to the selected region's ID range.

3. Search:

- You can search for Pokémon by name using the search input. As you type, it will show only the Pokémon whose names start with the typed string.