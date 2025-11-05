import { ref, watch } from 'vue'

export function useLocationHelper(_form){

    const form = _form;
    const address = ref({});
    const zoom = ref(15);

    const location = ref(null);

    function addressChangeHandler()
    {
        address.value = {
            street: form.value[0].location_street,
            city: form.value[0].location_city,
            postalcode: form.value[0].location_postalcode,
            country: form.value[0].location_country
        }
    }
    
    function locationHandler (loc) { 
        if (loc)
        {
            location.value = {
                lat: loc.geometry.coordinates[1],
                long: loc.geometry.coordinates[0]
            }
        }
    }

    // function addressHandler (loc) {  
    //     if (loc)
    //     {
    //         if (loc.address.country) form.value[0].location_country = loc.address.country;
    //         if (loc.address.city) form.value[0].location_city = loc.address.city;
    //         if (loc.address.postalcode) form.value[0].location_postalcode = loc.address.postalcode;
    //         if (loc.address.street) form.value[0].location_street = loc.address.street;
    //     }
    // }

    function updateLocation (newValue)
    {
        if (newValue)
        {
            location.value = newValue;
        }
    }

    function updateZoom(newZoom)
    {
        if (newZoom)
        {
            zoom.value = newZoom
        }
    }

    return { location, address, addressChangeHandler, locationHandler, zoom, updateZoom, updateLocation }
}