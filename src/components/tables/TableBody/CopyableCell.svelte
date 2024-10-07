<script lang="ts">
  import CheckmarkIcon from "../../../assets/icons/CheckmarkIcon.svelte";
  import CopyIcon from "../../../assets/icons/CopyIcon.svelte";

  export let value: string;

  let copySuccess = false;

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(value);
      copySuccess = true;

      setTimeout(() => {
        copySuccess = false;
      }, 1000);
    } catch (err) {
      copySuccess = false;
      alert("Kopiranje nije uspjelo");
    }
  }
</script>

<button class="copyable" on:click|stopPropagation={copyToClipboard}>
  {value}

  <div class="copyIcon">
    {#if copySuccess}
      <CheckmarkIcon color="#00AA00" size={24} />
    {:else}
      <CopyIcon color="#000" size={24} />
    {/if}
  </div>
</button>

<style>
  .copyable {
    position: relative;

    color: #0b5eda;
    cursor: pointer;
  }

  .copyable:hover > .copyIcon {
    opacity: 1;
  }

  .copyIcon {
    position: absolute;
    top: 50%;
    right: -0.5rem;
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
