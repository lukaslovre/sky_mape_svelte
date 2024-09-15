<script lang="ts">
  import type { Property } from "../../types";
  import Input from "../FormItems/Input.svelte";
  import Textarea from "../FormItems/Textarea.svelte";

  type inputElement = "input" | "textarea";

  const fields: {
    label: string;
    inputElement: inputElement;
    databaseFieldName: keyof Property;
    value: string;
  }[] = [
    {
      label: "Title",
      inputElement: "input",
      databaseFieldName: "title",
      value: "",
    },
    {
      label: "Price",
      inputElement: "input",
      databaseFieldName: "price",
      value: "",
    },
    {
      label: "Description",
      inputElement: "textarea",
      databaseFieldName: "description",
      value: "",
    },
  ];

  async function tempSubmit() {
    console.log(
      fields
        .map((field) => {
          return {
            [field.databaseFieldName]: field.value,
          };
        })
        .reduce((acc, curr) => {
          return { ...acc, ...curr };
        })
    );
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
