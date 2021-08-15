<script>
  export let pokedata = {};

  $: [left, right] = pokedata;

  let stats = [
    { type: "hp", name: "HP", difference: 0, winner: undefined },
    { type: "atk", name: "attack", difference: 0, winner: undefined },
    { type: "def", name: "defense", difference: 0, winner: undefined },
    { type: "spatk", name: "sp. attack", difference: 0, winner: undefined },
    { type: "spdef", name: "sp. defense", difference: 0, winner: undefined },
    { type: "spd", name: "speed", difference: 0, winner: undefined }
  ];

  $: if (left.ready && right.ready) {
    left.data.stats.forEach((stat, i) => {
      if (stat.base_stat > right.data.stats[i].base_stat) {
        stats[i].winner = "left";
        stats[i].difference = stat.base_stat - right.data.stats[i].base_stat;
      } else if (stat.base_stat < right.data.stats[i].base_stat) {
        stats[i].winner = "right";
        stats[i].difference = right.data.stats[i].base_stat - stat.base_stat;
      } else {
        stats[i].winner = "same";
        stats[i].difference = 0;
      }
    });
  }
</script>


<section class="difference">

  {#each stats as stat}
    <div class="stat" 
      class:left="{stat.winner === 'left'}"
      class:right="{stat.winner === 'right'}"
      class:same="{stat.winner === 'same'}"
    >
      {#if stat.winner === 'same'}
        <span class="even">
          -
        </span>
      {:else}
        <span class="plus">
          +{stat.difference}
        </span>
        <span class="minus">
          -{stat.difference}
        </span>
      {/if}
    </div>
  {/each}

</section>


<style>
  .difference {
    padding: 10px;
    padding-top: 45px;
    padding-bottom: 20px;
    font-size: 14px;
    display: none;
    align-items: center;
    z-index: 1;
  }
  @media screen and (min-width: 900px) {
    .difference {
      display: grid;
    }
  }

  .stat {
    display: flex;
    justify-content: space-between;
    color: rgba(255, 255, 255, 0.25);
  }

  .stat.right {
    flex-direction: row-reverse;
  }
  .stat.same {
    justify-content: center;
  }
  .plus {
    color: rgba(30, 182, 63, 0.712);
  }
  .minus {
  }
  .even {
  }
</style>