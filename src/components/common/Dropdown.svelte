<script lang="ts">
  import CheckmarkIcon from "../../assets/icons/CheckmarkIcon.svelte";
  import { onMount } from "svelte";
  import DropdownTriangleIcon from "../../assets/icons/DropdownTriangleIcon.svelte";
  import Label from "./Label.svelte";

  interface Props {
    multipleValues?: boolean;
    options?: { label: string; value: string }[];
    selectedValues: string[];
    onValueChange: (newValues: string[]) => void;
    label: string;
    id: string;
    error?: string;
    disabled?: boolean;
  }

  let {
    multipleValues = true,
    options = [],
    selectedValues,
    onValueChange,
    label,
    id,
    error,
    disabled = false,
  }: Props = $props();

  let isOpen: boolean = $state(false);
  let focusedOptionIndex: number = $state(-1);
  let dropdownElement: HTMLDivElement | undefined = $state();

  function getLabelsFromValues(values: string[], separator: string = ", ") {
    if (!Array.isArray(values)) return "Values nije array";

    if (values.length === 0) return "Nije odabrano";

    return values
      .map((value) => {
        const option = options.find((option) => option.value === value);
        return option?.label;
      })
      .filter(Boolean)
      .join(separator);
  }

  function handleOptionClick(value: string) {
    const isSelected = selectedValues.includes(value);
    let newValues: string[] = [];

    if (!multipleValues) {
      // Single select mode
      newValues = isSelected ? [] : [value];
    } else {
      // Multi select mode
      newValues = isSelected
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
    }

    onValueChange(newValues);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (!isOpen) {
      if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
        event.preventDefault();
        isOpen = true;
        focusedOptionIndex =
          selectedValues.length > 0
            ? options.findIndex((option) => option.value === selectedValues[0])
            : 0;
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusedOptionIndex = (focusedOptionIndex + 1) % options.length;
        break;
      case "ArrowUp":
        event.preventDefault();
        focusedOptionIndex =
          focusedOptionIndex <= 0 ? options.length - 1 : focusedOptionIndex - 1;
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        handleOptionClick(options[focusedOptionIndex].value);
        break;
      case "Escape":
        event.preventDefault();
        isOpen = false;
        break;
      case "Tab":
        isOpen = false;
        break;
    }
  }

  function toggleDropdownOptionsVisibility() {
    if (disabled) return;
    isOpen = !isOpen;
  }

  onMount(() => {
    if (!disabled) {
      window.addEventListener("click", handleClickOutside);

      return () => {
        window.removeEventListener("click", handleClickOutside);
      };
    }
  });

  function handleClickOutside(event: MouseEvent) {
    if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
      isOpen = false;
    }
  }
  let selectedValuesLabel = $derived(getLabelsFromValues(selectedValues));
</script>

<div
  class="dropdown-input"
  class:disabled
  class:none-selected={selectedValues.length === 0}
  bind:this={dropdownElement}
  role="combobox"
  aria-expanded={isOpen}
  aria-haspopup="listbox"
  aria-controls="dropdown-options"
>
  <Label forId={id} text={label} />

  {#if error}
    <p class="error">{error}</p>
  {/if}

  <button
    {id}
    type="button"
    class="dropdown-input-current"
    {disabled}
    onclick={toggleDropdownOptionsVisibility}
    onkeydown={handleKeyDown}
    aria-label={label}
  >
    {selectedValuesLabel}
    <DropdownTriangleIcon />
  </button>

  <div
    class="dropdown-input-options"
    class:open={isOpen}
    role="listbox"
    aria-multiselectable={multipleValues}
  >
    {#each options as { label, value }, i}
      <button
        type="button"
        class="dropdown-input-option"
        class:selected={selectedValues.includes(value)}
        class:focused={focusedOptionIndex === i}
        role="option"
        aria-selected={selectedValues.includes(value)}
        onclick={() => handleOptionClick(value)}
      >
        <div class="checkbox-square">
          {#if selectedValues.includes(value)}
            <CheckmarkIcon />
          {/if}
        </div>

        {label}
      </button>
    {/each}
  </div>
</div>

<style>
  .dropdown-input {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .dropdown-input.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  .dropdown-input.none-selected .dropdown-input-current {
    color: hsl(0, 0%, 50%);
  }

  .error {
    color: #ff0000;
    font-size: 0.875rem;
    font-weight: 400;
  }

  .dropdown-input-current {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    height: 2.5rem;
    padding: 0 1rem;
    width: 100%;

    border-radius: 0.5rem;
    outline: 1px solid transparent;
    border: 1px solid #cccccc;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
    font-size: 0.875rem;
    font-weight: 400;
    color: #1a1a1a;

    cursor: pointer;
    transition:
      outline 75ms ease-out,
      border 75ms ease-out;
  }

  .dropdown-input-current:hover {
    border: 1px solid hsl(0, 0%, 50%);
  }

  .dropdown-input-current:focus {
    outline: 2px solid #0d65d9;
    z-index: 1;
  }

  .dropdown-input-options {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    z-index: 1001; /* Leaflet map has high z-index, this is to compensate */
    width: max-content;
    display: none;
    flex-direction: column;

    border-radius: 0.375rem;
    background-color: #ffffff;
    box-shadow: 0 0.125rem 1rem rgba(0, 0, 0, 0.4);
  }

  .dropdown-input-options.open {
    display: flex;
  }

  .dropdown-input-option {
    border: none;
    outline: none;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.75rem;

    padding: 1rem;
    padding-right: 2rem;
    width: 100%;

    border-radius: 0.375rem;
    background-color: #ffffff;
    color: #1a1a1a;
    font-size: 1rem;
    font-weight: 500;

    transition: background-color 75ms ease-out;
    cursor: pointer;
  }

  .dropdown-input-option:hover,
  .dropdown-input-option:focus,
  .dropdown-input-option.focused {
    background-color: hsl(0, 0%, 95%);
  }

  .checkbox-square {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.25rem;
    background-color: transparent;
    border: 2px solid #808080;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dropdown-input-option.selected .checkbox-square {
    background-color: #0b5eda;
    border-color: #0b5eda;
  }

  /* Divideri između opcija */
  .dropdown-input-option {
    border-bottom: 1px solid #e6e6e6;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .dropdown-input-option:last-child {
    border-bottom: none;
    border-bottom-left-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
  }
</style>
