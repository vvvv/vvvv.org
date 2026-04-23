<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NAvatar, NTooltip, NIcon, NSkeleton, NBadge, NButton } from "naive-ui"
import { PersonOutline } from '@vicons/ionicons5'
import { showUserProfile } from "../../utils.js"
import { useForHireStore } from "./ForHireStore.js"
import SectionTitle from './SectionTitle.vue'

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
        <div class="section pr-4">
            <SectionTitle :loading="loading" title="Professionals for Hire" @showAll="showAll" link="/forhire/">
                <NBadge v-if="!loading && store.total" :value="store.total" color="grey"/>
            </SectionTitle>
            <div class="row overflow-auto">
                <div class="flex-nowrap d-flex no-gutters pt-2 pb-2 mb-2 align-items-center">
                    <template v-if="loading">
                        <NSkeleton v-for="n in 4" :key="n" :width="50" circle size="medium" class="mx-2"/>
                    </template>
                    <template v-else-if="store">
                        <div v-if="store.items?.length > 0" v-for="user in store.items" :key="user.text" class="mr-3 my-3">
                            <a :href="'/people/'+user.username" @click="(event)=>showUserProfile(user.username, event)">
                                <NTooltip trigger="hover" placement="top">
                                    <template #trigger>
                                        <div>
                                            <NAvatar v-if="user.img" objectFit="contain" round :src="user.img" :size="50" :class="{ 'noImageBack': user.img !== null }">
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
                        <NButton v-if="store.total > store.items?.length" strong @click="showAll" class="mx-3">See all</NButton>
                    </template>
                    <div v-else>
                        Something went wrong.
                    </div>
                </div>
            </div>
        </div>
</template>