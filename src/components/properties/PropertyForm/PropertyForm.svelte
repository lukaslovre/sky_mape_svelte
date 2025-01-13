<script lang="ts">
  import { addProperty, deleteProperty } from "../../../models/Properties";
  import { propertyFormStore } from "../../../stores/propertiesFormStore.svelte";
  import Form from "../../common/Form.svelte";

  interface Props {
    close: () => void;
  }

  let { close }: Props = $props();

  async function handleSubmit() {
    propertyFormStore.print();
    // const transformedFields = propertyFormStore.getAndTransformFields();

    // console.log(transformedFields);

    // try {
    //   await addProperty(transformedFields);
    //   alert("Uspješno dodano!");
    //   close();
    // } catch (err) {
    //   handleSubmissionError(err);
    // }
  }

  function handleSubmissionError(err: unknown) {
    console.log(err);

    if (typeof err === "object" && err !== null) {
      if ("error" in err) {
        alert(err.error);
      } else if (Object.keys(err).length > 0) {
        propertyFormStore.setErrors(err as Record<string, string>);
      } else {
        alert("Unknown error");
      }
    } else {
      alert("Unknown error");
    }
  }
</script>

<Form onSubmit={handleSubmit} {close} />
