<script lang="ts">
  export let label: string;
  export let value: any;
</script>

<div class="info-row">
  <p class="info-label">{label}</p>
  <p class="info-value">{value}</p>
</div>

<style>
  .info-row {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    line-height: 150%;
  }

  .info-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #1a1a1a;
  }
  .info-value {
    font-size: 0.875rem;
    font-weight: 400;
    color: #333;
  }
</style>
