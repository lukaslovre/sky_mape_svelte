<!-- Ovo je namijenjeno prvo kao generalni table ali mislim da ću specificirati za popis kupaca samo -->

<script lang="ts">
  // Table
  // ├── TableHeader
  // │   ├── SelectAllCheckbox
  // │   └── ColumnHeaders
  // ├── TableBody
  // │   ├── TableRow
  // │   │   ├── RowCheckbox
  // │   │   ├── RowData
  // │   │   │   ├── DataCell
  // │   │   │   ├── CopyableCell
  // │   │   │   └── FiltersButton
  // └── Popup

  import type { UserData } from "../../types";
  import type { parsePocketbaseUserData } from "../../utils/buyers";
  import TableBody from "./TableBody/TableBody.svelte";
  import TableHeader from "./TableHeader/TableHeader.svelte";

  export let showHeader: boolean = true;
  export let data: UserData[] = [];

  type ParsedUserData = ReturnType<typeof parsePocketbaseUserData>[0];

  let checkboxes: Record<string, boolean> = {};
  let selectAllCheckboxState: boolean = false;

  function toggleSelectAllCheckbox() {
    selectAllCheckboxState = !selectAllCheckboxState;
  }

  $: if (selectAllCheckboxState === true) {
    checkboxes = data.reduce((acc, user) => {
      acc[user.id] = true;
      return acc;
    }, {});
  } else {
    checkboxes = {};
  }

  const columnOrder: (keyof ParsedUserData)[] = [
    "id",
    "name",
    "email",
    "phone",
    "note",
    "created",
    "updated",
    "favoriteProperties",
    "filters",
  ];

  const columnNames: Record<keyof ParsedUserData, string> = {
    id: "ID",
    name: "Ime",
    email: "Email",
    phone: "Telefon",
    note: "Napomena",
    created: "Kreirano",
    updated: "Ažurirano",
    favoriteProperties: "Favoriti",
    filters: "Filteri",
  };
</script>

<section class="table-container">
  <table>
    {#if showHeader}
      <TableHeader
        {toggleSelectAllCheckbox}
        {selectAllCheckboxState}
        columns={columnOrder.map((key) => columnNames[key])}
      />
    {/if}
    {#if data.length > 0}
      <TableBody {checkboxes} userData={data} columns={columnOrder} />
    {/if}
  </table>
</section>

<style>
  .table-container {
    overflow-x: auto;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }
</style>
