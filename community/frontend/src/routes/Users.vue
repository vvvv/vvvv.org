<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import UserList from '../components/lists/UserList.vue'
import UserView from '../components/views/UserView.vue'
import '../styles/style.scss'

const route = useRoute();
const username = computed(()=> route.query.u || null);

</script>

<template>
    <UserView v-if="username" :username="username"/>
    <UserList v-else @showProfile="showProfile"/>
</template>
