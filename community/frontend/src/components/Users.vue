<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UserList from './UserList.vue'
import UserInfo from './UserInfo.vue'
import '../styles/style.scss'

// Usermap
// const UserMap = defineAsyncComponent(() =>
//   import('../components/UserMap.vue')
// )
// const isMap = ref(false)

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
    <UserInfo v-if="username" :username="username" @showList="username = null"/>
    <UserList v-else @showProfile="showProfile"/>
</template>
