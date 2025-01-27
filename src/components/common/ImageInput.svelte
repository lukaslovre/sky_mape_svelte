<script lang="ts">
  import type { FormFieldType } from "../../types";
  import { bytesToHumanReadable } from "../../utils/numbers";
  import Label from "./Label.svelte";

  interface Props {
    formField: FormFieldType<any>;
  }

  let { formField = $bindable() }: Props = $props();

  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (!files || files.length === 0) {
      formField.value = null;
      return;
    }

    handleFile(files[0]);
  }

  function handlePaste(event: ClipboardEvent) {
    console.log(event.clipboardData);

    const items = event.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === "file") {
        const file = item.getAsFile();
        if (!file) continue;

        handleFile(file);
      }
    }
  }

  function handleFile(file: File) {
    // Validate file type
    if (!file.type.includes("image")) {
      formField.error = "Please select an image file";
      return;
    }

    const error = formField.validators
      .map((validator) => validator(file))
      .filter((error) => error !== null)
      .join(" AND ");

    formField.error = error || undefined;
    formField.value = error ? null : file;

    console.log(`${formField.databaseFieldName} input parsed:`, formField.value);
  }
</script>

<svelte:document onpaste={handlePaste} />

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
    onchange={handleFileChange}
    required={formField.required}
  />

  {#if formField.value}
    <div class="pill-container">
      <!-- if its File type -->
      {#if formField.value instanceof File}
        <div class="img-preview-pill">
          <img src={URL.createObjectURL(formField.value)} alt="Selected image preview" />
        </div>
        <span class="pill">{formField.value.name}</span>
        <span class="pill">{bytesToHumanReadable(formField.value.size)}</span>
        <span class="pill">{formField.value.type}</span>
        <!-- If its an object with a .url property -->
      {:else if formField.value.url}
        <div class="img-preview-pill">
          <img src={formField.value.url} alt="Selected image preview" />
        </div>
      {/if}
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
    align-items: flex-start;
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

  .pill-container .img-preview-pill {
    width: 5rem;
    height: 5rem;
    border-radius: 0.5rem;
    overflow: hidden;
    padding: 0.25rem;
    background-color: hsla(214, 89%, 75%, 0.25);
    border: hsla(214, 89%, 75%, 0.5) 1px solid;
  }
  .pill-container .img-preview-pill img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* What is the formula to make an inside border radius feel natural compared to parent border radius? It depends on parent border radius and gap/padding */
    /* A common approach: subtract the inner gap or padding from the parent’s radius */
    /* border-radius: calc(var(--parent-radius) - var(--gap)); */
    border-radius: calc(0.5rem - 0.25rem);
  }
</style>
