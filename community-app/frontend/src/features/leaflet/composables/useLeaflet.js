import { ref, onMounted, onUnmounted } from 'vue'
import { createMap, setView, makeMarker, addGroup, clearMarkers } from '../service/leaflet'
import iconUrl from "@static/img/icons/leaflet-marker-icon-black.png"

export function useLeaflet(options = {})
{
    const mapContainer = ref(null);
    const map = ref(null);

    let group = null;

    const icon = L.icon({
        iconUrl: iconUrl,
        iconSize: [25, 41],
        iconAnchor: [14, 41],
        popupAnchor: [-1, -41],
    });

    onMounted(()=>{
        if (!mapContainer || map.value) return;

        const { map: leafletMap } = createMap(mapContainer.value, null, options);
        
        map.value = leafletMap;
    });

    onUnmounted(()=>{
        if (map.value)
        {
            clearMarkers(map.value);
            map.value.remove();
            map.value = null;
        }
    })

    function showLocation(lat, long){
        if (!map.value) return;

        clearMarkers(map.value);
        addMarker(map.value, lat, long);
        setView(map.value, lat, long, options.zoom || 14);
    }

    function addLocations(places = [], callbacks = {}){
        if (!map.value) return;

        // clearMarkers(map.value);

        const markers = places.map((place) => {

            const marker = makeMarker(map.value, place.coords[1], place.coords[0], { popup: place.html, icon });

            marker.on('popupopen', ()=>{
                for (const [id, handler] of Object.entries(callbacks)){

                    const el  = marker.getPopup().getElement().querySelector(`#${id}`);
                    if (el) el.addEventListener("click", (event)=>handler(place.slug, event))
                }
            });

            marker.on('popupclose', ()=>{
                for (const [id, handler] of Object.entries(callbacks)){
                    const el  = marker.getPopup().getElement().querySelector(`#${id}`);
                    if (el) el.removeEventListener("click", handler)
                }
            });

            return marker;
        })

        group = addGroup(map.value, group, markers);
        map.value.fitBounds(group.getBounds(), { padding: [25, 25]});
    }

    return { mapContainer, map, showLocation, addLocations }
}