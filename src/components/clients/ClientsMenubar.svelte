<script lang="ts">
  import type { MenuItem } from "../../types";
  import EditIcon from "../../assets/icons/EditIcon.svelte";
  import SaveIcon from "../../assets/icons/SaveIcon.svelte";
  import SpreadsheetIcon from "../../assets/icons/SpreadsheetIcon.svelte";
  import TrashIcon from "../../assets/icons/TrashIcon.svelte";
  import Menubar from "../common/Menubar.svelte";

  interface Props {
    selectedClientsLength?: number;
    onMenuItemClick: (item: MenuItem) => void;
  }

  let { selectedClientsLength = 0, onMenuItemClick }: Props = $props();

  // TODO: See if this can be a const
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
    // {
    //   label: "Spremi kao tablicu",
    //   icon: SpreadsheetIcon,
    //   disabledIfCount: (count: number) => false,
    // },
  ]);

  function handleItemClickLocal(item: MenuItem) {
    // If it shouldn't be clickable (disabled function true), return
    if (item.disabledIfCount(selectedClientsLength)) return;

    onMenuItemClick(item);
  }
</script>

<Menubar
  items={menubarItems}
  propertiesCount={selectedClientsLength}
  onMenuItemClick={handleItemClickLocal}
/>
