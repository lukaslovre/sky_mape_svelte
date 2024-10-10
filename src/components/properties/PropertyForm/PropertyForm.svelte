<script lang="ts">
  import { addProperty } from "../../../models/Properties";
  import type { FormFieldType } from "../../../types";
  import Checkbox from "../../common/Checkbox.svelte";
  import Dropdown from "../../common/Dropdown.svelte";
  import ImageInput from "../../common/ImageInput.svelte";
  import Input from "../../common/Input.svelte";
  import Textarea from "../../common/Textarea.svelte";
  import { cleanErrors } from "./PropertyFormUtils";

  // ovo pretvorit u generalnu komponentu koja prima objekt sa podacima

  export let fields: FormFieldType[];

  async function tempSubmit() {
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

    console.log(transformedFields);

    try {
      await addProperty(transformedFields);
      alert("Uspješno dodano!");
    } catch (err) {
      console.log(err);
      cleanErrors(fields);
      if (typeof err === "object" && err !== null) {
        if ("error" in err) {
          // put it in the first field
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
</script>

<form on:submit|preventDefault={tempSubmit}>
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
