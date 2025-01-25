<script lang="ts">
  import type { Client } from "../../types";
  import ClientsTableBody from "./ClientsTableBody.svelte";
  import TableHeader from "./general/TableHeader.svelte";

  interface Props {
    showHeader?: boolean;
    data?: Client[];
    selectedClientIds?: Client["id"][];
    handleCheckboxClick: (clientId: Client["id"], newState: boolean) => void;
  }

  let {
    showHeader = true,
    data = [],
    selectedClientIds = [],
    handleCheckboxClick,
  }: Props = $props();

  // State Variables
  let isSelectAll = $derived(selectedClientIds.length === data.length);

  type Column = {
    key: keyof Client;
    label: string;
    visible: boolean;
    copyable?: boolean;
  };

  const columns: Column[] = [
    {
      key: "name",
      label: "Ime",
      visible: true,
    },
    {
      key: "userType",
      label: "Tip korisnika",
      visible: true,
    },
    {
      key: "email",
      label: "Email",
      visible: true,
      copyable: true,
    },
    {
      key: "phone",
      label: "Telefon",
      visible: true,
      copyable: true,
    },
    {
      key: "note",
      label: "Bilješka",
      visible: true,
    },
    {
      key: "payment_method",
      label: "Način plaćanja",
      visible: true,
    },
    {
      key: "favoriteProperties",
      label: "Favoriti",
      visible: true,
    },
    {
      key: "filters",
      label: "Filteri",
      visible: true,
    },
    {
      key: "id",
      label: "ID",
      visible: false,
    },
    {
      key: "created",
      label: "Kreirano",
      visible: true,
    },
    {
      key: "updated",
      label: "Ažurirano",
      visible: true,
    },
    {
      key: "agency_id",
      label: "Agencija",
      visible: false,
    },
    {
      key: "collectionId",
      label: "Kolekcija ID",
      visible: false,
    },
    {
      key: "collectionName",
      label: "Ime kolekcije",
      visible: false,
    },
  ];

  function toggleSelectAll() {
    let newState = !isSelectAll;
    data.forEach((client) => handleCheckboxClick(client.id, newState));
  }
  // Retrieves specific attribute values from selected rows based on the provided column name.
  // For copying to clipboard.
  function getSelectedAttributes(columnName: string): string[] {
    const attributeKey = columns.find((column) => column.label === columnName)?.key;

    // If the column doesn't exist, return an empty array
    if (!attributeKey) return [];

    // Gather attribute values from data where the corresponding checkbox is checked.
    return selectedClientIds
      .map(
        (clientId) => data.find((client) => client.id === clientId)?.[attributeKey] ?? ""
      )
      .filter(Boolean);
  }
</script>

<section class="table-container">
  <table>
    {#if showHeader}
      <TableHeader
        {toggleSelectAll}
        {isSelectAll}
        columnsLabels={columns
          .filter((column) => column.visible)
          .map((column) => column.label)}
        {getSelectedAttributes}
        copyableColumnsLabels={columns
          .filter((column) => column.copyable)
          .map((column) => column.label)}
      />
    {/if}

    {#if data.length > 0}
      <ClientsTableBody
        selectedIds={selectedClientIds}
        {data}
        columns={columns.filter((column) => column.visible).map((column) => column.key)}
        {handleCheckboxClick}
        copyableColumnsKeys={columns
          .filter((column) => column.copyable)
          .map((column) => column.key)}
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
