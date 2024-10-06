<script lang="ts">
  import type { users } from "../../types";

  export let user: users;
</script>

<div id="user-display">
  <img src="#" alt="pfp" />
  <span id="label">Prijavljeni ste kao: {user.username} ({user.role})</span>
</div>

<style>
  #user-display {
    background-color: transparent;
    border: 1px solid #d9d9d9;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;

    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;

    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.125);
  }

  #label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #1a1a1a;
  }
</style>
