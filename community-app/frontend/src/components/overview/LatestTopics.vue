<script setup>

import { ref, onMounted } from 'vue';
import { NIcon, NEllipsis, NSkeleton, NBadge, NTooltip } from 'naive-ui'
import { SyncSharp } from '@vicons/ionicons5'
import { useLatestTopicsStore } from './LatestTopicsStore.js'
import Constants from '../../constants.js'
import SectionTitle from './SectionTitle.vue'

const store = useLatestTopicsStore();
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

function showAll()
{
    router.push(Constants.FORUM);
}
</script>

<template>
    <div class="section pl-4">
        <SectionTitle :showRefresh="true" :loading="loading" title="Latest Forum Topics" @sync="sync(true)" @showAll="showAll" :showAllLink="Constants.FORUM"/>
        <div class="row pt-2">
            <template v-if="loading">
                <NSkeleton text :repeat="5" class="mb-4 mx-3"></NSkeleton>
            </template>
            <template v-else>
                <ul v-if="store.topics.length > 0" class="list-group list-group-flush list">
                    <li v-for="(topic, index) in store.topics" :key="index" class="list-group-item d-flex flex-nowrap link">
                        <NEllipsis :line-clamp="1" :tooltip=false>
                            <a :href="topic.link" target="_blank">{{ topic.title }}</a>
                        </NEllipsis>
                        <NBadge v-if="topic.count>0" :value="topic.count" color="DarkGray" class="ml-2"/>
                    </li>
                </ul> 
                <div v-else class="m-3">Okay, Houston... we've had a problem here.<br/>Try again later.</div>
            </template>
        </div>
    </div>
</template>