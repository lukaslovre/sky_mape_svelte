<script lang="ts">
  import type { Property } from "../../../types";
  import TableBody from "./TableBody/TableBody.svelte";
  import TableHeader from "./TableHeader/TableHeader.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let showHeader: boolean = true;
  export let data: Property[] = [];

  // Type Definitions
  type ColumnKey = keyof Property;

  // State Variables
  let checkboxes: Record<Property["id"], boolean> = {};
  let isSelectAll: boolean = false;

  // The order of the columns in the table.
  // Also toggle which ones are shown.
  const columnOrder: ColumnKey[] = [
    "imgUrl",
    "type",
    "action",
    "surfaceArea",
    "price",
    "websiteUrl",
    "hiddenOnWebsite",
    "bedrooms",
    "bathrooms",
    "ownerId",
    "propertyNotes",
    "sellerNotes",
    "status",
    "agent_id",
    "created",
  ];

  // All possible columns and their labels
  const columnNames: Record<ColumnKey, string> = {
    id: "ID",
    lat: "Latituda",
    lng: "Longituda",
    type: "Tip",
    action: "Akcija",
    imgUrl: "Slika",
    surfaceArea: "Površina",
    price: "Cijena",
    websiteUrl: "Web URL",
    hiddenOnWebsite: "Vidljivost",
    bedrooms: "Spavaće sobe",
    bathrooms: "Kupaonice",
    ownerId: "Vlasnik",
    propertyNotes: "Napomena",
    sellerNotes: "Napomene prodavača",
    agent_id: "Agent",
    status: "Status",
    created: "Kreirano",
    updated: "Ažurirano",
    collectionId: "Kolekcija ID",
    collectionName: "Ime kolekcije",
  };

  function toggleSelectAll() {
    isSelectAll = !isSelectAll;
  }

  function setAllCheckboxesTo(value: boolean) {
    checkboxes = data.reduce<Record<string, boolean>>((acc, property) => {
      acc[property.id] = value;
      return acc;
    }, {});
  }

  // When the selectAll checkbox is checked, toggle all checkboxes in the table
  $: if (isSelectAll) {
    setAllCheckboxesTo(true);
  } else {
    setAllCheckboxesTo(false);
  }

  // When checkboxes change, dispatch a custom event
  $: if (checkboxes) {
    // Filter out checkboxes with 'false' values
    const onlyCheckedCheckboxIds = Object.entries(checkboxes)
      .filter(([propertyId, isChecked]) => isChecked)
      .map(([propertyId]) => propertyId);

    dispatch("checkboxesChanged", onlyCheckedCheckboxIds);
  }

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
      .map(
        ([propertyId]) =>
          data.find((property) => property.id === propertyId)?.[attributeKey] ?? ""
      )
      .filter(Boolean) as string[];
  }

  function updateCheckboxes(newCheckboxes: Record<Property["id"], boolean>) {
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
      <TableBody
        {checkboxes}
        propertyData={data}
        columns={columnOrder}
        {updateCheckboxes}
      />
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
