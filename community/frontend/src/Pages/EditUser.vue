<script setup>
import { ref, shallowRef, watch, onMounted, inject } from 'vue'

import Basics from '../components/Basics.vue'
import Company from '../components/Company.vue'
import Hire from '../components/Hire.vue'
import axios from 'axios'
import Constants from '../constants'
import { getAccessToken, getMail, getUsername } from '../keycloak'

const data = ref(null)
const loading = ref(true)
const constants = ref(null)
const failure = ref ("")
const newProfile = ref (false)
const selected = shallowRef(Basics)
const menu = {
  "Basics": Basics,
  "Hire": Hire,
  "Company": Company
}

const itemClass = ref ('item')
const selectedClass = ref ('selected')

const emptyProfile = {
  user:{},
  hide:{},
  companies: {},
  edu: {},
  social: {}
}

const loadConstants = async () => {
  const res = await axios.get(Constants.GET_CONSTANTS)
  if (res.status != 200)
  {
    throw ("Can't load constants") 
  }
  else
  {
    constants.value = res.data
  }
}

const reload = async () =>{

  loading.value = true

  const token = await getAccessToken()

  const res = await axios.post(Constants.GET_USERINFO, {}, {
        headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token
                }
      })

  if (res.status != 200)
  {
    if (res.data.code == 1)
    {
      data.value = emptyProfile
      newProfile.value = true
      data.value.user.username = getUsername()
      data.value.user.email = getMail()
    }
  }
  else
  {
    data.value = res.data
  }

  loading.value = false
}

onMounted(async() => {
  try{
        await reload()
        await loadConstants()
      }
      catch (error) {
        failure.value = "Can't get data, please try login later."
      }
      loading.value = false;
})

</script>

<template>
  <div id="profile">
    <div v-if="loading" class="spinner-border text-light" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-if="failure !== ''" class="mt-4">{{ failure }}</div>
    <template v-if="!loading && failure!== ''">
      <div class="row mb-2">
        <div class="col">
          <div class="h1">{{ data.user.username }}</div>
        </div>
      </div>
      <hr/>
      <div class="row">
        <div class="col-12 col-md-3 mb-md-0 mb-5 profile-menu">
          <template v-for="item in Object.keys(menu)">
            <div :class="[itemClass, selected==menu[item] ? selectedClass : '']" @click="selected=menu[item]">{{item}}</div>
          </template>
        </div>
        <div class="col-12 col-md-8 ml-md-1">
            <component :is="selected" :data="data" :constants="constants" :reload="reload" @reload="reload"/>
        </div>
      </div>
    </template>
  </div>
</template>