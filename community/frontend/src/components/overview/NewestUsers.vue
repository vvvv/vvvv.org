<script setup>
import { ref, computed, onMounted } from 'vue'
import { NAvatar } from "naive-ui"
import '../../styles/style.scss'
import { fetchNewestUsers } from './fetchNewestUsers'
import { showProfile } from "../../utils.js"

const users = ref([]);
const error = ref(null);

onMounted(async ()=>{
    try{
        users.value = await fetchNewestUsers();
    }
    catch (error){
        error.value = error; 
    }
});

</script>

<template>
    <div class="card" v-if="!error && users.length > 0">
        <div class="card-header">
            Newest User
        </div>
        <ul class="list-group list-group-flush">
            <li v-for="user in users" :key="user.username" class="list-group-item">
                <NAvatar objectFit="contain" round="true" size="48" :src="user.userpic"/>
                <a @click="showProfile(user.username)">{{ user.username }}</a>
            </li>
        </ul>
        <div class="card-body">
            <a href="#" class="card-link">Show more...</a>
        </div>
    </div>
</template>
