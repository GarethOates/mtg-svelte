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
<CardType cardList={cardList} type='creature' />
<CardType cardList={cardList} type='sorcery' />
<CardType cardList={cardList} type='enchantment' />
<CardType cardList={cardList} type='instant' />