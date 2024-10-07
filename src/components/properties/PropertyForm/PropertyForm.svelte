<script lang="ts">
  import type { FormFieldType } from "../../../types";
  import Checkbox from "../../common/Checkbox.svelte";
  import Dropdown from "../../common/Dropdown.svelte";
  import Input from "../../common/Input.svelte";
  import Textarea from "../../common/Textarea.svelte";

  // ovo pretvorit u generalnu komponentu koja prima objekt sa podacima

  export let fields: FormFieldType[];

  // parse as number if inputType is "number",
  // if its imageUrl, split by comma and return array
  function parseFormData() {
    return fields.map((field) => {
      if (field.inputType === "number") {
        return {
          [field.databaseFieldName]: Number(field.value),
        };
      } else if (field.inputType === "imageUrl") {
        return {
          [field.databaseFieldName]: field.value.split(","),
        };
      } else {
        return {
          [field.databaseFieldName]: field.value,
        };
      }
    });
  }

  async function tempSubmit() {
    const transformedFields = parseFormData().reduce((acc, curr) => {
      return { ...acc, ...curr };
    });

    console.log(transformedFields);
  }
</script>

<form on:submit|preventDefault={tempSubmit}>
  {#each fields as field}
    {#if field.inputElement === "input"}
      <Input label={field.label} id={field.databaseFieldName} bind:value={field.value} />
    {:else if field.inputElement === "textarea"}
      <Textarea
        label={field.label}
        id={field.databaseFieldName}
        bind:value={field.value}
      />
    {:else if field.inputElement === "select" && field.options}
      <Dropdown
        label={field.label}
        id={field.databaseFieldName}
        options={field.options}
        bind:values={field.value}
      />
    {:else if field.inputElement === "checkbox"}
      <Checkbox
        label={field.label}
        id={field.databaseFieldName}
        bind:checked={field.value}
      />
    {/if}
  {/each}

  <button type="submit">Spremi</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  button[type="submit"] {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border-radius: 0.25rem;
    cursor: pointer;
  }
</style>
