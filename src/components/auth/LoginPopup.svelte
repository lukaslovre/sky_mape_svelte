<script lang="ts">
  import { authorizeWithUserAndPass } from "../../lib/services/pocketbase/auth";
  import ButtonPrimary from "../common/ButtonPrimary.svelte";

  let username: string = $state("");
  let password: string = $state("");
  let errorMessage: string = $state("");

  async function handleSubmit() {
    try {
      await authorizeWithUserAndPass(username, password);

      window.location.reload();
    } catch (err: any) {
      errorMessage = err.message || "Unknown error";
    }
  }
</script>

<form
  id="login-form"
  onsubmit={(e) => {
    e.preventDefault();
    handleSubmit();
  }}
  oninput={() => {
    errorMessage = "";
  }}
>
  <div>
    <label for="username">Username</label>
    <input
      type="text"
      name="username"
      id="username"
      autocomplete="off"
      placeholder="npr. lukaslov"
      bind:value={username}
    />
  </div>

  <div>
    <label for="password">Password</label>
    <input
      type="password"
      name="password"
      id="password"
      autocomplete="off"
      placeholder="npr. testtest"
      bind:value={password}
    />
  </div>

  <p class="error-message">{errorMessage}</p>

  <ButtonPrimary text="Log in" />
</form>

<style>
  #login-form {
    position: absolute;
    top: calc(100% + 1rem);
    right: 0;
    z-index: 1001;

    background-color: hsl(0, 0%, 95%);
    border: 1px solid #ccc;
    border-radius: 1rem;
    box-shadow: 0 0.25rem 1.5rem rgba(0, 0, 0, 0.25);
    padding: 1rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  #login-form > div {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  #login-form label {
    font-size: 0.75rem;
    font-weight: 500;
    color: hsl(0, 0%, 33%);
  }

  input {
    position: relative;
    width: 100%;
    height: 2.5rem;
    padding: 0 1rem;

    outline: none;
    border: 1px solid #cccccc;
    border-radius: 0.5rem;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;

    font-size: 0.875rem;
    font-weight: 400;
    color: #1a1a1a;

    transition:
      outline 75ms ease-out,
      border 75ms ease-out;
  }

  input:hover {
    border: 1px solid hsl(0, 0%, 50%);
  }

  input:focus {
    box-shadow: 0 0 0 2px #0d65d9;
    border: 1px solid transparent;
    z-index: 1;
  }

  .error-message {
    font-size: 0.875rem;
    font-weight: 400;
    color: red;
  }
</style>
