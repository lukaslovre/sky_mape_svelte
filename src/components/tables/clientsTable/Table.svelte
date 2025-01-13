<script lang="ts">
  import { run } from 'svelte/legacy';

  import type { UserData } from "../../../types";
  import type { parsePocketbaseUserData } from "../../../utils/buyers";
  import TableBody from "./TableBody/TableBody.svelte";
  import TableHeader from "./TableHeader/TableHeader.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  interface Props {
    showHeader?: boolean;
    data?: UserData[];
  }

  let { showHeader = true, data = [] }: Props = $props();

  // Type Definitions
  type ParsedUserData = ReturnType<typeof parsePocketbaseUserData>[0];
  type ColumnKey = keyof ParsedUserData;

  // State Variables
  let checkboxes: Record<UserData["id"], boolean> = $state({});
  let isSelectAll: boolean = $state(false);

  // The order of the columns in the table.
  // Also toggle which ones are shown.
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

  // All possible columns and their labels
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
    collectionId: "Kolekcija ID",
    collectionName: "Ime kolekcije",
  };

  function toggleSelectAll() {
    isSelectAll = !isSelectAll;
  }

  function setAllCheckboxesTo(value: boolean) {
    checkboxes = data.reduce<Record<string, boolean>>((acc, user) => {
      acc[user.id] = value;
      return acc;
    }, {});
  }

  // When the selectAll checkbox is checked, toggle all checkboxes in the table
  run(() => {
    if (isSelectAll) {
      setAllCheckboxesTo(true);
    } else {
      setAllCheckboxesTo(false);
    }
  });

  // When checkboxes change, dispatch a custom event
  run(() => {
    if (checkboxes) {
      // Filter out checkboxes with 'false' values
      const onlyCheckedCheckboxIds = Object.entries(checkboxes)
        .filter(([userId, isChecked]) => isChecked)
        .map(([userId]) => userId);

      dispatch("checkboxesChanged", onlyCheckedCheckboxIds);
    }
  });

  // TODO: When data changes, remove all checkboxes that are no longer in the data

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

  function updateCheckboxes(newCheckboxes: Record<UserData["id"], boolean>) {
    checkboxes = newCheckboxes;
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
      <TableBody {checkboxes} userData={data} columns={columnOrder} {updateCheckboxes} />
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
