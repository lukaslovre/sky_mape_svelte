<script lang="ts">
  import type { FormFieldType } from "../../types";
  import Checkbox from "./Checkbox.svelte";
  import Close from "./Close.svelte";
  import Dropdown from "./Dropdown.svelte";
  import ImageInput from "./ImageInput.svelte";
  import Input from "./Input.svelte";
  import Textarea from "./Textarea.svelte";

  export let fields: FormFieldType[];
  export let onSubmit: (transformedFields: Record<string, any>) => Promise<void>;
  export let onDelete: ((id: string) => Promise<void>) | null = null;
  export let onClear: (() => void) | null = null;
  export let close: () => void;
  export let submitButtonText = "Submit";
  export let deleteButtonText = "Delete";

  async function handleSubmit() {
    // Transforms the fields into a single object in this format:
    // {
    //   field1: value1,
    //   field2: value2,
    //   ...
    // }
    const transformedFields = fields.reduce((acc, field) => {
      const parsedValue = field.parsingFunction
        ? field.parsingFunction(field.value)
        : field.value;
      if (parsedValue != undefined) {
        return {
          ...acc,
          [field.databaseFieldName]: parsedValue,
        };
      }
      return acc;
    }, {});

    try {
      await onSubmit(transformedFields);
    } catch (err) {
      console.error(err);

      if (typeof err === "object" && err !== null) {
        if ("error" in err) {
          fields[0].error = err.error as string;
        } else if (Object.keys(err).length > 0) {
          fields.forEach((field) => {
            if (field.databaseFieldName in err) {
              field.error = err[field.databaseFieldName] as string;
            }
          });
        } else {
          fields.forEach((field) => {
            field.error = "Unknown error";
          });
        }
      }

      fields = fields;
    }
  }

  function handleClear() {
    if (onClear) {
      onClear();
    }
  }
</script>

<Close on:close={close} />

<form on:submit|preventDefault={handleSubmit}>
  {#each fields as field}
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
        error={field.error}
        bind:values={field.value}
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
