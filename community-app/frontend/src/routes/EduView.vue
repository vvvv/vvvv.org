<script setup>

import { ref, onMounted, computed } from 'vue'
import { NSpin, NIcon, NAlert } from 'naive-ui'
import { useRoute } from "vue-router"
import { LocationOutline, PersonCircleOutline } from '@vicons/ionicons5'
import fetchEduProfile from './fetchEduProfile.js'
import { toHtml, showUserProfile, getCountry, ensureHttps, stripHttp } from '../utils.js'
import SocialView from '../components/SocialView.vue'
import LocationFull from '../components/LocationFull.vue'
import MaintainedBy from '../components/MaintainedBy.vue'
import InstitutionBasics from '../components/InstitutionBasics.vue'

const route = useRoute();
const slug = route.params?.slug;

const edu = ref(null);
const loading = ref(false);
const error = ref(null);

const socialKeys = ["website", "github", "nuget", "mastodon", "pixelfed"];

onMounted(async ()=>
{
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });


    try{
        loading.value = true;
        error.value = null;

        edu.value = await fetchEduProfile (slug);
        
        document.title = 'Profile: '+ edu.value.name;
        edu.value.description = toHtml(edu.value.description);
    }
    catch (err)
    {
        console.log (err);
        error.value = "Something went wrong or maybe an Institutional Institution is simply not yet confirmed.";
    }
    finally
    {
        loading.value = false;
    }

})

const url = computed(()=>{

    let url = null;

    if (edu.value.social?.website && edu.value.social.website !== '')
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
                <div class="col-12 col-md-6 col-lg-4 mb-sm-4">
                    <InstitutionBasics class="mb-3" :data="edu"/>
                </div>
                <div v-if="edu.description" class="col-12 col-md-6 col-lg-8 mt-4 mt-md-0 profileContent">
                    <p v-html="edu.description"></p>
                    <MaintainedBy class="maintained mt-4 pt-3 border-top d-block d-md-none" :data="edu.owner"/>
                </div>
            </div>
        </div>
    </n-spin>
</template>