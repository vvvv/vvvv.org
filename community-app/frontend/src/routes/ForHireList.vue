<script setup>
import { ref, onMounted } from 'vue'
import { NSpin } from 'naive-ui'
import { useForHireListStore } from './ForHireListStore.js'
import { showUserProfile } from "../utils.js"
import ForHireCard from '../components/ForHireCard.vue'

const loading = ref (true);
const store = useForHireListStore();

onMounted( async ()=> {
    try{
        loading.value = true;
        await store.fetch()
    }
    catch (error){
        console.log (error);
    }
    finally{
        loading.value = false;
    }
})

</script>

<template>
    <NSpin :show="loading">
        <div v-if="!loading && store">
            <p v-if="store.total > 0">{{ store.total }} professional vvvv users available for hire:</p>
            <div class="row">
                <div id="UsersForHire" class="col-md-6 col-lg-4 col-12" v-for="user in store.items" :key="user.username">
                    <ForHireCard :data="user"/>
                </div>
            </div>
        </div>
    </NSpin>
</template>