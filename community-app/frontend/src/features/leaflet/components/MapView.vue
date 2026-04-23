<script setup>

import { useLeaflet } from "../composables/useLeaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

const props = defineProps ({
    center: { type: Array, default: ()=> [0,0]},
    zoom: { type: Number, default: 1},
})

const { mapContainer, showLocation, addLocations } = useLeaflet({
    center: props.center,
    zoom: props.zoom
})

defineExpose({ addLocations });

</script>

<template>
    <div ref="mapContainer" class="map-container"></div>
</template>