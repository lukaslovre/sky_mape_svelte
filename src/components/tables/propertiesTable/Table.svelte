<script lang="ts">
  import type { Property } from "../../../types";
  import TableBody from "./TableBody/TableBody.svelte";
  import TableHeader from "./TableHeader/TableHeader.svelte";

  export let showHeader: boolean = true;
  export let data: Property[] = [];
  export let selectedPropertyIds: Property["id"][] = [];
  export let handleCheckboxClick: (propertyId: Property["id"], newState: boolean) => void;

  // Type Definitions
  type ColumnKey = keyof Property;

  // State Variables
  $: isSelectAll = selectedPropertyIds.length === data.length;

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

  function toggleSelectAll() {
    let newState = !isSelectAll;
    data.forEach((property) => handleCheckboxClick(property.id, newState));
  }

  // TODO: When data changes, remove all checkboxes that are no longer in the data

  // Retrieves specific attribute values from selected rows based on the provided column name.
  function getSelectedAttributes(columnName: string): string[] {
    // Identify the key corresponding to the given column name by matching display names.
    const attributeKey = Object.entries(columnNames).find(
      ([_, displayName]) => displayName === columnName
    )?.[0] as ColumnKey | undefined;

    // Return an empty array if no matching attribute key is found.
    if (!attributeKey) return [];

    // Gather attribute values from data where the corresponding checkbox is checked.
    return selectedPropertyIds
      .map(
        (propertyId) =>
          data.find((property) => property.id === propertyId)?.[attributeKey] ?? ""
      )
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
      <TableBody
        {selectedPropertyIds}
        propertyData={data}
        columns={columnOrder}
        {handleCheckboxClick}
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
