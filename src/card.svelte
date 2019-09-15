<script>
	import { createEventDispatcher } from 'svelte';

	export let card;

	const dispatch = createEventDispatcher();

	function cardSelected() {
		dispatch('selected', card);
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
</style>

<div on:click={cardSelected}>
	<img alt='image of {card.name}' src='{card.imageUrl}'>
</div>
