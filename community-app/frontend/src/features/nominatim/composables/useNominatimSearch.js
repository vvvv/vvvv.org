import { ref } from "vue";
import debounce from 'lodash.debounce';
import { searchCoords } from "../services/nominatim.js";

export function useNominatimSearch (delay = 400) 
{
    const result = ref(null);
    const loading = ref(false);
    const controller = ref(null);
    const error = ref(null);

    const searchAsync = async (query) => {

        if (controller.value) controller.value.abort();
        controller.value = new AbortController();

        if (!query || query.trim() === ''){
            result.value = null;
            return;
        }

        loading.value = true;

        try{
            result.value = await searchCoords(query, { signal: controller.value.signal});
            error.value = null;
        } catch (err){
            result.value = null;
            error.value = err;
        } finally{
            loading.value = false;
        }
    }

    const searchDebounced = debounce(searchAsync, delay);

    return { result, loading, error, searchDebounced, searchAsync };
}