<script lang="ts">
  import type { Property } from "../../types";
  import { dataStore } from "../../lib/stores/store.svelte";
  import { removeThumbFromUrl } from "../../lib/models/Properties";
  import { formatDateAndAgo } from "../../lib/utils/datetime";
  import { formatWithCommas } from "../../lib/utils/numbers";
  import Checkbox from "./general/Checkbox.svelte";
  import CopyableBodyCell from "./general/CopyableBodyCell.svelte";
  import { trimText } from "../../lib/utils/string";
  import { parsePaymentFrequency } from "../../lib/utils/paymentFrequency";
  import {
    parsePropertyAction,
    parsePropertyStatus,
    parsePropertyType,
  } from "../../lib/utils/properties";

  interface Props {
    selectedPropertyIds?: Property["id"][];
    data: Property[];
    columnsKeys: (keyof Property)[];
    handleCheckboxClick: (propertyId: Property["id"], newState: boolean) => void;
    copyableColumnsKeys: (keyof Property)[];
    sortOptionField: keyof Property;
  }

  let {
    selectedPropertyIds = [],
    data,
    columnsKeys,
    handleCheckboxClick,
    copyableColumnsKeys,
    sortOptionField,
  }: Props = $props();

  // Helper Functions
  const isObject = (value: any): boolean => typeof value === "object" && value !== null;

  const isCopyable = (column: keyof Property): boolean =>
    copyableColumnsKeys.includes(column as string);

  // Table value parsing
  function parsePrice(property: Property): string {
    if (property.price) {
      if (property.action === "Rent") {
        return `€ ${formatWithCommas(property.price)} / ${parsePaymentFrequency(property.paymentFrequency).label.toLocaleLowerCase()}`;
      } else {
        return `€ ${formatWithCommas(property.price)}`;
      }
    } else {
      return "";
    }
  }

  function parseSurfaceArea(property: Property): string {
    return property.surfaceArea ? `${formatWithCommas(property.surfaceArea)} m²` : "";
  }

  function parseVisibility(property: Property): string {
    return property.hiddenOnWebsite ? "Off-market" : "Javno";
  }

  function parseId(property: Property, column: keyof Property): string {
    if (column === "agent_id") {
      return (
        dataStore.agents.find((agent) => agent.id === property.agent_id)?.name ?? "N/A"
      );
    } else if (column === "ownerId") {
      return dataStore.users.find((user) => user.id === property.ownerId)?.name ?? "N/A";
    } else {
      return "Couldn't match id to object";
    }
  }

  function parseDate(dateString: string): string {
    return formatDateAndAgo(new Date(dateString));
  }
</script>

<!-- Table Body -->
<tbody>
  {#each data as property (property.id)}
    <tr class:favorited={dataStore.favoriteProperties.includes(property.id)}>
      <!-- Checkbox Cell. First Column -->
      <td>
        <Checkbox
          fieldId={property.id ?? ""}
          checked={selectedPropertyIds.includes(property.id)}
          updateState={handleCheckboxClick}
        />
      </td>

      <!-- Other, Dynamic Columns -->
      {#each columnsKeys as column}
        <td class:isSorting={column === sortOptionField}>
          {#if !property[column] && typeof property[column] !== "boolean"}
            <span class="empty">N/A</span>
          {:else if column === "price"}
            {parsePrice(property)}
          {:else if column === "surfaceArea"}
            {parseSurfaceArea(property)}
          {:else if column === "hiddenOnWebsite"}
            {parseVisibility(property)}
          {:else if ["agent_id", "ownerId"].includes(column as string)}
            {parseId(property, column)}
          {:else if column === "created"}
            {parseDate(property[column])}
          {:else if ["propertyNotes", "sellerNotes"].includes(column as string)}
            {trimText(property[column], 100)}
          {:else if column === "type"}
            {parsePropertyType(property[column])}
          {:else if column === "action"}
            {parsePropertyAction(property[column])}
          {:else if column === "status"}
            {parsePropertyStatus(property[column])}
          {:else if column === "imgUrl"}
            {#if property[column].length > 0}
              <a
                href={removeThumbFromUrl(property[column][0])}
                target="_blank"
                class="img-link"
              >
                <img src={property[column][0]} alt={property.id} />
              </a>
            {:else}
              <span class="empty">N/A</span>
            {/if}
          {:else if isCopyable(column)}
            <CopyableBodyCell value={property[column]} />
          {:else if isObject(property[column])}
            <!-- Array-like objects -->
            {#if property[column].length && property[column].length > 0}
              {property[column].join(", ")}
            {:else}
              {"riješiti objekt"} {property[column]}
            {/if}
          {:else}
            {property[column]}
          {/if}
        </td>
      {/each}
    </tr>
  {/each}
</tbody>

<style>
  td {
    /* border: 1px solid hsl(0, 0%, 90%); */
    border-bottom: 1px solid hsl(0, 0%, 90%);
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
    text-align: left;

    transition: background-color 100ms ease-out;
  }
  td {
    background-color: hsla(0, 0%, 100%, 0.5);
  }

  td.isSorting {
    border-left: 1px solid hsl(0, 0%, 75%);
    border-right: 1px solid hsl(0, 0%, 75%);
    background-color: hsla(0, 0%, 100%, 0.75);
    font-weight: 500;
  }

  tr:hover {
    background-color: hsla(0, 0%, 100%, 0.5);
  }

  tr.favorited {
    background-color: hsla(50, 100%, 70%, 0.5);
  }

  tbody tr:last-child td:first-child {
    border-bottom-left-radius: 0.5rem;
  }
  tbody tr:last-child td:last-child {
    border-bottom-right-radius: 0.5rem;
  }

  .img-link {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .img-link::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: hsla(0, 0%, 0%, 0.125);
    border-radius: 0.25rem;
  }
  td img {
    height: 6rem;
    aspect-ratio: 4/3;
    max-width: 16rem;
    object-fit: cover;
    border-radius: 0.25rem;
  }

  /*  */

  .empty {
    color: hsl(0, 0%, 50%);
  }
</style>
