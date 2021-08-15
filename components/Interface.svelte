<script>
  import { hires } from "../stores/fidelity.js";
  import { sounds } from "../stores/sounds.js";
  import {
    pokemonStore1,
    pokemonStore2,
    pokemonData1,
    pokemonData2
  } from "../stores/selected.js";
  import Panel from "./Panel.svelte";
  import Difference from "./Difference.svelte";
  import Pokemon from "./Pokemon.svelte";

  let audio;

  $: if ($sounds && audio) {
    audio.volume = 0.04;
    audio.play();
  } else if (audio) {
    audio.pause();
  }
</script>

<section class="options">
  <label for="threeD">
    <input name="threeD" id="threeD" 
      type="checkbox" bind:checked="{ $hires }" />
    Show 3D sprites?
  </label>
  <label for="sounds">
    <input name="sounds" id="sounds" 
      type="checkbox" bind:checked="{ $sounds }" />
    Play sounds?
  </label>
</section>

<section class="interface">
  
  <img class="logo" src="pokemon-logo.png" alt="pokemon company logo" />
  <Panel bind:pokemonStore="{$pokemonStore1}" pokemonData="{$pokemonData1}" panelId="1" flip />
  <Difference pokedata="{[$pokemonData1,$pokemonData2]}" />
  <Panel bind:pokemonStore="{$pokemonStore2}" pokemonData="{$pokemonData2}" panelId="2" />

</section>

<audio bind:this="{audio}" 
  src="http://play.pokemonshowdown.com/audio/hgss-kanto-trainer.ogg" />

<ul class="credits">
  <li><a href="https://codesandbox.io/s/practical-leakey-g43pc" target="_blank">Svelte Source Code</a></li>
  <li>Heavily inspired by <a href="https://codepen.io/sharnajh/details/PoNbbww" target="_blank">Sharna Hossain</a></li>
  <li>Icons made by <a href="https://www.freepik.com" target="_blank" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" target="_blank" title="Flaticon">www.flaticon.com</a></li>
</ul>

<style>
  .interface {
    display: grid;
    grid-template-columns: auto;
    padding: 20px;
  }
  @media screen and (min-width: 900px) {
    .interface {
      grid-template-columns: minmax(360px, 1fr) 120px minmax(360px, 1fr);
      grid-template-areas:
        "pokemon1 stats pokemon2"
        "pokedex1 . pokedex2";
    }
  }
  .options {
    background: rgba(0, 0, 0, 0.2);
    padding: 20px;
    user-select: none;
  }
  label {
    margin-right: 20px;
  }
  .logo {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%) translateY(20%);
    max-width: 80vw;
    opacity: 0.1;
    mix-blend-mode: multiply;
    z-index: 0;
    pointer-events: none;
  }
  .credits {
    font-size: 13px;
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
    line-height: 1.2;
    opacity: 0.6;
    transition: all 0.2s ease;
    list-style: none;
    margin: 0;
    display: flex;
    justify-content: center;
  }
  .credits:hover {
    opacity: 1;
  }
  .credits li {
    margin: 0;
    padding: 0 15px;
  }
  .credits li:not(:last-child) {
    border-right: 1px solid rgba(255, 255, 255, 0.3);
  }
  a {
    color: #ccc;
  }
</style>
