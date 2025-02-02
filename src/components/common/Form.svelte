<script lang="ts">
  import Checkbox from "./Checkbox.svelte";
  import Close from "./Close.svelte";
  import ImageInput from "./ImageInput.svelte";
  import Input from "./Input.svelte";
  import Textarea from "./Textarea.svelte";
  import { propertyFormStore } from "../../stores/propertiesFormStore.svelte";
  import CoordinateSelectionMap from "./CoordinateSelectionMap.svelte";
  import { getIconForProperty } from "../../utils/propertyIcons";
  import DropdownFormFieldWrapped from "./DropdownFormFieldWrapped.svelte";
  import { dataStore } from "../../stores/store.svelte";

  interface Props {
    onSubmit: () => Promise<boolean>;
    close: () => void;
    formErrorString?: string;
    submitButtonText?: string;
  }

  let { onSubmit, close, formErrorString, submitButtonText = "Submit" }: Props = $props();

  let successState: boolean = $state(false);

  function handleClear() {
    propertyFormStore.resetForm();
  }

  let markerIconUrl = $derived(
    getIconForProperty({
      id: "",
      hiddenOnWebsite:
        propertyFormStore.fields.find(
          (field) => field.databaseFieldName === "hiddenOnWebsite"
        )?.value || false,
      type:
        propertyFormStore.fields
          .find((field) => field.databaseFieldName === "type")
          ?.value.at(0) || "House",
    })
  );

  // Map specific
  // Check if a property with the same lat and lng already exists
  // If it does, show a warning message
  let propertyOnSameLocationExists = $derived.by(() => {
    const latLng = propertyFormStore.fields.find(
      (field) => field.databaseFieldName === "lat"
    )?.value as { lat: number; lng: number } | undefined;

    if (!latLng) return false;

    // It should actually check a rounded down value of the lat and lng
    // maybe to 4 decimal places

    const sameLocation = dataStore.properties.some(
      (property) => property.lat === latLng.lat && property.lng === latLng.lng
    );

    return sameLocation;
  });
</script>

<Close onClose={close} />

<form
  onsubmit={async (e) => {
    e.preventDefault();
    const success = await onSubmit();

    if (success) {
      successState = true;
      setTimeout(() => {
        close();
        propertyFormStore.resetForm();
      }, 2000);
    }
  }}
>
  {#each propertyFormStore.fields as field (field.databaseFieldName)}
    {#if field.disabled && !field.value}
      <!-- Don't show -->
    {:else if field.inputElement === "input"}
      <Input formField={field} />
    {:else if field.inputElement === "textarea"}
      <Textarea formField={field} />
    {:else if field.inputElement === "select" && field.options}
      {#if !propertyFormStore.isPaymentFrequencyVisible && field.databaseFieldName === "paymentFrequency"}
        <!-- Don't show field -->
      {:else}
        <DropdownFormFieldWrapped formField={field} />
      {/if}
    {:else if field.inputElement === "checkbox"}
      <Checkbox formField={field} />
    {:else if field.inputElement === "imageInput"}
      <ImageInput formField={field} />
    {:else if field.inputElement === "latLngMapInput"}
      <div class="latLngMapInputContainer">
        {#if propertyOnSameLocationExists}
          <p class="warning">A property already exists at this location</p>
        {/if}

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

  {#if formErrorString}
    <div class="non-field-specific-error-container">
      <p class="label">Error</p>
      <p class="error-msg">
        {formErrorString}
      </p>
    </div>
  {/if}

  <button type="submit" class:success={successState}>
    {successState ? "Success!" : submitButtonText}
  </button>
  <button type="button" class="clear-button" onclick={handleClear}>Reset form</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .latLngMapInputContainer {
    position: relative;
    width: 100%;
    height: 25rem;
    border: 1px solid #cccccc;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.125);
  }
  .latLngMapInputContainer .warning {
    position: absolute;
    z-index: 999;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    background-color: hsl(48, 100%, 50%, 1);
    border-radius: 0.5rem;
    border: 1px solid hsl(48, 100%, 25%);
    color: hsl(0, 0%, 25%);
    line-height: 150%;
    font-weight: 600;
    text-align: center;
  }

  .non-field-specific-error-container {
    padding: 0.5rem 1rem;
    background-color: hsla(0, 100%, 50%, 0.1);
    border-radius: 0.5rem;
    border: 1px solid hsla(0, 100%, 50%, 0.2);
    color: hsl(0, 100%, 25%);
    line-height: 150%;
  }
  .non-field-specific-error-container .label {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
  }

  button {
    height: 2.5rem;
    width: 100%;
    padding: 0 1.25rem;
    border-radius: 0.25rem;
    border: 1px solid transparent;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);

    font-size: 0.875rem;
    font-weight: 700;

    transition: background-color 75ms ease-out;
  }

  button[type="submit"] {
    background-color: #0d65d9;
    color: #fff;
  }

  button[type="submit"]:hover {
    background-color: hsl(216, 90%, 35%);
  }

  button[type="submit"].success {
    background-color: hsl(120, 100%, 35%);
  }

  .clear-button {
    background-color: hsl(0, 0%, 75%);
    color: hsl(0, 0%, 25%);
  }
  .clear-button:hover {
    background-color: hsl(0, 0%, 65%);
  }
</style>
