<script lang="ts">
  import { filters, favoriteProperties } from "../../store";
  import Input from "../FormItems/Input.svelte";
  import Textarea from "../FormItems/Textarea.svelte";

  // // example create data
  // const data = {
  //     "name": "test",
  //     "phone": "test",
  //     "email": "test",
  //     "note": "test",
  //     "filters": "JSON",
  //     "favoriteProperties": [
  //         "RELATION_RECORD_ID"
  //     ]
  // };

  //   type UserData = {
  //   id: string;
  //   name: string;
  //   phone: string;
  //   email: string;
  //   note: string;
  //   filters: Filters | null;
  //   favoriteProperties: Property["id"][];
  // };

  function tempSubmit(e) {
    e.preventDefault();
    console.log(e);
  }
</script>

<form on:submit={tempSubmit}>
  <Input label="Ime" id="name" value="test" />

  <Input label="Telefon" id="phone" value="test" />

  <Input label="Email" id="email" value="test" />

  <Textarea label="Napomena" id="note" value="test" />

  <div>
    <label for="filters">Filteri</label>
    <div class="code-block">
      <pre>{JSON.stringify($filters, null, 2)}</pre>
    </div>
  </div>

  <div>
    <label for="favoriteProperties">Favorite properties</label>
    <div class="code-block">
      <pre>{JSON.stringify($favoriteProperties, null, 2)}</pre>
    </div>
  </div>

  <button type="submit">Spremi</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;

    color: #262626;
    font-size: 0.875rem;
    font-weight: 600;
  }

  pre {
    font-family: monospace;
  }

  .code-block {
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.25rem;

    max-height: 10rem;
    overflow-y: auto;
  }
</style>
