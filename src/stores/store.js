import { writable } from 'svelte/store';

const initialState = {
	selectedCards: [],
	selectedSetCode: "",
	currentBooster: []
}

function createStore() {
	const { subscribe, set, update } = writable(initialState);

	return {
		subscribe,
		set,
		update
	};
}

export const mtgStore = createStore();