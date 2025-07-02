<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NTooltip, NSkeleton, NBadge } from "naive-ui"
import { showEduProfile } from "../../utils.js"
import { useEdusStore } from './EdusStore.js'
import defaultLogo from '../../assets/defaultLogo.png'

const loading = ref(false);
const router = useRouter();

const store = useEdusStore();

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
    router.push({name: 'Educational Institutions'});
}

</script>

<template>
    <div class="section">
        <div class="row pb-2 mb-2 border-bottom">
            <div class="col-auto d-flex">
                <a href="/edus/" @click.prevent="showAll" class="pr-3"><h2>Educational Institutions</h2></a>
                <NBadge v-if="!loading && store.total" :value="store.total" color="grey"/>
            </div>
        </div>
        <div class="overflow-auto">
            <div class="row flex-nowrap d-flex no-gutters pt-2 pb-2 mb-2 align-items-center pl-3">
                <template v-if="loading">
                        <NSkeleton v-for="n in 8" :key="n" :width="50" :sharp="false" size="medium" class="m-3"/>
                </template>
                <template v-else-if="store">
                    <div v-if="store.items?.length > 0" v-for="item in store.items" class="logo" :key="item.text">
                        <a :href="item.url" @click="(event)=>showEduProfile(item.text, event)">
                            <NTooltip trigger="hover" placement="top">
                                <template #trigger>
                                        <img :src="item.img || defaultLogo" :alt="item.text"/>
                                </template>
                                {{ item.text }}
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