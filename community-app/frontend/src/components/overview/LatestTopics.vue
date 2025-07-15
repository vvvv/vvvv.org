<script setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NIcon, NEllipsis, NSkeleton, NBadge, NTooltip } from 'naive-ui'
import { SyncSharp } from '@vicons/ionicons5'
import { useLatestTopicsStore } from './LatestTopicsStore.js'
import Constants from '../../constants.js'
import SectionTitle from './SectionTitle.vue'

const store = useLatestTopicsStore();
const loading = ref(false);
const router = useRouter();

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
    <div class="section pl-4">
        <SectionTitle :showRefresh="true" :loading="loading" title="Latest Forum Topics" @sync="sync(true)" :link="Constants.FORUM" :isExternal="true"/>
        <div class="row">
            <template v-if="loading">
                <NSkeleton text :repeat="5" class="mb-4 mx-3"></NSkeleton>
            </template>
            <template v-else>
                <table v-if="store.topics.length > 0" class="table table-sm list">
                    <tr v-for="(topic, index) in store.topics" :key="index" class="link">
                        <td>
                            <NEllipsis :line-clamp="1" :tooltip=false>
                                <a :href="topic.link" target="_blank">{{ topic.title }}</a>
                            </NEllipsis>
                        </td>
                        <td class="pl-3">
                            <span v-if="topic.count" class="count">{{ topic.count }}</span>
                        </td>
                    </tr>
                </table>
                <div v-else class="m-3">Okay, Houston... we've had a problem here.<br/>Try again later.</div>
            </template>
        </div>
    </div>
</template>