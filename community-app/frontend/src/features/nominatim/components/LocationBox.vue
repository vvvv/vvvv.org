<script setup>

import { ref, toRef, watch, onMounted, computed } from 'vue';
import { useNominatimSearch } from '../composables/useNominatimSearch.js'
import { useNominatimQuery } from '../composables/useNominatimQuery.js'
import { useNominatimState } from '../composables/useNominatimState.js'
import LocationSearchRenderer from './LocationSearchRenderer.vue'

const emit = defineEmits(['location', 'address']);

const { location, address} = defineProps({
    location: { type: Object, required: false},
    address: { type: Object, required: true}
})

const { result, loading, error, searchDebounced } = useNominatimSearch(500);
const state = useNominatimState({ result, loading, error });
const queryString = useNominatimQuery( address );
const locationExists = ref(false);
const selected = ref(null);

function retry(){
    searchDebounced(queryString.value);
}

watch(queryString, (newQuery)=>{
    locationExists.value = false;
},
{
    once: true
})

watch(queryString, (newQuery) => {

    locationExists.value = false;

    if (newQuery)
    {
        if (location) emit('location', null);
        selected.value = null;
        searchDebounced(newQuery);
    }   
})

watch (()=>location, (newValue)=>{
    if (newValue) locationExists.value = true;
})

function select(place)
{
    emit('location', place);
    emit('address', place)
    selected.value = place;
}

const verb = computed(()=>{
    if (locationExists) return "We have";
    else if (selected) return "We've found";
})

</script>
<template>
    <div class="nominatim">

        <LocationSearchRenderer :state="state" @select="(value)=>select(value)" @retry="retry" v-if="!locationExists && !selected"/>

        <div v-if="locationExists || selected" class="info">
            <p>{{ verb }} you on the map. To change your location, tweak the address.</p>
        </div>
        
        <div class="attribution">
            We're using OpenStreetMap's <a href="https://nominatim.org/">Nominatim</a> for map lookups &#x2764.
        </div>

    </div>
</template>