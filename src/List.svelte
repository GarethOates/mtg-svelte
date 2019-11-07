<script>
	import CardType from './CardType.svelte';
	import { mtgStore } from './stores/store.js';

	export let maxCards = 0;
</script>

<div>
	<p>Selected Cards ({$mtgStore.selectedCards.length}/{maxCards}):</p>
	<ul>
		{#each $mtgStore.selectedCards as card}
			<li>{card.name}</li>
		{/each}
	</ul>
</div>

<CardType type='land' />
<CardType type='creature' />
<CardType type='sorcery' />
<CardType type='enchantment' />
<CardType type='instant' />