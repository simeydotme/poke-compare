import { cachedFetch } from "./cachedFetch.js";

const getPokelist = async () => {
  const result = await cachedFetch(
    "https://pokeapi.co/api/v2/pokemon?limit=251&offset=0"
  );
  let pokes = await result.json();
  pokes = pokes.results;

  pokes = pokes.map((p, i) => {
    const number = i + 1;
    const icon = `https://play.pokemonshowdown.com/sprites/bwicons/${number}.png`;
    const image = `<img src="${icon}">`;
    return {
      ...p,
      number,
      icon,
      image,
      label: `${image} ${p.name}`
    };
  });
  return pokes;
};

const getPokemon = async (pokemon) => {
  const result = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon);
  let poke = await result.json();
  return poke;
};

const getFlavour = async (pokemon) => {
  const result = await fetch(
    "https://pokeapi.co/api/v2/pokemon-species/" + pokemon
  );
  let data = await result.json();
  return {
    flavour: data.flavor_text_entries.filter((entry) => {
      return (
        entry.language.name === "en" &&
        ["gold", "silver", "red", "blue", "diamond", "pearl"].includes(
          entry.version.name
        )
      );
    }),
    genera: data.genera.filter((entry) => {
      return entry.language.name === "en";
    })
  };
};

export { getPokelist, getPokemon, getFlavour };
