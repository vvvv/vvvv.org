<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { NSpin } from 'naive-ui'
import { useRoute, useRouter } from "vue-router";
import { useEduListStore} from "./EduListStore.js"
import { showEduProfile } from "../utils.js"
import ListNavigation from './ListNavigation.vue';
import LogoListView from '../components/LogoListView.vue';
import ConnectionListView from '../components/ConnectionListView.vue';
import MapView from '../features/leaflet/components/MapView.vue';
import { useMapView } from './composables/useMapView';
import '../styles/style.scss'

const router = useRouter();
const route = useRoute();
const store = useEduListStore();
const emit = defineEmits(['logout']);
const mapRef = ref(null);

const { fillMap, center, zoom } = useMapView(mapRef, showEduProfile);

const pageSizes = [
    { label: '10 per page', value: 10 },
    { label: '50 per page', value: 50 },
    { label: '100 per page', value: 100 }
]

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
    if (query.e)
    {
        showEduProfile(query.e);
        return;
    }
    else if (query.section)
    {   
        store.setSection(query.section, query.type);
    }

    try{
        await store.getData({page: 0, size: pageSizes[0].value});
        fillMap(store.list.list.items);
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

const titleList = computed(()=>{
    
    if (store.list?.list)
    {
         return `${store.list.list.total} Institutions where vvvv serves in parts of the education program:`
    }
})

</script>

<template>
    <div class="row mb-2">
        <div class="col-12 col-lg-4">
            <ListNavigation :sections="store.sections" :selected="store.selectedSection.key" @select="changeSection"/>
        </div>
    </div>

    <template v-if="store.selectedSection.key == 'list'">
        <div class="communityList">
            <p>{{ titleList }}</p>
            <MapView ref="mapRef" :center="center" :zoom="zoom"/>
            <LogoListView v-if="store.selectedSection.key == 'list'" 
                :loading = "store.loading"
                :title = "titleList"
                :list ="store.list?.list"
                @click="showEduProfile"
                class="mt-4"
            />
        </div>
    </template>

    <ConnectionListView v-if="store.selectedSection.key == 'connections'" 
        :list="store.list?.connections" 
        :loading="store.loading"
        :options="store.socialOptions"
        :connection="store.selectedConnection"
        :pageSizes="pageSizes"
        connectionKey="edu"
        @change="changeConnection"
        @page="store.getData"
    />
</template>