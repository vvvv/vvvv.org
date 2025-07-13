<script setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NEllipsis, NSkeleton, NImage, NTag, NTooltip } from 'naive-ui'
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
                    <template v-for="(nuget, index) in store.nugets" :key="index">
                        <li class="list-group-item d-flex flex-nowrap link align-items-baseline">
                            <NImage v-if="nuget.icon" objectFit="contain" :src="nuget.icon" :height="25" class="align-self-center" :class="{ 'noImageBack': nuget.icon !== null }"/>
                            <NEllipsis :line-clamp="1" :tooltip=false class="ml-3">
                                <template v-if="nuget.desc">
                                    <NTooltip trigger="hover" placement="top-start">
                                        <template #trigger>
                                            <a :href="nuget.link" target="_blank">{{ nuget.id }}</a>
                                        </template>
                                        {{ nuget.desc }}
                                    </NTooltip>
                                </template>
                                <template v-else>
                                    <a :href="nuget.link" target="_blank">{{ nuget.id }}</a>
                                </template>
                            </NEllipsis>
                            <div class="by d-none d-sm-inline ml-3">{{ nuget.by }}</div>
                            <NTag v-if="nuget.status" size="small" round :bordered="false" class="px-2 ml-3 text-muted text-right" :class="{'new': nuget.status == 'new'}">{{ nuget.status }}</NTag>
                        </li>
                    </template>
                </ul> 
                <div v-else class="m-3">Okay, Houston... we've had a problem here.<br/>Try again later.</div>
            </template>
        </div>
    </div>
</template>