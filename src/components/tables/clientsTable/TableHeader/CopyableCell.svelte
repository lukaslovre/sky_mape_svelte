<script lang="ts">
  import CheckmarkIcon from "../../../../assets/icons/CheckmarkIcon.svelte";
  import CopyIcon from "../../../../assets/icons/CopyIcon.svelte";

  export let label: string;
  export let getSelectedAttributes: (columnName: string) => string[];

  let copySuccess = false;

  async function copyToClipboard() {
    try {
      const values = getSelectedAttributes(label);
      console.log(values);

      await navigator.clipboard.writeText(values.join(", "));
      copySuccess = true;

      setTimeout(() => {
        copySuccess = false;
      }, 1000);
    } catch (err) {
      copySuccess = false;
      alert("Kopiranje nije uspelo");
    }
  }
</script>

<th class="copyable" on:click|stopPropagation={copyToClipboard}>
  {label}

  <div class="copyIcon">
    {#if copySuccess}
      <CheckmarkIcon color="#00AA00" size={24} />
    {:else}
      <CopyIcon color="#000" size={24} />
    {/if}
  </div>
</th>

<style>
  .copyable {
    position: relative;
    cursor: pointer;
  }

  .copyable:hover > .copyIcon {
    opacity: 1;
  }

  th,
  td {
    /* border: 1px solid hsl(0, 0%, 90%); */
    border-bottom: 1px solid hsl(0, 0%, 90%);
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
    text-align: left;

    transition: background-color 100ms ease-out;
  }

  th {
    background-color: #fff;
  }

  .copyIcon {
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);

    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 0.25rem;
    box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.125);

    opacity: 0;
    transition: opacity 150ms ease-out;
  }
</style>
