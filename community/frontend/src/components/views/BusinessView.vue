<script setup>

import { ref, onMounted, computed } from 'vue'
import { NSpin } from 'naive-ui'
import SocialView from '../partials/SocialView.vue'
import { getCountry } from '../../utils'
import { fetchCompanyData } from './fetchCompanyData.js'

const { name = 'MyCompany' } = defineProps({ name: String });

const company = ref(null);
const loading = ref(false);

const socialKeys = ["website", "github", "nuget", "mastodon", "pixelfed"];

onMounted(async ()=>
{
    company.value = await fetchCompanyData (loading, name);
})

const location = computed(() => {
    const location = [company.value.location_city, getCountry(company.value.location_country)].filter(Boolean).join(", ")
    return location ?? null
})

</script>

<template>
    <n-spin :show="loading">
        <div v-if="company">
            <div class="row">
                <div class="col-lg-4 text-center mb-3">
                    <img v-if="company.logo" :src="company.logo" alt="logo" class="img-fluid"/>
                    <div class="my-3">
                    <h5>{{ company.name }}</h5>
                    </div>
                    <p class="text-muted mb-4" v-if="location">{{ location }}</p>
                    <p class="text-muted mb-1">{{ company.description ?? ''}}</p>
                </div>
                <div class="col-lg-8">
                    <SocialView v-if="company.social" :social="company.social" :order="socialKeys"/>
                </div>
            </div>
        </div>
    </n-spin>
</template>