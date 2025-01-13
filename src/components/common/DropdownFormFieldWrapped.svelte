<script lang="ts">
  import type { FormFieldType } from "../../types";
  import Dropdown from "./Dropdown.svelte";
  export let formField: FormFieldType<any>;

  // $: console.log(formField.value, formField.options);
</script>

<Dropdown
  multipleValues={false}
  options={formField.options}
  selectedValues={formField.value}
  onValueChange={(newValues) => (formField.value = newValues)}
  label={`${formField.label} ${formField.required ? "(required)" : ""}`}
  id={formField.databaseFieldName}
  error={formField.error}
  disabled={formField.disabled}
/>
