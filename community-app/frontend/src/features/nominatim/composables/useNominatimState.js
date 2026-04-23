import { computed, ref } from 'vue';

function toPlace(value){

    const address = value.properties.address;

    let street = address.road ? address.road : "";
    street += address.house_number ? ` ${address.house_number}` : "";

    return {
        place_id: value.properties.place_id,
        text: value.properties.display_name,
        geometry: value.geometry,
        address: {
            country: address.country_code.toUpperCase(),
            city: address.city,
            postalcode: address.postcode,
            street: street
        }
    }
}

export function useNominatimState( { result, searching, error }){

    let stage = 'idle';

    return computed(()=>{

        if (searching.value)
        {
            return { type: 'searching'};
        }

        if (error.value)
        {
            stage = 'idle';
            return { type: 'error', error: error.value, stage};
        }

        if (!result.value)
        {
            stage = 'idle';
            return { type: '', stage};
        }

        if (!result.value.features || result.value.features.length === 0)
        {
            let type = 'empty';

            if (stage === 'idle') stage === 'city';
            else if (stage === 'city') stage === 'country';
            else if (stage === 'country') 
                {
                    stage == 'idle';
                    type ='';
                }

            return { type, stage}
        }

        if (result.value.features && result.value.features.length > 0)
        {
            stage = 'idle';
            const places = result.value.features.map(toPlace);
            return { type: 'found', results: places, stage};
        }
    })
}