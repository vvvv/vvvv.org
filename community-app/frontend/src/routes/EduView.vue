<script setup>

import { ref, onMounted, computed } from 'vue'
import { NSpin, NIcon } from 'naive-ui'
import { LocationOutline, PersonCircleOutline } from '@vicons/ionicons5'
import { fetchEduData } from './fetchEduData.js'
import { toHtml, showUserProfile, getCountry, ensureHttps, stripHttp } from '../utils.js'
import { useRoute } from "vue-router";
import SocialView from '../components/SocialView.vue'

const route = useRoute();
const name = route.params.name;

const edu = ref(null);
const loading = ref(false);

let description;

const socialKeys = ["website", "github", "nuget", "mastodon", "pixelfed"];

onMounted(async ()=>
{
    loading.value = true;
    edu.value = await fetchEduData (name);
    loading.value = false;

    description = toHtml(edu.value.description);
})

const url = computed(()=>{

    let url = null;

    if (edu.value.social && edu.value.social?.website !== '')
    {
        url = {
            name: stripHttp(edu.value.social.website),
            link: ensureHttps(edu.value.social.website)
        }
    }

    return url;
})

const addressFields = [
  'location_street',
  'location_additionalInfo',
  'location_postalcode',
  'location_country',
  'location_city'
];

const addressExists = computed(() =>
  addressFields.some(key => edu.value && edu.value[key])
);

</script>

<template>
    <n-spin :show="loading">
        <div v-if="edu">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4 text-center mb-sm-4">
                    <div class="text-center mb-3">
                        <img v-if="edu.logo" :src="edu.logo" alt="logo" class="img-fluid"/>
                        <div class="my-3">
                            <h5>{{ edu.name }}</h5>
                        </div>                     
                        <div class="address mb-3" v-if="addressExists">
                            <n-icon class="mb-2"><LocationOutline /></n-icon>
                            <div v-if="edu.location_street">{{ edu.location_street }}</div>
                            <div v-if="edu.location_additionalInfo">{{ edu.location_additionalInfo }}</div>
                            <div v-if="edu.location_postalcode || edu.location_city">{{ edu.location_postalcode }} {{ edu.location_city }}</div>
                            <div v-if="edu.location_country">{{ getCountry(edu.location_country) }}</div>
                        </div>

                        <a v-if="url" :href="url.link">{{ url.name }}</a>
                        
                        <div class="maintained mt-4 pt-3 border-top" v-if="edu.owner">
                            This page is maintained by:
                            <div>
                                <NIcon size="20" class="mr-2">
                                    <PersonCircleOutline/>
                                </NIcon>
                                <a :href="'/user/'+edu.owner.username" @click="(event) => showUserProfile(edu.owner.username, event)">{{ edu.owner.username }}</a>
                            </div>
                        </div>
                        <SocialView class="text-left mt-4 mb-4 pt-3 border-top" v-if="edu.social" :social="edu.social" :order="socialKeys"/>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-8">
                    <p v-html="description"></p>
                </div>
            </div>
        </div>
    </n-spin>
</template>