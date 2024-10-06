<script lang="ts">
  import Checkbox from "../../FormItems/Checkbox.svelte";
  import Dropdownv2 from "../../FormItems/Dropdownv2.svelte";
  import Input from "../../FormItems/Input.svelte";
  import Textarea from "../../FormItems/Textarea.svelte";
  import { propertyFormFields } from "./PropertyFormUtils";

  // ovo pretvorit u generalnu komponentu koja prima objekt sa podacima

  let fields = propertyFormFields.map((field) => ({ ...field }));

  async function tempSubmit() {
    const transformedFields = fields
      .map((field) => {
        return {
          [field.databaseFieldName]: field.value,
        };
      })
      .reduce((acc, curr) => {
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
      <Dropdownv2
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
