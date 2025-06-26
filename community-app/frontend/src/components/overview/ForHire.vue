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
                <div class="col-auto mr-auto">
                    <h2>Professionals for Hire</h2>
                </div>
                <div class="col-auto">
                    <a href="/forhire/" class="all" @click.prevent="showAll">For Hire</a>
                    <NBadge v-if="!loading && store.total" :value="store.total" color="grey" class="ml-2"/>
                </div>
            </div>
            <div class="row pt-2 pb-2 mb-2 align-items-center">
                <template v-if="loading">
                    <NSkeleton v-for="n in 4" :key="n" :width="50" circle size="medium" class="m-2"/>
                </template>
                <template v-else-if="store">
                    <div v-for="user in store.items" :key="user.text" class="m-2">
                        <a :href="'/user/'+user.text" @click="(event)=>showUserProfile(user.text, event)">
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
                                {{ user.text }}
                            </NTooltip>
                        </a>
                    </div>
                </template>
            </div>
        </div>
</template>