<script setup>
import { ref, onMounted } from 'vue'
import Constants from '../constants'
import { toHtml } from '../utils'
import { NButton } from 'naive-ui'

const emit = defineEmits(['showProfile'])

const loading = ref (true)
const users = ref([])
const request = `${Constants.GET_FORHIRE}&sort=name&meta=filter_count`

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
                        delete u.related
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
                        <NButton @click="">Show Full Profile</NButton>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <p class="card-text" v-html="user.hire.description"></p>
                        </div>
                        <div class="col">
                            <h4>vvvv skills</h4>
                            <p class="card-text" v-html="user.hire.skills_vvvv"></p>

                            <h4>other skills</h4>
                            <p class="card-text" v-html="user.hire.skills_other"></p>
                        </div>
                    </div>
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