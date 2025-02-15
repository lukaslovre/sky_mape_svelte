<script lang="ts">
  import type { Component } from "svelte";
  import CheckmarkIcon from "../../assets/icons/CheckmarkIcon.svelte";
  import Label from "./Label.svelte";

  // What props should a SegmentedButton have?
  interface Props {
    options: { label: string | Component; value: string }[];
    selectedValues: string[];
    onValueChange: (newSelectedValues: string[]) => void;
    multipleValues?: boolean;
    label: string;
    id: string;
    error?: string;
    disabled?: boolean;
  }

  let {
    options,
    selectedValues,
    onValueChange,
    multipleValues = false,
    label,
    id,
    error,
    disabled = false,
  }: Props = $props();

  function handleOptionClick(value: string) {
    if (multipleValues) {
      if (selectedValues.includes(value)) {
        onValueChange(selectedValues.filter((v) => v !== value));
      } else {
        onValueChange([...selectedValues, value]);
      }
    } else {
      onValueChange([value]);
    }
  }
</script>

<!-- TODO: improve aria  -->
<div class="segmented-button-container">
  <Label forId={id} text={label} />

  <div class="segmented-button">
    {#each options as option (option.value)}
      <button
        class="segmented-button-option"
        class:selected={selectedValues.includes(option.value)}
        type="button"
        onclick={() => handleOptionClick(option.value)}
      >
        {#if selectedValues.includes(option.value)}
          <span class="selected-indicator"><CheckmarkIcon color="#0d65d9" /></span>
        {/if}
        {#if typeof option.label === "string"}
          {option.label}
        {:else}
          <option.label size={32} />
        {/if}
        <!-- {option.label} -->
      </button>
    {/each}
  </div>
</div>

<style>
  .segmented-button-container {
    width: 100%;
    /* position: relative; */
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .segmented-button {
    width: 100%;
    display: flex;
    height: 2.5rem;

    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
    /* background-color: #ffffff; */
    border-radius: 0.5rem;
  }
  .segmented-button-option {
    flex: 1;
    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    background-color: transparent;
    padding: 0 0.25rem;
    outline: 1px solid transparent;
    border: 1px solid #cccccc;
    font-size: 0.875rem;
    font-weight: 500;
    color: #1a1a1a;

    overflow: hidden;

    transition:
      outline 75ms ease-out,
      border 75ms ease-out,
      background-color 75ms ease-out;
  }
  .segmented-button-option.selected {
    background-color: hsl(0, 0%, 100%);
    /* background-color: #e7effb; */
    font-weight: 600;
  }
  .segmented-button-option:hover {
    border: 1px solid hsl(0, 0%, 50%);
  }
  .segmented-button-option:focus {
    outline: 2px solid #0d65d9;
    z-index: 1;
  }
  .segmented-button-option:first-child {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }
  .segmented-button-option:last-child {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  .segmented-button-option .selected-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
