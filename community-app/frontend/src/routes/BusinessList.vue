<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { useBusinessListStore } from "./BusinessListStore.js";
import { showBusinessProfile } from "../utils.js"
import ListNavigation from './ListNavigation.vue';
import LogoListView from '../components/LogoListView.vue';
import ConnectionListView from '../components/ConnectionListView.vue';

const router = useRouter();
const route = useRoute();
const store = useBusinessListStore();

onMounted( async ()=>
{
    store.setSection('list');
    await checkRoute(route.query);
})

watch(() => route.query, async (newQ, oldQ)=>{
    if (newQ != oldQ) await checkRoute(route.query);
}, { deep: true })

async function checkRoute(query)
{
    if (query.b)
    {
        showBusinessProfile(query.b);
        return;
    }
    else if (query.section)
    {   
        store.setSection(query.section, query.type);
    }

    try{
        await store.getData();
    }
    catch (error)
    {
        console.log (error);
    }
}

function changeSection(key)
{
    if (key == 'connections')
    {
        router.push({name: 'Businesses', query:{ section: key, type: store.selectedConnection.key ?? 'github' }})
    }
    else if (key == 'list')
    {
        router.push({name: 'Businesses', query:{ section: key}});
    }
}

function changeConnection(key)
{
    router.push({name: 'Businesses', query:{ section: store.selectedSection.key, type: key }})
}

const title = computed(()=>{
    
    if (store.list?.list)
    {
        return `${store.list.list.total} Businesses that use vvvv:`   
    }
})

</script>

<template>
    <n-spin :show="store.loading">

        <div class="row">
            <div class="col-12 col-lg-4">
                <ListNavigation :sections="store.sections" :selected="store.selectedSection.key" @select="changeSection"/>
            </div>
        </div>

        <template v-if="!store.loading && store.list">
            
            <LogoListView v-if="store.selectedSection.key == 'list'" 
                :list ="store.list.list"
                :title="title"
                @click="showBusinessProfile"/>
            
            <ConnectionListView v-if="store.selectedSection.key == 'connections'" 
                :list="store.list.connections" 
                :options="store.socialOptions"
                :connection="store.selectedConnection"
                type="Business"
                class="mt-3" @change="changeConnection"/>
            
        </template>

    </n-spin>
</template>