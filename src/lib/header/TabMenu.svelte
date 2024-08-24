<script lang="ts">
  import { activeTab, filteredProperties, filteredUsers } from "../../store";
  import type { Tabs } from "../../types";

  let tabs: Tabs[] = ["Map", "Properties", "Buyers"];

  function handleTabClick(tab: Tabs) {
    $activeTab = tab;
  }

  type TabLabels = {
    [key in Tabs]: string;
  };

  let tabLabels = {} as TabLabels;

  $: tabLabels = tabs.reduce((acc: TabLabels, tab: Tabs) => {
    if (tab === "Properties") {
      acc[tab] = `${$filteredProperties.length} ${tab}`;
    } else if (tab === "Buyers") {
      acc[tab] = `${$filteredUsers.length} ${tab}`;
    } else {
      acc[tab] = tab;
    }
    return acc;
  }, {} as TabLabels);
</script>

<nav>
  <ul class="tab-menu">
    {#each tabs as tab}
      <li>
        <button class:active={tab === $activeTab} on:click={() => handleTabClick(tab)}>
          {tabLabels[tab]}
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
    height: 3rem;
    padding: 0 1.5rem;

    background-color: #fff;
    border: 0.125rem solid #bfbfbf;
    outline: none;
    border-radius: 0.5rem 0.5rem 0.25rem 0.25rem;
    box-shadow: none;

    font-size: 1rem;
    font-weight: 600;
    color: #4d4d4d;

    transition:
      border-color 75ms ease-out,
      color 75ms ease-out,
      border-radius 75ms ease-out;
  }
  button:hover,
  button:focus {
    color: #1a1a1a;
    border-radius: 0.5rem;
    border-color: #1a1a1a;
  }
  button.active {
    border-color: #0b5eda;
    color: #1a1a1a;
    border-radius: 0.5rem;
  }
</style>
