<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NAvatar, NTooltip, NSkeleton, NBadge } from "naive-ui"
import { showBusinessProfile } from "../../utils.js"
import { useBusinessesStore } from './businessesStore.js'

const loading = ref(false);
const router = useRouter();
const limit = 10;

const store = useBusinessesStore();

onMounted(async ()=>{

    try
    {
        loading.value = true;
        store.fetch();
    }
    catch (error)
    {
        console.log (error);
    }
    finally{
        loading.value = false;
    }
    
})

function showAll()
{
    router.push({name: 'Businesses'});
}

</script>

<template>
    <div class="section">
        <div class="row pb-2 mb-2 border-bottom">
            <div class="col-auto mr-auto">
                <h2>Businesses using VVVV</h2>
            </div>
            <div v-if="!loading && store" class="col-auto">
                <a href="/businesses/" class="all" @click.prevent="showAll">Businesses</a>
                <NBadge v-if="!loading && store" :value="store.total" color="grey" class="ml-2"/>
            </div>
        </div>
        <div class="overflow-auto">
            <div class="row flex-nowrap d-flex no-gutters pt-2 pb-2 mb-2 align-items-center justify-content-between">
                <template v-if="loading">
                        <NSkeleton v-for="n in 8" :key="n" :width="50" :sharp="false" size="medium" class="m-3"/>
                </template>
                <template v-else-if="store">
                    <div v-if="store.items?.length > 0" v-for="business in store.items" class="text-center" :key="business.text">
                        <a :href="business.url" @click="(event)=>showBusinessProfile(business.text, event)">
                            <NTooltip trigger="hover" placement="top">
                                <template #trigger>
                                    <img :src="business.img" class="m-3" :alt="business.text"/>
                                </template>
                                {{ business.text }}
                            </NTooltip>
                        </a>
                    </div>
                </template>
                <div v-else>
                    Something went wrong.
                </div>
            </div>
        </div>
    </div>
</template>