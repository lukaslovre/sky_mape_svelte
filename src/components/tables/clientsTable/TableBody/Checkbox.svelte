<script lang="ts">
  import { stopPropagation } from 'svelte/legacy';

  import CheckmarkIcon from "../../../../assets/icons/CheckmarkIcon.svelte";

  interface Props {
    value: string;
    checked: boolean;
    updateState: (userId: string, checked: boolean) => void;
  }

  let { value, checked, updateState }: Props = $props();
</script>

<input
  type="checkbox"
  name={`selected-${value}`}
  id={`selected-${value}`}
  {checked}
  onchange={stopPropagation(() => updateState(value, !checked))}
/>
<label for={`selected-${value}`}>
  {#if checked}
    <CheckmarkIcon />
  {/if}
</label>

<style>
  input[type="checkbox"] {
    display: none;
  }
  label {
    cursor: pointer;

    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.25rem;
    background-color: transparent;
    border: 2px solid #808080;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  input[type="checkbox"]:checked + label {
    background-color: #0b5eda;
    border-color: #0b5eda;
  }
</style>
