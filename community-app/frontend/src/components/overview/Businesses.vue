<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NTooltip, NSkeleton, NBadge, NButton } from "naive-ui"
import { showBusinessProfile } from "../../utils.js"
import { useBusinessesStore } from './businessesStore.js'
import defaultLogo from '../../assets/defaultLogo.png'
import SectionTitle from './SectionTitle.vue'

const loading = ref(false);
const router = useRouter();

const store = useBusinessesStore();

onMounted(async ()=>{

    try
    {
        loading.value = true;
        await store.fetch();
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
    <div class="section pr-4">
        <SectionTitle :loading="loading" title="Businesses using vvvv" @showAll="showAll" link="/businesses/">
            <NBadge v-if="!loading && store.total" :value="store.total" color="grey"/>
        </SectionTitle>
        <div class="row overflow-auto">
            <div class="flex-nowrap d-flex no-gutters pt-2 pb-2 mb-2 align-items-center">
                <template v-if="loading">
                        <NSkeleton v-for="n in 8" :key="n" :width="50" :sharp="false" size="medium" class="m-3"/>
                </template>
                <template v-else-if="store">
                    <div v-if="store.items?.length > 0" v-for="item in store.items" class="logo" :key="item.text">
                        <a :href="item.url" @click="(event)=>showBusinessProfile(item.slug, event)">
                            <NTooltip trigger="hover" placement="top">
                                <template #trigger>
                                    <img :src="item.img || defaultLogo" :alt="item.text"/>
                                </template>
                                {{ item.text }}
                            </NTooltip>
                        </a>
                    </div>
                    <NButton v-if="store.total > store.items?.length" strong @click="showAll" class="ml-3">See all</NButton>
                </template>
                <div v-else>
                    Something went wrong.
                </div>
            </div>
        </div>
    </div>
</template>