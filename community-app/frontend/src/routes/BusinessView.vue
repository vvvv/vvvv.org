<script setup>

import { ref, onMounted, computed } from 'vue'
import { useRoute } from "vue-router";
import { NSpin, NIcon, NTooltip } from 'naive-ui'
import { LocationOutline } from '@vicons/ionicons5'
import { toHtml } from '../utils.js'
import fetchBusinessProfile from './fetchBusinessProfile.js'
import InstitutionBasics from '../components/InstitutionBasics.vue'
import MaintainedBy from '../components/MaintainedBy.vue'

const route = useRoute();

const slug = route.params?.slug ?? "vvvv";

const company = ref(null);
const loading = ref(false);

let description;

onMounted(async ()=>
{

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });


    try{
        loading.value = true;
        company.value = await fetchBusinessProfile(slug);
        document.title = 'Profile: '+ company.value.name;
        description = toHtml(company.value.description ?? company.value.tagline);
    }
    catch(err)
    {
        console.log (err);
        err.value = "Something went wrong or maybe a business you are looking for is simply not yet confirmed.";
    }
    finally{
        loading.value = false;
    }


})

</script>

<template>
    <n-spin :show="loading">
        <div v-if="company">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4 mb-sm-4">
                    <InstitutionBasics :data="company"/>
                </div>
                <div class="col-12 col-md-6 col-lg-8 mt-md-0 pt-md-0 profileContent">
                    <template v-if="description">
                        <div class="border-top d-flex d-md-none mt-2 mb-4"></div>
                        <p v-if="description" v-html="description" class="markdown-content"></p>
                    </template>
                    <MaintainedBy class="maintained mt-4 pt-3 border-top d-block d-md-none" :data="company.owner"/>
                </div>
            </div>
        </div>
    </n-spin>
</template>