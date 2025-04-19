<script setup>

import { ref, shallowRef, onMounted, h } from 'vue'
import { useMessage, NIcon, NMenu, NSpin } from 'naive-ui'
import {
  PersonCircleOutline as PersonIcon,
  HomeOutline as HomeIcon,
  WalletOutline as WalletIcon,
  StorefrontOutline as CompanyIcon
} from '@vicons/ionicons5'
import { getAccessToken, getMail, getUsername } from '../keycloak-helper'
import { clone, makeFields } from '../utils'
import Constants from '../constants'
import { useRouter, useRoute } from 'vue-router'

import Basics from '../components/profile/Basics.vue'
import Company from '../components/profile/Company.vue'
import Hire from '../components/profile/Hire.vue'

const router = useRouter();
const route = useRoute();
const message = useMessage();

const messageDuration = 2000;
const data = ref(null);
const loading = ref(true);
const constants = ref(null);
const failure = ref ("");
const newProfile = ref (false);
const selected = shallowRef(Basics);

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
  
  let token;

  try{
    token = await getAccessToken()
  }
  catch {
    failure.value = "Session expired. Please try to login again."
  }

  try
  {
      token = await getAccessToken()

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

// Sync the active tab with the current route
const activeTab = ref(route.path);

const renderIcon = (icon) => h(NIcon, null, { default: () => h(icon) });

const menuOptions = [
  {
    label: "Basics",
    component: Basics,
    key: "basics",
    icon: renderIcon(PersonIcon)
  },
  {
    label: 'Hire',
    component: Hire,
    key: "hire",
    icon: renderIcon(WalletIcon)
  },
  {
    label: 'Company',
    component: Company,
    key: "company",
    icon: renderIcon(CompanyIcon)
  }
];

const handleUpdateValue = (key, item) => {
  console.log (item)
  selected.value = item.component
}

</script>

<template>
  <div id="profile">
      <n-spin :show="loading">
      <div v-if="!loading && failure !== ''" class="mt-4">{{ failure }}</div>
      <template v-if="!loading && failure == ''">
        <div class="row mb-2">
          <div class="col">
            <div class="h1">{{ data.username }}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-3 mb-md-0 mb-5 profile-menu">  
            <n-menu :options="menuOptions" @update:value="handleUpdateValue" :default-value="menuOptions[0].key"/>
          </div>
          <div class="col-12 col-md-8 ml-md-1">
              <component :is="selected" :data="data" :constants="constants" @reload="reload" @message="showMessage" @updateData="updateData"/>
            </div>
          </div>
        </template>
      </n-spin>
  </div>
</template>