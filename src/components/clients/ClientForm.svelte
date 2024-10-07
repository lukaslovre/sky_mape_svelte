<script lang="ts">
  import { createUser } from "../../models/Clients";
  import { filters, favoriteProperties } from "../../stores/store";
  import type { PocketbaseAttributes, UserData } from "../../types";
  import Input from "../common/Input.svelte";
  import Label from "../common/Label.svelte";
  import Textarea from "../common/Textarea.svelte";

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

  let name = "";
  let phone = "";
  let email = "";
  let note = "";

  async function tempSubmit() {
    const user: Omit<UserData, keyof PocketbaseAttributes> = {
      name,
      phone,
      email,
      note,
      filters: $filters,
      favoriteProperties: $favoriteProperties,
      // userType,
      // payment_method,
    };

    console.log(user);

    try {
      const createdRecord = await createUser(user);
      console.log(createdRecord);
    } catch (error) {
      console.log(error);
    }
  }
</script>

<form on:submit|preventDefault={tempSubmit}>
  <Input label="Ime" id="name" bind:value={name} />

  <Input label="Telefon" id="phone" bind:value={phone} />

  <Input label="Email" id="email" bind:value={email} />

  <Textarea label="Napomena" id="note" bind:value={note} />

  <div class="flex-col-gap-05rem">
    <Label forId="filters" text="Filteri" />
    <div class="code-block">
      <pre>{JSON.stringify($filters, null, 2)}</pre>
    </div>
  </div>

  <div class="flex-col-gap-05rem">
    <Label forId="favoriteProperties" text="Favorite properties" />
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

  .flex-col-gap-05rem {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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

  button[type="submit"] {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border-radius: 0.25rem;
    cursor: pointer;
  }
</style>
