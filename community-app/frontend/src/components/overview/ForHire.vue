<script setup>
import { ref, computed, onMounted } from 'vue'
import { NAvatar, NTooltip, NIcon } from "naive-ui"
import { PersonOutline } from '@vicons/ionicons5'
import '../../styles/style.scss'
import { showUserProfile } from "../../utils.js"
import { useRouter } from 'vue-router'

const { data } = defineProps(['data']);

const router = useRouter();

function showAll()
{
    router.push({name: 'For Hire'});
}

</script>

<template>
    <div v-if="data.items.length > 0" class="section">
        <div class="row pb-2 mb-2 border-bottom">
            <div class="col-auto mr-auto">
                <h2>Professionals for Hire</h2>
            </div>
            <div class="col-auto">
                <a href="#" class="btn btn-sm btn-secondary" @click.prevent="showAll">Show all ({{ data.total }})</a>
            </div>
        </div>
        <div class="row pt-2 pb-2 mb-2 align-items-center">
            <div v-for="user in data.items" :key="user.text" class="m-2">
                <a :href="'/user/'+user.text" @click="(event)=>showUserProfile(user.text, event)">
                    <NTooltip trigger="hover" placement="top">
                        <template #trigger>
                            <div>
                                <NAvatar v-if="user.img" objectFit="contain" round :src="user.img" :size="60">
                                    <template #fallback>
                                        <NIcon><PersonOutline/></NIcon>
                                    </template>
                                </NAvatar>
                                <NAvatar v-else objectFit="contain" round :size="60">
                                    <NIcon><PersonOutline/></NIcon>
                                </NAvatar>
                            </div>
                        </template>
                        {{ user.text }}
                    </NTooltip>
                </a>
            </div>
        </div>
    </div>
</template>