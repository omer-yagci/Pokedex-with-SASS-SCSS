const pokeInput = document.querySelector("#poke-input");
const pokeSearch = document.querySelector(".btn-search");
const pokeContainer = document.querySelector(".poke-container");
const pookeName = document.querySelectorAll(".poke-name");
let pokeCount = 151;
const colors = {
  fire: `#FDDFDF`,
  grass: `#DEFDE0`,
  electric: `#FCF7DE`,
  water: `#DEF3FD`,
  ground: `#f4e7da`,
  rock: `#d5d5d4`,
  fairy: `#fceaff`,
  poison: `#98d7a5`,
  bug: `#f8d5a3`,
  dragon: `#97b3e6`,
  psychic: `#eaeda1`,
  flying: `#e4e4c1`,
  fighting: `#E6E0D4`,
  normal: `#F5F5F5`,
};

const initPokemon = async () => {
  for (let i = 1; i <= pokeCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = (id) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((resJson) => {
      getEachPoke(resJson);
    });
};

const getEachPoke = (pokemon) => {
  const pokeName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const pokeId = pokemon.id.toString().padStart(3, "0");
  const pokeWeight = pokemon.weight;
  const pokeType = pokemon.types[0].type.name;
  let color = colors[pokeType];
  // console.log(color);

  const pokeEl = document.createElement("div");
  pokeEl.classList.add("poke-box");
  pokeEl.style.backgroundColor = `${color}`;

  pokeEl.innerHTML = `
    <img
    src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokeId}.png"
    alt="#"
    />
    <h4 class="poke-name">${pokeName}</h4>
    <p class="poke-id">#${pokeId}</p>
    <p class="poke-weight">${pokeWeight} Kg</p>
    <p class="poke-type">${pokeType}</p>`;

  pokeContainer.appendChild(pokeEl);
};
initPokemon();
pokeInput.addEventListener("input", () => {
  const getName = document.querySelectorAll(".poke-name");
  const getFilter = pokeInput.value.toLowerCase();
  // console.log(getFilter);

  getName.forEach((el) => {
    el.parentNode.style.display = "block";
    if (!el.innerHTML.toLowerCase().includes(getFilter)) {
      el.parentNode.style.display = "none";
    }
  });
});
