import L from 'leaflet';
import 'leaflet.markercluster'

const osmURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export function createMap(element, onZoom, options = {})
{
    if (!element) throw new Error('Element is required');

    const map = L.map(element, {
        center: options.center || [0,0],
        zoom: options.zoom || 2,
        zoomControl: true,
        attributionControl: true
    })

    map.on('zoom', ()=>{
        const zoom = map.getZoom();
        if (onZoom){
            onZoom(zoom);
        }
    })

    const tileLayer = L.tileLayer(
        options.tileUrl || osmURL,
        {
            attribution: options.attribution || attribution,                
            maxZoom: options.maxZoom || 19,
        }
    );

    tileLayer.addTo(map);

    // Fixing exception when zooming with markers:
    // https://stackoverflow.com/questions/73542576/leaflet-error-when-zooming-after-closing-popup
    //
    L.Marker.prototype._animateZoom = function (opt) {
      if (!this._map) {
          return;
      }
      const pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();
      this._setPos(pos);
    }

    return { map, tileLayer };
}

export function clearMarkers(map)
{
    if (!map) return;
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

export function addGroup(map, group, markers)
{
    if (!map) return;

    const g = group ? group.clearLayers() : L.markerClusterGroup({
        showCoverageOnHover: false, // disables the blue polygon/halo
        spiderfyOnMaxZoom: true,    // keeps spiderfying at max zoom if needed
        zoomToBoundsOnClick: true
    });

    markers.forEach ((m)=>{
        g.addLayer(m)}
    );       

    map.addLayer(g);
    
    return g;
}

export function makeMarker(map, lat, long, { popup, onClick, icon } = {})
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

    return marker;
}

export function addDraggableMarker(map, position, onMove, options = {})
{

    const markerOptions = {
        draggable: true
    };

    if (options.icon) markerOptions.icon = options.icon;
    
    const marker = L.marker([position.lat, position.long], markerOptions);
    
    marker.on('dragend', ()=>{
        const { lat, lng } = marker.getLatLng();
        if (onMove){
            onMove({lat, long: lng});
        }
    })
    
    marker.addTo(map);
    
    return marker;
}

export function updateMarkerPosition(marker, map, position, zoom = 5){
    const { lat, long } = position;
    const pos = [lat, long];
    const currentPosition = marker.getLatLng();
    
    marker.setLatLng(pos);

    map.flyTo(pos, zoom, {
        animate: true,
        duration: 0.5
    });
}

