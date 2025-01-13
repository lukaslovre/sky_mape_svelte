<script lang="ts">
  import EditIcon from "../../assets/icons/EditIcon.svelte";
  import SaveIcon from "../../assets/icons/SaveIcon.svelte";
  import SortIcon from "../../assets/icons/SortIcon.svelte";
  import SpreadsheetIcon from "../../assets/icons/SpreadsheetIcon.svelte";
  import TrashIcon from "../../assets/icons/TrashIcon.svelte";
  import type { MenuItem, Property } from "../../types";
  import Menubar from "../common/Menubar.svelte";

  interface Props {
    selectedPropertiesLength?: number;
    onSortClick: (sortOption: keyof Property) => void;
    onMenuItemClick: (item: MenuItem) => void;
  }

  let { selectedPropertiesLength = 0, onSortClick, onMenuItemClick }: Props = $props();

  // Property sorting
  const sortOptions: (keyof Property)[] = [
    "surfaceArea",
    "price",
    "created",
    "bathrooms",
    "bedrooms",
  ];
  let selectedSortOptionIndex: number = 0;

  function cycleSortOption() {
    selectedSortOptionIndex = (selectedSortOptionIndex + 1) % sortOptions.length;
  }

  function updateSortLabel(index: number) {
    menubarItems = menubarItems.map((item) => {
      if (item.label.startsWith("Sortiraj")) {
        item.label = `Sortiraj (${sortOptions[index]})`;
      }
      return item;
    });
  }

  function handleItemClickLocal(item: MenuItem) {
    const buttonLabel = item.label;

    // Handle sorting in-component because of changing the label
    if (buttonLabel.startsWith("Sortiraj")) {
      cycleSortOption();
      updateSortLabel(selectedSortOptionIndex);
      onSortClick(sortOptions[selectedSortOptionIndex]);
    } else {
      // Forward the event to the parent component
      onMenuItemClick(item);
    }
  }

  // Menubar disabled items
  let menubarItems: MenuItem[] = $state([
    {
      label: "Dodaj",
      icon: SaveIcon,
      disabledIfCount: (count: number) => count > 0,
    },
    {
      label: "Uredi",
      icon: EditIcon,
      disabledIfCount: (count: number) => count !== 1,
    },
    {
      label: "Obriši",
      icon: TrashIcon,
      disabledIfCount: (count: number) => count === 0,
    },
    {
      label: "Sortiraj",
      icon: SortIcon,
      disabledIfCount: (count: number) => false,
    },
    {
      label: "Spremi kao tablicu",
      icon: SpreadsheetIcon,
      disabledIfCount: (count: number) => false,
    },
  ]);
</script>

<Menubar
  items={menubarItems}
  propertiesCount={selectedPropertiesLength}
  onMenuItemClick={handleItemClickLocal}
/>
