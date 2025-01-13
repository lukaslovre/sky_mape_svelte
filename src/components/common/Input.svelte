<script lang="ts">
  import type { FormFieldType } from "../../types";
  import Label from "./Label.svelte";

  interface Props {
    formField: FormFieldType<any>;
  }

  let { formField = $bindable() }: Props = $props();

  function handleInput(e: Event) {
    const rawValue = (e.target as HTMLInputElement).value;

    console.log(`${formField.databaseFieldName} input raw:`, rawValue);

    // If empty and not required
    if (rawValue === "" && !formField.required) {
      formField.value = "";
      formField.error = undefined;
      return;
    }

    // Parse
    const parsedValue = formField.parsingFunction
      ? formField.parsingFunction(rawValue)
      : rawValue;

    // Validate
    const error = formField.validators
      .map((validator) => validator(parsedValue))
      .filter((error) => error !== null)
      .join(" AND ");

    // Update field
    formField.error = error || undefined;
    formField.value = error ? rawValue : parsedValue;

    console.log(`${formField.databaseFieldName} input parsed:`, formField.value);
  }
</script>

<div class="input">
  <Label
    forId={formField.databaseFieldName}
    text={`${formField.label} ${formField.required ? "(required)" : ""} `}
  />
  {#if formField.error}
    <p class="error">{formField.error}</p>
  {/if}

  <!-- TOOD: disabled može se čitat s elementa [disabled] -->
  <input
    type="text"
    name={formField.databaseFieldName}
    id={formField.databaseFieldName}
    value={formField.value}
    placeholder={formField.placeholder}
    disabled={formField.disabled}
    class:disabled={formField.disabled}
    oninput={handleInput}
    autocomplete="off"
  />
</div>

<style>
  .input {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  input {
    position: relative;
    width: 100%;
    height: 2.5rem;
    padding: 0 1rem;

    /* outline: 2px solid transparent; */
    outline: none;
    border: 1px solid #cccccc;
    border-radius: 0.5rem;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;

    font-size: 0.875rem;
    font-weight: 400;
    color: #1a1a1a;

    transition:
      outline 75ms ease-out,
      border 75ms ease-out;
  }

  input:hover {
    border: 1px solid hsl(0, 0%, 50%);
  }

  input:focus {
    /* outline: 2px solid #0d65d9; */
    box-shadow:
      /* 0 2px 1px rgba(0, 0, 0, 0.1), */ 0 0 0 2px #0d65d9;
    z-index: 1;
  }

  .error {
    color: #ff0000;
    font-size: 0.875rem;
    font-weight: 400;
  }
</style>
