<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NAvatar, NTooltip, NIcon, NSkeleton, NBadge } from "naive-ui"
import { PersonOutline } from '@vicons/ionicons5'
import { showUserProfile } from "../../utils.js"
import { useForHireStore } from "./ForHireStore.js"

const router = useRouter();
const loading = ref(false);
const store = useForHireStore();

onMounted(async ()=>{
    try{
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
    router.push({name: 'For Hire'});
}

</script>

<template>
        <div class="section">
            <div class="row pb-2 mb-2 border-bottom">
                <div class="col-auto d-flex">
                    <a href="/forhire/" @click.prevent="showAll" class="pr-3"><h2>Professionals for Hire</h2></a>
                    <NBadge v-if="!loading && store.total" :value="store.total" color="grey"/>
                </div>
            </div>
            <div class="overflow-auto">
                <div class="row flex-nowrap d-flex no-gutters pt-2 pb-2 mb-2 align-items-center">
                    <template v-if="loading">
                        <NSkeleton v-for="n in 4" :key="n" :width="50" circle size="medium" class="mx-2"/>
                    </template>
                    <template v-else-if="store">
                        <div v-if="store.items?.length > 0" v-for="user in store.items" :key="user.text" class="mx-3 my-3">
                            <a :href="'/people/'+user.username" @click="(event)=>showUserProfile(user.username, event)">
                                <NTooltip trigger="hover" placement="top">
                                    <template #trigger>
                                        <div>
                                            <NAvatar v-if="user.img" objectFit="contain" round :src="user.img" :size="50">
                                                <template #fallback>
                                                    <NIcon><PersonOutline/></NIcon>
                                                </template>
                                            </NAvatar>
                                            <NAvatar v-else objectFit="contain" round :size="50">
                                                <NIcon><PersonOutline/></NIcon>
                                            </NAvatar>
                                        </div>
                                    </template>
                                    {{ user.name ? `${user.name} (${user.username})` : user.username }}
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