<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BusinessList from './BusinessList.vue'
import BusinessInfo from './BusinessInfo.vue'
import '../styles/style.scss'

// Usermap
// const UserMap = defineAsyncComponent(() =>
//   import('../components/UserMap.vue')
// )
// const isMap = ref(false)

const url = new URL(window.location.href)
const params = url.searchParams
const name = ref(params.get("company"))
const map = params.get("map")

const router = useRouter()

const showProfile = (n)=>{
    name.value = n
    router.push(`/user/businesses?company=${n}`)
}

const showList = ()=>{
    name.value = null
    router.push(`/user/businesses/`)
}
</script>

<template>
    <BusinessInfo v-if="name" :name="name" @showList="showList"/>
    <BusinessList v-else @showProfile="showProfile"/>
</template>
