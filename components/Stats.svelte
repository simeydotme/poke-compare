<script>
  import Pokeball from "./Pokeball.svelte";
  export let pokemonData;

  const max = 160;
  let saturation = 60;
  let lightness = 68;

  let stats = [
    { type: "hp", name: "HP", value: 0 },
    { type: "atk", name: "attack", value: 0 },
    { type: "def", name: "defense", value: 0 },
    { type: "spatk", name: "sp. attack", value: 0 },
    { type: "spdef", name: "sp. defense", value: 0 },
    { type: "spd", name: "speed", value: 0 }
  ];

  $: if (pokemonData.ready) {
    pokemonData.data.stats.forEach((stat, i) => {
      stats[i].value = stat.base_stat;
    });
  }

  $: isLoading = !pokemonData.ready;
</script>

<section class="stats">
  {#each stats as stat,i}
    <div class="stat-wrapper { stat.type }" class:isLoading>
      <div class="bar">
        <p class="text">
          { stat.name }
        </p>
        <div class="stat">
          <div class="value" 
            style="width: { stat.value / max * 100 }%; transition-delay: {i*50}ms">
          </div>
        </div>
      </div>
      <div class="number">
        <span>{ stat.value }</span>
      </div>
    </div>
  {/each}
</section>

<style>
  :root {
    --hp: hsl(342, 60%, 68%);
    --atk: hsl(30, 60%, 68%);
    --def: hsl(64, 60%, 68%);
    --spatk: hsl(268, 60%, 68%);
    --spdef: hsl(140, 60%, 68%);
    --spd: hsl(300, 60%, 68%);
  }
  .stats {
    grid-area: stats;
    display: grid;
    border-radius: 20px;
    text-align: center;
    padding: 10px;
    padding-left: 0;
    position: relative;
  }
  :global(.flip) .stats {
    padding-right: 0;
  }
  .stat-wrapper {
    color: rgb(174, 179, 190);
    text-align: left;
    text-transform: uppercase;
    font-size: 11px;
    text-shadow: 0.1em 0.1em 0 rgba(0, 0, 0, 0.568);
    display: grid;
    grid-template-columns: 36px auto;
    grid-template-areas: "stat bar";
    align-items: center;
    transition: opacity 0.3s ease;
  }
  .stat-wrapper.isLoading {
    opacity: 0.5;
  }
  :global(.flip) .stat-wrapper {
    text-align: right;
    grid-template-columns: auto 36px;
    grid-template-areas: "bar stat";
  }
  .bar {
    grid-area: bar;
  }
  .number {
    grid-area: stat;
    font-size: 17px;
    text-align: center;
  }
  .text {
    margin: 5px 5px 2px 5px;
  }
  .number {
    letter-spacing: 1px;
  }
  .hp .number {
    color: var(--hp);
  }
  .atk .number {
    color: var(--atk);
  }
  .def .number {
    color: var(--def);
  }
  .spatk .number {
    color: var(--spatk);
  }
  .spdef .number {
    color: var(--spdef);
  }
  .spd .number {
    color: var(--spd);
  }
  .stat {
    background: rgba(0, 0, 0, 0.25);
    height: 14px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 2px;
  }
  :global(.flip) .stat {
    justify-content: flex-end;
  }
  .value {
    background: rgba(255, 255, 255, 0.226);
    border-radius: 14px;
    height: 8px;
    width: 50%;
    will-change: width;
    transition: width 0.66s ease;
    box-shadow: inset 55px 0px 30px -35px rgba(0, 0, 0, 0.3);
  }
  :global(.flip) .value {
    box-shadow: inset -55px 0px 30px -35px rgba(0, 0, 0, 0.3);
  }
  .hp .value {
    background-color: var(--hp);
  }
  .atk .value {
    background-color: var(--atk);
  }
  .def .value {
    background-color: var(--def);
  }
  .spatk .value {
    background-color: var(--spatk);
  }
  .spdef .value {
    background-color: var(--spdef);
  }
  .spd .value {
    background-color: var(--spd);
  }
</style>
