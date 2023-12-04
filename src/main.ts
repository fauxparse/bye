import App from "./App.svelte";

const app = new App({
	// biome-ignore lint/style/noNonNullAssertion: if it's not there we're fucked anyway
	target: document.getElementById("app")!,
});

export default app;
