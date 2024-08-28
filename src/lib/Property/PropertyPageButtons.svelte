<script lang="ts">
  import SecondaryButton from "../General components/SecondaryButton.svelte";
  import ColoredButton from "../General components/ColoredButton.svelte";
  import SpreadsheetIcon from "../../assets/icons/SpreadsheetIcon.svelte";
  import SaveIcon from "../../assets/icons/SaveIcon.svelte";
  import SortIcon from "../../assets/icons/SortIcon.svelte";
  import axios from "axios";
  import type { Property } from "../../types";
  import { filteredProperties } from "../../store";

  export let setSortOption: (option: keyof Property) => void;

  const sortOptions: (keyof Property)[] = ["surfaceArea", "price", "created"];

  let selectedSortOptionIndex: number = 0;

  $: setSortOption(sortOptions[selectedSortOptionIndex]);

  function changeSortOption() {
    selectedSortOptionIndex = (selectedSortOptionIndex + 1) % sortOptions.length;
  }

  //  Save to spreadsheet

  // make a POST request to localhost:3000 with the data in the body
  async function saveToSpreadsheet() {
    const spreadsheetUrl = "http://49.13.64.0:9993";

    try {
      const response = await axios.post(spreadsheetUrl, $filteredProperties);

      const filePath = response.data;

      console.log("Generated file on location", filePath);

      // Go to the url that was sent back in the response, so that it downloads the file
      window.location.href = `${spreadsheetUrl}/${filePath}`;
    } catch (error) {
      console.log(error);
    }
  }
</script>

<div class="buttons-container">
  <div>
    <SecondaryButton text="Spremi novu nekretninu">
      <SaveIcon size={24} color={"#1a1a1a"} />
    </SecondaryButton>

    <SecondaryButton
      text={`Sortiraj (po ${sortOptions[selectedSortOptionIndex]})`}
      onClick={changeSortOption}
    >
      <SortIcon size={24} color={"#1a1a1a"} />
    </SecondaryButton>
  </div>

  <ColoredButton text="Spremi kao tablicu" color="#067925" onClick={saveToSpreadsheet}>
    <SpreadsheetIcon size={24} />
  </ColoredButton>
</div>

<style>
  .buttons-container {
    display: flex;
    justify-content: space-between;
  }
  .buttons-container > div {
    display: flex;
    column-gap: 1.25rem;
  }
</style>
