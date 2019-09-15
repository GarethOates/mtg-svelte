<script>
	import { onUpdate } from 'svelte';

	export let cardList = [];
	export let maxCards = 0;

$: lands = cardList.filter(card => card.type == 'land');
$: creatures = cardList.filter(card => card.type == 'creature');

</script>

<div>
	<p>Selected Cards ({cardList.length}/{maxCards}):</p>
	<ul>
		{#each cardList as card}
			<li>{card.name}</li>
		{/each}
	</ul>
</div>

<div>
	<p>Lands: {lands}</p>
	<p>Creatures: {creatures}</p>
</div>