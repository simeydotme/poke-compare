<script context="module">
  import debounce from "lodash.debounce";
  import Select from "svelte-select";
  import dice from "../public/die-face.svg";
  import up from "../public/up-arrow.svg";
  import down from "../public/down-arrow.svg";
</script>

<script>

  import { getPokelist } from "../helpers/getPokemons.js";
  import Pokemon from "./Pokemon.svelte";
  import Stats from "./Stats.svelte";
  import Pokedex from "./Pokedex.svelte";

  export let pokemonStore;
  export let pokemonData;
  export let panelId = 1;
  export let flip = false;

  let selectedPokemon;

  let getList = async () => {
    const pokes = await getPokelist();
    selectedPokemon = pokes[ pokemonStore.number - 1 ];
    return pokes;
  }

  let randomize = ( pokelist ) => {
    const rando = Math.floor(Math.random() * pokelist.length );
    pokemonStore = pokelist[ rando ];
    selectedPokemon = pokelist[ rando ];
    return selectedPokemon;
  }

  let next = ( pokelist, count = 1 ) => {
    const current = pokemonStore.number - 1;
    let next = current + count;
    if ( next >= pokelist.length - count ) {
      next = 0;
    } else if ( next <= 0 ) {
      next = pokelist.length - 1;
    } else {
      next = current + count;
    }
    pokemonStore = pokelist[ next ];
    selectedPokemon = pokelist[ next ];
    return selectedPokemon;
  }

  let prev = ( pokelist ) => {
    next( pokelist, -1 );
  }

  let dRandomize = debounce(randomize, 150);
  let dNext = debounce(next, 150);
  let dPrev = debounce(prev, 150);

</script>
  {#await getList()}

    <p>loading...</p>

  {:then pokelist}

    <section id="{pokemonStore.name}{panelId}" class="panel" class:flip>
      
      <section class="selector">
        <Select 
          items={pokelist} 
          bind:selectedValue="{pokemonStore}"
          optionIdentifier="name"
          containerClasses="autopoke"
          noOptionsMessage="This Pokemon may be in another region."
          isClearable="{false}"
          getSelectionLabel={(item) => item.name}
          getOptionLabel={(item) => item.label} />

          <button class="random" on:click="{() => {dRandomize(pokelist)}}" title="random pokemon">
            {@html dice}
          </button>

          <button class="prev" on:click="{() => {dPrev(pokelist)}}" title="previous pokemon">
            {@html up}
          </button>

          <button class="next" on:click="{() => {dNext(pokelist)}}" title="next pokemon">
            {@html down}
          </button>
      </section>

      <section class="info">
        <Pokemon pokemon={pokemonStore} {pokemonData} {flip} {panelId} />
        <Stats {pokemonData} />
      </section>

    </section>

    <section class="pokedex{panelId}">
      <Pokedex pokemon={pokemonStore} {pokemonData} {flip} {panelId} />
    </section>

  {:catch error}

    <p style="color: red">
      {error.message}
    </p>

  {/await}


<style>
  .panel {
    background: rgba(0, 0, 0, 0.1);
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    display: grid;
    margin-bottom: 20px;
    position: relative;
  }

  .selector {
    display: flex;
  }

  .info {
    display: grid;
    grid-template-columns: 60% minmax(140px, 40%);
    grid-template-areas: "stats pkmn";
  }

  .flip .info {
    grid-template-columns: minmax(140px, 40%) 60%;
    grid-template-areas: "pkmn stats";
  }

  :global(.selector > .selectContainer::after) {
    border: 2px solid transparent;
    border-radius: 1px;
    border-right: 0;
    border-top: 0;
    content: " ";
    display: block;
    height: 0.5em;
    width: 0.5em;
    margin-top: -0.5em;
    pointer-events: none;
    position: absolute;
    top: 50%;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-transform-origin: center;
    transform-origin: center;
    border-color: var(--inputColor);
    right: 1em;
    z-index: 4;
    opacity: 0.33;
    transition: all 0.5s ease;
  }

  :global(.selector:hover > .selectContainer::after) {
    opacity: 1;
  }

  .pokedex1,
  .pokedex2 {
    display: none;
  }

  @media screen and (min-width: 900px) {
    .pokedex1,
    .pokedex2 {
      z-index: 3;
      display: block;
    }
    .pokedex1 {
      grid-area: pokedex1;
    }
    .pokedex2 {
      grid-area: pokedex2;
    }
  }

  button {
    z-index: 10;
    width: 38px;
    height: 38px;
    background: var(--background);
    border-radius: 4px;
    padding: 5px;
    border: 1px solid transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    transition: all 0.2s ease;
  }
  button:hover {
    border-color: var(--borderHoverColor);
  }
  button:focus,
  button:active {
    border-color: var(--borderFocusColor);
  }

  :global(button > svg) {
    width: 20px;
    height: 20px;
    fill: rgba(255, 255, 255, 0.5);
  }

  :global(button:hover > svg),
  :global(button:focus > svg),
  :global(button:active > svg) {
    fill: rgba(255, 255, 255, 1);
  }
</style>
