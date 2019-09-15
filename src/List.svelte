<script>
	export let cardList = [];
	export let maxCards = 0;
</script>

<div>
<p>Selected Cards ({cardList.length}/{maxCards}):</p>
	<ul>
		{#each cardList as card}
			<li>{card.name} - {card.type} {#if card.manaCost}- {card.manaCost}{/if}</li>
		{/each}
	</ul>
</div>