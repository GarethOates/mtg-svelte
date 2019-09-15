<script>
	import { onMount, createEventDispatcher } from 'svelte';

	export let card;
	const dispatch = createEventDispatcher();

	let price;

	onMount(async() => {
		let details = await fetch('https://api.scryfall.com/cards/search?order=name&q=!"' + card.name + '"');
		let response = await details.json();

		if (!response.status && response.data[0].prices.usd) {
			price = response.data[0].prices.usd;

			dispatch('price', price);
		}
	});

	function cardSelected() {
		dispatch('click', card);
	}
</script>

<style>
	img {
			padding: 0px 25px 0px 0px;
	}

	div {
		text-align: center;
		display: inline-block;
	}

	p {
		margin: 0px 0px 10px 0px;
	}
</style>

<div>
	<div on:click={cardSelected}>
		<img alt='image of {card.name}' src='{card.imageUrl}'>
	</div>
	{#if price}<p>${price}</p>{/if}
</div>