<script lang="ts">
  import EditIcon from "../../assets/icons/EditIcon.svelte";
  import SaveIcon from "../../assets/icons/SaveIcon.svelte";
  import SortIcon from "../../assets/icons/SortIcon.svelte";
  import SpreadsheetIcon from "../../assets/icons/SpreadsheetIcon.svelte";
  import TrashIcon from "../../assets/icons/TrashIcon.svelte";
  import type { MenuItem, Property } from "../../types";
  import Menubar from "../common/Menubar.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let selectedPropertiesLength: number = 0;
  export let handleItemClick: (event: CustomEvent<MenuItem>) => void;

  // Property sorting
  let selectedSortOptionIndex: number = 0;
  const sortOptions: (keyof Property)[] = [
    "surfaceArea",
    "price",
    "created",
    "bathrooms",
    "bedrooms",
  ];

  function changeSortOption() {
    selectedSortOptionIndex = (selectedSortOptionIndex + 1) % sortOptions.length;
    updateSortLabel(selectedSortOptionIndex);
  }

  function updateSortLabel(index: number) {
    menubarItems = menubarItems.map((item) => {
      if (item.label.startsWith("Sortiraj")) {
        item.label = `Sortiraj (${sortOptions[index]})`;
      }
      return item;
    });
  }

  //   Handle sort option click in-component, otherwise forward the event to the parent component
  function handleItemClickLocal(event: CustomEvent<MenuItem>) {
    const buttonLabel = event.detail.label;

    console.log(`${buttonLabel} label clicked.`);

    // Handle sorting in-component because of changing the label
    if (buttonLabel.startsWith("Sortiraj")) {
      changeSortOption();
      dispatch("sortProperties", sortOptions[selectedSortOptionIndex]);
    } else {
      // Forward the event to the parent component
      handleItemClick(event);
    }
  }

  // Menubar disabled items
  let menubarItems: MenuItem[] = [
    { label: "Dodaj", icon: SaveIcon, disabled: false },
    { label: "Uredi", icon: EditIcon, disabled: true },
    { label: "Obriši", icon: TrashIcon, disabled: true },
    { label: "Sortiraj", icon: SortIcon, disabled: false },
    { label: "Spremi kao tablicu", icon: SpreadsheetIcon, disabled: false },
  ];

  //   When the number of selected properties changes, update the menubar items disabled state
  $: updateMenubarItems(selectedPropertiesLength);

  function updateMenubarItems(rowsSelected: number) {
    console.log("updateMenubarItems", rowsSelected);
    // Set all to enabled
    menubarItems.map((item) => {
      item.disabled = false;
      return item;
    });

    // Now apply rules based on the number of rows selected
    if (rowsSelected === 0) {
      setItemWithLabelToDisabled("Uredi");
      setItemWithLabelToDisabled("Obriši");
    }
    if (rowsSelected > 1) {
      setItemWithLabelToDisabled("Uredi");
    }

    // trigger re-render
    menubarItems = menubarItems;
  }

  function setItemWithLabelToDisabled(label: string) {
    menubarItems.map((item) => {
      if (item.label === label) {
        item.disabled = true;
      }
      return item;
    });
  }
</script>

<Menubar items={menubarItems} on:itemClick={handleItemClickLocal} />
