<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue'
import { NSpin, NIcon } from 'naive-ui'
import Constants from '../../constants'
import { fetchBusinessData } from "./fetchBusinessData.js";
import { useRouter } from 'vue-router'
import { LocationOutline } from '@vicons/ionicons5'
import defaultLogo from '../../assets/defaultLogo.png'
import Location from "../partials/Location.vue"


// const Map = defineAsyncComponent(() =>
//   import('./Map.vue')
// )

const emit = defineEmits (['setCount']);
const router = useRouter();

const companies = ref(null);
const count = ref (0);
const loading = ref (true);

onMounted( async ()=>
{
    loading.value = true;
    fetchBusinessData(companies, count, emit)
    loading.value = false;
})

const handleClick = (name) => {
    router.push(`/user/businesses?company=${name}`);
}

const queryCoordinates=()=>{
    companies.value.forEach((c) =>{
        const baseUrl = 'https://nominatim.openstreetmap.org/search';
        const params = {
        city: c.location_city,
        country: c.location_country,
        format: 'geojson'
        };

        const queryString = Object.keys(params)
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');

        const url = `${baseUrl}?${queryString}`;

        console.log (url)
    })
}

const elementClass = "col-12 col-sm-6 col-md-4 col-lg-3 my-2";

</script>

<template>
    <n-spin :show="loading">
        <div class="businesses" v-if="!loading">
            <!-- <Map v-model:state="state"/> -->
            <p>A list of {{ count }} businesses that use vvvv.</p>
            <div class="row">
                <div v-for="{ name, description, logo, location_city, location_country } in companies" 
                    track-by="name"
                    :class="elementClass">
                    <div class="companyCard p-3" @click="handleClick(name)">
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