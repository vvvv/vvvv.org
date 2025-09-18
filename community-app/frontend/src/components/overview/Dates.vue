<script setup>

import { ref, onMounted } from 'vue';
import { NTag, NEllipsis, NSkeleton, NButton, NButtonGroup } from 'naive-ui'
import { useHugoStore } from './Hugostore.js'
import Constants from '../../constants.js';
import SectionTitle from './SectionTitle.vue'
import DateList from "./DateList.vue";

const store = useHugoStore();
const loading = ref(false);
const tab = ref('upcoming');

const tabs = ['upcoming', 'past'];

onMounted(async ()=>{   
    try {
        loading.value = true;
        await store.fetch();
    }
    catch(error) {
        console.log (error);
    }
    finally {
        loading.value = false;
    }

    console.log (store.dates[tab.value]);
})

</script>

<template>
    <div class="section pl-4">
        <SectionTitle :showRefresh="false" :loading="loading" title="Dates" :link="Constants.BLOG_DATES" :isExternal="true">
            <template #buttons>
                <div style="margin-top: -0.2rem;">
                    <NButtonGroup>
                        <NButton 
                            v-for="tabName in tabs"
                            size="small" 
                            @click="tab = tabName"
                            class="mr-2"
                            :ghost="tab !== tabName"
                            :strong="tab !== tabname"
                            :color="tab === tabName ? '#aaaaaa' : '#bbbbbb'"
                            >
                            {{ tabName }}
                        </NButton>
                    </NButtonGroup>
                </div>
            </template>
        </SectionTitle>
        <template v-if="loading">
            <NSkeleton text :repeat="6" class="mb-4 mx-3"></NSkeleton>
        </template>
        <template v-else>
            <DateList v-if="store.dates[tab]" :isPast="tab == 'past'" :data="store.dates[tab]"/>
            <div v-else class="m-3">Okay, Houston... we have a problem here.<br/>Try again later.</div>
        </template>
    </div>
</template>