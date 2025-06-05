<script setup>
import { ref, computed, onMounted } from 'vue'
import { NAvatar } from "naive-ui"
import '../../styles/style.scss'
import { showProfile } from "../../utils.js"
import { useRouter } from 'vue-router'

const { data } = defineProps(['data']);

const router = useRouter();

function showAll()
{
    router.push('/user/forhire');
}

</script>

<template>
    <div class="card" v-if="data.length > 0">
        <div class="card-header">
            Newly updated Professionals
        </div>
        <div class="card-body">
            <div class="row mb-1" v-for="user in data" :key="user.username">
                <div class="col-2">
                    <NAvatar objectFit="contain" round="true" :src="user.userpic"/>
                </div>
                <div class="col-10">
                    <a @click="showProfile(user.username)">{{ user.username }}</a>
                </div>
            </div>
        </div>
        <div class="card-body">
            <a href="#" class="card-link" @click.prevent="showAll">Show all...</a>
        </div>
    </div>
</template>
