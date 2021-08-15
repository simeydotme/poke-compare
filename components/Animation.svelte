<script>
  import Pokeball from "./Pokeball.svelte";

  export let pokemon;
  export let pokeImage;
  export let ball = false;
  export let flip = false;
</script>



<div class="pkmn exit" 
  class:left="{flip}"
  class:right="{!flip}"
  style="--pkmn: {pokeImage}">
  <Pokeball anim="throw" {ball} />
  <div class="mon"></div>
  <div class="explode"></div>
</div>



<style>
  .pkmn {
    width: 160px;
    height: 140px;
    position: relative;
  }

  .pkmn .mon {
    position: absolute;
    left: 50%;
    bottom: 10px;
    width: 220px;
    height: 180px;
    z-index: 2;
  }

  .pkmn .mon:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center bottom;
    transform-origin: center 150px;
    background-image: var(--pkmn);
  }

  .pkmn :global(.ball) {
    position: absolute;
    left: 10%;
    bottom: 10px;
    top: auto;
    z-index: 1;
  }

  .pkmn.left .mon {
    transform: translateX(-50%) scaleX(-1);
  }

  .pkmn.right .mon {
    transform: translateX(-50%) scaleX(1);
  }

  .pkmn.right :global(.ball) {
    transform: scaleX(-1);
    left: 55%;
  }

  .pkmn .explode {
    will-change: opacity;
    overflow: hidden;
    z-index: 3;
  }

  .pkmn.exit .mon:before {
    animation-delay: 1.3s;
    animation-duration: 0.66s;
    animation-timing-function: ease-out;
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-direction: forwards;
    animation-name: mon-poof;
  }

  .pkmn.exit.right .mon:before {
    animation-name: mon-poof-2;
  }

  .explode {
    width: 240px;
    height: 240px;
    position: absolute;
    left: 50%;
    top: 75%;
    transform: translate(-50%, -50%);
    mix-blend-mode: color-dodge;
    will-change: opacity, filter;
    opacity: 0;
  }

  .explode:before {
    content: "";
    background-image: url(/poof.jpg);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    will-change: opacity;
  }

  .exit .explode,
  .exit .explode:before {
    animation-delay: 1.2s;
    animation-duration: 0.66s;
    animation-iteration-count: 1;
  }

  .exit .explode {
    animation-name: explode-filters;
    animation-timing-function: linear;
    opacity: 0;
  }

  .exit.right .explode {
    animation-name: explode-filters-2;
  }

  .exit .explode:before {
    animation-name: explode;
    animation-timing-function: steps(1);
  }

  @keyframes explode {
    0% {
      background-position: 0 0;
    }
    5% {
      background-position: -240px 0;
    }
    10% {
      background-position: -480px 0;
    }
    15% {
      background-position: -720px 0;
    }
    20% {
      background-position: -960px 0;
    }
    25% {
      background-position: -1200px 0;
    }
    30% {
      background-position: -1440px 0;
    }
    35% {
      background-position: -1680px 0;
    }
    40% {
      background-position: -240px -240px;
    }
    45% {
      background-position: -480px -240px;
    }
    50% {
      background-position: -720px -240px;
    }
    55% {
      background-position: -960px -240px;
    }
    60% {
      background-position: -1200px -240px;
    }
    65% {
      background-position: -1440px -240px;
    }
    70% {
      background-position: -240px -480px;
    }
    75% {
      background-position: -240px -480px;
    }
    80% {
      background-position: -480px -480px;
    }
    85% {
      background-position: -720px -480px;
    }
    90% {
      background-position: -960px -480px;
    }
    95% {
      background-position: -1200px -480px;
    }
    100% {
      background-position: -1440px -480px;
    }
  }

  @keyframes explode-filters {
    0% {
      filter: blur(0px) brightness(1) contrast(1) sepia(0.75) saturate(1)
        hue-rotate(270deg);
      opacity: 1;
    }
    40% {
      filter: blur(0px) brightness(1) contrast(1) sepia(0.75) saturate(1)
        hue-rotate(270deg);
    }
    50% {
      opacity: 1;
      filter: blur(2px) brightness(1) contrast(1) sepia(1) saturate(2)
        hue-rotate(270deg);
    }
    75% {
      opacity: 1;
    }
    100% {
      filter: blur(12px) brightness(0.5) contrast(1) sepia(1) saturate(0)
        hue-rotate(270deg);
      opacity: 0;
    }
  }

  @keyframes explode-filters-2 {
    0% {
      filter: blur(0px) brightness(1) contrast(1) sepia(0.75) saturate(1)
        hue-rotate(190deg);
      opacity: 1;
    }
    40% {
      filter: blur(0px) brightness(1) contrast(1) sepia(0.75) saturate(1)
        hue-rotate(190deg);
    }
    50% {
      opacity: 1;
      filter: blur(2px) brightness(1) contrast(1) sepia(1) saturate(2)
        hue-rotate(190deg);
    }
    75% {
      opacity: 1;
    }
    100% {
      filter: blur(12px) brightness(0.5) contrast(1) sepia(1) saturate(0)
        hue-rotate(190deg);
      opacity: 0;
    }
  }

  .pkmn.exit .mon:before {
    animation-delay: 1.33s;
    animation-duration: 1s;
  }

  .pkmn.exit .explode,
  .pkmn.exit .explode:before {
    animation-delay: 1s;
    animation-duration: 0.75s;
  }

  @keyframes mon-poof {
    0% {
      opacity: 0;
      transform: scale(2);
      filter: blur(9px) contrast(0.25) brightness(0.65) sepia(1) saturate(3)
        hue-rotate(-90deg) contrast(2.2) brightness(5) blur(9px);
    }
    30% {
      opacity: 1;
    }
    75% {
      transform: scale(1);
      filter: blur(2px) contrast(0.25) brightness(0.65) sepia(1) saturate(4)
        hue-rotate(-90deg) contrast(2) brightness(4) blur(2px);
    }
    100% {
      opacity: 1;
      transform: scale(1);
      filter: blur(0px) contrast(1) brightness(1) sepia(0) saturate(1)
        hue-rotate(0deg) contrast(1) brightness(1) blur(0px);
    }
  }

  @keyframes mon-poof-2 {
    0% {
      opacity: 0;
      transform: scale(2);
      filter: blur(9px) contrast(0.3) brightness(0.7) sepia(1) saturate(4)
        hue-rotate(140deg) contrast(2.2) brightness(6) blur(9px);
    }
    30% {
      opacity: 1;
    }
    75% {
      transform: scale(1);
      filter: blur(2px) contrast(0.1) brightness(0.66) sepia(1) saturate(1)
        hue-rotate(140deg) contrast(2.2) brightness(6) blur(2px);
    }
    100% {
      opacity: 1;
      transform: scale(1);
      filter: blur(0px) contrast(1) brightness(1) sepia(0) saturate(1)
        hue-rotate(0deg) contrast(1) brightness(1) blur(0px);
    }
  }
</style>