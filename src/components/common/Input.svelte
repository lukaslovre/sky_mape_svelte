<script lang="ts">
  import type { FormFieldType } from "../../types";
  import Label from "./Label.svelte";

  interface Props {
    formField: FormFieldType<any>;
  }

  let { formField = $bindable() }: Props = $props();

  type KeyboardShortcut = {
    onKey: string;
    appliesToFields: string[];
    transformValue: (value: string) => string;
  };
  const keyboardShortcuts: KeyboardShortcut[] = [
    {
      onKey: "Enter",
      appliesToFields: ["email"],
      transformValue: (value: string) => value + "@gmail.com",
    },
  ];

  function handleKeyDown(e: KeyboardEvent) {
    const shortcut = keyboardShortcuts.find((shortcut) => shortcut.onKey === e.key);
    const appliesToCurrentField = shortcut?.appliesToFields.includes(
      formField.databaseFieldName
    );

    if (shortcut && appliesToCurrentField) {
      e.preventDefault(); // Prevent default action for the key (eg. enter key submits the form)
      const newValue = shortcut.transformValue(formField.value);
      parseAndValidateInput(newValue);
    }
  }

  function handleInput(e: Event) {
    const rawValue = (e.target as HTMLInputElement).value;

    console.log(`${formField.databaseFieldName} input raw:`, rawValue);

    parseAndValidateInput(rawValue);
  }

  // Extract the formField logic from the handleInput into separate function to also be able to call it from onkeydown
  function parseAndValidateInput(rawValue: string) {
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
    text={`${formField.label} ${formField.required ? "(obavezno)" : ""} `}
  />
  {#if formField.error}
    <p class="error">{formField.error}</p>
  {/if}

  <input
    type="text"
    name={formField.databaseFieldName}
    id={formField.databaseFieldName}
    value={formField.value}
    placeholder={formField.placeholder}
    disabled={formField.disabled}
    oninput={handleInput}
    onkeydown={handleKeyDown}
    autocomplete="off"
  />
</div>

<style>
  .input {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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
    font-weight: 500;
    color: #1a1a1a;

    transition:
      outline 75ms ease-out,
      border 75ms ease-out;
  }
  input[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }

  input::placeholder {
    color: hsl(0, 0%, 60%);
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
