<script lang="ts">
  import { dataStore } from "../../stores/store.svelte";
  import type { Agent, Property, Client } from "../../types";
  import { formatWithCommas } from "../../utils/numbers";
  import InfoRow from "./PropertyInformationComponents/InfoRow.svelte";
  import Thumbnail from "./PropertyInformationComponents/Thumbnail.svelte";

  interface Props {
    property: Property;
  }

  let { property }: Props = $props();

  const defaultImageUrl =
    "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg";

  function parsePropertyForDisplay(property: Property, users: Client[], agents: Agent[]) {
    const parsedFields = {
      "Lat & Lng": `${property.lat}, ${property.lng}`,
      Type: property.type,
      Action: property.action,
      "Surface Area":
        property.surfaceArea && `${formatWithCommas(property.surfaceArea)} m²`,
      Price: property.price && `${formatWithCommas(property.price)} €`,
      "Website URL": property.websiteUrl,
      Visibility: property.hiddenOnWebsite ? "Off-market" : "Visible",
      Bedrooms: property.bedrooms,
      Bathrooms: property.bathrooms,
      Owner: users.find((user) => user.id === property.ownerId)?.name,
      "Property Notes": property.propertyNotes,
      "Seller Notes": property.sellerNotes,
      Agent: agents.find((agent) => agent.id === property.agent_id)?.name,
      Status: property.status,
      Created: dateToFormatedDateTime(property.created),
      Updated: dateToFormatedDateTime(property.updated),
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

  function dateToFormatedDateTime(date: string) {
    return (
      new Date(date).toLocaleDateString("hr-HR") +
      " " +
      new Date(date).toLocaleTimeString("hr-HR")
    );
  }
  let propertyForDisplay = $derived(
    parsePropertyForDisplay(property, dataStore.users, dataStore.agents)
  );
</script>

<div class="property-information">
  <Thumbnail imageUrl={property.imgUrl[0] || defaultImageUrl} />

  {#each Object.entries(propertyForDisplay) as [key, value]}
    <InfoRow label={key} {value} isUndefined={value === "N/A"} />
  {/each}
</div>

<style>
  .property-information {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
</style>
