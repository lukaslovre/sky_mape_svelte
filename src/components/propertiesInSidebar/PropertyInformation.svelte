<script lang="ts">
  import { dataStore } from "../../stores/store.svelte";
  import type { Agent, Property, Client } from "../../types";
  import { formatDateAndAgo } from "../../utils/datetime";
  import { getDefaultImageURL } from "../../utils/image";
  import { formatWithCommas } from "../../utils/numbers";
  import { getIconForProperty } from "../../utils/propertyIcons";
  import InfoRow from "./PropertyInformationComponents/InfoRow.svelte";
  import Tag from "./PropertyInformationComponents/Tag.svelte";
  import Thumbnail from "./PropertyInformationComponents/Thumbnail.svelte";

  type TwoColumn = { label: string; value: string };

  interface Props {
    property: Property;
  }

  let { property }: Props = $props();

  const defaultImageUrl = getDefaultImageURL();

  let simpleFields: Record<string, string> = $derived.by(() => {
    const intermediateValue = {
      Cijena:
        property.price &&
        `${formatWithCommas(property.price)} € ${property.action === "Rent" ? `/ mjesečno (Iznajmljivanje)` : "(Prodaja)"}`,
      Površina: property.surfaceArea && `${formatWithCommas(property.surfaceArea)} m²`,
      Kupaonica: property.bathrooms + " kupaonica",
      "Spavaće sobe": property.bedrooms + " spavaća soba",
      "Bilješke o nekretnini": property.propertyNotes,
      Vlasnik: dataStore.users.find((user) => user.id === property.ownerId)?.name,
      "Bilješke vlasnika": property.sellerNotes,
    };

    // Filter out empty fields
    return Object.fromEntries(
      Object.entries(intermediateValue).map(([key, value]) => {
        if (value == undefined || value == "") {
          return [key, "N/A"];
        }
        return [key, value.toString()];
      })
    );
  });

  let twoColumnFields: Record<string, TwoColumn[]> = $derived({
    "Two-Column": [
      {
        label: "Kreirano",
        value: formatDateAndAgo(new Date(property.created)),
      },
      {
        label: "Promijenjeno",
        value: formatDateAndAgo(new Date(property.updated)),
      },
    ],
  });

  function getLabelFromStatus(status: Property["status"]): string {
    switch (status) {
      case "available":
        return "Dostupno";
      case "processing":
        return "U obradi";
      case "sold":
        return "Prodano";
      default:
        return "N/A";
    }
  }

  function getHueFromStatus(status: Property["status"]): number {
    switch (status) {
      case "available":
        return 120;
      case "processing":
        return 50;
      case "sold":
        return 0;
      default:
        return 0;
    }
  }
</script>

<div class="property-information">
  <div class="tags-container">
    <Tag
      label={getLabelFromStatus(property.status)}
      hue={getHueFromStatus(property.status)}
    />
  </div>

  <Thumbnail imageUrl={property.imgUrl[0] || defaultImageUrl} />

  <!-- type and visibility (using color) -->
  <div class="coloredStripe">
    <img src={getIconForProperty(property, false)} alt="icon" />
  </div>

  {#each Object.entries(simpleFields) as [key, value]}
    <InfoRow label={key} {value} isUndefined={value === "N/A"} />
  {/each}

  {#each Object.values(twoColumnFields) as twoColumns}
    <div class="two-column-container">
      {#each twoColumns as { label, value }}
        <div class="two-column">
          <InfoRow {label} {value} isUndefined={value === "N/A"} />
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .property-information {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .two-column-container {
    display: flex;
    gap: 1.25rem;
  }

  .coloredStripe {
    height: 4rem;
  }
  .coloredStripe img {
    height: 100%;
  }

  .tags-container {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
</style>
