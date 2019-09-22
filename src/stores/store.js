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
    update,
    reset: () => set(initialState)
  };
}

export const mtgStore = createStore();