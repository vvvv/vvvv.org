import { computed } from 'vue';

function toPlace(value){
    return {
        place_id: value.properties.place_id,
        text: value.properties.display_name,
        geometry: value.geometry
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

        if (result.value.features && result.value.features.length > 1)
        {
            const places = result.value.features.map(toPlace);
            return { type: 'many', results: places};
        }

        return {
            type: 'single',
            results: [toPlace(result.value.features[0])]
        }
    })
}