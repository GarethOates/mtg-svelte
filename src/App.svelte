<script>
	import CardList from './List.svelte';
  import Booster from './Booster.svelte';
  import { mtgStore } from './stores/store.js';

	const MAX_CARDS = 2;

	function cardSelected(event) {
		if ($mtgStore.selectedCards.length < MAX_CARDS) {
			$mtgStore.selectedCards = [
				...$mtgStore.selectedCards,
				event.detail
			]
		}
	}
</script>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: 70% 30%;
		grid-template-rows: 30% 70%;
	}
</style>

<div class="wrapper">
	<div>
		<h1>Magic: The Gathering Draft Simulator</h1>
		<Booster
			maxCards={MAX_CARDS}
			selectedCards={$mtgStore.selectedCards}
			on:cardSelected={cardSelected}
		/>
	</div>

	<div>
		<CardList cardList={$mtgStore.selectedCards} maxCards={MAX_CARDS}></CardList>
	</div>
</div>