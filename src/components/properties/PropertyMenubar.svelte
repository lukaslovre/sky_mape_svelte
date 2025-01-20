<script lang="ts">
  import EditIcon from "../../assets/icons/EditIcon.svelte";
  import SaveIcon from "../../assets/icons/SaveIcon.svelte";
  import SortIcon from "../../assets/icons/SortIcon.svelte";
  import SpreadsheetIcon from "../../assets/icons/SpreadsheetIcon.svelte";
  import StarIcon from "../../assets/icons/StarIcon.svelte";
  import TrashIcon from "../../assets/icons/TrashIcon.svelte";
  import type { MenuItem, Property } from "../../types";
  import Menubar from "../common/Menubar.svelte";

  interface Props {
    selectedPropertiesLength?: number;
    onMenuItemClick: (item: MenuItem) => void;
    cycleSortOption: () => void;
    currentSortOptionLabel: string;
  }

  let {
    selectedPropertiesLength = 0,
    onMenuItemClick,
    cycleSortOption,
    currentSortOptionLabel,
  }: Props = $props();

  // Menubar disabled items
  let menubarItems: MenuItem[] = $derived([
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
      label: `Sortiraj (${currentSortOptionLabel})`,
      icon: SortIcon,
      disabledIfCount: (count: number) => false,
    },
    {
      label: "Favoritiziraj",
      icon: StarIcon,
      disabledIfCount: (count: number) => count === 0,
    },
    // {
    //   label: "Spremi kao tablicu",
    //   icon: SpreadsheetIcon,
    //   disabledIfCount: (count: number) => false,
    // },
  ]);

  function handleItemClickLocal(item: MenuItem) {
    const buttonLabel = item.label;

    // If it shouldn't be clickable (disabled function true), return
    if (item.disabledIfCount(selectedPropertiesLength)) return;

    if (buttonLabel.startsWith("Sortiraj")) {
      cycleSortOption();
    } else {
      // Forward the event to the parent component
      onMenuItemClick(item);
    }
  }
</script>

<Menubar
  items={menubarItems}
  propertiesCount={selectedPropertiesLength}
  onMenuItemClick={handleItemClickLocal}
/>
