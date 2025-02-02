<script lang="ts">
  import { getCurrentUser, userIsAuthenticated } from "../../auth";
  import LoginPopup from "./LoginPopup.svelte";
  import UserDisplay from "./UserDisplay.svelte";

  let isAuth = userIsAuthenticated();
  let user = getCurrentUser();
  let showLoginPopup: boolean = $state(false);

  function toggleLoginPopupVisibility() {
    showLoginPopup = !showLoginPopup;
  }
</script>

{#if isAuth && user}
  <div id="auth-row-logged-in">
    <UserDisplay {user} />

    <!-- <UserSettingsIcon size={24} color="hsl(0,0%,50%)" /> -->
  </div>
{:else}
  <div id="auth-row-logged-out">
    {#if showLoginPopup}
      <LoginPopup />
    {/if}
    <button onclick={toggleLoginPopupVisibility}>Prijavi se</button>
  </div>
{/if}

<style>
  #auth-row-logged-in,
  #auth-row-logged-out {
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
  }

  #auth-row-logged-in {
    justify-content: space-between;
  }
  #auth-row-logged-out {
    justify-content: flex-end;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 0.25rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

    font-size: 0.75rem;
    font-weight: 600;
  }
</style>
