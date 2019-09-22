import { writable } from 'svelte/store';

const initialState = {
	selectedCards: [],
	selectedSetCode: "",
	currentBooster: []
}

export const mtgStore = writable(initialState);