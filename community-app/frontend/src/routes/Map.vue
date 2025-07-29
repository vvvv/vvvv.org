<script setup>
import { onMounted, ref } from 'vue';
import Constants from '../constants.js'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

let map = null;
let geoLayer = null;
let version = 0;
const clusterRadius = 40;

onMounted(()=>{
 
    map = L.map('map').setView([51.505, -0.09], 1);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([51.505, -0.09])
      .addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();

    loadClusters();
    
    map.on('moveend', loadClusters);
    map.on('zoomend', loadClusters);

})

function addBoundsAndVersion(url)
{
    const bounds = map.getBounds();
    const bbox = [ bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth() ];
    const zoom = map.getZoom();

    url.searchParams.set('bbox', JSON.stringify(bbox));
    url.searchParams.set('zoom', zoom);
    url.searchParams.set('version', version);
}

async function loadChildren(id)
{
    console.log (id);

    const url = new URL(Constants.MAP_CHILDREN);
    addBoundsAndVersion(url);

    url.searchParams.set('cluster_id', id);

    const req = await fetch (url);

    if (!req.ok)
    {
        throw new Error ("Can't fetch clusters!");
    } 
    
    const data = await req.json();
    version = data.version;

}

async function loadClusters()
{
    const url = new URL(Constants.MAP_CLUSTERS);
    addBoundsAndVersion(url);

    const req = await fetch (url);

    if (!req.ok)
    {
        throw new Error ("Can't fetch clusters!");
    } 
    
    const data = await req.json();
    version = data.version;

    drawCluster (data.clusters);
}

async function handleClusterClick(id)
{
    loadChildren(id);
}

function drawCluster (geojson) {
      if (geoLayer) {
        geoLayer.clearLayers();
      }

      geoLayer = L.geoJSON(geojson, {
        pointToLayer: (feature, latlng) => {
          if (feature.properties.cluster) {
            // Cluster marker
            const marker = L.circleMarker(latlng, {
              radius: clusterRadius,
              fillColor: '#3388ff',
              color: '#fff',
              weight: 1,
              fillOpacity: 0.8,
            }).bindTooltip(String(feature.properties.point_count), {
              permanent: true,
              direction: 'center',
              className: 'cluster-tooltip',
            });

            marker.on('click', ()=>{
                handleClusterClick(feature.properties.cluster_id);
            });

            return marker;
          } else {
            const marker = L.marker(latlng);
            const infoHtml = `
                <strong>${feature.properties.username}</strong><br/>
                ${feature.properties.userpic || ''}
            `;

            marker.bindPopup(infoHtml);

            return marker;
          }
        },
      }).addTo(map);
}

</script>

<template>
    <div id="map" style="height: 500px;"></div> 
</template>