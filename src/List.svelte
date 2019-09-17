<script>
	import CardType from './CardType.svelte';

	export let cardList = [];
	export let maxCards = 0;
</script>

<div>
	<p>Selected Cards ({cardList.length}/{maxCards}):</p>
	<ul>
		{#each cardList as card}
			<li>{card.name}</li>
		{/each}
	</ul>
</div>

<CardType cardList={cardList} type='land' />