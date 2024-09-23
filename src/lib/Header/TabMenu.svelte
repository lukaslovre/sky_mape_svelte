<script lang="ts">
  import { activeTab, filteredProperties, filteredUsers } from "../../store";
  import type { Tabs } from "../../types";
  import MapIcon from "../../assets/icons/MapIcon.svelte";

  import HouseIcon from "../../assets/icons/HouseIcon.svelte";
  import PeopleIcon from "../../assets/icons/PeopleIcon.svelte";

  let tabs: Tabs[] = ["Map", "Properties", "Buyers", "Owners"];
  let showAllDrawings = false; // temp

  function handleTabClick(tab: Tabs) {
    $activeTab = tab;
  }

  type TabLabels = {
    [key in Tabs]: {
      icon: typeof MapIcon;
      label: string;
    };
  };

  let tabLabels: TabLabels;

  $: tabLabels = tabs.reduce((acc, tab) => {
    if (tab === "Properties") {
      acc[tab] = {
        label: `Popis nekretnina - ${$filteredProperties.length}`,
        icon: HouseIcon,
      };
    } else if (tab === "Buyers") {
      acc[tab] = {
        label: `Popis kupaca - ${$filteredUsers.length}`,
        icon: PeopleIcon,
      };
    } else if (tab === "Map") {
      acc[tab] = {
        label: "Karta",
        icon: MapIcon,
      };
    } else if (tab === "Owners") {
      acc[tab] = {
        label: "Popis vlasnika",
        icon: PeopleIcon,
      };
    }

    return acc;
  }, {} as TabLabels);
</script>

<nav>
  <ul class="tab-menu">
    {#each tabs as tab}
      <li>
        <button class:active={tab === $activeTab} on:click={() => handleTabClick(tab)}>
          <svelte:component
            this={tabLabels[tab].icon}
            size={24}
            color={tab === $activeTab ? "#1A1A1A" : "#4D4D4D"}
          />
          {tabLabels[tab].label}
        </button>
      </li>
    {/each}
  </ul>

  <div class="show-all-drawings-toggle">
    <input
      type="checkbox"
      bind:checked={showAllDrawings}
      id="show-all-drawings"
      name="show-all-drawings"
    />
    <label for="show-all-drawings">Show all drawings</label>
  </div>
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  nav ul {
    list-style: none;

    display: flex;
    gap: 1rem;
  }
  nav ul li button {
    height: 3rem;
    padding: 0 1.5rem;

    display: flex;
    align-items: center;
    gap: 0.5rem;

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
