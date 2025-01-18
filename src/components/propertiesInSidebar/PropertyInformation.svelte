<script lang="ts">
  import { dataStore } from "../../stores/store.svelte";
  import type { Agent, Property, Client } from "../../types";
  import { formatDateAndAgo } from "../../utils/datetime";
  import { formatWithCommas } from "../../utils/numbers";
  import { getIconForProperty } from "../../utils/propertyIcons";
  import InfoRow from "./PropertyInformationComponents/InfoRow.svelte";
  import Thumbnail from "./PropertyInformationComponents/Thumbnail.svelte";

  interface Props {
    property: Property;
  }

  let { property }: Props = $props();

  const defaultImageUrl =
    "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg";

  let propertyForDisplay = $derived(
    parsePropertyForDisplay(property, dataStore.users, dataStore.agents)
  );

  function parsePropertyForDisplay(property: Property, users: Client[], agents: Agent[]) {
    const parsedFields = {
      // "Lat & Lng": `${property.lat}, ${property.lng}`,
      // Type: property.type,
      Agent: agents.find((agent) => agent.id === property.agent_id)?.name,
      Status: property.status,
      stripe: "stripe",
      Price:
        property.price &&
        `${formatWithCommas(property.price)} € / mjesečno (${property.action === "Rent" ? "Iznajmljivanje" : "Prodaja"})`,
      "Surface Area":
        property.surfaceArea && `${formatWithCommas(property.surfaceArea)} m²`,
      // todo, add frequency
      "Website URL": property.websiteUrl,
      // Visibility: property.hiddenOnWebsite ? "Off-market" : "Visible",
      Bedrooms: property.bedrooms + " kupaonica",
      Bathrooms: property.bathrooms + " spavaća soba",
      Owner: users.find((user) => user.id === property.ownerId)?.name,
      "Property Notes": property.propertyNotes,
      "Seller Notes": property.sellerNotes,
      Created: formatDateAndAgo(new Date(property.created)),
      Updated: formatDateAndAgo(new Date(property.updated)),
    };

    const filteredObject = Object.fromEntries(
      Object.entries(parsedFields).map(([key, value]) => {
        if (
          value == undefined ||
          value == "" ||
          (Array.isArray(value) && value.length == 0)
        ) {
          return [key, "N/A"];
        }
        return [key, value];
      })
    );

    return filteredObject;
  }
</script>

<div class="property-information">
  <Thumbnail imageUrl={property.imgUrl[0] || defaultImageUrl} />

  <!-- TODO: npr broj soba two column row, mozda jos neke -->

  {#each Object.entries(propertyForDisplay) as [key, value]}
    {#if key === "stripe"}
      <!-- type and visibility (using color) -->
      <div class="coloredStripe">
        <img src={getIconForProperty(property, false)} alt="" />
      </div>
    {:else}
      <InfoRow label={key} {value} isUndefined={value === "N/A"} />
    {/if}
  {/each}
</div>

<style>
  .property-information {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .coloredStripe {
    height: 4rem;
  }
  .coloredStripe img {
    height: 100%;
  }
</style>
