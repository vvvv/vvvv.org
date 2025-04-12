<script setup>

import { ref, watchEffect, onMounted, computed, watch} from 'vue'
import { useRouter } from 'vue-router'
import Constants from '../../constants'
import HireView from '../partials/HireView.vue'
import SocialView from '../partials/SocialView.vue'
import Field from '../profile/Field.vue'
import { isEmpty, toHtml, clone } from '../../utils'

const router = useRouter()

defineEmits(['showList'])

const { username } = defineProps(['username'])

const user = ref(null)
const hire = ref (null)
const social = ref (null)
const userpic = ref(null)

const imageParams = "?quality=90&fit=cover&width=120"
const url = `${Constants.GET_USERS}?filter[username][_eq]=${username}&fields=*,related.hire.*.Hire_Types_id.type,related.social.*`

onMounted(async ()=>
{
    fetch(url)
    .then((response) => {
        response.json().then((d) => {
            const data = d.data[0]
            user.value = data

            userpic.value = `${Constants.ASSETS}${user.userpic}${imageParams}`

            if (data.related[0].hire !== null)
            {
                const temp = clone(data.related[0].hire)
                temp.description = toHtml(temp.description)
                temp.skills_vvvv = toHtml(temp.skills_vvvv)
                temp.skills_other = toHtml(temp.skills_other)
                temp.image = createAssetUrl(temp.image)
                hire.value = temp
            }

            if (data.related[0].social !== null)
            {
                social.value = data.related[0].social
            }
        })
    })
    .catch((err) => {
        console.error(err);
    });
})

function edit()
{
    router.push ('/user/edit/')
}


</script>

<template>
    <div v-if="user" class="card mt-3">
        <div class="card-header">
            <div class="row mx-1">
                <a href="#" class="btn btn-outline-secondary dark-text" @click="$emit('showList')">< List</a>
                <div class="h4 mr-auto ml-4">{{ user.username }}</div>
                <button v-if="user.username == username" class="btn btn-sm btn-primary px-2" @click="edit()">Edit</button>    
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12 col-md-3">
                    <img :src="userpic" v-if="userpic" class="rounded-circle img-fluid"/>
                    <div class="emptypic rounded-circle" v-else></div>
                </div>
                <div class="col-12 col-md-9">
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <Field label="Real Name" :value="user.name"/>                            
                        </div>
                    </div>
                </div>
            </div>           
            <div class="row" v-if="social">
                <SocialView :data="social"/>
            </div>
            
            <Field label="Statement" :value="user.statement" class="mt-md-3" multi="true"/>

            <hr/>

            <template v-if="hire">
                <HireView :data="hire" v-if="hire.available"/>
            </template>
            <template v-else>
                <input type="checkbox" value="false" disabled/>
                <span class="label">Available for Hire</span>
            </template>
        </div>
    </div>
</template>