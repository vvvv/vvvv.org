<script setup>
import { ref, onMounted } from 'vue'
import { NSpin } from 'naive-ui'
import { useForHireListStore } from './ForHireListStore.js'
import { showUserProfile } from "../utils.js"
import ForHireCard from '../components/ForHireCard.vue'

const loading = ref (true);
const store = useForHireListStore();

const emit = defineEmits(['logout']);

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
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                <div id="UsersForHire" class="col mb-4" v-for="user in store.items" :key="user.username">
                    <ForHireCard :data="user"/>
                </div>
            </div>
        </div>
    </NSpin>
</template>