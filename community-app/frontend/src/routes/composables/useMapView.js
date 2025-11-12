const addressFields = [
  { name: 'location_street', required: true },
  { name: 'location_postalcode', required: true },
  { name: 'location_city', required: true },
  { name: 'location_country', required: true },
  { name: 'location_additionalInfo', required: false }
];

function makeAddress(item)
{
    const address=[];
    let notComplete = false;

    addressFields.forEach(field => {
        const value = item[field.name];
        if (value && value !== '') {
            address.push(value.trim());
        }
        else if (field.required)
        {
            notComplete = true;
        }
    });

    return { address, notComplete }
}

export function useMapView(mapRef, handler)
{

    const center = [51.505, -0.09];
    const zoom = 4;

    function fillMap(items){

        const locations = items.filter((e)=> e.location !== null)
            .map((e)=>{

                const { address, notComplete } = makeAddress(e);

                return {
                    coords: e.location.coordinates,
                    html: ` <div class="pinPopup">
                                <img src="${e.logo}" class="mb-2" style="height:60px"/><br>
                                <div class="mb-2"><strong>${e.name}</strong></div>
                                <div class="address">
                                    <p class="title">Address:</p>
                                    <p>${address.join (', ')}</p>
                                    ${notComplete ? '<p>⚠️ Address is not complete</p>' : ''}
                                </div>
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