<script lang="ts">
  interface Props {
    forId: string;
    text: string;
  }

  let { forId, text }: Props = $props();
</script>

<label for={forId}>{text}</label>

<style>
  label {
    color: #262626;
    font-size: 0.75rem;
    font-weight: 600;
  }
</style>
