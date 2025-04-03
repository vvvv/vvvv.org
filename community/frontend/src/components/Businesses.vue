<script setup>
import { ref, onMounted } from 'vue'
import Constants from '../constants'

const emit = defineEmits (['setCount'])

const request = `${Constants.GET_COMPANIES}?fields=*&sort=name&meta=filter_count`

const companies = ref(null)
const count = ref (0)
const loading = ref (true)

function image (l)
{
    return `${Constants.ASSETS}${l}?withoutEnlargement`;
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
                count.value = data.meta.filter_count

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

</script>

<template>
    <div class="h2">Businesses</div>
    <template v-if="!loading">
        <p>This is a list of {{ count }} businesses that use vvvv.</p>
        <div class="row">
            <div v-for="{ name, website, description, logo } in companies" track-by="username" class="company col-md-3 col-lg-4 py-3 border-bottom">
                <div @click="openLink(website)">
                    <div class="logo">
                        <a :href="addHttp(website)" target="_blank"><img :src="image(logo)" v-if="profilepic !== null"/></a>
                    </div>
                    <p class="name">{{ name }}</p>
                        <a :href="addHttp(website)" target="_blank">{{ removeHttp(website) }}</a>
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
</template>