<script lang="ts">
  import Checkbox from "./Checkbox.svelte";
  import Close from "./Close.svelte";
  import Dropdown from "./Dropdown.svelte";
  import ImageInput from "./ImageInput.svelte";
  import Input from "./Input.svelte";
  import Textarea from "./Textarea.svelte";
  import { propertyFormStore } from "../../stores/propertiesFormStore";
  import CoordinateSelectionMap from "./CoordinateSelectionMap.svelte";
  import { getIconForProperty } from "../../utils/propertyIcons";

  export let onSubmit: () => Promise<void>;
  export let close: () => void;
  export let submitButtonText = "Submit";

  $: fields = $propertyFormStore;

  function handleClear() {
    propertyFormStore.resetForm();
  }

  //
  $: markerIconUrl = getIconForProperty(
    {
      hiddenOnWebsite:
        fields.find((field) => field.databaseFieldName === "hiddenOnWebsite")?.value ||
        false,
      type:
        fields.find((field) => field.databaseFieldName === "type")?.value.at(0) ||
        "House",
    },
    false
  );
</script>

<Close on:close={close} />

<form on:submit|preventDefault={() => onSubmit()}>
  {#each fields as field (field.databaseFieldName)}
    {#if field.inputElement === "input"}
      <Input formField={field} />
    {:else if field.inputElement === "textarea"}
      <Textarea formField={field} />
    {:else if field.inputElement === "select" && field.options}
      <!-- <Dropdown formField={field} multipleValues={false} /> -->
      <p>Wait...</p>
    {:else if field.inputElement === "checkbox"}
      <Checkbox formField={field} />
    {:else if field.inputElement === "imageInput"}
      <ImageInput formField={field} />
    {:else if field.inputElement === "latLngMapInput"}
      <div class="latLngMapInputContainer">
        <CoordinateSelectionMap
          lat={field.value.lat}
          lng={field.value.lng}
          onCoordinatesSelected={(lat, lng) => {
            field.value.lat = lat;
            field.value.lng = lng;
          }}
          iconUrl={markerIconUrl}
        />
      </div>
    {/if}
  {/each}

  <button type="submit">{submitButtonText}</button>
  <button type="button" class="clear-button" on:click={handleClear}>Reset form</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .latLngMapInputContainer {
    width: 100%;
    height: 25rem;
    border: 1px solid #cccccc;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.125);
  }

  button {
    padding: 0.75rem 1rem;
    border-radius: 0.25rem;
  }

  button[type="submit"] {
    background-color: #007bff;
    color: #fff;
  }

  .clear-button {
    background-color: #ccc;
  }
</style>
