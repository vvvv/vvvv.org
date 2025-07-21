<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { useEduListStore} from "./EduListStore.js"
import { showEduProfile } from "../utils.js"
import ListNavigation from './ListNavigation.vue';
import LogoListView from '../components/LogoListView.vue';
import ConnectionListView from '../components/ConnectionListView.vue';

const router = useRouter();
const route = useRoute();
const store = useEduListStore();

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
        showEduProfile(query.b);
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
        router.push({name: 'Educational Institutions', query:{ section: key, type: store.selectedConnection.key ?? 'github' }})
    }
    else if (key == 'list')
    {
        router.push({name: 'Educational Institutions', query:{ section: key}});
    }
}

function changeConnection(key)
{
    router.push({name: 'Educational Institutions', query:{ section: store.selectedSection.key, type: key }})
}

const title = computed(()=>{
    
    if (store.list?.list)
    {
         return `${store.list.list.total} Institutions where vvvv serves in parts of the education program:`
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

        <div class="logoListView" v-if="!loading && store">
            <template v-if="!store.loading && store.list">
                
                <LogoListView v-if="store.selectedSection.key == 'list'" 
                    :title = "title"
                    :list ="store.list.list"
                    @click="showEduProfile"/>

                <ConnectionListView v-if="store.selectedSection.key == 'connections'" 
                    :list="store.list.connections" 
                    :options="store.socialOptions"
                    :connection="store.selectedConnection"
                    type="Institution"
                    class="mt-3" @change="changeConnection"/>
            </template>
        </div>
    </n-spin>
</template>