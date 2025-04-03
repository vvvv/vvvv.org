<script setup>

import { ref, watchEffect, onMounted, computed, watch} from 'vue'
import Constants from '../constants'
import Field from './Field.vue'
import { isEmpty } from '../utils'

defineEmits(['showList'])

const { username } = defineProps(['username'])

const UserData = ref(null)
const hire = ref (null)
const social = ref (null)

const imageParams = "?quality=90&fit=cover&width=120"
const url = `${Constants.GET_USERS}?filter[username][_eq]=${username}&fields=*,related.hire.*.Hire_Types_id.type,related.social.*`

onMounted(async ()=>
{
    fetch(url)
    .then((response) => {
        response.json().then((d) => {
            const data = d.data[0]
            UserData.value = data 
            if (data.related[0].hire !== null)
            {
                hire.value = data.related[0].hire
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

    // if (props.logged)
    // {
    //     if (keycloak.isAuthenticated())
    //     {
    //         username.value = keycloak.getUsername()
    //     }
    // }
})

function edit()
{
    window.location.href = '/user/edit/'
}


</script>

<template>
    <div v-if="UserData" class="card mt-3">
        <div class="card-header">
            <div class="row mx-1">
                <a href="#" class="btn btn-outline-secondary dark-text" @click="$emit('showList')">< List</a>
                <div class="h4 mr-auto ml-4">{{ UserData.username }}</div>
                <button v-if="UserData.username == username" class="btn btn-sm btn-primary px-2" @click="edit()">Edit</button>    
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12 col-md-3">
                    <img :src="`${Constants.ASSETS}${UserData.userpic}${imageParams}`" v-if="UserData.userpic !== null" class="rounded-circle img-fluid"/>
                    <div class="emptypic rounded-circle" v-else></div>
                </div>
                <div class="col-12 col-md-9">
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <Field label="Real Name" :value="UserData.name"/>                            
                        </div>
                        <div class="col-12 col-md-6" v-if="social">
                            <Field label="Website" :value="social.website"/>
                            <Field label="Github Account" :value="social.github"/>
                            <Field label="Nuget Account" :value="social.nuget"/>
                        </div>
                    </div>
                </div>
            </div>

            <Field label="Statement" :value="UserData.statement" class="mt-md-3" multi="true"/>

            <div class="row" v-if="social">
                <template v-for="f in social.fields">
                        <Field :label="f.key" :value="f.value" class="col-12 col-md-6"/>
                </template>
            </div>

            <hr/>

            <template v-if="hire">
                <input type="checkbox" v-model="hire.available" disabled/>
                <span class="label">Available for Hire</span>
                
                <div class="row">
                        <div class="col-12 col-md-6">
                            <Field label="Description" :value="hire.description" :multi="true"/>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="field">
                                <div class="label">
                                    Available for:
                                </div>
                                <div class="value">
                                    <template v-for="(t, index) in hire.available_for">
                                        <span>{{ isEmpty(t) }}</span><template v-if="index+1 < hire.available_for.length">, </template>
                                    </template>
                                </div>
                            </div> 
                        </div>
                </div>
                <hr/>
            </template>
            <template v-else>
                <input type="checkbox" value="false" disabled/>
                <span class="label">Available for Hire</span>
            </template>
        </div>
    </div>
</template>