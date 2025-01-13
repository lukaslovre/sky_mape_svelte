<script lang="ts">
  import { clientFormStore } from "../../stores/clientFormStore";
  import { createUser } from "../../models/Clients";
  import FormClient from "../common/FormClient.svelte";
  import { filters, favoriteProperties } from "../../stores/store";
  import { parseFilterValues } from "../../utils/filter";

  interface Props {
    close: () => void;
  }

  let { close }: Props = $props();

  async function handleSubmit() {
    const transformedFields = clientFormStore.getAndTransformFields();

    // Add favorites and filters to the transformedFields
    transformedFields.favoriteProperties = $favoriteProperties;
    transformedFields.filters = parseFilterValues($filters);

    console.log(transformedFields);

    try {
      await createUser(transformedFields);
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
        clientFormStore.setErrors(err as Record<string, string>);
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
    console.log("delete", id);
    // await deleteUser(id);
    // close();
  }
</script>

<FormClient onSubmit={handleSubmit} onDelete={handleDelete} {close} />
