<script>
	import Card from './card.svelte';
	import CardList from './List.svelte';
	import { onMount } from 'svelte';

	const MAX_CARDS = 15;

	let url = 'https://api.magicthegathering.io/v1/sets/';
	let selectedSet;
	let booster;
	let cardSets;

	onMount(async() => {
		let cardPromise = await fetch(url);

		cardSets = await cardPromise.json();
		cardSets = cardSets.sets.sort((a, b) => (a.name > b.name) ? 1 : -1);
	});

	async function fetchBooster() {
		let boosters;

		booster = undefined;
		boosters = await fetch(boosterUrl);
		booster = await boosters.json();
	}

	async function cardSelected(event) {
		console.log(event.detail);

		if (selectedCards.length < MAX_CARDS) {
			selectedCards = [
				...selectedCards,
				event.detail
			]

			await fetchBooster();
		}
	}

	$: boosterUrl = url + selectedSet + '/booster';
	$: selectedCards = [];
</script>

<style>
	.container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.wrapper {
		display: grid;
		grid-template-columns: 70% 30%;
		grid-template-rows: 30% 70%;
	}
</style>

<div class="wrapper">
	<div>
		<h1>Magic: The Gathering Draft Simulator</h1>
		<p>Please choose from the following sets to generate a booster pack:</p>

		{#if !cardSets}
			<p>Loading Sets...</p>
		{:else}
			{#if selectedCards.length == 0}
			<select bind:value={selectedSet}>
				<option value=''>Please Choose...</option>
				{#each cardSets as cardset}
					<option value={cardset.code}>{cardset.name}</option>
				{/each}
			</select>
			{:else}
				<p>{selectedSet}</p>
			{/if}
			{#if selectedSet}
				<p><button on:click={fetchBooster}>Generate Booster</button></p>
				{#if booster}
					{#if booster.cards}
						<h2>Select a card</h2>
						<div class="container">
						{#each booster.cards as card}
								<Card card={card} on:click={cardSelected} />
						{/each}
						</div>
					{:else}
						<p>No boosters available</p>
					{/if}
				{/if}
			{/if}
		{/if}
	</div>

	<div>
		<CardList cardList={selectedCards} maxCards={MAX_CARDS}></CardList>
	</div>
</div>