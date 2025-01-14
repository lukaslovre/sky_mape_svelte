<script lang="ts">
  import { Polygon } from "sveaflet";
  import { users } from "../../stores/store";
  import { getColorForUser } from "./utils/userUtils";
</script>

{#each $users as user}
  {#each user.filters?.polygons || [] as polygon}
    <Polygon
      latLngs={polygon}
      options={{
        color: getColorForUser(user),
      }}
    />
  {/each}
{/each}
