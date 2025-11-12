import { ref, watch } from 'vue'
import { useNominatimQuery } from './useNominatimQuery.js'
import { useNominatimSearch } from './useNominatimSearch.js'
import { useNominatimState } from '../composables/useNominatimState.js'

export function useNominatimCountryCitySearch () {
    
    const addressToQuery = ref("");

    const queryString = useNominatimQuery ( addressToQuery );
    const { result, searching, error, searchDebounced } = useNominatimSearch(400);
    const state = useNominatimState({ result, searching, error });

    const searchResult = ref (null);

    watch ( queryString, (newValue) => {
        if (newValue)
        {
            searchDebounced (newValue)
        }
    },
    { immediate: false})

    watch ( state, (newValue) => {
        if (newValue.type === 'found')
        {
            searchResult.value = newValue.results[0]; 
        }
    },
    { immediate: false})

    return { addressToQuery, searchResult, searching }
}