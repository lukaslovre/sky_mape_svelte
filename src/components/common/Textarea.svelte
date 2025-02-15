<script lang="ts">
  import type { FormFieldType } from "../../types";
  import Label from "./Label.svelte";

  interface Props {
    formField: FormFieldType<any>;
  }

  let { formField = $bindable() }: Props = $props();

  function handleInput(e: Event) {
    const rawValue = (e.target as HTMLTextAreaElement).value;

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

<div class="textarea">
  <Label
    forId={formField.databaseFieldName}
    text={`${formField.label} ${formField.required ? "(obavezno)" : ""} `}
  />
  {#if formField.error}
    <p class="error">{formField.error}</p>
  {/if}

  <textarea
    id={formField.databaseFieldName}
    name={formField.databaseFieldName}
    value={formField.value}
    placeholder={formField.placeholder}
    disabled={formField.disabled}
    autocomplete="off"
    oninput={handleInput}
  ></textarea>
</div>

<style>
  .textarea {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  textarea {
    position: relative;
    width: 100%;
    min-height: 7rem;
    padding: 0.75rem 1rem;

    outline: 1px solid transparent;
    border: 1px solid #cccccc;
    border-radius: 0.5rem;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;

    font-size: 0.875rem;
    font-weight: 500;
    color: #1a1a1a;
    line-height: 1.5;

    resize: vertical;

    transition:
      outline 75ms ease-out,
      border 75ms ease-out;
  }

  textarea::placeholder {
    color: hsl(0, 0%, 60%);
  }

  textarea:hover {
    border: 1px solid hsl(0, 0%, 50%);
  }

  textarea:focus {
    outline: 2px solid #0d65d9;
    z-index: 1;
  }

  .error {
    color: #ff0000;
    font-size: 0.875rem;
    font-weight: 400;
  }
</style>
