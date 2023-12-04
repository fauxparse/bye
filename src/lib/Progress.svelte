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

  const percentage = writable("");

  const tick = () => {
    const now = Date.now();
    const tonight = new Date(now).setHours(17, 0, 0, 0);
    const clipped = now < tonight ? now : tonight;
    const days = differenceInBusinessDays(clipped, start);
    const thisMorning = new Date(clipped).setHours(9);
    const hours =
      clipped < thisMorning
        ? 0
        : differenceInHours(clipped, thisMorning) + days * 8;
    const milliseconds =
      clipped < thisMorning
        ? 0
        : differenceInMilliseconds(
            clipped,
            new Date(clipped).setMinutes(0, 0, 0)
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

    percentage.set(
      `${(
        ((hours * 3600000 + milliseconds) * 100.0) /
        totalMilliseconds
      ).toFixed(3)}%`
    );
  };

  setInterval(tick, 100);
</script>

<div class="progress">
  <h1>Are we done yet?</h1>
  <progress value={$elapsed} max={totalMilliseconds} />
  <p>{$remaining} until freedom</p>
  <b>{$percentage}</b>
</div>

<style type="text/css">
  .progress {
    display: grid;
    gap: 1rem;
  }

  .progress h1 {
    font-family: "Rubik Bubbles", sans-serif;
    font-size: 5rem;
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

  .progress b {
    display: block;
    text-align: center;
    font-weight: 500;
    font-size: 2rem;
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
