<script setup>

import { ref, onMounted, watchEffect } from 'vue'
import L from 'leaflet'

const props = defineProps['coords'];
const emit = defineEmits(['newcoords']);

const defaultCoords = { lat: 51.505, lon: -0.09 };

const mapContainer = ref(null)

let map = null;
let marker = null;

onMounted(()=>{
    initMap(props.coords.value || defaultCoords);
})

watchEffect(()=>{
    setCenter(props.coords.value || defaultCoords);
})

function initMap(coords)
{
    map = L.map(mapContainer.value).setView([coords.lat, coords.lon], 13);

    L.titleLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors',
    }).addTo(map);

    marker = L.marker([coords.lat, coords.lon], { draggable: true }).addTo(map);

    marker.on('dragged', ()=>{
        const { lat, lng } = marker.getLanLng();
        emit('coords', { lat: lat, lon: lng });
    })
}

function setCenter(coords)
{
    if (map && marker)
    {
        const center = [coords.lat, coords.lon];
        map.setView(center, 13);
        marker.setLanLng(center);
    }
}
</script>

<template>
  <div class="map-picker">
    <div ref="mapContainer" style="height: 400px;"></div>
  </div>
</template>