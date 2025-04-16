<script setup>
import { ref, shallowRef, onMounted } from 'vue'
import { useMessage } from 'naive-ui'
import { getAccessToken, getMail, getUsername } from '../keycloak'
import { clone, makeFields } from '../utils'
import Constants from '../constants'

import Basics from '../components/profile/Basics.vue'
import Company from '../components/profile/Company.vue'
import Hire from '../components/profile/Hire.vue'

const message = useMessage();
const messageDuration = 2000;
const data = ref(null);
const loading = ref(true);
const constants = ref(null);
const failure = ref ("");
const newProfile = ref (false);
const selected = shallowRef(Basics);
const menu = {
  "Basics": Basics,
  "Hire": Hire,
  "Company": Company
}

const itemClass = ref ('item');
const selectedClass = ref ('selected');

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

  const data = {
    method: "GET",
    headers: { 
      "Content-Type": "application/json"
    }
  }
  
  try {
    const response = await fetch(Constants.BACKEND_GET_CONSTANTS, data)

    if (response.status != 200)
    {
      throw ("Can't load constants") 
    }
    else
    {
      constants.value = await response.json()
    }
  } catch (error)
  {
    console.log(error)
  }
}

const loadData = async () =>{
  
  try
  {
      const token = await getAccessToken()

      if (token === null) throw new Error (`Can't get a Token`)

      const response = await fetch(Constants.BACKEND_GET_USER, {
            method: "GET",
            headers: { 
              "Content-Type": "application/json",
              'Authorization': token
            },
      })

      let user = {};
      let social = {};
      let hire = {};
      let companies = [];

      if (response.status != 200)
      {
        newProfile.value = true;
        user.username = getUsername();
        user.email = getMail();
      }
      else
      {      
        const json = await response.json();
        user = clone (json[0]);
        companies = clone (user.companies);
        const related = clone(user.related[0]);

        delete user.related;
        delete user.companies;
        
        hire = related.hire;
        social = related.social;
      }

      social.fields = makeFields(social.fields ?? [], 4);
    
      companies.forEach((c)=>{
        c.social.fields = makeFields(c.social.fields ?? [], 4);
      })

      data.value = {
        user: user,
        social: social,
        hire: hire,
        companies: companies
      }
  } catch (error) {
    console.log (error)
    throw (error)
  }
}

const reload = async ()=>{
  try {
    loading.value = true
    await loadData()
    await loadConstants()
  } catch (error){
    console.log (error)
    failure.value = "Can't get data, please try login later."
  } finally{
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