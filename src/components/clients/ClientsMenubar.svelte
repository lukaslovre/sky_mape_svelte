<script lang="ts">
  import { run } from 'svelte/legacy';

  import type { MenuItem } from "../../types";
  import EditIcon from "../../assets/icons/EditIcon.svelte";
  import SaveIcon from "../../assets/icons/SaveIcon.svelte";
  import SpreadsheetIcon from "../../assets/icons/SpreadsheetIcon.svelte";
  import TrashIcon from "../../assets/icons/TrashIcon.svelte";
  import Menubar from "../common/Menubar.svelte";

  interface Props {
    selectedClientsLength?: number;
    handleItemClick: (event: CustomEvent<MenuItem>) => void;
  }

  let { selectedClientsLength = 0, handleItemClick }: Props = $props();

  let menubarItems: MenuItem[] = $state([
    { label: "Dodaj", icon: SaveIcon, disabled: false },
    { label: "Uredi", icon: EditIcon, disabled: true },
    { label: "Obriši", icon: TrashIcon, disabled: true },
    { label: "Spremi kao tablicu", icon: SpreadsheetIcon, disabled: false },
  ]);


  function updateMenubarItems(rowsSelected: number) {
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
  //   When the number of selected clients changes, update the menubar items disabled state
  run(() => {
    updateMenubarItems(selectedClientsLength);
  });
</script>

<Menubar items={menubarItems} on:itemClick={handleItemClick} />
