<script lang="ts">
  import { addProperty } from "../../../models/Properties";
  import type { FormFieldType } from "../../../types";
  import { cleanErrors, clearFields } from "./PropertyFormUtils";
  import { deleteProperty } from "../../../models/Properties";
  import Form from "../../common/Form.svelte";

  export let fields: FormFieldType[];
  export let close: () => void;
  async function handleSubmit() {
    const transformedFields = transformFields(fields);
    console.log(transformedFields);

    try {
      await addProperty(transformedFields);
      alert("Uspješno dodano!");
    } catch (err) {
      handleSubmissionError(err);
    }
  }

  // Transforms the fields into a record of database field names and their values
  // If a field has a parsing function, it will be applied to the value
  // If the value is undefined, it will not be included in the record
  function transformFields(fields: FormFieldType[]): Record<string, any> {
    return fields.reduce(
      (acc, field) => {
        const parsedValue = parseFieldValue(field);
        if (parsedValue != undefined) {
          acc[field.databaseFieldName] = parsedValue;
        }
        return acc;
      },
      {} as Record<string, any>
    );
  }

  function parseFieldValue(field: FormFieldType): any {
    return field.parsingFunction ? field.parsingFunction(field.value) : field.value;
  }

  function handleSubmissionError(err: unknown) {
    console.log(err);
    cleanErrors(fields);

    if (isObjectError(err)) {
      if ("error" in err) {
        // Write the error to the first field (because the error doesn't specify which field it is)
        fields[0].error = err.error as string;
      } else if (Object.keys(err).length > 0) {
        // Assign the errors to the fields that have them
        assignFieldErrors(err);
      } else {
        // Assign an unknown error to all fields
        assignUnknownError();
      }
    }

    fields = fields;
  }

  function isObjectError(err: unknown): err is Record<string, unknown> {
    return typeof err === "object" && err !== null;
  }

  function assignFieldErrors(err: Record<string, unknown>) {
    fields.forEach((field) => {
      if (field.databaseFieldName in err) {
        field.error = err[field.databaseFieldName] as string;
      }
    });
  }

  function assignUnknownError() {
    fields.forEach((field) => {
      field.error = "Unknown error";
    });
  }

  async function handleDelete(id: string) {
    await deleteProperty(id);
  }

  function handleClear() {
    clearFields(fields);
    fields = fields;
  }
</script>

<Form
  {fields}
  onSubmit={handleSubmit}
  onDelete={handleDelete}
  onClear={handleClear}
  {close}
/>
