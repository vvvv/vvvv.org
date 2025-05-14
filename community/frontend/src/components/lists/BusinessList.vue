<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue'
import { NSpin } from 'naive-ui'
import Constants from '../../constants'
import { fetchBusinessData } from "./fetchBusinessData.js";
import { useRouter } from 'vue-router'


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
    fetchBusinessData(loading, companies, count, emit)
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

</script>

<template>
    <n-spin :show="loading">
        <div class="businesses" v-if="!loading">
            <!-- <Map v-model:state="state"/> -->
            <p>A list of {{ count }} businesses that use vvvv.</p>
            <div class="row">
                <div v-for="{ name, description, logo } in companies" 
                    track-by="name" 
                    class="col-md-3 col-lg-4 py-3 border-bottom" 
                    @click="handleClick(name)"
                    >
                    <div class="company">
                        <div class="logo" style="height:60px">
                            <img :src="logo" v-if="profilepic !== null"/>
                        </div>
                        <p class="name">{{ name }}</p>
                        <p>{{ description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </n-spin>
</template>