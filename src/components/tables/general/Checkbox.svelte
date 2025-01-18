<script lang="ts">
  import CheckmarkIcon from "../../../assets/icons/CheckmarkIcon.svelte";

  interface Props {
    fieldId: string;
    checked: boolean;
    updateState: (fieldId: string, checked: boolean) => void;
  }

  let { fieldId, checked, updateState }: Props = $props();
</script>

<input
  type="checkbox"
  name={`selected-${fieldId}`}
  id={`selected-${fieldId}`}
  {checked}
  onchange={(e) => {
    e.stopPropagation();
    updateState(fieldId, !checked);
  }}
/>
<label for={`selected-${fieldId}`}>
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
