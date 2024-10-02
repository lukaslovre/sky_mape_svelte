<script lang="ts">
  import type { users } from "../../types";

  export let user: users;
</script>

<div id="user-display">
  <p>Prijavljeni ste kao: {user.username} ({user.role})</p>
</div>

<style>
  #user-display {
  }

  p {
    font-size: 0.875rem;
    color: #333;
  }
</style>
