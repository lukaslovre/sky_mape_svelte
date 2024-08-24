<script lang="ts">
  export let value: string;

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(value);

      // TEMPORARY:
      // change the cursor to a checkmark for a brief moment
      document.body.style.cursor = "grab";
      document.querySelectorAll(".copyable").forEach((el) => {
        el.style.cursor = "wait";
      });
      setTimeout(() => {
        document.body.style.cursor = "auto";
        document.querySelectorAll(".copyable").forEach((el) => {
          el.style.cursor = "pointer";
        });
      }, 1000);

      // alert("Kopirano!");
    } catch (err) {
      return;
    }
  }
</script>

<td class="copyable" on:click|stopPropagation={copyToClipboard}>
  {value}
</td>

<style>
  .copyable {
    color: #0b5eda;
    cursor: pointer;
  }
  .copyable:hover {
    text-decoration: underline;
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
  td {
    background-color: hsla(0, 0%, 100%, 0.5);
  }
</style>
