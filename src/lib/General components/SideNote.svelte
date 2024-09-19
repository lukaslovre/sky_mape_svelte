<script lang="ts">
  import Close from "./Close.svelte";
  import Header1 from "./Header1.svelte";
  import Header2 from "./Header2.svelte";

  export let title: string;
  export let value: string;
  export let isOpen: boolean;
  export let close: () => void;
</script>

{#if isOpen}
  <div id="side-note-container">
    <div id="side-note">
      <Close on:close={close} />
      <div class="title-and-value-container">
        <Header1>{title}</Header1>
        <div class="value">
          {#each value.split("\n") as line}
            <!--  if it starts with #, use a <h2> -->
            {#if line.startsWith("#")}
              <Header2>
                {line.slice(1)}
              </Header2>
            {:else if line.length === 0}
              <p></p>
            {:else}
              <p>{line}</p>
            {/if}
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  #side-note-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    padding: 3rem 2rem 3rem 1rem;

    background: linear-gradient(90deg, rgba(0, 0, 0, 0.25) 95%, rgba(0, 0, 0, 0) 100%);
  }

  #side-note {
    width: 25rem;
    /* height: 100%; */

    display: flex;
    flex-direction: column;
    gap: 2rem;

    background-color: #ffffff;
    padding: 1.5rem 2rem;
    border-radius: 1.5rem;
    box-shadow: 0 0.125rem 1rem rgba(0, 0, 0, 0.25);
  }

  .title-and-value-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .title-and-value-container .value {
    padding: 1.5rem 1rem;
    border: 1px solid #e6e6e6;
    border-left: none;
    border-right: none;
  }
  .title-and-value-container .value p {
    font-size: 0.875rem;
    font-weight: 400;
    color: #1a1a1a;
    line-height: 1.5;
    margin-top: 0.25rem;
  }

  .title-and-value-container .value p:empty {
    height: 1.25rem;
  }
</style>
