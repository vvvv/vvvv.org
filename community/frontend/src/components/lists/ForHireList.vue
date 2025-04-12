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
    fetch (request)
        .then((response) =>{
            response.json().then((data) =>{                
                    data.data.forEach((u)=>{
                        u.hire = u.related[0].hire
                        u.hire.description = toHtml(u.hire.description)
                        u.hire.skills_vvvv = toHtml(u.hire.skills_vvvv)
                        u.hire.skills_other = toHtml(u.hire.skills_other)
                        u.hire.image = createAssetUrl(u.hire.image)
                        delete u.related

                        console.log(u)
                        users.value.push(u)
                    }) 
                }).catch( err => { throw (err) })
            })
        .catch ((err) => {
            console.log (err)
        })
        .finally(()=>{
            loading.value = false
        })
})

const openProfile = (username)=>{
    router.push (`/user?u=${username}`)
}

</script>

<template>
    <div class="h2">For Hire</div>
    <template v-if="!loading">
        <div id="UsersForHire" v-for="(user, index) in users" :key="index">
            <div class="card mb-3">
                <div class="card-header d-flex justify-content-between">
                    <div>
                        {{ user.name }} {{ user.surname }}
                    </div>
                    <div>
                        <NButton @click="openProfile(user.username)">Show Full Profile</NButton>
                    </div>
                </div>
                <div class="card-body">
                    <HireView :data="user.hire"/>
                </div>
            </div>
            <hr/>
        </div>
    </template>
    <template v-else>
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </template>
</template>