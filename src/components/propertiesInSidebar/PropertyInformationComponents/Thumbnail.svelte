<script lang="ts">
  import { removeThumbFromUrl } from "../../../models/Properties";

  interface Props {
    imageUrl: string;
  }

  let { imageUrl }: Props = $props();

  let fullSizeImageUrl = $derived(removeThumbFromUrl(imageUrl));
</script>

<a href={fullSizeImageUrl}>
  <img src={imageUrl} alt="Property Thumbnail" />
</a>

<style>
  a {
    display: block;
    width: 100%;
  }

  img {
    width: 100%;
    max-height: 100%;
    object-fit: cover;

    border-radius: 0.75rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.125);
  }
</style>
