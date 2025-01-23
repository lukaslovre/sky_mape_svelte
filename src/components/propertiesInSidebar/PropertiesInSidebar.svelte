<script lang="ts">
  import { dataStore } from "../../stores/store.svelte";
  import type { Property } from "../../types";
  import PropertyActionButtons from "./PropertyActionButtons.svelte";
  import PropertyInformation from "./PropertyInformation.svelte";
  import PropertyListNavigator from "./PropertyListNavigator.svelte";

  // If >1 selected property, show selected properties, else show filtered properties
  let propertyList = $derived<Property[]>(
    dataStore.selectedPropertyIds.length > 1
      ? (dataStore.selectedPropertyIds.map((id) =>
          dataStore.properties.find((property) => property.id === id)
        ) as Property[])
      : dataStore.filteredProperties
  );
  let property = $derived(
    dataStore.properties.find((p) => p.id === dataStore.focusedPropertyId)
  );
  let selectedPropertyIndex = $derived(
    propertyList.findIndex((p) => p.id === dataStore.focusedPropertyId)
  );
  let responsibleAgent = $derived(
    dataStore.agents.find((agent) => agent.id === property?.agent_id)
  );

  function cycleThruPropertiesBy(steps: number) {
    if (steps === 0) return;

    const newIndex =
      (selectedPropertyIndex + steps + propertyList.length * 4) % propertyList.length;

    // if only 1 selected property, set the new focused property as selected
    if (dataStore.selectedPropertyIds.length === 1) {
      dataStore.setSelectedPropertyIds([propertyList[newIndex].id]);
    } else {
      dataStore.focusedPropertyId = propertyList[newIndex].id;
    }
  }
</script>

<section>
  <PropertyListNavigator
    currentIndex={selectedPropertyIndex}
    totalPropertiesCount={propertyList.length}
    {cycleThruPropertiesBy}
  />

  {#if property}
    <div class="agent-and-actions-container">
      <div class="agent-container">
        <img src={responsibleAgent?.avatar || "profile.png"} alt="agent pfp" />
        <p>{responsibleAgent?.name}</p>
      </div>
      <PropertyActionButtons {property} />
    </div>

    <PropertyInformation {property} />
  {/if}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .agent-and-actions-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .agent-container {
    padding: 0.25rem 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid hsl(0, 0%, 90%);

    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  .agent-container p {
    font-size: 0.875rem;
    font-weight: 500;
  }
  .agent-container img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    object-fit: cover;
  }
</style>
