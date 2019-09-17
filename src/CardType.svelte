<script>
  export let cardList = [];
  export let type = "";

  $: count = cardList.filter(containsType(type)).length;

  function containsType(type) {
    return function(card) {
      return card.type.toLowerCase().includes(type);
    }
  }

  function capitalise(word) {
    return word[0].toUpperCase() + word.slice(1);
  }

</script>

<div>
	<p>{capitalise(type)}: {count}</p>
</div>