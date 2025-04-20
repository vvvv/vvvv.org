<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NSpin } from 'naive-ui'
import HireView from '../components/partials/HireView.vue'
import { fetchHireData } from './fetchHireData.js'

const router = useRouter();
const emit = defineEmits(['showProfile']);

const loading = ref (false);
const users = ref([]);

onMounted( async ()=> {
    users.value = await fetchHireData(loading)
})

const openProfile = (username)=>{
    router.push (`/user?u=${username}`)
}

</script>

<template>
    <n-spin :show="loading">
        <div id="UsersForHire" v-for="(user, index) in users" :key="index">
            <div class="card mb-4">
                <div class="card-header d-flex justify-content-between">
                    <div>
                        <h3>{{ user.title }}</h3>
                    </div>
                </div>
                <HireView :data="user.hire" :contact="user.contact" v-if="user.hire"/>
            </div>
        </div>
    </n-spin>
</template>