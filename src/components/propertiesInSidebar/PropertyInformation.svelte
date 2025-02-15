<script lang="ts">
  import { dataStore } from "../../lib/stores/store.svelte";
  import type { Agent, Property, Client } from "../../types";
  import { formatDateAndAgo } from "../../lib/utils/datetime";
  import { getDefaultImageURL } from "../../lib/utils/image";
  import { formatWithCommas } from "../../lib/utils/numbers";
  import { parsePaymentFrequency } from "../../lib/utils/paymentFrequency";
  import { getIconForProperty } from "../../lib/utils/propertyIcons";
  import Label from "../common/Label.svelte";
  import UserContainer from "../common/UserContainer.svelte";
  import InfoRow from "./PropertyInformationComponents/InfoRow.svelte";
  import Tag from "./PropertyInformationComponents/Tag.svelte";
  import Thumbnail from "./PropertyInformationComponents/Thumbnail.svelte";

  type TwoColumn = { label: string; value: string };

  interface Props {
    property: Property;
  }

  let { property }: Props = $props();

  let owner: Client | undefined = $derived(
    dataStore.users.find((user) => user.id === property.ownerId)
  );

  const defaultImageUrl = getDefaultImageURL();

  let simpleFields: Record<string, string> = $derived.by(() => {
    const intermediateValue = {
      Cijena:
        property.price &&
        `${formatWithCommas(property.price)} € ${property.action === "Rent" ? `/ ${parsePaymentFrequency(property.paymentFrequency).label.toLocaleLowerCase()}` : ""}`,
      Površina: property.surfaceArea && `${formatWithCommas(property.surfaceArea)} m²`,
      Kupaonica: property.bathrooms + " kupaonica",
      "Spavaće sobe": property.bedrooms + " spavaća soba",
      "Bilješke o nekretnini": property.propertyNotes,
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

  {#if owner}
    <div class="owner-container">
      <Label text="Vlasnik" />
      <UserContainer
        imageUrl={owner.avatar}
        name={owner.name}
        copyableFields={[
          { label: "Email", value: owner.email as string | undefined },
          { label: "Telefon", value: owner.phone as string | undefined },
        ]}
        padding="0.125rem"
        borderColor="transparent"
      />
    </div>
  {/if}

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
    align-items: flex-start;
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
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
  .owner-container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    line-height: 150%;
  }
</style>
