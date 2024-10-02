<script lang="ts">
  import { currentUser, logOut, userIsAuthenticated } from "../../auth";
  import LoginPopup from "./LoginPopup.svelte";
  import UserDisplay from "./UserDisplay.svelte";

  let isAuth = userIsAuthenticated();
  let user = currentUser();

  let showLoginPopup: boolean = false;
</script>

<div id="auth-row">
  {#if showLoginPopup}
    <LoginPopup />
  {/if}

  {#if isAuth}
    <UserDisplay {user} />

    <button
      on:click={() => {
        logOut();
        window.location.reload();
      }}>Odjavi se</button
    >
  {:else}
    <button
      on:click={async () => {
        showLoginPopup = !showLoginPopup;
      }}>Prijavi se</button
    >
  {/if}
</div>

<style>
  #auth-row {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #f0f0f0;
    border-radius: 0.25rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

    font-size: 0.75rem;
    font-weight: 600;
  }
</style>
