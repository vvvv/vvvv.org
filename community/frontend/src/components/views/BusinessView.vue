<script setup>

import { ref, onMounted, computed } from 'vue'
import { NSpin, NIcon } from 'naive-ui'
import { LocationOutline } from '@vicons/ionicons5'
import SocialView from '../partials/SocialView.vue'
import { fetchCompanyData } from './fetchCompanyData.js'
import Location from "../partials/Location.vue"
import { toHtml, createAssetUrl, showProfile, getCountry, ensureHttps } from '../../utils.js'

const { name = 'MyCompany' } = defineProps({ name: String });

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

const location = computed(()=>{
    return {city: company.value.location_city, country: company.value.location_country}
})

const addressExists = computed(()=>{
    return  company.value.location_street || 
            company.value.location_additionalInfo || 
            company.value.location_postalcode || 
            company.value.location_country ||
            company.value.location_city
})


const colStyle = "col-12 col-sm-6 col-md-4"

</script>

<template>
    <n-spin :show="loading">
        <div v-if="company">
            <div class="row">
                <div :class="colStyle">
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

                        <a v-if="company.social.website || company.social.website !== ''"
                        :href="ensureHttps(company.social.website)">Website</a>
                        
                        <div class="maintained mt-4 pt-3 border-top" v-if="company.owner">
                            This page is maintained by:<br><a :href="company.owner.username" @click.prevent="showProfile(company.owner.username)">{{ company.owner.username }}</a>
                        </div>
                    </div>
                </div>
                <div :class="colStyle">
                    <p v-html="description"></p>
                </div>
                <div :class="colStyle">
                    <SocialView v-if="company.social" :social="company.social" :order="socialKeys"/>
                </div>
            </div>
        </div>
    </n-spin>
</template>