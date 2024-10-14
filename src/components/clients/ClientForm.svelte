<script lang="ts">
  import { clientFormStore } from "../../stores/clientFormStore";
  import { clientFormFields, transformFields } from "./ClientFormUtils";
  import { createUser } from "../../models/Clients";
  import FormClient from "../common/FormClient.svelte";

  export let close: () => void;

  async function handleSubmit() {
    console.log($clientFormStore);
    const transformedFields = transformFields($clientFormStore);
    console.log(transformedFields);

    // try {
    //   await createUser(transformedFields);
    //   alert("Uspješno dodano!");
    //   close();
    // } catch (err) {
    //   handleSubmissionError(err);
    // }
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
