import { readable, writable } from "svelte/store";

const sounds = writable(false);
const dex = readable(window.speechSynthesis);

export { sounds, dex };
