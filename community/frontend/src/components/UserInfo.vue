<script setup>

import { ref, watchEffect, onMounted, computed } from 'vue'
import Constants from '../constants'
import Field from './Field.vue'
import { isEmpty } from '../utils'

const props = defineProps(['username'])
const UserData = ref(null)
const imageParams = "?quality=90&fit=cover&width=120"
const url = `${Constants.GET_USERS}?filter[username][_eq]=${props.username}&fields=*,hire.*.Hire_Types_id.type,social.*`

async function getData()
{
    fetch(url)
    .then((response) => {
        response.json().then((data) => {
            UserData.value = data.data[0]
        })
    })
    .catch((err) => {
        console.error(err);
    });
}

onMounted(async ()=>
{
    await getData();
    //UserData.value = {"Hire":{"type":"undefined","available":"undefined","description":"undefined"},"User":{"email":"florian.geierstanger@web.de","homepage":null,"realname":null,"username":"fgeierst","statement":null,"profilepic":"undefined","coordinates":null},"SocialNetworks":{"nuget":"undefined","fields":"undefined","github":"undefined"}}
})

function edit(username)
{
    window.location.href = '/users/edit/profile?user='+ username
}


</script>

<template>
    <a href="/user/" class="btn btn-secondary">< List</a>
    <div v-if="UserData" class="card mt-3">
        <div class="card-header">
            <div class="row mx-1">
                <div class="h4 mr-auto">{{ UserData.username }}</div>
                <button class="btn btn-sm btn-primary px-2" @click="edit(UserData.username)">Edit</button>    
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
                        <div class="col-12 col-md-6" v-if="UserData.social.length > 0">
                            <Field label="Github Account" :value="UserData.social[0].github"/>
                            <Field label="Nuget Account" :value="UserData.social[0].nuget"/>
                        </div>
                    </div>
                </div>
            </div>

            <Field label="Statement" :value="UserData.statement" class="mt-md-3" multi="true"/>

            <div class="row" v-if="UserData.social.length > 0">
                <template v-for="f in UserData.social[0].fields">
                        <Field :label="f.key" :value="f.value" class="col-12 col-md-6"/>
                </template>
            </div>

            <hr/>

            <template v-if="UserData.hire.length > 0">
                <template v-if="edit">
                    <input type="checkbox" v-model="UserData.hire[0].available" disabled/>
                    <span class="label">Available for Hire</span>
                </template>
                <template v-else>
                    <div v-if="UserData.hire[0].available">Available for Hire</div>
                </template>
                <fieldset :disabled="!UserData.hire[0].available">
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <Field label="Description" :value="UserData.hire[0].description" :multi="true"/>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="field">
                                <div class="label">
                                    Available for:
                                </div>
                                <div class="value">
                                    <template v-for="(t, index) in UserData.hire[0].types">
                                        <span>{{ isEmpty(t.Hire_Types_id.type) }}</span><template v-if="index+1 < UserData.hire[0].types.length">, </template>
                                    </template>
                                </div>
                            </div> 
                        </div>
                    </div>
                </fieldset>
            <hr/>
            </template>
        </div>
    </div>
</template>