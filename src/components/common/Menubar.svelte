<script lang="ts">
  import { createEventDispatcher, type ComponentType } from "svelte";
  import type { MenuItem } from "../../types";

  const dispatch = createEventDispatcher();

  export let items: MenuItem[] = [];
</script>

<nav class="menubar">
  <ul>
    {#each items as item}
      <li>
        {#if item.href}
          <a
            href={item.href}
            class:disabled={item.disabled}
            tabindex={item.disabled ? -1 : undefined}
            aria-disabled={item.disabled}
          >
            {#if item.icon}
              <svelte:component this={item.icon} />
            {/if}
            {item.label}
          </a>
        {:else}
          <button
            on:click={() => dispatch("itemClick", item)}
            class:disabled={item.disabled}
            tabindex={item.disabled ? -1 : undefined}
            aria-disabled={item.disabled}
          >
            {#if item.icon}
              <svelte:component this={item.icon} size={24} color={"#1a1a1a"} />
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
