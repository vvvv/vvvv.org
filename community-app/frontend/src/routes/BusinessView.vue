<script setup>

import { ref, onMounted, computed } from 'vue'
import { NSpin, NIcon } from 'naive-ui'
import { LocationOutline, PersonCircleOutline } from '@vicons/ionicons5'
import { fetchCompanyData } from './fetchCompanyData.js'
import { toHtml, createAssetUrl, showUserProfile, getCountry, ensureHttps, stripHttp } from '../utils.js'
import { useRoute } from "vue-router";
import SocialView from '../components/SocialView.vue'
import Location from "../components/Location.vue"

const route = useRoute();
const name = route.params.name;

const company = ref(null);
const loading = ref(false);

let description;

const socialKeys = ["website", "github", "nuget", "mastodon", "pixelfed"];

onMounted(async ()=>
{
    loading.value = true;
    company.value = await fetchCompanyData (name);
    loading.value = false;

    description = toHtml(company.value.description);
})

const url = computed(()=>{

    let url = null;

    if (company.value.social && company.value.social?.website !== '')
    {
        url = {
            name: stripHttp(company.value.social.website),
            link: ensureHttps(company.value.social.website)
        }
    }

    return url;
})

const location = computed(()=>{
    return {city: company.value.location_city, country: company.value.location_country}
})

const addressFields = [
  'location_street',
  'location_additionalInfo',
  'location_postalcode',
  'location_country',
  'location_city'
];

const addressExists = computed(() =>
  addressFields.some(key => company.value && company.value[key])
);


const colStyle = "col-12 col-sm-6 col-md-4"

</script>

<template>
    <n-spin :show="loading">
        <div v-if="company">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4 text-center mb-sm-4">
                    <div class="text-center mb-3">
                        <img v-if="company.logo" :src="company.logo" alt="logo" class="img-fluid"/>
                        <div class="my-3">
                            <h5>{{ company.name }}</h5>
                        </div>                     
                        <div class="address mb-3" v-if="addressExists">
                            <n-icon class="mb-2"><LocationOutline /></n-icon>
                            <div v-if="company.location_street">{{ company.location_street }}</div>
                            <div v-if="company.location_additionalInfo">{{ company.location_additionalInfo }}</div>
                            <div v-if="company.location_postalcode || company.location_city">{{ company.location_postalcode }} {{ company.location_city }}</div>
                            <div v-if="company.location_country">{{ getCountry(company.location_country) }}</div>
                        </div>

                        <a v-if="url" :href="url.link">{{ url.name }}</a>
                        
                        <div class="maintained mt-4 pt-3 border-top" v-if="company.owner">
                            This page is maintained by:
                            <div>
                                <NIcon size="20" class="mr-2">
                                    <PersonCircleOutline/>
                                </NIcon>
                                <a :href="'/user/'+company.owner.username" @click="(event) => showUserProfile(company.owner.username, event)">{{ company.owner.username }}</a>
                            </div>
                        </div>
                        <SocialView class="text-left mt-4 mb-4 pt-3 border-top" v-if="company.social" :social="company.social" :order="socialKeys"/>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-8">
                    <p v-html="description"></p>
                </div>
            </div>
        </div>
    </n-spin>
</template>