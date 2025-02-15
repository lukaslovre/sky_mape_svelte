<script lang="ts">
  import { createUser } from "../../lib/models/Clients";
  import FormClient from "../common/FormClient.svelte";
  import { clientFormStore } from "../../lib/stores/clientsFormStore.svelte";
  import type { ParsedError } from "../../lib/models/errorHandling";

  interface Props {
    close: () => void;
  }

  let { close }: Props = $props();

  let formErrorString: string | undefined = $state();

  async function handleSubmit() {
    clientFormStore.print();

    try {
      await createUser(clientFormStore.formatForUploadingToDatabase());
      return true;
    } catch (err) {
      handleSubmissionError(err as ParsedError);
      return false;
    }
  }

  function handleSubmissionError(err: ParsedError) {
    console.log(err);

    if (typeof err === "object") {
      if ("error" in err) {
        formErrorString = err.error;
      } else if ("message" in err) {
        formErrorString = err.message;
      } else if (Object.keys(err).length > 0) {
        const formatedMsg = Object.entries(err)
          .map(([key, value]) => `Polje: "${key}" -> ${value}`)
          .join("\n");
        formErrorString = formatedMsg;
        Object.entries(err).forEach(([key, value]) => {
          clientFormStore.setError(key, value);
        });
      } else {
        formErrorString = JSON.stringify(err);
      }
    } else {
      formErrorString = "Unknown error (error object is not typeof 'object').";
    }
  }
</script>

<FormClient onSubmit={handleSubmit} {close} {formErrorString} />
