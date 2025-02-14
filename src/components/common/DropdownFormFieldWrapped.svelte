<script lang="ts">
  import type { FormFieldType } from "../../types";
  import Dropdown from "./Dropdown.svelte";
  interface Props {
    formField: FormFieldType<any>;
  }

  let { formField = $bindable() }: Props = $props();
</script>

<Dropdown
  multipleValues={false}
  options={formField.options}
  selectedValues={formField.value}
  onValueChange={(newValues) => (formField.value = newValues)}
  label={`${formField.label} ${formField.required ? "(obavezno)" : ""}`}
  id={formField.databaseFieldName}
  error={formField.error}
  disabled={formField.disabled}
/>
