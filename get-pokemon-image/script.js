async function getPokemonImage() {
  try {
    const searchInput = document.getElementById("search");
    const searchInputValue = searchInput.value.toLowerCase();

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInputValue}`)
    if (!response.ok) {
      throw new Error("Failed to fetch the pokemon");
    }

    const data = await response.json();
    const pokemonImage = data.sprites.front_default;

    const image = document.getElementById("pokemon-sprite");
    image.src = pokemonImage;
    image.style.display = "inline-block";
  } catch (error) {
    console.error(error);
  }
};
