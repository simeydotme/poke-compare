import { writable, derived } from "svelte/store";
import { getPokemon } from "../helpers/getPokemons.js";

const pokemonStore1 = writable({ name: "pikachu", number: 25 });
const pokemonStore2 = writable({ name: "eevee", number: 133 });

let previousPokes = [];
let cachedPokes = {};
let timer1, timer2;

const pokemonData1 = derived(
  pokemonStore1,
  ($pokemon, set) => {
    const name = $pokemon.name;
    if ($pokemon && previousPokes[1] !== name) {
      const cached = cachedPokes[name];
      previousPokes[0] = name;
      if (cached) {
        console.info("Pokemon", name, "is cached, avoiding AJAX");
        set({
          data: cached,
          name: name,
          number: cached.id,
          ready: true
        });
      } else {
        console.warn("Pokemon", name, "missing cache, using AJAX");
        set({
          data: {},
          name: name,
          number: $pokemon.number,
          ready: false
        });
        getPokemon(name).then((res) => {
          clearTimeout(timer1);
          timer1 = setTimeout(() => {
            set({
              data: res,
              name: name,
              number: res.id,
              ready: true
            });
          }, 500);
          cachedPokes[name] = res;
          console.info("adding", name, "to the cache");
        });
      }
    }
  },
  { ready: false, data: {} }
);

const pokemonData2 = derived(
  pokemonStore2,
  ($pokemon, set) => {
    const name = $pokemon.name;
    if ($pokemon && previousPokes[1] !== name) {
      const cached = cachedPokes[name];
      previousPokes[1] = name;
      if (cached) {
        console.info("Pokemon", name, "is cached, avoiding AJAX");
        set({
          data: cached,
          name: name,
          number: cached.id,
          ready: true
        });
      } else {
        console.warn("Pokemon", name, "missing cache, using AJAX");
        set({
          data: {},
          name: name,
          number: $pokemon.number,
          ready: false
        });
        getPokemon(name).then((res) => {
          clearTimeout(timer2);
          timer2 = setTimeout(() => {
            set({
              data: res,
              name: name,
              number: res.id,
              ready: true
            });
          }, 500);
          cachedPokes[name] = res;
          console.info("adding", name, "to the cache");
        });
      }
    }
  },
  { ready: false, data: {} }
);

export { pokemonStore1, pokemonStore2, pokemonData1, pokemonData2 };
