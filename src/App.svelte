<script>
	import Card from './card.svelte';
	import { onMount } from 'svelte';

	let url = 'https://api.magicthegathering.io/v1/sets/';

	let totalPrice;
	let selectedSet;
	let booster;
	let cardSets;

	onMount(async() => {
		let cardPromise = await fetch(url);
		cardSets = await cardPromise.json();
	});

	async function fetchBooster() {
		booster = undefined;
		totalPrice = 0;
		let boosters = await fetch(boosterUrl);
		booster = await boosters.json();
	}

	function sumPrice(event) {
		totalPrice += parseFloat(event.detail);
	}

	$: boosterUrl = url + selectedSet + '/booster';
	$: totalPriceLabel = parseFloat(totalPrice).toFixed(2);
</script>

<style>
	.container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
</style>

<h1>Magic: The Gathering Booster Generator</h1>
<p>Please choose from the following sets to generate a booster pack:</p>

{#if !cardSets}
	<p>Loading Sets...</p>
{:else}
	<select bind:value={selectedSet}>
		<option value=''>Please Choose...</option>
		{#each cardSets.sets as cardset}
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
						<Card card={card} on:price={sumPrice} />
				{/each}
				</div>
			{:else}
				<p>No boosters available</p>
			{/if}
		{/if}
	{/if}
{/if}
