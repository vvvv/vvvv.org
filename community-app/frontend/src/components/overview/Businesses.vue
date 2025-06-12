<script setup>
import { ref, computed, onMounted } from 'vue'
import { NAvatar, NTooltip } from "naive-ui"
import '../../styles/style.scss'
import { showBusinessProfile } from "../../utils.js"
import { useRouter } from 'vue-router'

const { data } = defineProps(['data']);

const router = useRouter();

function showAll()
{
    router.push({name: 'Businesses'});
}

</script>

<template>
    <div v-if="data.items.length > 0" class="section">
        <div class="row pb-2 mb-2 border-bottom">
            <div class="col-auto mr-auto">
                <h2>Businesses using VVVV</h2>
            </div>
            <div class="col-auto">
                <a href="#" class="btn btn-sm btn-secondary" @click.prevent="showAll">Show all ({{ data.total }})</a>
            </div>
        </div>

        <div class="row pt-2 pb-2 mb-2 align-items-center justify-content-between">
            <div class="text-center" v-for="business in data.items" :key="business.text">
                <a :href="'/business/'+business.text" @click="(event)=>showBusinessProfile(business.text, event)">
                    <NTooltip trigger="hover" placement="top">
                        <template #trigger>
                            <img :src="business.img" class="m-3" :alt="business.text"/>
                        </template>
                        {{ business.text }}
                    </NTooltip>
                </a>
            </div>
        </div>
    </div>
</template>