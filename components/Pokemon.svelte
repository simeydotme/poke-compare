<script>
  import { sounds } from "../stores/sounds.js";
  import { style, getBallType, getIsFemale } from "../helpers/modifyPokemon.js";
  import Sprite from "./Sprite.svelte";

  export let pokemon;
  export let pokemonData;
  export let panelId;
  export let flip = false;

  let delay = 1000;
  let cryTimer;

  $: name = pokemon.name;
  $: number = pokemonData.number;
  $: spriteStyle = style(name);
  $: isFemale = spriteStyle.isFemale;
  $: isShiny = spriteStyle.isShiny;
  $: ball = pokemonData && getBallType(pokemonData);
  $: if (pokemonData.ready && $sounds) {
    const cry = new Audio(
      `http://play.pokemonshowdown.com/audio/cries/${name}.ogg`
    );
    cry.muted = false;
    cry.volume = 0.35;
    clearTimeout(cryTimer);
    cryTimer = setTimeout(() => {
      cry.currentTime = 0;
      cry.play();
    }, 2000 + delay * (panelId - 1));
    delay = 0;
  }

  const genderSwap = () => {
    spriteStyle.isFemale = getIsFemale(name, !spriteStyle.isFemale);
    spriteStyle.isShiny = Math.random() < 1 / 10;
  };
</script>


{#if pokemon}
  
  <section class="pokemon">
    <h2 class="number">#{number}</h2>
    <Sprite pokemon={name} {number} {flip} {isFemale} {isShiny} {ball} isLoading={!pokemonData.ready} />
    <div class="types">
      {#if pokemonData.ready }
        {#each pokemonData.data.types as type}
          <span class="type {type.type.name}">
            {type.type.name}
          </span>
        {/each}
      {:else}
        <span class="type">
          loading...
        </span>
      {/if}
    </div>
    <span class="gender"
      class:male="{!isFemale}"
      class:female="{isFemale}"
      on:click="{genderSwap}">
      {#if isFemale}♀{:else}♂{/if}
    </span>
    <span class="shiny"
      class:visible="{isShiny}">
    </span>
  </section>

{/if}


<style>
  .pokemon {
    grid-area: pkmn;
    position: relative;
  }

  .types {
    margin-top: 10px;
  }

  .number {
    font-weight: normal;
    font-family: pkmn2;
    font-size: 18px;
    padding: 0;
    margin: 10px;
  }

  .gender {
    position: absolute;
    bottom: -5px;
    right: 0;
    font-size: 22px;
    opacity: 0.85;
    color: rgb(112, 179, 255);
    cursor: pointer;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transform: translate(20px, 10px);
    user-select: none;
    transition: all 0.2s ease;
  }
  .gender.female {
    color: rgb(255, 112, 160);
  }
  .gender:hover {
    opacity: 1;
  }

  :global(.flip) .gender {
    right: auto;
    left: 0;
    transform: translate(-20px, 10px);
  }

  .shiny {
    position: absolute;
    bottom: -2px;
    right: 0;
    width: 32px;
    height: 32px;
    opacity: 1;
    transform: translateX(-20px) scale(0);
    background-size: cover;
    opacity: 0;
    transition: all 0.166s ease-out;
    background-image: url(https://img.pokemondb.net/sprites/items/shiny-charm.png);
  }

  :global(.flip) .shiny {
    right: auto;
    left: 0;
    transform: translateX(20px) scale(0);
  }

  .shiny.visible {
    transform: translateX(-20px) scale(1);
    opacity: 1;
  }
  :global(.flip) .shiny.visible {
    transform: translateX(20px) scaleX(-1) scaleY(1);
  }
</style>