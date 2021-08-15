<script>
  import { dex } from "../stores/sounds.js";
  import { getFlavour, getPokemon } from "../helpers/getPokemons.js";

  export let pokemon;
  export let pokemonData;
  export let panelId;
  export let flip = false;

  const sanitize = text => {
    return text
      .replace(/­\n/gi, "")
      .replace(/­/gi, "")
      .replace(/­/gi, "")
      .replace(//gi, " ")
      .replace(/\n/gi, " ");
  };

  let pokedex;
  let genus;
  let flavour;
  let speech;
  let type;
  let speak;

  const getEntry = async pokemon => {
    const pokedex = await getFlavour(pokemon);
    const pokedata = await getPokemon(pokemon);
    genus = pokedex.genera[0].genus;
    flavour = sanitize(
      pokedex.flavour[rando(pokedex.flavour.length)].flavor_text
    );
    speech = `${pokemon}. The ${genus}. ${flavour}`;
    type = pokedata.types[0].type.name;

    speak = () => {
      if (typeof $dex !== "undefined") {
        const entry = new SpeechSynthesisUtterance(speech);
        entry.voice = $dex.getVoices().filter(item => item.lang.match(/^en-/))[0];
        entry.pitch = 0.8;
        entry.rate = 1.25;
        entry.volume = 0.8;
        if ($dex.speaking) {
          $dex.pause();
          $dex.cancel();
        }
        $dex.speak(entry);
      }
    };
    return pokedex;
  };

  const rando = max => Math.floor(Math.random() * max);
</script>


{#if pokemon && pokemonData.ready}
  {#await getEntry( pokemon.name ) then data}
    <p class="pokedex-entry" on:click="{speak()}">
      <svg height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg">
          <path d="m17.972 3.054-12.366 4.946h-3.356c-1.24 0-2.25 1.01-2.25 2.25v2.75c0 1.178.925 2 2.25 2h.85l.908 6.356c.053.37.369.644.742.644h3c.214 0 .417-.091.56-.25.142-.159.21-.371.186-.584l-.59-5.246 10.065 4.026c.091.036.185.054.279.054.147 0 .295-.044.421-.129.206-.14.329-.372.329-.621v-15.5c0-.249-.123-.481-.329-.621-.207-.14-.469-.168-.699-.075z"/><path d="m21.219 9.336 2.5-2c.323-.259.376-.731.117-1.055-.26-.322-.731-.374-1.055-.117l-2.5 2c-.323.259-.376.731-.117 1.055.148.184.366.281.586.281.165 0 .33-.054.469-.164z"/><path d="m21.219 14.664c-.322-.257-.794-.205-1.055.117-.259.323-.206.796.117 1.055l2.5 2c.139.11.304.164.469.164.22 0 .438-.097.586-.281.259-.323.206-.796-.117-1.055z"/><path d="m23.25 11.25h-2.5c-.414 0-.75.336-.75.75s.336.75.75.75h2.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"/>
      </svg>
      The <span style="color: var(--{type});">{genus}</span>; {flavour}
    </p>
  {/await}
{/if}



<style>
  p {
    font-size: 16px;
    padding: 0 50px;
    color: rgb(166, 185, 201);
    text-align: center;
    orphans: 3;
    animation: drop 1s ease backwards 1;
    transition: all 0.3s ease;
    position: relative;
  }

  .pokedex-entry {
    cursor: pointer;
    opacity: 0.66;
  }

  .pokedex-entry:hover {
    opacity: 1;
  }
  .pokedex-entry:hover svg {
    opacity: 1;
  }

  svg {
    position: absolute;
    display: inline-block;
    width: 16px;
    height: auto;
    fill: rgb(166, 185, 201);
    opacity: 0.6;
    transition: all 0.3s ease;
    transform: translateX(-30px) translateY(2px);
  }

  @keyframes drop {
    0% {
      transform: translateY(-10px);
      opacity: 0;
    }
  }
</style>