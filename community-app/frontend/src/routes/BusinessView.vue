<script setup>

import { ref, onMounted, computed } from 'vue'
import { useRoute } from "vue-router";
import { NSpin, NIcon } from 'naive-ui'
import { LocationOutline } from '@vicons/ionicons5'
import { toHtml } from '../utils.js'
import fetchBusinessProfile from './fetchBusinessProfile.js'
import InstitutionBasics from '../components/InstitutionBasics.vue'

const route = useRoute();
const name = route.params.name;

const company = ref(null);
const loading = ref(false);

let description;

onMounted(async ()=>
{
    try{
        loading.value = true;
        company.value = await fetchBusinessProfile (name);
        document.title = 'Profile: '+ company.value.name;
        description = toHtml(company.value.description);
    }
    catch(err)
    {
        console.log (err);
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
                    <InstitutionBasics class="mb-3" :data="company"/>
                </div>
                <div v-if="description" class="col-12 col-md-6 col-lg-8">
                    <p v-html="description"></p>
                </div>
            </div>
        </div>
    </n-spin>
</template>