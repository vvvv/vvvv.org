<script setup>

import { ref, onMounted, computed } from 'vue'
import Constants from '../../constants'
import SocialView from '../partials/SocialView.vue'
import { clone, createAssetUrl, getCountry } from '../../utils'

defineEmits(['showList']);

const { name = 'MyCompany' } = defineProps({ name: String });

const company = ref(null);
const social = ref(null);
const loading = ref(null);
const logo = ref(null);

const socialKeys = ["website", "github", "nuget", "mastodon", "pixelfed"];
const imageParams = '?withoutEnlargement=true&quality=90&fit=cover&width=120';
const url = Constants.BASEURL+`items/Company?fields=*,social.*&filter[name][_eq]=${name}`;

onMounted(async ()=>
{
    loading.value = true;

    try{
        const response = await fetch(url);
        const json = await response.json();
    
        if (json.data.length == 0)
        {
            throw ("Can't find a profile for this company") 
        }

        const data = clone(json.data[0]);
            
        if (data?.social)
        {
            social.value = data.social;
        }
    
        if (data?.logo)
        {
            logo.value = createAssetUrl(data.logo)+imageParams;
        }
    
        company.value = data;
    }
    catch (error) {
        console.error(error);
    }
    finally{
        loading.value = false;
    }
})

const location = computed(() => {
    const location = [company.value.location_city, getCountry(company.value.location_country)].filter(Boolean).join(", ")
    return location ?? null
})

</script>

<template>
    <div v-if="loading">Loading</div>

    <div v-if="company">
        <div class="row">
            <div class="col">
                <nav aria-label="breadcrumb" class="bg-body-tertiary rounded-3 p-3 mb-4">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><a href="#" @click="$emit('showList')">Companies List</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{{ company.name }}</li>
                </ol>
                </nav>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4 text-center mb-3">
                    <img :src="logo" alt="logo" v-if="logo" class="img-fluid"/>
                    <div class="my-3">
                    <h5>{{ company.name }}</h5>
                    </div>
                    <p class="text-muted mb-4" v-if="location">{{ location }}</p>
                    <p class="text-muted mb-1">{{ company.description ?? ''}}</p>
            </div>
            <div class="col-lg-8">
                <SocialView :social="company.social" :order="socialKeys" v-if="social" />
            </div>
        </div>
    </div>
</template>