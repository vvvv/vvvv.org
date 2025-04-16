<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UserList from '../components/lists/UserList.vue'
import UserView from '../components/views/UserView.vue'
import '../styles/style.scss'

const url = new URL(window.location.href);
const params = url.searchParams;
const username = ref(params.get("u"));
const edit = params.get("edit");
const map = params.get("map");

const router = useRouter();

const showProfile = (n)=>{
    username.value = n;
    router.push(`/user/?u=${n}`);
}

</script>

<template>
    <UserView v-if="username" :username="username" @showList="username = null"/>
    <UserList v-else @showProfile="showProfile"/>
</template>
