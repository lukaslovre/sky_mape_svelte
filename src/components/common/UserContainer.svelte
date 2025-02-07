<script lang="ts">
  interface Props {
    imageUrl?: string;
    name: string;
    copyableFields?: { label: string; value: string | undefined }[];
    // Style props
    borderColor?: string;
    backgroundColor?: string;
    padding?: string;
  }

  let {
    imageUrl = "profile.png",
    name,
    copyableFields = [],
    borderColor = "hsl(0, 0%, 90%)",
    backgroundColor = "transparent",
    padding = "0.25rem 0.75rem",
  }: Props = $props();
</script>

<div class="relative-container">
  <div
    class="user-container"
    style="--border-color: {borderColor}; --background-color: {backgroundColor}; --padding: {padding}"
  >
    <img src={imageUrl} alt="agent pfp" />
    <p>{name}</p>
  </div>

  <!-- On hover extra info -->
  <div class="hover-container">
    {#each copyableFields as { label, value }}
      <div class="copyable-field">
        <p>{label}</p>
        {#if value}
          <p>{value}</p>
        {:else}
          <p class="empty">N/A</p>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .relative-container {
    position: relative;
  }

  .user-container {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    border-radius: 0.5rem;
    border: 1px solid var(--border-color, hsl(0, 0%, 90%));
    background-color: var(--background-color, transparent);
    padding: var(--padding, 0.25rem 0.75rem);
    transition: background-color 75ms ease-out;
  }
  .user-container p {
    font-size: 0.875rem;
    font-weight: 500;
    color: hsl(0, 0%, 20%);
  }
  .user-container img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 1px solid hsl(0, 0%, 90%);
    object-fit: cover;
  }

  .hover-container {
    position: absolute;
    bottom: 100%;
    left: 0;

    display: none;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    background-color: hsl(0, 0%, 100%);
    box-shadow: 0 0 1rem hsla(0, 0%, 0%, 0.125);
  }

  .relative-container:hover .user-container {
    background-color: hsl(0, 0%, 90%);
  }
  .relative-container:hover .hover-container {
    display: flex;
  }

  .copyable-field {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
  .copyable-field p {
    font-size: 0.875rem;
    font-weight: 500;
    color: hsl(0, 0%, 20%);
  }
  .copyable-field p.empty {
    color: hsl(0, 0%, 50%);
  }
</style>
