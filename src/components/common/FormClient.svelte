<script lang="ts">
  import Checkbox from "./Checkbox.svelte";
  import Close from "./Close.svelte";
  import Dropdown from "./Dropdown.svelte";
  import ImageInput from "./ImageInput.svelte";
  import Input from "./Input.svelte";
  import Textarea from "./Textarea.svelte";
  import { clientFormStore } from "../../stores/clientFormStore";
  import type { UserData } from "../../types";

  export let onSubmit: (transformedFields: Record<string, any>) => Promise<void>;
  export let onDelete: ((id: string) => Promise<void>) | null = null;
  export let close: () => void;
  export let submitButtonText = "Submit";
  export let deleteButtonText = "Delete";

  $: fields = $clientFormStore;

  function handleClear() {
    clientFormStore.clearFields();
  }
</script>

<Close on:close={close} />

<form on:submit|preventDefault={onSubmit}>
  {#each fields as field (field.databaseFieldName)}
    {#if field.inputElement === "input"}
      <Input
        label={field.label}
        id={field.databaseFieldName}
        required={field.required}
        disabled={field.disabled}
        error={field.error}
        bind:value={field.value}
      />
    {:else if field.inputElement === "textarea"}
      <Textarea
        label={field.label}
        id={field.databaseFieldName}
        required={field.required}
        error={field.error}
        bind:value={field.value}
      />
    {:else if field.inputElement === "select" && field.options}
      <Dropdown
        label={field.label}
        id={field.databaseFieldName}
        options={field.options}
        disabled={field.disabled}
        required={field.required}
        bind:values={field.value}
        error={field.error}
        multipleValues={false}
      />
    {:else if field.inputElement === "checkbox"}
      <Checkbox
        label={field.label}
        id={field.databaseFieldName}
        required={field.required}
        error={field.error}
        bind:checked={field.value}
      />
    {:else if field.inputElement === "imageInput"}
      <ImageInput
        label={field.label}
        id={field.databaseFieldName}
        required={field.required}
        error={field.error}
        bind:value={field.value}
      />
    {/if}
  {/each}

  <button type="submit">{submitButtonText}</button>
  <button type="button" class="clear-button" on:click={handleClear}>Reset form</button>
  {#if onDelete && fields.find((field) => field.databaseFieldName === "id")?.value}
    <button
      type="button"
      class="delete-button"
      on:click={() => {
        const id = fields.find((field) => field.databaseFieldName === "id")?.value;
        if (id && onDelete) {
          onDelete(id);
        }
      }}
    >
      {deleteButtonText}
    </button>
  {/if}
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  button {
    padding: 0.75rem 1rem;
    border-radius: 0.25rem;
  }

  button[type="submit"] {
    background-color: #007bff;
    color: #fff;
  }

  .delete-button {
    background-color: #ff0000;
    color: #fff;
  }

  .clear-button {
    background-color: #ccc;
  }
</style>
