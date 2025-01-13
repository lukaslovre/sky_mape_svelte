<script lang="ts">
  import type { MenuItem } from "../../types";

  interface Props {
    items?: MenuItem[];
    propertiesCount: number;
    onMenuItemClick: (item: MenuItem) => void;
  }

  let { items = [], propertiesCount, onMenuItemClick }: Props = $props();
</script>

<nav class="menubar">
  <ul>
    {#each items as item}
      <li>
        {#if item.href}
          <a
            href={item.href}
            class:disabled={item.disabledIfCount(propertiesCount)}
            tabindex={item.disabledIfCount(propertiesCount) ? -1 : undefined}
            aria-disabled={item.disabledIfCount(propertiesCount)}
          >
            {#if item.icon}
              <item.icon />
            {/if}
            {item.label}
          </a>
        {:else}
          <button
            onclick={() => onMenuItemClick(item)}
            class:disabled={item.disabledIfCount(propertiesCount)}
            tabindex={item.disabledIfCount(propertiesCount) ? -1 : undefined}
            aria-disabled={item.disabledIfCount(propertiesCount)}
          >
            {#if item.icon}
              <item.icon size={24} color={"#1a1a1a"} />
            {/if}
            {item.label}
          </button>
        {/if}
      </li>
    {/each}
  </ul>
</nav>

<style>
  .menubar {
    padding: 0.5rem;

    background-color: #fafafa;
    border-radius: 0.5rem;
  }

  .menubar ul {
    display: flex;
    gap: 0.75rem;
    align-items: center;

    list-style: none;
  }

  button.disabled,
  a.disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .menubar ul li > * {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;

    font-size: 0.875rem;
    font-weight: 600;
    color: #1a1a1a;

    transition: background-color 100ms ease-out;
  }

  .menubar ul li > *:hover {
    background-color: hsl(0, 0%, 90%);
  }
</style>
