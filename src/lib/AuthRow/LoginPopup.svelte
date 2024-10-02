<script lang="ts">
  import { authorizeWithUserAndPass } from "../../auth";
  import Input from "../FormItems/Input.svelte";
  import ButtonPrimary from "../General components/ButtonPrimary.svelte";

  let email = "";
  let password = "";

  let errorMessage: string = "";

  async function handleSubmit() {
    try {
      await authorizeWithUserAndPass(email, password);

      window.location.reload();
    } catch (err) {
      errorMessage = err instanceof Error ? err.message : "Nepoznata greška";
    }
  }
</script>

<form id="login-form" on:submit|preventDefault={handleSubmit}>
  <Input label="email" id="loginEmail" bind:value={email} />
  <Input label="password" id="loginPassword" bind:value={password} />

  <p class="error-message">{errorMessage}</p>

  <ButtonPrimary text="Log in" />
</form>

<style>
  #login-form {
    position: absolute;
    top: 100%;
    left: 1rem;
    z-index: 1001;

    background-color: hsl(0, 0%, 95%);
    border: 1px solid #ccc;
    border-radius: 1rem;
    box-shadow: 0 0.125rem 2rem rgba(0, 0, 0, 0.25);
    padding: 1rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .error-message {
    font-size: 0.875rem;
    font-weight: 400;
    color: red;
  }
</style>
