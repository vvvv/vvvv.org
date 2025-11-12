import { ref } from "vue";
import debounce from 'lodash.debounce';
import { searchCoords } from "../services/nominatim.js";

export function useNominatimSearch (delay = 400) 
{
    const result = ref(null);
    const searching = ref(false);
    let controller = null;
    const error = ref(null);
    let timeoutId = null;

    const searchAsync = async (query) => {

        if (controller) 
        {
            controller.abort();
            clearTimeout(timeoutId);
        }

        controller = new AbortController();

        if (!query || query.trim() === ''){
            result.value = null;
            return;
        }

        timeoutId = setTimeout(() => {
            controller.abort();
            console.log ('timeout starts');
        }, 5000);
        
        try{
            searching.value = true;

            result.value = await searchCoords(query, { signal: controller.signal});
            clearTimeout(timeoutId);

            error.value = null;
        } catch (err){
            result.value = null;
            error.value = err;

            console.log ('catch on timeout');
        } finally{
            searching.value = false;
        }
    }

    const searchDebounced = debounce(searchAsync, delay);

    return { result, searching, error, searchDebounced, searchAsync };
}