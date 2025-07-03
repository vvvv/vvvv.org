<script setup>

import { ref, onMounted } from 'vue';
import { NIcon, NEllipsis, NSkeleton, NBadge, NTooltip } from 'naive-ui'
import { SyncSharp } from '@vicons/ionicons5'
import { useLatestTopicsStore } from './LatestTopicsStore.js'
import Constants from '../../constants.js'
import SyncButton from "../SyncButton.vue"

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
</script>

<template>
    <div class="section">
        <div class="row pb-2 mb-2 border-bottom">
            <div class="d-flex col-auto">
                <a :href="Constants.FORUM" @click.prevent="showAll" class="pr-3"><h2>Latest Forum Topics</h2></a>
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
                <ul v-if="store.topics.length > 0" class="list-group list-group-flush forumList">
                    <li v-for="(topic, index) in store.topics" :key="index" class="list-group-item d-flex flex-nowrap mt-0 mb-0 py-2 forumLink">
                        <NEllipsis :line-clamp="1" :tooltip=false>
                            <a :href="topic.link" target="_blank">{{ topic.title }}</a>
                        </NEllipsis>
                        <NBadge :value="topic.count" color="DarkGray" class="ml-2"/>
                    </li>
                </ul> 
                <div v-else class="m-3">Okay, Houston... we've had a problem here.<br/>Try again later.</div>
            </template>
        </div>
    </div>
</template>