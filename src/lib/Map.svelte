<script lang="ts">
  import L from "leaflet";
  import type { IconOptions, LatLngExpression } from "leaflet";
  import { Map, TileLayer, Marker, Popup, Icon, Polygon } from "sveaflet";

  export let properties;
  export let isDrawing: boolean;
  export let focusedProperty: string;

  // let propertyPopupRef: {
  //   [key: string]: L.Popup;
  // } = {};

  // $: Object.keys(propertyPopupRef).forEach((key) => {
  //   if (key === focusedProperty) {
  //     // console.log("Focused property: ", key);
  //     // propertyPopupRef[key]
  //     console.log(propertyPopupRef[key]);
  //     console.log(propertyPopupRef[key].isPopupOpen());
  //   }
  // });

  // $: properties.forEach((property) => {
  //   if (property.popupData.titleContent === focusedProperty) {
  //     propertyPopupRef[property.popupData.titleContent]?.openPopup();
  //   }
  // });

  const mapOptions = {
    center: [45.81, 15.98] as LatLngExpression,
    zoom: 11.25,
  };

  const markerOptions: IconOptions = {
    iconUrl: `/house.png`,
    iconSize: [48, 72],
    iconAnchor: [24, 72],
    popupAnchor: [0, -72],
  };

  let mapInstance: L.Map | undefined;

  let drawingPoligonCoords: [number, number][] = [];
  let poligons: [number, number][][] = [];

  function addClickToPoligons(e) {
    if (isDrawing === false) return;

    const { lat, lng } = e.latlng;

    drawingPoligonCoords = [...drawingPoligonCoords, [lat, lng]];
  }

  function savePolygon() {
    poligons = [...poligons, drawingPoligonCoords];
    drawingPoligonCoords = [];
  }

  $: if (isDrawing === false) {
    savePolygon();
  }

  $: if (mapInstance) {
    // Draw a polygon on the map
    mapInstance.on("click", addClickToPoligons);
  }

  let popupInstances: {
    [key: string]: L.Popup;
  } = {};

  properties.forEach((property) => {
    popupInstances[property.popupData.titleContent] = L.popup();
  });

  $: console.log(popupInstances);
</script>

<section>
  <Map options={mapOptions} bind:instance={mapInstance}>
    <TileLayer urlTemplate={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"} />

    {#each properties as property (property.popupData.titleContent)}
      <Marker latlng={property.latlng}>
        <Icon options={{ ...markerOptions, iconUrl: `/${property.type}.png` }} />
        <Popup instance={popupInstances[property.popupData.titleContent]}>
          <!-- {#if property.popupData.titleContent === focusedProperty}
            <p>Odabrano!!!</p>
          {/if}
          <h2>{property.popupData.titleContent}</h2>
          <div class="price"><span>€</span> <span>{property.popupData.price}</span></div>
          <div class="surface">{property.popupData.surfaceArea} m²</div> -->
        </Popup>
      </Marker>
    {/each}

    <!-- Draw all polygons -->
    {#each poligons as poligon}
      <Polygon latLngs={poligon} />
    {/each}

    <!-- Draw the polygon that is currently being drawn -->
    <Polygon latLngs={drawingPoligonCoords} />
  </Map>
</section>

<style>
  section {
    /* flex: 1; */
    width: 100%;
    height: 100%;
  }
</style>
