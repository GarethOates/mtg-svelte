<script>
	import Card from './Card.svelte';
	import { onMount, createEventDispatcher } from 'svelte';
	import { mtgStore } from './stores/store.js';

	const dispatch = createEventDispatcher();

	export let maxCards;

	let url = 'https://api.magicthegathering.io/v1/sets/';
	let selectedSet;
	let booster;
	let cardSets;

	let fetching = false;

	onMount(async() => {
		let cardPromise = await fetch(url);

		cardSets = await cardPromise.json();
		cardSets = cardSets.sets.sort((a, b) => (a.name > b.name) ? 1 : -1);
	});

	async function fetchBooster() {
		let boosters;

		fetching = true;
		boosters = await fetch(boosterUrl);
		booster = await boosters.json();

		$mtgStore.currentBooster = booster.cards;

		fetching = false;
	}

	// Need to move this out into the Store.
	function reset() {
		$mtgStore.selectedCards = [];
		$mtgStore.selectedSetCode = "";
		$mtgStore.currentBooster = [];

		console.log($mtgStore.selectedCards);
	}

	async function cardSelected(event) {
		dispatch('cardSelected', event.detail);

		if ($mtgStore.selectedCards.length < maxCards) {
			await fetchBooster();
		}
		else {
			$mtgStore.currentBooster = [];
		}
	}

	$: boosterUrl = url + $mtgStore.selectedSetCode + '/booster';
	$: simFinished = $mtgStore.selectedCards.length == maxCards;
</script>

<style>
	.container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	button {
		margin-top: 10px;
	}
</style>

<p>Please choose from the following sets to generate a booster pack:</p>
{#if !cardSets}
<div class="spinner-border" role="status">
	<span class="sr-only">Loading...</span>
</div>
<p>Loading Sets...</p>
{:else}
	<select bind:value={$mtgStore.selectedSetCode} disabled={$mtgStore.selectedCards.length}>
		<option value='' selected>Please Choose...</option>
		{#each cardSets as cardset}
			<option value={cardset.code}>{cardset.name}</option>
		{/each}
	</select>
	{#if $mtgStore.selectedSetCode}
		<div>
			<button
				class="btn btn-primary"
				on:click={fetchBooster}
				disabled={$mtgStore.selectedCards.length}>
				Generate Booster
			</button>
			{#if simFinished}
			<button
				class="btn btn-primary"
				on:click={reset}>
				Reset
			</button>
			{/if}
		</div>
		{#if fetching}
			<div class="spinner-border" role="status">
				<span class="sr-only">Loading...</span>
			</div>
			<p>Loading Booster Pack...</p>
		{:else}
		{#if booster}
			{#if $mtgStore.currentBooster}
				{#if simFinished}
					<h2>Simulation Complete</h2>
				{:else}
					<h2>Select card {$mtgStore.selectedCards.length + 1}</h2>
				{/if}
				<div class="container">
				{#each $mtgStore.currentBooster as card}
					<Card card={card} on:selected={cardSelected} />
				{/each}
				</div>
			{:else}
				<p>No boosters available</p>
			{/if}
		{/if}
		{/if}
	{/if}
{/if}
