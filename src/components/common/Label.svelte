<script lang="ts">
  export let forId: string;
  export let text: string;
</script>

<label for={forId}>{text}</label>

<style>
  label {
    color: #262626;
    font-size: 0.75rem;
    font-weight: 600;
  }
</style>
