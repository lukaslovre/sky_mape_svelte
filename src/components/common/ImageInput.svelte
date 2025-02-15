<script lang="ts">
  import type { FormFieldType } from "../../types";
  import { bytesToHumanReadable } from "../../lib/utils/numbers";
  import Label from "./Label.svelte";

  interface Props {
    formField: FormFieldType<any>;
  }

  let { formField = $bindable() }: Props = $props();

  let fileInputEl: HTMLInputElement | undefined = $state();

  function triggerFileInput() {
    fileInputEl?.click();
  }

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

<div class="custom-image-input">
  <Label
    forId={formField.databaseFieldName}
    text={`${formField.label} ${formField.required ? "(obavezno)" : ""}`}
  />

  {#if formField.error}
    <p class="error">{formField.error}</p>
  {/if}

  <button class="preview-area" onclick={triggerFileInput} type="button">
    {#if formField.value}
      {#if formField.value instanceof File}
        <img
          src={URL.createObjectURL(formField.value)}
          alt="Selected image preview"
          class="img-preview"
        />
        <div class="metadata">
          <span class="pill">{formField.value.name}</span>
          {#if formField.value.size}
            <span class="pill">{bytesToHumanReadable(formField.value.size)}</span>
          {/if}
          {#if formField.value.type}
            <span class="pill">{formField.value.type}</span>
          {/if}
        </div>
      {:else if formField.value.url}
        <img src={formField.value.url} alt="Selected image preview" class="img-preview" />
      {/if}
    {:else}
      <div class="placeholder">
        <p>📷 Klikni za odabir slike</p>
      </div>
    {/if}
  </button>

  <input
    bind:this={fileInputEl}
    type="file"
    accept="image/*"
    name={formField.databaseFieldName}
    id={formField.databaseFieldName}
    onchange={handleFileChange}
    required={formField.required}
    style="display:none;"
  />
</div>

<style>
  .custom-image-input {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .error {
    color: #ff0000;
    font-size: 0.875rem;
    font-weight: 400;
  }

  .preview-area {
    display: flex;
    gap: 1rem;

    background-color: #ffffff;
    padding: 1rem;
    border: 1px solid #cccccc;
    border-radius: 0.5rem;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);

    overflow: hidden;
    transition:
      border-color 0.2s ease-in-out,
      background-color 0.2s ease-in-out;
  }
  .preview-area:hover {
    border-color: hsl(0, 0%, 50%);
  }
  .preview-area:focus {
    box-shadow: 0 0 0 2px #0d65d9;
    outline: none;
    z-index: 1;
  }

  .placeholder p {
    color: hsl(0, 0%, 60%);
    font-weight: 500;
    font-size: 0.875rem;
  }

  .img-preview {
    width: 5rem;
    height: 5rem;
    border-radius: 0.5rem;
    object-fit: cover;
    border: 1px solid hsl(0, 0%, 90%);
  }

  .metadata {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }

  .pill {
    font-size: 0.75rem;
    font-weight: 600;
    color: hsl(0, 0%, 10%);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    background-color: hsl(0, 0%, 90%);
  }
</style>
