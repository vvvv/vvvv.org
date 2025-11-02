<script setup>

import { ref, toRef, watch, onMounted, computed } from 'vue';
import { useNominatimSearch } from '../composables/useNominatimSearch.js'
import { useNominatimQuery } from '../composables/useNominatimQuery.js'
import { useNominatimState } from '../composables/useNominatimState.js'
import LocationSearchRenderer from './LocationSearchRenderer.vue'

const emit = defineEmits(['location', 'address', 'zoom']);

const { location, address } = defineProps({
    location: { type: Object, required: false},
    address: { type: Object, required: true}
})

const addressToQuery = ref(address);
const locationExists = ref(false);
const selected = ref(null);

const { result, loading, error, searchDebounced, searchAsync } = useNominatimSearch(500);

const state = useNominatimState({ result, loading, error });
const queryString = useNominatimQuery( addressToQuery );

watch (()=>address, (newValue)=>
{
    addressToQuery.value = newValue;
},
{
    immediate: true
})

watch (state, (newValue)=>{
    if (newValue.type === 'empty')
    {
        switch (newValue.stage)
        {
            case 'idle':    
                addressToQuery.value = { city: address.city, country: address.country };
                break;
            case 'city':
                addressToQuery.value = { country: address.country };
                break;
        }
    }
})

function retry(){
    searchDebounced(queryString.value);
}

watch(queryString, (newQuery) => {

    locationExists.value = false;

    if (newQuery)
    {
        if (location) emit('location', null);
        selected.value = null;
        searchDebounced(newQuery);
    }   
},
{
    immediate: true
})

watch (()=>location, (newValue)=>{
    if (newValue) locationExists.value = true;
})

function select(place)
{

    if (place.address.street && place.address.street !== '')
    {
        emit('zoom', 17);   
    }
    else if (place.address.city && place.address.city !== '')
    {
        emit('zoom', 10);
    }
    else if (place.address.country && place.address.country !== '')
    {
        emit('zoom', 5);
    }

    emit('location', place);
    emit('address', place);
    selected.value = place;
}

</script>
<template>
    <div class="nominatim">

        <LocationSearchRenderer :state="state" @select="(value)=>select(value)" @retry="retry" v-if="!locationExists && !selected"/>
        
        <div class="attribution">
            We're using OpenStreetMap's <a href="https://nominatim.org/">Nominatim</a> for map lookups &#x2764.
        </div>

    </div>
</template>