<script lang="ts">
  // Type Imports
  import type { UserData } from "../../types";
  import type { parsePocketbaseUserData } from "../../utils/buyers";

  // Component Imports
  import TableBody from "./TableBody/TableBody.svelte";
  import TableHeader from "./TableHeader/TableHeader.svelte";

  // Component Props
  export let showHeader: boolean = true;
  export let data: UserData[] = [];

  // Type Definitions
  type ParsedUserData = ReturnType<typeof parsePocketbaseUserData>[0];
  type ColumnKey = keyof ParsedUserData;

  // State Variables
  let checkboxes: Record<string, boolean> = {};
  let isSelectAll: boolean = false;

  // Column Configuration
  const columnOrder: ColumnKey[] = [
    "name",
    "userType",
    "email",
    "phone",
    "note",
    "payment_method",
    "favoriteProperties",
    "filters",
  ];

  const columnNames: Record<ColumnKey, string> = {
    id: "ID",
    name: "Ime",
    email: "Email",
    phone: "Telefon",
    note: "Napomena",
    created: "Kreirano",
    updated: "Ažurirano",
    favoriteProperties: "Favoriti",
    filters: "Filteri",
    payment_method: "Način plaćanja",
    userType: "Tip korisnika",
    agency_id: "Agencija",
  };

  /**
   * Toggles the "Select All" checkbox state.
   */
  function toggleSelectAll() {
    isSelectAll = !isSelectAll;
  }

  /**
   * Updates the checkboxes based on the "Select All" state.
   */
  $: if (isSelectAll) {
    checkboxes = data.reduce<Record<string, boolean>>((acc, user) => {
      acc[user.id] = true;
      return acc;
    }, {});
  } else {
    checkboxes = {};
  }

  // Retrieves specific attributes from selected rows based on the column name.
  function getSelectedAttributes(columnName: string): string[] {
    // Find the corresponding key for the given column name
    const attributeKey = Object.entries(columnNames).find(
      ([_, displayName]) => displayName === columnName
    )?.[0] as ColumnKey | undefined;

    if (!attributeKey) return [];

    // Extract the attribute values from selected users
    return Object.entries(checkboxes)
      .filter(([, isChecked]) => isChecked)
      .map(([userId]) => data.find((user) => user.id === userId)?.[attributeKey] ?? "")
      .filter(Boolean) as string[];
  }
</script>

<section class="table-container">
  <table>
    {#if showHeader}
      <TableHeader
        {toggleSelectAll}
        {isSelectAll}
        columns={columnOrder.map((key) => columnNames[key])}
        {getSelectedAttributes}
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
