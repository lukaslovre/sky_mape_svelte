<script lang="ts">
  import type { FormFieldType } from "../../types";

  interface Props {
    formField: FormFieldType<any>;
  }

  let { formField = $bindable() }: Props = $props();

  function handleInput(e: Event) {
    const rawValue = (e.target as HTMLInputElement).checked;

    console.log(`${formField.databaseFieldName} input raw:`, rawValue);

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

<div class="checkbox">
  <input
    type="checkbox"
    name={formField.databaseFieldName}
    id={formField.databaseFieldName}
    checked={formField.value}
    onchange={handleInput}
    disabled={formField.disabled}
  />
  <label for={formField.databaseFieldName}>
    {`${formField.label} ${formField.required ? "(required)" : ""}`}
  </label>
  {#if formField.error}
    <p class="error">{formField.error}</p>
  {/if}
</div>

<style>
  .checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  input[type="checkbox"] {
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid #808080;
    border-radius: 0.25rem;
    cursor: pointer;
    position: relative;
    transition:
      background-color 0.2s,
      border-color 0.2s;
  }
  input[type="checkbox"]:checked {
    background-color: #007bff;
    border-color: #007bff;
  }

  input[type="checkbox"]:checked::after {
    content: "";
    position: absolute;
    top: 0.25rem;
    left: 0.5rem;
    width: 0.3rem;
    height: 0.6rem;
    border: solid white;
    border-width: 0 0.125rem 0.125rem 0;
    transform: rotate(45deg);
  }

  /* Disabled State */
  input[type="checkbox"]:disabled {
    background-color: #e9ecef;
    border-color: #ced4da;
    cursor: not-allowed;
  }

  label {
    cursor: pointer;
    user-select: none;
    font-size: 0.875rem;
    font-weight: 500;
    color: #1a1a1a;
  }

  .error {
    color: #ff0000;
    font-size: 0.875rem;
    font-weight: 400;
  }
</style>
