<script setup>

import { ref, onMounted, watch, onUnmounted, watchEffect  } from 'vue'
import { createMap, addDraggableMarker, updateMarkerPosition, clearMarkers, enabled } from '../../features/leaflet/service/leaflet.js'
import iconUrl from "@static/img/icons/leaflet-marker-icon-black.png"
import "leaflet/dist/leaflet.css";

const props = defineProps(['coords', 'zoom', 'disabled', 'searching']);
const emit = defineEmits(['coords', 'zoom']);

const defaultCoords = { lat: 52.52, long: 13.404954 };
const defaultZoom = 5;

const mapContainer = ref(null);

const icon = L.icon({
    iconUrl: iconUrl,
    iconSize: [25, 41],
    iconAnchor: [14, 41],
    popupAnchor: [-1, -41],
});

let map = null;
let marker = null;

const initialCoords = {
    lat: props.coords?.lat ?? defaultCoords.lat,
    lng: props.coords?.long ?? defaultCoords.long
}

onMounted(()=>{

    if (!mapContainer.value || map) 
    {
        return;
    }
    
    const { map: leafletMap } = createMap (mapContainer.value, (zoom)=>{
        emit('zoom', zoom);
    },
    { center: initialCoords, zoom: props.zoom || defaultZoom }
    );
    
    map = leafletMap;

    const position = props.coords ?? defaultCoords;

    marker = addDraggableMarker (map, position, (coords)=>{
            emit('coords', coords);
        },
        { icon }
    );

    enabled(map, marker, !props.disabled);
})

onUnmounted(()=>{
    if (map)
    {
        clearMarkers(map);
        map.remove();
        map = null;
    }
})

watch(()=>props.coords, (newValue)=>{
    if ( newValue && map && marker)
    {
        updateMarkerPosition (marker, map, newValue, props.zoom);
    }
})

watch(()=>props.disabled, (newValue)=>{
    enabled(map, marker, !newValue);
})

</script>

<template>
    <div class="mapWithOverlay d-flex align-items-top justify-content-center">
        <div ref="mapContainer" class="map-container" :class="{ disabled: disabled }"></div>
        <div v-if="searching" class="searching">
            Searching...
        </div>
    </div>
</template>