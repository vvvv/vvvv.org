<script setup>
import { ref } from 'vue'
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
const username = ref(params.get("user"))
const edit = params.get("edit")
const map = params.get("map")

function showProfile(u)
{
    username.value = u
    
    // Change URL
    // window.history.pushState({ additionalInformation: `User Profile: ${u}`}, `Profile: ${u}`, `/user/${u}`);
}

// TODO add emit to the UserList with the username, if set, UserInfo should be visible.
// This will avoid page reload on selecting a user from the list.
// idividual page `/user/?user=username` will be still available
</script>

<template>
    <UserInfo v-if="username" :username="username" @showList="username = null"/>
    <UserList v-else @showProfile="showProfile"/>
</template>
