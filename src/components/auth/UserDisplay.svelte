<script lang="ts">
  import type { Agent } from "../../types";

  interface Props {
    user: Agent;
  }

  let { user }: Props = $props();
</script>

<div id="user-display">
  <img src={user.avatar} alt="pfp" />
  <span id="label">Korisnik: {user.username} ({user.role})</span>
</div>

<style>
  #user-display {
    background-color: transparent;
    margin-right: auto;

    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  img {
    width: 2rem;
    height: 2rem;
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
