<script lang="ts">
  import type { Agent, DialogType, Property, UserData } from "../../types";
  import PropertyCard from "./PropertyCard.svelte";
  import PropertyPageButtons from "./PropertyPageButtons.svelte";
  import { agents, filteredProperties, users } from "../../stores/store";
  import { sortProperties } from "../../utils/properties";
  import PropertyForm from "./PropertyForm/PropertyForm.svelte";
  import { propertyFormFields } from "./PropertyForm/PropertyFormUtils";
  import Header1 from "../common/Header1.svelte";
  import { getCurrentUser } from "../../auth";

  const currentUser = getCurrentUser();

  // Property sorting
  let sortOption: keyof Property | null = null;

  function setSortOption(option: keyof Property) {
    sortOption = option;
  }

  // Property filtering
  let showForm = true;

  function updatePropertyFormFields(agents: Agent[], users: UserData[]) {
    propertyFormFields.forEach((field) => {
      if (field.databaseFieldName === "agent_id" && agents.length > 0) {
        field.options = agents.map((agent) => ({
          value: agent.id,
          label: agent.name,
        }));

        const isEmpty = !field.value || field.value.length === 0;

        field.value = isEmpty ? [currentUser.id] : field.value;
        field.disabled = currentUser.role === "agent";
      }

      if (field.databaseFieldName === "ownerId" && users.length > 0) {
        field.options = users.map((user) => ({
          value: user.id,
          label: user.name,
        }));
      }
    });

    console.log("Triggered updatePropertyFormFields");
    console.log(propertyFormFields);
  }

  $: updatePropertyFormFields($agents, $users);
</script>

<div class="properties-container">
  <Header1>Popis nekretnina</Header1>

  {#if !showForm}
    <PropertyPageButtons
      {setSortOption}
      setDialog={() => {
        showForm = !showForm;
      }}
    />
  {/if}

  {#if showForm}
    <PropertyForm fields={propertyFormFields} close={() => (showForm = false)} />
  {:else}
    <div class="properties-grid-container">
      {#each sortProperties($filteredProperties, sortOption) as property (property.id)}
        <PropertyCard {property} on:openSideNote />
      {/each}
    </div>
  {/if}
</div>

<style>
  .properties-container {
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
  }

  .properties-grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    gap: 2rem;
  }
</style>
