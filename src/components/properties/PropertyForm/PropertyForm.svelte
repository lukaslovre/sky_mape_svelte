<script lang="ts">
  import type { ParsedError } from "../../../lib/models/errorHandling";
  import { addProperty } from "../../../lib/models/Properties";
  import { propertyFormStore } from "../../../lib/stores/propertiesFormStore.svelte";
  import Form from "../../common/Form.svelte";

  interface Props {
    close: () => void;
  }

  let { close }: Props = $props();

  let formErrorString: string | undefined = $state();

  async function handleSubmit() {
    propertyFormStore.print();

    try {
      await addProperty(propertyFormStore.formatForUploadingToDatabase());
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
          propertyFormStore.setError(key, value);
        });
      } else {
        formErrorString = JSON.stringify(err);
      }
    } else {
      formErrorString = "Unknown error (error object is not typeof 'object').";
    }
  }
</script>

<Form onSubmit={handleSubmit} {close} {formErrorString} />
