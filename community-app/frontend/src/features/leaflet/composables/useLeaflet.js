import { ref, onMounted, onUnmounted, } from 'vue'
import { createMap, setView, addMarker, clearMarkers } from '../service/leaflet'
import iconUrl from "@static/img/icons/leaflet-marker-icon-black.png"

export function useLeaflet(options = {})
{
    const mapContainer = ref(null);
    const map = ref(null);

    const icon = L.icon({
        iconUrl: iconUrl,
        iconSize: [25, 41],
        iconAnchor: [14, 41],
        popupAnchor: [-1, -41],
    });

    onMounted(()=>{
        if (!mapContainer || map.value) return;

        const { map: leafletMap } = createMap(mapContainer.value, options);
        
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

        clearMarkers(map.value);

        places.forEach((place) => {

            const marker = addMarker(map.value, place.coords[1], place.coords[0], { popup: place.html, icon });

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
        })
    }

    return { mapContainer, map, showLocation, addLocations }
}