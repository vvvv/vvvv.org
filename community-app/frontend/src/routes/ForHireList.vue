<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NSpin } from 'naive-ui'
import { fetchHireData } from './fetchHireData.js'
import { showUserProfile } from "../utils.js"
import ForHireCard from '../components/ForHireCard.vue'

const router = useRouter();
const emit = defineEmits(['showProfile']);

const loading = ref (true);
const users = ref([]);
const count = ref(0);

onMounted( async ()=> {
    try{
        loading.value = true;
        users.value = await fetchHireData(loading)
        loading.value = false;

        count.value = users.value.length;
    }
    catch (error)
    {
        console.log (error);
    }
})

</script>

<template>
    <n-spin :show="loading">
        <p v-if="count > 0">A list of {{ count }} professionals available for hire.</p>
        <div class="row">
            <div id="UsersForHire" class="col-md-6 col-lg-4 col-12" v-for="user in users" :key="user.username">
                <ForHireCard :data="user"/>
            </div>
        </div>
    </n-spin>
</template>