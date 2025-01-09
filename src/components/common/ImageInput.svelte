<script lang="ts">
  import type { FormFieldType } from "../../types";
  import { bytesToHumanReadable } from "../../utils/numbers";
  import Label from "./Label.svelte";

  export let formField: FormFieldType<any>;

  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (!files || files.length === 0) {
      formField.value = null;
      return;
    }

    const file = files[0];

    // Validate file type
    if (!file.type.startsWith("image/")) {
      formField.error = "Please select an image file";
      return;
    }

    const error = formField.validators
      .map((validator) => validator(file))
      .filter((error) => error !== null)
      .join(" AND ");

    formField.error = error || undefined;
    formField.value = error ? null : file;
    // if error clear the input
    if (error) {
      target.value = "";
    }

    console.log(`${formField.databaseFieldName} input parsed:`, formField.value);
  }
</script>

<div class="image-input">
  <Label
    forId={formField.databaseFieldName}
    text={`${formField.label} ${formField.required ? "(required)" : ""} `}
  />

  {#if formField.error}
    <p class="error">{formField.error}</p>
  {/if}

  <input
    type="file"
    accept="image/*"
    name={formField.databaseFieldName}
    id={formField.databaseFieldName}
    on:change={handleFileChange}
    required={formField.required}
  />

  {#if formField.value}
    <div class="pill-container">
      <span class="pill">{formField.value.name}</span>
      <span class="pill">{bytesToHumanReadable(formField.value.size)}</span>
      <span class="pill">{formField.value.type}</span>
    </div>
  {/if}
</div>

<style>
  .image-input {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  input[type="file"] {
    position: relative;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #cccccc;
    border-radius: 0.5rem;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
    font-size: 0.875rem;
    color: #1a1a1a;
    transition:
      border 75ms ease-out,
      box-shadow 75ms ease-out;
  }

  input[type="file"]:hover {
    border: 1px solid hsl(0, 0%, 50%);
  }

  input[type="file"]:focus {
    box-shadow: 0 0 0 2px #0d65d9;
    outline: none;
    z-index: 1;
  }

  .error {
    color: #ff0000;
    font-size: 0.875rem;
    font-weight: 400;
  }

  .pill-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .pill {
    font-size: 0.75rem;
    font-weight: 600;
    color: hsl(214, 89%, 40%);
    font-family: monospace;

    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    background-color: hsla(214, 89%, 75%, 0.25);
  }
</style>
