<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { showUserProfile } from "../utils.js"
import { NSpin } from 'naive-ui'
import { usePeopleStore } from './PeopleStore.js'
import UserList from './UserList.vue'
import ConnectionListView from '../components/ConnectionListView.vue'
import ListNavigation from './ListNavigation.vue'

const router = useRouter();
const route = useRoute();
const store = usePeopleStore();

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
    if (query.p)
    {
        showUserProfile(decodeURIComponent(query.p));
        return;
    }

    else if (query.section)
    {   
        store.setSection(query.section, query.type);

        if (query.section == 'connections')
        {

            try
            {
                await store.getData( {page: 0, size: pageSizes[0].value} );
            }
            catch (error)
            {
                console.log (error);
            }

        }
    }
}

const pageSizes = [
    { label: '10 per page', value: 10 },
    { label: '50 per page', value: 50 },
    { label: '100 per page', value: 100 }
]

function changeSection(key)
{
    if (key == 'connections')
    {
        router.push({name: 'People', query:{ section: key, type: store.selectedConnection.key ?? 'github' }})
    }
    else if (key == 'list')
    {
        router.push({name: 'People', query:{ section: key}});
    }
}

function changeConnection(key)
{
    router.push({name: 'People', query:{ section: store.selectedSection.key, type: key }})
}

</script>

<template>
    
    <div class="row mb-2">
        <div class="col-12 col-lg-4">
            <ListNavigation :sections="store.sections" :selected="store.selectedSection.key" @select="changeSection"/>
        </div>
    </div>
            
    <UserList v-if="store.selectedSection.key == 'list'"
        :pageSizes="pageSizes"
    />

    <ConnectionListView v-if="store.selectedSection.key == 'connections'" 
        :list="store.list?.connections"
        :loading="store.loading" 
        :options="store.socialOptions"
        :connection="store.selectedConnection"
        :pageSizes="pageSizes"
        connectionKey="people"
        @change="changeConnection"
        @page="store.getData"
    />
    
</template>