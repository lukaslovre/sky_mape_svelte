<script lang="ts">
  import { parseValueWithSuffix } from "../../lib/utils/numbers";
  import Label from "../common/Label.svelte";

  interface Props {
    label: string;
    id: string;
    minValue: string;
    maxValue: string;
    onMinValueChange: (newValue: string) => void;
    onMaxValueChange: (newValue: string) => void;
  }

  let {
    label,
    id,
    minValue,
    maxValue,

    onMinValueChange,
    onMaxValueChange,
  }: Props = $props();

  function handleInput() {
    minValue = parseValueWithSuffix(minValue);
    maxValue = parseValueWithSuffix(maxValue);
  }
</script>

<div class="min-max-input">
  <Label forId={`${id}`} text={label} />

  <div class="inputsContainer" oninput={handleInput}>
    <input
      type="text"
      name={id + "-min"}
      id={id + "-min"}
      value={minValue}
      oninput={(e) => onMinValueChange((e.target as HTMLInputElement).value)}
      class:empty={!minValue}
    />
    <input
      type="text"
      name={id + "-max"}
      id={id + "-max"}
      value={maxValue}
      oninput={(e) => onMaxValueChange((e.target as HTMLInputElement).value)}
      class:empty={!maxValue}
    />
  </div>
</div>

<style>
  .min-max-input {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    /* width: fit-content; */
  }

  .inputsContainer {
    display: flex;
  }

  input {
    flex: 1;

    position: relative;
    width: 100%;
    height: 2.5rem;
    padding: 0 1rem;

    background-color: #ffffff;
    outline: 1px solid transparent;
    border: 1px solid #cccccc;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);

    font-size: 0.875rem;
    font-weight: 500;
    color: #1a1a1a; /* hsl(0, 0%, 10%); */

    transition:
      outline 75ms ease-out,
      border 75ms ease-out;
  }

  input.empty {
    color: hsl(0, 0%, 50%);
    background-color: transparent;
  }

  .inputsContainer input:first-child {
    border-radius: 0.5rem 0 0 0.5rem;
  }
  .inputsContainer input:last-child {
    border-radius: 0 0.5rem 0.5rem 0;
  }

  input:hover {
    border: 1px solid hsl(0, 0%, 50%);
  }

  input:focus {
    outline: 2px solid #0d65d9;
    z-index: 1;
  }
</style>
