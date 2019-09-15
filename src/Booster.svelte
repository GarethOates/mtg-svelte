<script>
	import Card from './card.svelte';
	import { onMount, createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let selectedCards;
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

		booster = undefined;
		boosters = await fetch(boosterUrl);
		booster = await boosters.json();

		fetching = false;
	}

	async function cardSelected(event) {
		if (selectedCards.length < maxCards) {
			dispatch('cardSelected', event.detail);

			await fetchBooster();
		}
	}

	$: boosterUrl = url + selectedSet + '/booster';
	$: selectedCardsLength = selectedCards.length;
</script>

<style>
	.container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
</style>

<p>Please choose from the following sets to generate a booster pack:</p>
{#if !cardSets}
		<p>Loading Sets...</p>
{:else}
	<select bind:value={selectedSet} disabled={selectedCardsLength}>
		<option value='' selected>Please Choose...</option>
		{#each cardSets as cardset}
			<option value={cardset.code}>{cardset.name}</option>
		{/each}
	</select>
	{#if selectedSet}
		<p>
			<button
				on:click={fetchBooster}
				disabled={selectedCardsLength}>
				Generate Booster
			</button>
		</p>
		{#if fetching}
			<p>Loading booster pack...</p>
		{:else}
		{#if booster}
			{#if booster.cards}
				<h2>Select card {selectedCardsLength + 1}</h2>
				<div class="container">
				{#each booster.cards as card}
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
