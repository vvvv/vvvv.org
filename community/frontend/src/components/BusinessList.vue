<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue'
import Constants from '../constants'

// const Map = defineAsyncComponent(() =>
//   import('./Map.vue')
// )

const emit = defineEmits (['setCount', 'showProfile'])

const request = `${Constants.GET_COMPANIES}?fields=*&sort=name&meta=filter_count`

const companies = ref(null)
const count = ref (0)
const loading = ref (true)
const logoSettings = 'withoutEnlargement=true&fit=inside&height=50&quality=90&format=auto'
function image (l)
{
    return `${Constants.ASSETS}${l}?${logoSettings}`;
}

function openLink(l)
{
    window.location.href( addHttp(l) )
}

function addHttp(l)
{
    return (l.startsWith ("http://") || l.startsWith("https://")) ? l : "https://"+l
}

function removeHttp(l)
{
    if (l.startsWith ("http://"))
        return l.substr(7)
    if (l.startsWith("https://"))
        return l.substr(8)
}

onMounted( async ()=>
{
    fetch (request)
        .then((response) =>{
            response.json().then((data) =>{
                companies.value = data.data

                companies.value.forEach ((c)=>{
                    c.logo = image(c.logo)
                })
                count.value = data.meta.filter_count
                //queryCoordinates()

                if (count.value > 0)
                {
                    emit ('setCount', count.value)    
                }

                }).catch( err => { throw (err) })
            })
        .catch ((err) => {
            console.log (err)
        })
        .finally(()=>{
            loading.value = false
        })
})

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

const state=ref(null)

</script>

<template>
    <div class="businesses">
        <div class="h2">Businesses</div>
        <template v-if="!loading">
            <Map v-model:state="state"/>

            <p>This is a list of {{ count }} businesses that use vvvv.</p>
            <div class="row">
                <div v-for="{ name, description, logo } in companies" 
                    track-by="name" 
                    class="col-md-3 col-lg-4 py-3 border-bottom" 
                    @click="emit('showProfile', name)"
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
        </template>
        <template v-else>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </template>
    </div>
</template>