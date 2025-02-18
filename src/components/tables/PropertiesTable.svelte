<script lang="ts">
  import ChevronIcon from "../../assets/icons/ChevronIcon.svelte";
  import type { Property } from "../../types";
  import TableHeader from "./general/TableHeader.svelte";
  import PropertiesTableBody from "./PropertiesTableBody.svelte";

  interface Props {
    showHeader?: boolean;
    data?: Property[];
    selectedPropertyIds?: Property["id"][];
    handleCheckboxClick: (propertyId: Property["id"], newState: boolean) => void;
    sortOptionField: keyof Property;
  }

  let {
    showHeader = true,
    data = [],
    selectedPropertyIds = [],
    handleCheckboxClick,
    sortOptionField,
  }: Props = $props();

  // Navigation
  const rowsPerPage = 50;
  let startingRow: number = $state(0);
  let totalRows: number = $derived(data.length);
  let currentPage: number = $derived(Math.ceil(startingRow / rowsPerPage) + 1);
  let totalPages: number = $derived(Math.ceil(totalRows / rowsPerPage));

  // Select all checkbox
  let isSelectAll = $derived(selectedPropertyIds.length === data.length);

  type Column = {
    key: keyof Property;
    label: string;
    visible: boolean;
    copyable?: boolean;
  };

  const columns: Column[] = [
    {
      key: "imgUrl",
      label: "Slika",
      visible: true,
    },
    {
      key: "type",
      label: "Tip",
      visible: true,
    },
    {
      key: "action",
      label: "Akcija",
      visible: true,
    },
    {
      key: "price",
      label: "Cijena",
      visible: true,
    },
    {
      key: "surfaceArea",
      label: "Površina",
      visible: true,
    },
    {
      key: "bedrooms",
      label: "Spavaće sobe",
      visible: true,
    },
    {
      key: "bathrooms",
      label: "Kupaonice",
      visible: true,
    },
    {
      key: "propertyNotes",
      label: "Bilješke o nekretnini",
      visible: true,
    },
    {
      key: "hiddenOnWebsite",
      label: "Vidljivost",
      visible: true,
    },
    {
      key: "ownerId",
      label: "Vlasnik",
      visible: true,
    },
    {
      key: "sellerNotes",
      label: "Bilješke vlasnika",
      visible: true,
    },
    {
      key: "agent_id",
      label: "Agent",
      visible: true,
    },
    {
      key: "websiteUrl",
      label: "Web URL",
      visible: true,
      copyable: true,
    },
    {
      key: "status",
      label: "Status",
      visible: true,
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
      key: "id",
      label: "ID",
      visible: false,
    },
    {
      key: "lat",
      label: "Latituda",
      visible: false,
    },
    {
      key: "lng",
      label: "Longituda",
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
    data.forEach((property) => handleCheckboxClick(property.id, newState));
  }

  // Retrieves specific attribute values from selected rows based on the provided column name.
  // For copying to clipboard.
  function getSelectedAttributes(columnName: string): string[] {
    const attributeKey = columns.find((column) => column.label === columnName)?.key;

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

  function handleTableNavigationClick(direction: "previous" | "next") {
    if (direction === "previous") {
      startingRow -= rowsPerPage;
    } else if (direction === "next") {
      startingRow += rowsPerPage;
    }
  }
</script>

<section class="table-container-wrapper">
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
          sortOptionLabel={columns.find((column) => column.key === sortOptionField)
            ?.label}
        />
      {/if}

      {#if data.length > 0}
        <PropertiesTableBody
          {selectedPropertyIds}
          data={data.slice(startingRow, startingRow + rowsPerPage)}
          columnsKeys={columns
            .filter((column) => column.visible)
            .map((column) => column.key)}
          {handleCheckboxClick}
          copyableColumnsKeys={columns
            .filter((column) => column.copyable)
            .map((column) => column.key)}
          {sortOptionField}
        />
      {/if}
    </table>
  </section>

  <!-- Table navigation -->
  <div class="table-navigation-container">
    <p>{startingRow}-{startingRow + rowsPerPage} od {totalRows}</p>

    <div class="table-navigation-buttons">
      <button
        onclick={() => handleTableNavigationClick("previous")}
        disabled={startingRow === 0}
      >
        <ChevronIcon color="hsl(0, 0%, 30%)" rotation={180} size={24} />
      </button>
      <span>{currentPage}/{totalPages}</span>
      <button
        onclick={() => handleTableNavigationClick("next")}
        disabled={startingRow + rowsPerPage >= totalRows}
      >
        <ChevronIcon color="hsl(0, 0%, 30%)" rotation={0} size={24} />
      </button>
    </div>
  </div>
</section>

<style>
  .table-container {
    overflow-x: auto;
  }

  table {
    border-collapse: collapse;
    width: max-content;
    table-layout: fixed;
  }

  .table-navigation-container {
    margin-top: 1rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 0.875rem;
    color: hsl(0, 0%, 40%);
  }

  .table-navigation-buttons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .table-navigation-buttons button {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0.25rem;

    background-color: transparent;
    border: 1px solid hsl(0, 0%, 80%);
    border-radius: 0.25rem;

    cursor: pointer;
    transition: background-color 150ms ease-out;
  }
  .table-navigation-buttons button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .table-navigation-buttons button:hover {
    background-color: hsl(0, 0%, 90%);
  }
</style>
