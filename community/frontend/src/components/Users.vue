<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UserList from './lists/UserList.vue'
import UserView from './views/UserView.vue'
import '../styles/style.scss'

const url = new URL(window.location.href)
const params = url.searchParams
const username = ref(params.get("u"))
const edit = params.get("edit")
const map = params.get("map")

const router = useRouter()

const showProfile = (n)=>{
    username.value = n
    router.push(`/user/?u=${n}`)
}

const showList = ()=>{
    username.value = null
    router.push(`/user/`)
}

</script>

<template>
    <UserView v-if="username" :username="username" @showList="username = null"/>
    <UserList v-else @showProfile="showProfile"/>
</template>
