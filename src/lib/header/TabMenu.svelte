<script lang="ts">
  import { activeTab } from "../../store";
  import type { Tabs } from "../../types";

  let tabs_values: Tabs[] = ["Map", "Properties", "Buyers"];
</script>

<nav>
  <ul class="tab-menu">
    {#each tabs_values as tab}
      <li>
        <button
          class:active={tab === $activeTab}
          on:click={() => {
            $activeTab = tab;
          }}
        >
          {tab}
        </button>
      </li>
    {/each}
  </ul>
</nav>

<style>
  nav ul {
    list-style: none;

    display: flex;
    gap: 1rem;
  }
  nav ul li button {
    padding: 0.75rem 1.5rem;
    background-color: #fff;
    border: 1px solid #bfbfbf;
    outline: 0px solid #0b5eda;
    border-radius: 0.5rem;
    box-shadow: none;

    font-size: 1rem;
    font-weight: 600;
    color: #4d4d4d;

    transition:
      outline 75ms ease-out,
      color 75ms ease-out;
  }
  button.active {
    outline: 2px solid #0b5eda;
    color: #1a1a1a;
  }
</style>
