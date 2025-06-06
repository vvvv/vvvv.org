<script setup>
import { ref, computed, onMounted } from 'vue'
import { NAvatar } from "naive-ui"
import '../../styles/style.scss'
import { showBusinessProfile } from "../../utils.js"
import { useRouter } from 'vue-router'

const { data } = defineProps(['data']);

const router = useRouter();

function showAll()
{
    router.push('/users/businesses');
}

</script>

<template>
    <div class="card" v-if="data.length > 0">
        <div class="card-header">
            Newly updated Businesses
        </div>
        <div class="card-body">
            <div class="row mb-1" v-for="business in data" :key="business.name">
                <div class="col-2">
                    <NAvatar objectFit="contain" round="true" :src="business.logo"/>
                </div>
                <div class="col-10">
                    <a :href="'/business/'+business.name" @click="(event)=>showBusinessProfile(business.name, event)">{{ business.name }}</a>
                </div>
            </div>
        </div>
        <div class="card-body">
            <a href="#" class="card-link" @click.prevent="showAll">Show all...</a>
        </div>
    </div>
</template>
