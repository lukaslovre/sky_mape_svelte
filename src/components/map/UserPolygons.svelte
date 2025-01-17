<script lang="ts">
  import { Polygon } from "sveaflet";
  import { dataStore } from "../../stores/store.svelte";
  import { getColorForUser } from "./utils/userUtils";
</script>

{#each dataStore.users as user}
  {#each user.filters?.polygons || [] as polygon}
    <Polygon
      latLngs={polygon}
      options={{
        color: getColorForUser(user),
      }}
    />
  {/each}
{/each}
