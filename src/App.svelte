<script>
	import CardList from './List.svelte';
	import Booster from './Booster.svelte';

	import { onMount } from 'svelte';

	const MAX_CARDS = 15;
	let selectedCards = [];

  async function cardSelected(event) {
    if (selectedCards.length < MAX_CARDS) {
      selectedCards = [
        ...selectedCards,
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
			selectedCards={selectedCards}
			on:cardSelected={cardSelected}
		/>
	</div>

	<div>
		<CardList cardList={selectedCards} maxCards={MAX_CARDS}></CardList>
	</div>
</div>