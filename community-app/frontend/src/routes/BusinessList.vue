<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from "vue-router";
import { NButton, NDropdown, NSpin, NIcon } from 'naive-ui'
import { useBusinessListStore } from "./BusinessListStore.js";
import ListNavigation from './ListNavigation.vue';
import LogoListView from '../components/LogoListView.vue';
import ConnectionListView from '../components/ConnectionListView.vue';

const route = useRoute();
const store = useBusinessListStore();

onMounted( async ()=>
{
    if (route.query.b)
    {
        showBusinessProfile(route.query.b);
        return;
    }

    try{
        await store.getList();
    }
    catch (error)
    {
        console.log (error);
    }
})

function changeConnection(key)
{
    store.setConnection(key);
}

</script>

<template>
    <n-spin :show="store.loading">

        <div class="row">
            <div class="col-12 col-lg-4">
                <ListNavigation :sections="store.sections" :selected="store.selectedSection.key" @select="(key) => store.setSection(key)"/>
            </div>
        </div>

        <template v-if="!store.loading && store.list">
            
            <ConnectionListView v-if="store.selectedSection.key == 'connections'" 
                :list="store.list.connections" 
                :options="store.socialOptions"
                :connection="store.selectedConnection"
                 class="mt-3" @change="changeConnection"/>
            
            <LogoListView v-if="store.selectedSection.key == 'list'" 
                :list ="store.list.list"/>

        </template>

    </n-spin>
</template>