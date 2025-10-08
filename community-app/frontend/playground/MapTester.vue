<script setup>
import { ref, onMounted } from 'vue'
import MapView from '../src/features/leaflet/components/MapView.vue'
import { showBusinessProfile } from "../src/utils"
import defaultLogo from '../src/assets/defaultLogo.png'
import Constants from "../src/constants"

const mapRef = ref(null);
const loading = ref(false);
const LOGO_SETTINGS = 'withoutEnlargement=true&fit=inside&width=90&height=60&quality=90&format=png'

onMounted(async ()=>{
    await fetchData();
})

function clickHandler(slug)
{
    showBusinessProfile(slug);
}

function logoUrl(id){
    return id ? `${Constants.ASSETS}${id}?${LOGO_SETTINGS}` : defaultLogo;
}

async function fetchData()
{
    try{
        const headers = new Headers();
        headers.append('type', 'Company');
        
        const url = `http://localhost:4050/v1/admin/read`;
        const response = await fetch(url,{
            headers
        });

        if (!response.ok) throw new Error ("Can't get data");

        const json = await response.json();
        
        console.log (json);

        const locations = json.data
        .filter((e)=> e.location !== null)
        .map((e)=>{
            return {
                coords: e.location.coordinates,
                html: ` <div>
                        <img src="${logoUrl(e.logo)}" class="mb-2"/><br>
                        <div class="mb-2"><strong>${e.name}</strong></div>
                        <a href="#" id="profileLink">Show Profile</a>
                        </div>`,
                slug: 'myslug'
            }
        });


        const callbacks = {
            profileLink: clickHandler
        }

        mapRef.value.addLocations(locations, callbacks);
    }
    catch (error)
    {
        console.log (error);
    }
    finally{
        loading.value = false;
    }
}

</script>
<template>
    <p v-if="loading">Loading...</p>
    <div>
        <MapView ref="mapRef" :center="[0,0]" :zoom="2"/>
    </div>
</template>