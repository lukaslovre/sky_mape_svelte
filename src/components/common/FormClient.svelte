<script lang="ts">
  import Checkbox from "./Checkbox.svelte";
  import Close from "./Close.svelte";
  import Input from "./Input.svelte";
  import Textarea from "./Textarea.svelte";
  import { clientFormStore } from "../../stores/clientsFormStore.svelte";
  import DropdownFormFieldWrapped from "./DropdownFormFieldWrapped.svelte";
  import ActiveFiltersDisplayInForm from "../clients/ActiveFiltersDisplayInForm.svelte";
  import ActiveFavoritedPropertiesDisplayInForm from "../clients/ActiveFavoritedPropertiesDisplayInForm.svelte";

  interface Props {
    onSubmit: () => Promise<boolean>;
    close: () => void;
    formErrorString?: string;
    submitButtonText?: string;
  }

  let { onSubmit, close, formErrorString, submitButtonText = "Submit" }: Props = $props();

  let successState: boolean = $state(false);

  function handleClear() {
    clientFormStore.resetForm();
  }
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
      }, 2000);
    }
  }}
>
  {#each clientFormStore.fields as field (field.databaseFieldName)}
    {#if field.disabled && !field.value}
      <!-- Don't show -->
    {:else if field.inputElement === "input"}
      <Input formField={field} />
    {:else if field.inputElement === "textarea"}
      <Textarea formField={field} />
    {:else if field.inputElement === "select" && field.options}
      <DropdownFormFieldWrapped formField={field} />
    {:else if field.inputElement === "checkbox"}
      <Checkbox formField={field} />
    {:else}
      <p>Unknown input element type: {field.inputElement}</p>
    {/if}
  {/each}

  <!-- Selected properties & filters display -->
  <div class="filters-and-properties-container">
    <ActiveFiltersDisplayInForm />
    <ActiveFavoritedPropertiesDisplayInForm />
  </div>

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

  .filters-and-properties-container {
    display: flex;
    gap: 1.5rem;
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
