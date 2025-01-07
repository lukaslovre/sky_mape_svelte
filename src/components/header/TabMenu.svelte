<script lang="ts">
  import type { Tabs } from "../../types";
  import { filteredProperties, filteredUsers, filteredOwners } from "../../stores/store";
  import { userIsAuthenticated } from "../../auth";
  import { activeTab, tabsList } from "../../stores/uiStateStore";

  import MapIcon from "../../assets/icons/MapIcon.svelte";
  import HouseIcon from "../../assets/icons/HouseIcon.svelte";
  import PeopleIcon from "../../assets/icons/PeopleIcon.svelte";
  // import MessageIcon from "../../assets/icons/MessageIcon.svelte";
  import KeyIcon from "../../assets/icons/KeyIcon.svelte";

  // Define the structure for each tab's configuration
  type TabConfig = {
    icon: typeof MapIcon;
    label: string;
    requiresAuth: boolean;
  };

  // Configuration object for all tabs
  const tabConfigurations: Record<Tabs, TabConfig> = {
    Map: {
      icon: MapIcon,
      label: "Karta",
      requiresAuth: false,
    },
    Properties: {
      icon: HouseIcon,
      label: `Popis nekretnina - ${$filteredProperties.length}`,
      requiresAuth: true,
    },
    Buyers: {
      icon: PeopleIcon,
      label: `Popis kupaca - ${$filteredUsers.length}`,
      requiresAuth: true,
    },
    Owners: {
      icon: KeyIcon,
      label: `Popis vlasnika - ${$filteredOwners.length}`,
      requiresAuth: true,
    },
  };

  // Reactive store to update tab labels dynamically
  $: tabsList.forEach((tab) => {
    if (tab === "Properties") {
      tabConfigurations[tab].label = `Popis nekretnina - ${$filteredProperties.length}`;
    } else if (tab === "Buyers") {
      tabConfigurations[tab].label = `Popis kupaca - ${$filteredUsers.length}`;
    } else if (tab === "Owners") {
      tabConfigurations[tab].label = `Popis vlasnika - ${$filteredOwners.length}`;
    }
  });

  function handleTabClick(tab: Tabs) {
    if (tabConfigurations[tab].requiresAuth && !userIsAuthenticated()) {
      alert("Morate biti prijavljeni da biste pristupili ovoj podstranici.");
    } else {
      activeTab.set(tab);
    }
  }
</script>

<nav>
  <ul class="tab-menu">
    {#each tabsList as tab}
      <li>
        <button
          class:active={tab === $activeTab}
          on:click={() => handleTabClick(tab)}
          aria-label={tabConfigurations[tab].label}
        >
          <svelte:component
            this={tabConfigurations[tab].icon}
            size={24}
            color={tab === $activeTab ? "#1A1A1A" : "#4D4D4D"}
          />
          {tabConfigurations[tab].label}
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

  nav {
    padding: 1rem 2rem;
    background-color: #e6e6e6;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
    z-index: 401;
    position: relative;
    overflow-x: auto;
  }

  nav ul {
    list-style: none;

    display: flex;
    /* flex-direction: column; */
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
