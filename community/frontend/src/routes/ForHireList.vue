<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NSpin } from 'naive-ui'
import HireView from '../components/partials/HireView.vue'
import { fetchHireData } from './fetchHireData.js'

const router = useRouter();
const emit = defineEmits(['showProfile']);

const loading = ref (true);
const users = ref([]);

onMounted( async ()=> {
    users.value = await fetchHireData(loading)
})

const openProfile = (username)=>{
    router.push(`/user?u=${username}`)
}

</script>

<template>
    <n-spin :show="loading">
        <div id="UsersForHire" v-for="(user, index) in users" :key="index">
            <div class="d-flex flex-row mb-3">
                <h3 class="mr-4">{{ user.title }}</h3>
                <button class="btn btn-sm btn-outline-secondary" @click="openProfile(user.username)">Profile</button>
            </div>
            <div class="card mb-5">
                <HireView :data="user.hire" :contact="user.contact" v-if="user.hire"/>
            </div>
        </div>
    </n-spin>
</template>