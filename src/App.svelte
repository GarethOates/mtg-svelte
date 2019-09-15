<script>
	import Card from './card.svelte';
	import CardList from './List.svelte';
	import { onMount } from 'svelte';

	const MAX_CARDS = 15;

	let url = 'https://api.magicthegathering.io/v1/sets/';

	let totalPrice;
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
		totalPrice = 0;

		boosters = await fetch(boosterUrl);
		booster = await boosters.json();
	}

	function sumPrice(event) {
		totalPrice += parseFloat(event.detail);
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
	$: totalPriceLabel = parseFloat(totalPrice).toFixed(2);
	$: selectedCards = [];
</script>

<style>
	.container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
</style>

<h1>Magic: The Gathering Draft Simulator</h1>
<p>Please choose from the following sets to generate a booster pack:</p>

{#if !cardSets}
	<p>Loading Sets...</p>
{:else}
	<select bind:value={selectedSet}>
		<option value=''>Please Choose...</option>
		{#each cardSets as cardset}
			<option value={cardset.code}>{cardset.name}</option>
		{/each}
	</select>
	{#if selectedSet}
		<p><button on:click={fetchBooster}>Generate Booster</button></p>
		{#if booster}
			{#if booster.cards}
				<p>Total value: ${totalPriceLabel}</p>
				<div class="container">
				{#each booster.cards as card}
						<Card card={card} on:price={sumPrice} on:click={cardSelected} />
				{/each}
				</div>
			{:else}
				<p>No boosters available</p>
			{/if}
		{/if}
	{/if}
{/if}
{#if selectedCards.length > 0}
	<CardList cardList={selectedCards} maxCards={MAX_CARDS}></CardList>
{/if}