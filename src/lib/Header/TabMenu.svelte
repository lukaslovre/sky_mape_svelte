<script lang="ts">
  import {
    activeTab,
    filteredProperties,
    filteredUsers,
    filteredOwners,
  } from "../../stores/store";
  import type { Tabs } from "../../types";
  import MapIcon from "../../assets/icons/MapIcon.svelte";

  import HouseIcon from "../../assets/icons/HouseIcon.svelte";
  import PeopleIcon from "../../assets/icons/PeopleIcon.svelte";
  import MessageIcon from "../../assets/icons/MessageIcon.svelte";
  import KeyIcon from "../../assets/icons/KeyIcon.svelte";

  let tabs: Tabs[] = ["Map", "Properties", "Buyers", "Owners", "Interactions"];

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
        label: `Popis vlasnika - ${$filteredOwners.length}`,
        icon: KeyIcon,
      };
    } else if (tab === "Interactions") {
      acc[tab] = {
        label: `Interakcije`,
        icon: MessageIcon,
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
</nav>

<style>
  /* nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  } */

  nav ul {
    list-style: none;

    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  nav ul li button {
    width: 100%;
    height: 3rem;
    padding: 0 1.5rem;

    display: flex;
    align-items: center;
    gap: 1rem;

    background-color: #f5f5f5;
    border: 1px solid #f5f5f5;
    outline: none;
    border-radius: 0.5rem;
    box-shadow: none;

    font-size: 1rem;
    font-weight: 600;
    color: #4d4d4d;

    transition:
      border 75ms ease-out,
      color 75ms ease-out,
      background-color 75ms ease-out;
  }
  button:hover,
  button:focus {
    background-color: #fafafa;
    color: #1a1a1a;
    border: 1px solid #bfbfbf;
  }
  button.active {
    background-color: #ffffff;
    border: 2px solid #0b5eda;
    color: #1a1a1a;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }
</style>
