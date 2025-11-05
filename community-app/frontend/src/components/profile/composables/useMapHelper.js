import { ref, watch } from 'vue'
import { useLocationHelper } from './useLocationHelper.js'
import { useNominatimCountryCitySearch } from '../../../features/nominatim/composables/useNominatimCountryCitySearch.js'

export function useMapHelper(form, formHelper)
{
    const { location, zoom, address, updateZoom, updateLocation, locationHandler, addressChangeHandler } = useLocationHelper(form);
    const { addressToQuery, searchResult, loading } = useNominatimCountryCitySearch();

    let stopWatchingAddress = null;

    function setAddressWatcher()
    {
        stopWatchingAddress = watch (address, (newValue)=>{
            addressToQuery.value = newValue;
        },
        {
            immediate: false
        })
    }

    watch (location, (newValue, oldValue)=>{
        if (oldValue !== null && newValue !== form.value[0].location)
        {
            formHelper.changed.value = true;
        }
    },
    {
    immediate: false
    })

    watch (form, (newValue, oldValue)=>{
        if (oldValue !== null)
        {
            if (oldValue[0].location !== newValue[0].location)
            {
            location.value = newValue[0].location;
            formHelper.changed.value = false;
            setAddressWatcher();
            }
        }
    })


    watch (searchResult, (newValue)=>{
        locationHandler(newValue);
    })

    function updateLoc(value)
    {
        updateLocation(value);
        if (stopWatchingAddress) stopWatchingAddress();
    }

    setAddressWatcher();

    return { location, zoom, address, updateZoom, updateLoc, addressChangeHandler }
}