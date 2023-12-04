<script lang="ts">
  import {
    differenceInBusinessDays,
    differenceInHours,
    differenceInMilliseconds,
  } from "date-fns";
  import { writable } from "svelte/store";

  const start = new Date(2023, 11, 4, 9);
  const end = new Date(2023, 11, 8, 17);
  const totalHours = (differenceInBusinessDays(end, start) + 1) * 8;
  console.log(totalHours);
  const totalMilliseconds = totalHours * 3600000;

  const elapsed = writable(0);

  const remaining = writable("");

  const tick = () => {
    const now = Date.now();
    const days = differenceInBusinessDays(now, start);
    const thisMorning = new Date(now).setHours(9);
    const hours = differenceInHours(now, thisMorning) + days * 8;
    const milliseconds = differenceInMilliseconds(
      now,
      new Date(now).setMinutes(0, 0, 0)
    );
    elapsed.set(Math.min(hours * 3600000 + milliseconds, totalMilliseconds));

    const left = Math.max(
      totalMilliseconds - hours * 3600000 - milliseconds,
      0
    );
    const secondsLeft = Math.floor(left / 1000) % 60;
    const minutesLeft = Math.floor(left / 60000) % 60;
    const hoursLeft = Math.floor(left / 3600000);
    remaining.set(
      `${hoursLeft} hours, ${minutesLeft} minutes, ${secondsLeft} seconds`
    );
  };

  setInterval(tick, 100);
</script>

<div class="progress">
  <h1>Are we done yet?</h1>
  <progress value={$elapsed} max={totalMilliseconds} />
  <p>{$remaining} until freedom</p>
</div>

<style type="text/css">
  .progress {
    display: grid;
    gap: 1rem;
  }

  .progress h1 {
    font-family: "Rubik Bubbles", sans-serif;
    font-size: minmax(2em, 5vw);
    font-weight: 400;
    text-align: center;
    margin: 0;
    padding: 0;
  }

  .progress p {
    margin: 0;
    text-align: center;
    font-size: 1.5rem;
  }

  progress {
    width: 75vw;
    height: 2em;
    border: none;
    border-radius: 75vw;
    overflow: hidden;
    background-color: #fbc3c2;
  }

  progress::-webkit-progress-bar {
    background-color: #fbc3c2;
  }

  progress::-webkit-progress-value {
    background-color: #f38288;
  }

  progress::-moz-progress-bar {
    background-color: #f38288;
  }

  progress::-ms-fill {
    background-color: #f38288;
  }
</style>
