<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import L, { LatLng } from "leaflet";
  import { Map, TileLayer, Marker, Popup, Icon, Polygon } from "sveaflet";
  import { mapOptions, markerOptions } from "../assets/mapConfigValues";
  import type { Property } from "../types";

  const dispatch = createEventDispatcher();

  export let properties: Property[];
  export let filteredProperties: Property[];
  export let isDrawing: boolean;
  export let polygons: LatLng[][];

  // Array that stores the coordinates of the polygon currently being drawn
  let drawingPoligonCoords: LatLng[] = [];

  // When the map instance is available, add a click event listener to draw polygons
  $: if (mapInstance) {
    mapInstance.on("click", addClickToPolygons);
  }
  // When the drawing state changes, save the polygon if drawing is finished
  $: if (isDrawing === false) {
    savePolygon();
  }

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

  let mapInstance: L.Map | undefined;

  function savePolygon() {
    if (drawingPoligonCoords.length === 0) return;

    dispatch("saveNewPolygon", drawingPoligonCoords);

    drawingPoligonCoords = [];
  }

  function addClickToPolygons(e: L.LeafletMouseEvent) {
    if (isDrawing === false) return;

    drawingPoligonCoords = [...drawingPoligonCoords, e.latlng];
  }
</script>

<section>
  <Map options={mapOptions} bind:instance={mapInstance}>
    <TileLayer urlTemplate={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"} />

    {#each properties as property (property.popupData.titleContent)}
      <Marker
        latlng={property.latlng}
        options={{ opacity: filteredProperties.includes(property) ? 1 : 0.25 }}
      >
        <Icon options={{ ...markerOptions, iconUrl: `/${property.type}.png` }} />
        <Popup>
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
    {#each polygons as poligon}
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
