<script>
	import Card from './card.svelte';

	let url = 'https://api.magicthegathering.io/v1/sets/';
	let cardPromise = fetch(url);

	let selectedSet;
	let booster;
	let totalPrice = 0;

	$: boosterUrl = url + selectedSet + '/booster';

	async function fetchBooster() {
		booster = await fetch(boosterUrl);
	}

	function sumPrice(event) {
		totalPrice += parseFloat(event.detail);
	}
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

{#await cardPromise}
	<p>Loading Sets...</p>
{:then cardPromise}
	{#await cardPromise.json()}
	{:then cardsets}
		<select bind:value={selectedSet}>
			<option value=''>Please Choose...</option>
			{#each cardsets.sets as cardset}
				<option value={cardset.code}>{cardset.name}</option>
			{/each}
		</select>

		{#if selectedSet}
			<p><button on:click={fetchBooster}>Generate Booster</button></p>
			{#if booster}
				{#await booster.json()}
				{:then booster}
					{#if booster.cards}
						<p>Total value: ${parseFloat(totalPrice).toFixed(2)}</p>
						<div class="container">
						{#each booster.cards as card}
								<Card card={card} on:price={sumPrice} />
						{/each}
						</div>
					{:else}
						<p>No cards available from this set.</p>
					{/if}
				{/await}
			{/if}
		{/if}
	{/await}
{/await}