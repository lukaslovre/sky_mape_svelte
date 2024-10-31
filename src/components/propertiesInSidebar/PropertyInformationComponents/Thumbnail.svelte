<script lang="ts">
  import { removeThumbFromUrl } from "../../../models/Properties";

  export let imageUrl: string =
    "https://www.njuskalo.hr/image-w920x690/auti/fiat-stilo-1.9-jtd-05-god-full-oprema-navi-ime-kupca-reg-slika-35796873.jpg";

  $: fullSizeImageUrl = removeThumbFromUrl(imageUrl);
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
    aspect-ratio: 16/9;
    object-fit: cover;

    border-radius: 0.75rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.125);
  }
</style>
