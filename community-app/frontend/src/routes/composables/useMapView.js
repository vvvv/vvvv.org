export function useMapView(store, mapRef, handler)
{

    const center = [51.505, -0.09];
    const zoom = 4;

    function fillMap(){
        const locations = store.list.list.items.filter((e)=> e.location !== null)
            .map((e)=>{
                return {
                    coords: e.location.coordinates,
                    html: ` <div>
                            <img src="${e.logo}" class="mb-2" style="height:60px"/><br>
                            <div class="mb-2"><strong>${e.name}</strong></div>
                            <a href="#" id="profileLink">Show Profile</a>
                            </div>`,
                    slug: e.slug
                }
            });

        const callbacks = {
            profileLink: handler
        }

        mapRef.value.addLocations(locations, callbacks);
    }

    return { fillMap, center, zoom }
}