<script lang="ts">
  import { addProperty, deleteProperty } from "../../../models/Properties";
  import { propertyFormStore } from "../../../stores/propertyFormStore";
  import { transformFields } from "./PropertyFormUtils";
  import Form from "../../common/Form.svelte";

  export let close: () => void;

  async function handleSubmit() {
    const transformedFields = transformFields($propertyFormStore);
    console.log(transformedFields);

    try {
      await addProperty(transformedFields);
      alert("Uspješno dodano!");
      close();
    } catch (err) {
      handleSubmissionError(err);
    }
  }

  function handleSubmissionError(err: unknown) {
    console.log(err);

    if (typeof err === "object" && err !== null) {
      if (Object.keys(err).length > 0) {
        propertyFormStore.setErrors(err as Record<string, string>);
      } else {
        if ("error" in err) {
          alert(err.error);
        } else {
          alert("Unknown error");
        }
      }
    }
  }

  async function handleDelete(id: string) {
    await deleteProperty(id);
    close();
  }
</script>

<Form onSubmit={handleSubmit} onDelete={handleDelete} {close} />
