<script lang="ts">
  import DropdownInput from "./DropdownInput.svelte";
  import MinMaxInput from "./MinMaxInput.svelte";

  let action: string[] = [];
  let type: string[] = [];
  let minPrice: number = 0;
  let maxPrice: number = 0;
  let minArea: number = 0;
  let maxArea: number = 0;

  $: {
    console.log(action, type, minPrice, maxPrice, minArea, maxArea);
    const parsedValues = parseInputValues();
    console.log(parsedValues);
  }

  function parseInputValues() {
    const parsedValues = {
      action: action || [],
      type: type || [],
      minPrice: minPrice || 0,
      maxPrice: maxPrice || Infinity,
      minArea: minArea || 0,
      maxArea: maxArea || Infinity,
    };

    return parsedValues;
  }
</script>

<div class="filters-container">
  <DropdownInput
    label="Akcija"
    id="action"
    options={["Prodaja", "Izdavanje"]}
    bind:values={action}
  />

  <DropdownInput
    label="Tip nekretnine"
    id="type"
    options={["Stan", "Kuća", "Poslovni prostor", "Zemljište"]}
    bind:values={type}
  />

  <MinMaxInput
    label="Cijena (€)"
    id="price"
    bind:minValue={minPrice}
    bind:maxValue={maxPrice}
  />

  <MinMaxInput
    label="Površina (m2)"
    id="area"
    bind:minValue={minArea}
    bind:maxValue={maxArea}
  />
</div>

<style>
  .filters-container {
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 1rem;
  }
</style>
