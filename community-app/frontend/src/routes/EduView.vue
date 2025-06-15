<script setup>

import { ref, onMounted, computed } from 'vue'
import { NSpin, NIcon, NAlert } from 'naive-ui'
import { useRoute } from "vue-router"
import { LocationOutline, PersonCircleOutline } from '@vicons/ionicons5'
import fetchEduProfile from './fetchEduProfile.js'
import { toHtml, showUserProfile, getCountry, ensureHttps, stripHttp } from '../utils.js'
import SocialView from '../components/SocialView.vue'
import LocationFull from '../components/LocationFull.vue'

const route = useRoute();
const name = route.params.name;

const edu = ref(null);
const loading = ref(false);
const error = ref(null);

const socialKeys = ["website", "github", "nuget", "mastodon", "pixelfed"];

onMounted(async ()=>
{
    try{
        loading.value = true;
        error.value = null;

        edu.value = await fetchEduProfile (name);
        
        edu.value.description = toHtml(edu.value.description);
    }
    catch (err)
    {
        console.log (err);
        error.value = "Something went wrong. Maybe an Institutional Institution is simply not yet confirmed.";
    }
    finally
    {
        loading.value = false;
    }

})

const url = computed(()=>{

    let url = null;

    if (edu.value.social?.website !== '')
    {
        url = {
            name: stripHttp(edu.value.social.website),
            link: ensureHttps(edu.value.social.website)
        }
    }

    return url;
})

</script>

<template>
    <n-spin :show="loading">
        <NAlert v-if="error" title="Hoppala" type="warning">
            {{ error }}
        </NAlert>
        <div v-if="edu">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4 text-center mb-sm-4">
                    <div class="text-center mb-3">
                        <img v-if="edu.logo" :src="edu.logo" alt="logo" class="img-fluid"/>
                        <div class="my-3">
                            <h5>{{ edu.name }}</h5>
                        </div>                     
                        <LocationFull :data="edu"/>

                        <div class="my-3">                            
                            <a v-if="url" :href="url.link" target="_blank">{{ url.name }}</a>
                        </div>

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
                <div v-if="edu.description" class="col-12 col-md-6 col-lg-8">
                    <p v-html="edu.description"></p>
                </div>
            </div>
        </div>
    </n-spin>
</template>