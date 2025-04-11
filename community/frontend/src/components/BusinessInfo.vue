<script setup>

import { ref, onMounted} from 'vue'
import Constants from '../constants'
import Field from './Field.vue'
import { clone, createAssetUrl } from '../utils'

defineEmits(['showList'])

const { name } = defineProps(['name'])

const company = ref(null)
const social = ref(null)

const imageParams = "?quality=90&fit=cover&width=120"
const url = `${Constants.BASEURL}items/Company?fields=*,social.*&filter[name][_eq]=${name}`

console.log (url)

onMounted(async ()=>
{
    fetch(url)
    .then((response) => {
        response.json().then((d) => {
            const data = clone(d.data[0])
            
            if (data.social !== null)
            {
                social.value = data.social
            }

            data.logo = createAssetUrl(data.logo)+imageParams

            company.value = data
        })
    })
    .catch((err) => {
        console.error(err);
    });
})

</script>

<template>
    <div v-if="company" class="card mt-3">
        <div class="card-header">
            <div class="row mx-1">
                <a href="#" class="btn btn-outline-secondary dark-text" @click="$emit('showList')">< List</a>
                <div class="h4 mr-auto ml-4">{{ company.name }}</div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12 col-md-3">
                    <img :src="company.logo" v-if="company.logo !== null" class="rounded-circle img-fluid"/>
                    <div class="emptypic rounded-circle" v-else></div>
                </div>
                <div class="col-12 col-md-9">
                    <div class="row">
                        <div class="col-12 col-md-6">
                            {{ company.name}}                            
                        </div>
                        <div class="col-12 col-md-6" v-if="social">
                            {{ social.website }}
                            {{ social.github }}
                            {{ social.nuget }}
                            {{ social.mastodon }}
                            {{ social.pixelfed }}
                        </div>
                    </div>
                </div>
            </div>

            {{ company.description }}

            <div class="row" v-if="social">
                <template v-for="f in social.fields">
                        <Field :label="f.key" :value="f.value" class="col-12 col-md-6"/>
                </template>
            </div>
        </div>
    </div>
</template>