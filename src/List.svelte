<script>
	export let cardList = [];
	export let maxCards = 0;
</script>

<div>
<p>Selected Cards ({cardList.length}/{maxCards}):</p>
	<ul>
		{#each cardList as card}
			<li>{card.name} - {card.type} - {card.manaCost}</li>
		{/each}
	</ul>
</div>