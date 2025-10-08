import L from 'leaflet';

const osmURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export function createMap(element, options = {})
{
    if (!element) throw new Error('Element is required');

    const map = L.map(element, {
        center: options.center || [0,0],
        zoom: options.zoom || 2,
        zoomControl: true,
        attributionControl: true
    })

    const tileLayer = L.tileLayer(
        options.tileUrl || osmURL,
        {
            attribution: options.attribution || attribution,                
            maxZoom: options.maxZoom || 19,
        }
    );

    tileLayer.addTo(map);

    return { map, tileLayer };
}

export function clearMarkers(map)
{
    map.eachLayer((layer)=>{
        if (layer instanceof L.marker){
            map.removeLayer(layer);
        }
    });
}

export function setView (map, lat, long, zoom = 14)
{
    map.setView([lat, long], zoom);
}

export function addMarker(map, lat, long, { popup, onClick, icon } = {})
{
    if (!map) throw new Error ('Map is required');

    const markerOptions = {};
    if (icon) markerOptions.icon = icon;

    const marker = L.marker([lat, long], markerOptions);

    if (popup){
        marker.bindPopup(popup, {
            closeButton: true,
            autoClose: true,
            closeOnClick: false,   
        });
    }

    if (onClick)
    {
        marker.on('click', onClick);
    }

    marker.addTo(map);
    return marker;
}