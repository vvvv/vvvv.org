<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Constants from '../../constants'
import HireView from '../partials/HireView.vue'
import { toHtml, createAssetUrl } from '../../utils'
import { NButton } from 'naive-ui'

const emit = defineEmits(['showProfile'])

const loading = ref (true)
const users = ref([])
const request = `${Constants.GET_FORHIRE}&sort=name&meta=filter_count`
const router = useRouter()

onMounted( async ()=>
{
    loading.value = true
    try{
        const response = await fetch(request)
        const json = await response.json()
        users.value = json.data
        
        users.value.forEach((u)=>{
            const name = [u.name, u.surname].filter(Boolean).join(" ")
            u.title = name ? `${name} (${u.username})` : u.username
            u.contact = u.related[0].social ? u.related[0].social.contact : null
            u.hire = u.related[0].hire ? u.related[0].hire : null
        })
    }
    catch (error){
        console.log(error)
    }
    finally{
        loading.value = false
    }
})

const openProfile = (username)=>{
    router.push (`/user?u=${username}`)
}

</script>

<template>
    <template v-if="!loading">
        <div id="UsersForHire" v-for="(user, index) in users" :key="index">
            <div class="card mb-4">
                <div class="card-header d-flex justify-content-between">
                    <div>
                        <h3>{{ user.title }}</h3>
                    </div>
                </div>
                <HireView :data="user.hire" :contact="user.contact" v-if="user.hire"/>
            </div>
        </div>
    </template>
    <template v-else>
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </template>
</template>