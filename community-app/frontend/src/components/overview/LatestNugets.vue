<script setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NEllipsis, NSkeleton, NAvatar, NTag } from 'naive-ui'
import { useLatestNugetsStore } from './LatestNugetsStore.js'
import Constants from '../../constants.js'
import SectionTitle from './SectionTitle.vue'
import defaultLogo from '../../assets/defaultLogo.png'

const store = useLatestNugetsStore();
const loading = ref(false);
const router = useRouter();

onMounted(async ()=>{   
    await sync();
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
    window.location.replace(Constants.NUGET_ORG);
}
</script>

<template>
    <div class="section pl-4 nugets">
        <SectionTitle :showRefresh="true" :loading="loading" title="Latest #VL NuGets" @sync="sync(true)" :link="Constants.NUGET_ORG" :isExternal="true"/>
        <div class="row pt-1">
            <template v-if="loading">
                <NSkeleton text :repeat="5" class="mb-4 mx-3"></NSkeleton>
            </template>
            <template v-else>
                <ul v-if="store.nugets.length > 0" class="list-group list-group-flush list">
                    <li v-for="(nuget, index) in store.nugets" :key="index" class="list-group-item d-flex flex-nowrap link">
                        <NAvatar v-if="nuget.icon" objectFit="contain" :src="nuget.icon" :size="25" class="mr-3" :class="{ 'noImageBack': nuget.icon !== null }"/>
                        <NEllipsis :line-clamp="1" :tooltip=false>
                            <a :href="nuget.link" target="_blank">{{ nuget.id }}</a>
                        </NEllipsis>
                        <span class="by">{{ nuget.by }}</span>
                        <NTag v-if="nuget.status" size="small" round :bordered="false" class="px-2 ml-3 text-muted text-right" :class="{'new': nuget.status == 'new'}">{{ nuget.status }}</NTag>
                    </li>
                </ul> 
                <div v-else class="m-3">Okay, Houston... we've had a problem here.<br/>Try again later.</div>
            </template>
        </div>
    </div>
</template>