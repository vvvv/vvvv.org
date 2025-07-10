<script setup>

import { ref, onMounted } from 'vue';
import { NTag, NEllipsis, NSkeleton } from 'naive-ui'
import { useOpportunitiesStore } from './OpportunitiesStore.js'
import { showBusinessProfile } from "../../utils.js"
import SyncButton from "../SyncButton.vue"

const store = useOpportunitiesStore();
const loading = ref(false);

onMounted(()=>{   
    sync();
})

async function sync(force)
{
    try {
        loading.value = true;
        await store.fetch(force);         
    }
    catch(error) {
        console.log (error);
    }
    finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="section">
        <div class="row pb-2 mb-2 border-bottom">
            <div class="d-flex col-auto">
                <h2>Opportunities</h2>
            </div>
            <div class="col-1 ml-auto mr-2">
                <SyncButton v-if="!loading" @click="sync(true)"/>
                <span v-else>...</span>
            </div>
        </div>
        <div class="row pt-2">
            <template v-if="loading">
                <NSkeleton text :repeat="5" class="mb-4 mx-3"></NSkeleton>
            </template>
            <template v-else>
                <ul v-if="store.jobs.length > 0" class="list-group list-group-flush forumList">
                    <li v-for="(job, index) in store.jobs" :key="index" class="list-group-item d-flex flex-nowrap mt-0 mb-0 py-2 forumLink">
                        <NTag size="small" round :bordered="false" class="px-3 mr-3" :color="{color: '#999', textColor: '#fff'}">job</NTag>
                        <NEllipsis :line-clamp="1" :tooltip=false>
                            <a :href="job.link" target="_blank">{{ job.title }}</a>
                        </NEllipsis>
                    </li>
                </ul>
                <ul v-if="store.internships.length > 0" class="list-group list-group-flush forumList">
                    <li v-for="(job, index) in store.internships" :key="index" class="list-group-item d-flex flex-nowrap mt-0 mb-0 py-2 forumLink">
                        <NEllipsis :line-clamp="1" :tooltip=false>
                            <NTag size="small" round :bordered="false" class="px-2 mr-3 text-muted">internship</NTag>
                            <a :href="job.link" target="_blank" @click="(event)=>showBusinessProfile(job.title, event)">
                                {{ job.title }}
                            </a>
                        </NEllipsis>
                    </li>
                </ul> 
                <!-- <div v-else class="m-3">Okay, Houston... we have a problem here.<br/>Try again later.</div> -->
            </template>
        </div>
    </div>
</template>