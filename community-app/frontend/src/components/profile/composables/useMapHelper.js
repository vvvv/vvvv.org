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
    let manuallyAdjusted = false; 
    let reverted = false;
    const disabled = ref(true);

    function updateLoc(value)
    {
        updateLocation(value);
        manuallyAdjusted = true;
    }

    function checkStreet()
    {
        
        if (address.value.street?.trim() === '' ||
            address.value.city?.trim() === '' ||
            address.value.country?.trim() === ''
            )
        {
            disabled.value = true;
            manuallyAdjusted = false;
        }
        else
        {
            disabled.value = false;
        }
    }
    
    function setWatchers()
    {

        addressChangeHandler();
        checkStreet();
        manuallyAdjusted = false;

        if (formHelper)
        {
            watch (()=>formHelper.revertSignal.value, ()=>{
                reverted = true;
                manuallyAdjusted = false;
                addressChangeHandler();
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

        watch (address, (newValue, oldValue)=>{
            if (oldValue !== null && !manuallyAdjusted)
            {

                if (newValue.country !== '' && newValue.city !== '')
                {
                    addressToQuery.value = newValue;
                }
            }
            checkStreet();
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
                    if (formHelper)
                    {
                        formHelper.changed.value = false;
                    }
                    manuallyAdjusted = false;
                }
            }
        },
        {
            deep: true  
        })


        watch (searchResult, (newValue)=>{
            if (reverted)
            {
                formHelper.changed.value = false;
                reverted = false;
            }
            else
            {   
                locationHandler(newValue);
            }
        })
    }

    return { location, zoom, address, updateZoom, updateLoc, addressChangeHandler, disabled, setWatchers, searching }
}