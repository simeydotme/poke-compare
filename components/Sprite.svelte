<script>
  import Pokeball from "./Pokeball.svelte";
  import Animation from "./Animation.svelte";
  import { style, hasFemaleSprite } from "../helpers/modifyPokemon.js";
  import { hires } from "../stores/fidelity.js";

  export let pokemon;
  export let number;
  export let flip = false;
  export let size = false;
  export let ball = "poke";
  export let isShiny = false;
  export let isFemale = false;
  export let isLoading = true;

  let pokeImage = "";

  const src = {
    gen6: "https://play.pokemonshowdown.com/sprites",
    gen5: "https://img.pokemondb.net/sprites/black-white/anim"
  };

  $: source = pokemon => {
    let sprite = pokemon;
    switch (pokemon) {
      case "pikachu":
        if ($hires && !isShiny) {
          sprite = isFemale ? "pikachu-starter" : "pikachu-partner";
        }
        break;
      case "eevee":
        if ($hires && !isShiny) {
          sprite = "eevee-starter";
        }
        break;
      case "unown":
        const letters = "abcdefghijklmnopqrstuvwxyz".split("");
        sprite = "unown-" + letters[Math.floor(Math.random() * letters.length)];
        break;
      case "nidoran-f":
      case "nidoran-m":
      case "ho-oh":
      case "mr-mime":
        if ($hires) {
          sprite = pokemon.replace("-", "");
        }
        break;
    }
    if (isFemale && hasFemaleSprite(pokemon)) sprite += "-f";
    const gen6 = `${src.gen6}/${isShiny ? "ani-shiny" : "ani"}/${sprite}.gif`;
    const gen5 = `${src.gen5}/${isShiny ? "shiny" : "normal"}/${sprite}.gif`;
    return $hires ? gen6 : gen5;
  };

  $: {
    pokeImage = "";
    let img = new Image();
    let imgPath = source(pokemon);
    img.onload = () => {
      pokeImage = `url( ${imgPath} )`;
    };
    img.src = imgPath;
  }

  $: anim = () => {
    let styles = "rock,roll".split(",");
    return styles[Math.floor(Math.random() * styles.length)];
  };
</script>


<div class="sprite" class:loaded="{ !isLoading }">
  {#if !pokeImage || isLoading}
    <div class="loading">
      <Pokeball anim="{anim()}" {ball} />
    </div>
  {:else}
    <Animation {pokemon} {pokeImage} {ball} {flip} />
    {#if isShiny}
      <div class="shiny"></div>
    {/if}
  {/if}
</div>



<style>
  .sprite {
    background: rgba(156, 202, 255, 0.1);
    background: linear-gradient(0deg, transparent 20%, rgba(156, 202, 255, 0.2));
    box-shadow: inset 0px 20px 20px #83fff90c;
    width: 120px;
    height: 120px;
    display: flex;
    align-items: flex-end;
    border-radius: 100%;
    overflow: visible;
    margin: auto;
    position: relative;
  }

  .sprite:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    border-radius: 100%;
    background: rgba(0, 0, 0, 0.15);
    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.15);
    transform: rotateX(80deg) translateY(240%) scale(0);
    opacity: 0;
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .sprite.loaded:after {
    transform: rotateX(80deg) translateY(240%) scale(0.65);
    opacity: 1;
    transition-delay: 1s;
  }

  .loading {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  .shiny {
    background-repeat: no-repeat;
    background-image: url(/sparkle.png);
    background-position: 999px -1px;
    width: 48px;
    height: 48px;
    position: absolute;
    left: 50%;
    top: 50%;
    animation: sparkle 0.66s steps(48) 2;
    animation-delay: 1.4s;
    mix-blend-mode: lighten;
    transform: translate(-50%, -50%) scale(1.3);
    z-index: 5;
  }

  @keyframes sparkle {
    0% {
      background-position: -1px -1px;
    }
    50% {
      filter: hue-rotate(0deg) brightness(1);
    }
    100% {
      filter: hue-rotate(360deg) brightness(1.2);
      background-position: -2353px -1px;
    }
  }
</style>