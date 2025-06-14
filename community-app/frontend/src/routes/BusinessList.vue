<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue'
import { NSpin, NIcon } from 'naive-ui'
import { LocationOutline } from '@vicons/ionicons5'
import { useRouter } from 'vue-router'
import Constants from '../constants.js'
import { fetchBusinessData } from "./fetchBusinessData.js";
import defaultLogo from '../assets/defaultLogo.png'
import Location from "../components/Location.vue"
import { showBusinessProfile } from "../utils.js"

const router = useRouter();

const data = ref(null);
const loading = ref (true);

onMounted( async ()=>
{
    try{
        loading.value = true;
        data.value = await fetchBusinessData();
    }
    catch (error)
    {
        console.log (error);
    }
    finally{
        loading.value = false;
    }
})

const handleClick = (name) => {
    router.push(`/user/businesses?company=${name}`);
}

// const Map = defineAsyncComponent(() =>
//   import('./Map.vue')
// )
// const queryCoordinates=()=>{
//     companies.value.forEach((c) =>{
//         const baseUrl = 'https://nominatim.openstreetmap.org/search';
//         const params = {
//         city: c.location_city,
//         country: c.location_country,
//         format: 'geojson'
//         };

//         const queryString = Object.keys(params)
//         .map(key => `${key}=${encodeURIComponent(params[key])}`)
//         .join('&');

//         const url = `${baseUrl}?${queryString}`;

//         console.log (url)
//     })
// }

const elementClass = "col-12 col-sm-6 col-md-4 col-lg-3 my-2";

</script>

<template>
    <n-spin :show="loading">
        <div class="businesses" v-if="!loading && data">
            <!-- <Map v-model:state="state"/> -->
            <p v-if="data">A list of {{ data.count }} businesses that use vvvv.</p>
            <div class="row">
                <div v-for="{ name, description, logo, location_city, location_country } in data.companies" 
                    track-by="name"
                    :class="elementClass">
                    <div class="companyCard p-3" @click="(event)=> showBusinessProfile(name, event)">
                        <div class="company">
                            <div class="logo">
                                <img :src="logo || defaultLogo" v-if="profilepic !== null"/>
                            </div>
                            <p class="name">{{ name }}</p>
                            
                        <Location :location="{city: location_city, country: location_country}"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </n-spin>
</template>