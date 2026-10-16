<script setup>
import { ref, onMounted } from 'vue'
import { NSpin } from 'naive-ui'
import { useForHireListStore } from './ForHireListStore.js'
import { showUserProfile } from "../utils.js"
import ForHireListItem from '../components/ForHireListItem.vue'

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
            <div id="UsersForHire">
                <table class="hireTable">
                    <thead>
                        <tr>
                            <th class="col-pic"></th>
                            <th class="col-username"></th>
                            <th class="col-text"></th>
                            <th class="col-location"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <ForHireListItem :data="user" v-for="user in store.items" :key="user.username"/>
                    </tbody>
                </table>
            </div>
        </div>
    </NSpin>
</template>