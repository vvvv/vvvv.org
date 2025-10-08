import { computed } from 'vue';

function toPlace(value){

    const address = value.properties.address;

    let street = address.road ? address.road : "";
    street += address.house_number ? ` ${address.house_number}` : "";

    return {
        place_id: value.properties.place_id,
        text: value.properties.display_name,
        geometry: value.geometry,
        address: {
            country: address.country,
            city: address.city,
            postalcode: address.postcode,
            street: street
        }
    }
}

export function useNominatimState( { result, loading, error }){
    return computed(()=>{

        if (loading.value)
        {
            return { type: 'loading'};
        }

        if (error.value)
        {
            return { type: 'error', error: error.value};
        }

        if (!result.value)
        {
            return { type: ''};
        }

        if (!result.value.features || result.value.features.length === 0)
        {
            return { type: 'empty'}
        }

        if (result.value.features && result.value.features.length > 0)
        {
            const places = result.value.features.map(toPlace);
            return { type: 'found', results: places};
        }
    })
}