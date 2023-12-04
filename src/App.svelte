<script lang="ts">
  import Progress from "./lib/Progress.svelte";
</script>

<main>
  <div class="card">
    <Progress />
  </div>
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Rubik+Bubbles&family=Rubik:wght@500&display=swap");

  :global(body) {
    background: #7dc2ad;
    color: #229e9e;
    font-family: "Rubik", sans-serif;
    font-weight: 500;

    display: grid;
    place-content: center;
    min-height: 100vh;
  }
</style>
