<script setup>
import { ref, shallowRef, watch, onMounted, inject } from 'vue'
import { useMessage } from 'naive-ui'
import { getAccessToken, getMail, getUsername } from '../../keycloak'
import { clone, makeFields } from '../../utils'
import Constants from '../../constants'

import Basics from './Basics.vue'
import Company from './Company.vue'
import Hire from './Hire.vue'

const message = useMessage()
const messageDuration = 2000
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
  social:{},
  hire:{},
  companies: {},
}

const showMessage = (m) => {

  if (m.type=='error')
  {
    message.error(m.string, {duration: messageDuration})
  }

  if (m.type=='success')
  {
    message.success(m.string, {duration: messageDuration})
  }

}

const loadConstants = async () => {
  const res = await fetch(Constants.BACKEND_GET_CONSTANTS, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json"
        }
  }).then(async (response) => {
    return {
      status: response.status,
      data: await response.json()
    }
  })
  .catch((error)=>{console.log(error)})

  if (res.status != 200)
  {
    throw ("Can't load constants") 
  }
  else
  {
    constants.value = res.data
  }
}

const loadData = async () =>{

  const token = await getAccessToken()

  if (token == null) throw ('token is null')

  const res = await fetch(Constants.BACKEND_GET_USER, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': token
        },
  }).then(async (response) => {
    return {
      status: response.status,
      data: (await response.json())[0]
    }
  })
  .catch((error)=>{console.log(error)})

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
    const related = res.data.related[0]
    const hire = related.hire
    const social = related.social
    const companies = res.data.companies
    
    const user = clone (res.data)
    delete user.related
    delete user.companies

    social.fields = makeFields(social.fields, 4)
    
    companies.forEach((c)=>{
       c.social.fields = makeFields(c.social.fields, 4)
    })

    data.value = {
      user: user,
      social: social,
      hire: hire,
      companies: companies
    }
  }
}

const reload = async ()=>{
  try {
      loading.value = true
      await loadData()
      await loadConstants()
  }
  catch (error){
    console.log (error)
    failure.value = "Can't get data, please try login later."
  }
  finally{
    loading.value = false;
  }
}

onMounted(async() => {
  reload()
})

const updateData = (d)=>{
  data.value = d
}

</script>

<template>
  <div id="profile">
    <div v-if="loading" class="spinner-border text-light" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-if="!loading && failure !== ''" class="mt-4">{{ failure }}</div>
    <template v-if="!loading && failure == ''">
      <div class="row mb-2">
        <div class="col">
          <div class="h1">{{ data.username }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-3 mb-md-0 mb-5 profile-menu">
          <template v-for="item in Object.keys(menu)">
            <div :class="[itemClass, selected==menu[item] ? selectedClass : '']" @click="selected=menu[item]">{{item}}</div>
          </template>
        </div>
        <div class="col-12 col-md-8 ml-md-1">
            <component :is="selected" :data="data" :constants="constants" @reload="reload" @message="showMessage" @updateData="updateData"/>
        </div>
      </div>
    </template>
  </div>
</template>