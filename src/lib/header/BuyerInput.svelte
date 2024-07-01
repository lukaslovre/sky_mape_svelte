<script lang="ts">
  const users = [
    {
      id: 1,
      name: "John",
      pfpUrl: "https://randomuser.me/api/portraits/lego/2.jpg",
    },
    {
      id: 2,
      name: "Jane",
      pfpUrl: "https://randomuser.me/api/portraits/lego/3.jpg",
    },
    {
      id: 3,
      name: "Doe",
      pfpUrl: "https://randomuser.me/api/portraits/lego/4.jpg",
    },
  ];

  let user = -1;
</script>

<div class="form-item">
  <label for="type">Type</label>
  <select name="type" id="type" bind:value={user}>
    <option value={-1}>Gost</option>
    {#each users as { id, name, pfpUrl }}
      <option value={id}>{name}</option>
    {/each}
  </select>
</div>

<style>
  .form-item {
    width: fit-content;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .form-item label {
    color: #262626;
    font-size: 0.75rem;
    font-weight: 600;
    padding-right: 0.5rem;
  }
  .form-item select {
    padding: 0.75rem 1rem;
    width: 100%;
    border-radius: 0.25rem;
    font-size: 1rem;
    outline: 1px solid transparent;
    border: none;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    transition: outline 75ms ease-out;
  }

  .form-item select:focus {
    outline: 2px solid #0d65d9;
    z-index: 1;
  }
</style>
