<script lang="ts">
  import { removeThumbFromUrl } from "../../../../models/Properties";
  import { agents, favoriteProperties, users } from "../../../../stores/store";
  import type { Property } from "../../../../types";
  import { formatWithCommas } from "../../../../utils/numbers";
  import Checkbox from "./Checkbox.svelte";
  import CopyableCell from "./CopyableCell.svelte";

  // Props
  export let selectedPropertyIds: Property["id"][] = [];
  export let propertyData: Property[];
  export let columns: (keyof Property)[];
  export let handleCheckboxClick: (propertyId: Property["id"], newState: boolean) => void;

  // Helper Functions
  // Check if a value is an object
  const isObject = (value: any): boolean => typeof value === "object" && value !== null;

  // Check if a value has a length property
  const hasLength = (value: any): boolean => typeof value.length === "number";

  // Check if a column is copyable
  const isCopyable = (column: keyof Property): boolean =>
    ["websiteUrl"].includes(column as string);

  // Table value parsing
  function parsePrice(property: Property): string {
    if (property.price) {
      if (property.action === "Rent") {
        return `€ ${formatWithCommas(property.price)} / month`;
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
    return property.hiddenOnWebsite ? "Off-market" : "Public";
  }

  function parseId(property: Property, column: keyof Property): string {
    if (column === "agent_id") {
      return $agents.find((agent) => agent.id === property.agent_id)?.name ?? "N/A";
    } else if (column === "ownerId") {
      return $users.find((user) => user.id === property.ownerId)?.name ?? "N/A";
    } else {
      return "Couldn't match id to object";
    }
  }
</script>

<!-- Table Body -->
<tbody>
  {#each propertyData as property (property.id)}
    <tr class:favorited={$favoriteProperties.includes(property.id)}>
      <!-- Checkbox Cell. First Column -->
      <td>
        <Checkbox
          value={property.id ?? ""}
          checked={selectedPropertyIds.includes(property.id)}
          updateState={handleCheckboxClick}
        />
      </td>

      <!-- Other, Dynamic Columns -->
      {#each columns as column}
        <td>
          {#if isObject(property[column])}
            <!-- Handle object values -->
            {#if hasLength(property[column])}
              <!-- Array-like objects -->
              {#if property[column].length > 0}
                {#if column === "imgUrl"}
                  <a
                    href={removeThumbFromUrl(property[column][0])}
                    target="_blank"
                    class="img-link"
                  >
                    <img src={property[column][0]} alt={property.id} />
                  </a>
                {:else}
                  {property[column].join(", ")}
                {/if}
              {:else}
                <span class="empty">N/A</span>
              {/if}
            {/if}
          {:else if property[column] === ""}
            <!-- Empty string values -->
            <span class="empty">N/A</span>
          {:else if isCopyable(column)}
            <!-- Copyable values (email, phone) -->
            <CopyableCell value={property[column]} />
          {:else if column === "price"}
            {parsePrice(property)}
          {:else if column === "surfaceArea"}
            {parseSurfaceArea(property)}
          {:else if column === "hiddenOnWebsite"}
            {parseVisibility(property)}
          {:else if ["agent_id", "ownerId"].includes(column)}
            {parseId(property, column)}
          {:else}
            <!-- All other values -->
            {property[column]}
          {/if}
        </td>
      {/each}
    </tr>
  {/each}
</tbody>

<style>
  th,
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
