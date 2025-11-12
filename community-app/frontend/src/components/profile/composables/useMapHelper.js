import { ref, watch } from 'vue'
import { useLocationHelper } from './useLocationHelper.js'
import { useNominatimCountryCitySearch } from '../../../features/nominatim/composables/useNominatimCountryCitySearch.js'

export function useMapHelper(_form, _formHelper)
{

    const form = _form;
    const formHelper = _formHelper;

    const { location, zoom, address, updateZoom, updateLocation, locationHandler, addressChangeHandler } = useLocationHelper(form);
    const { addressToQuery, searchResult, searching } = useNominatimCountryCitySearch();

    let stopWatchingAddress = null;
    const disabled = ref(true);
    
    function setAddressWatcher()
    {
        if (stopWatchingAddress) stopWatchingAddress();

        stopWatchingAddress = watch (address, (newValue)=>{
            addressToQuery.value = newValue;
        },
        {
            immediate: true,
            deep: true
        })
    }

    function updateLoc(value)
    {
        updateLocation(value);
        if (stopWatchingAddress) stopWatchingAddress();
    }

    function checkStreet()
    {
        if (address.value.street?.trim() === '')
        {
            disabled.value = true;
            setAddressWatcher();
        }
        else
        {
            disabled.value = false;
        }
    }
    
    setAddressWatcher();
    
    function setWatchers()
    {
        if (formHelper)
        {
            watch (()=>formHelper.revertSignal.value, (newValue)=>{
                checkStreet();
            },
            {
                immediate: false
            })

            watch (location, (newValue, oldValue)=>{
                if (oldValue !== null && newValue !== form.value[0].location)
                {
                    formHelper.changed.value = true;
                }
            },
            {
                immediate: false
            })
        }

        watch (address, (newValue)=>{
            checkStreet();
        },
        {
            immediate: true
        })

        watch (form, (newValue, oldValue)=>{
            
            if (oldValue !== null)
            {
                if (oldValue[0].location !== newValue[0].location)
                {
                    location.value = newValue[0].location;
                    if (formHelper)
                    {
                        formHelper.changed.value = false;
                    }
                    setAddressWatcher();
                }
            }
        },
        {
            deep: true  
        })


        watch (searchResult, (newValue)=>{
            locationHandler(newValue);
        })
    }

    return { location, zoom, address, updateZoom, updateLoc, addressChangeHandler, disabled, setWatchers, searching }
}