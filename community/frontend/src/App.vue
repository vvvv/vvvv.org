<script setup>
import { ref, onMounted } from 'vue'
import Constants from './constants'
import { useRouter, useRoute } from 'vue-router'
import { kclogin, kclogout, isAuthenticated, getAccessToken, getMail, getUsername } from './keycloak-helper'
import { NMessageProvider, NTab, NTabs, NConfigProvider } from 'naive-ui'

const router = useRouter();
const route = useRoute();

const data = ref(null);
const failure = ref ("");
const authenticated = ref (false);
const businessesCount = ref (0);
const activeTab = ref(null);

const login = ()=> {
  kclogin(window.location.origin + window.location.pathname.split('#')[0])
}

const logout = ()=> {
  kclogout(window.location.origin + `/user`)
}

onMounted(()=>{
  console.log (window.location.pathname)
  activeTab.value = tabs.find(t => t.path === window.location.pathname).name
  authenticated.value = isAuthenticated()
})

// Sync the active tab with the current route

const handleTabChange = ( tabName ) => {
  const route = tabs.find(t => t.name === tabName)
  activeTab.value = tabName;
  router.push( route.path ); // Navigate to the selected tab's route
};


const openProfile = ()=>{
  activeTab.value = null;
  router.push('/user/edit');
}

const tabs = [
  { name: 'Users', path: '/user/' },
  { name: 'For Hire', path: '/user/forhire/' },
  { name: 'Businesses', path: '/user/businesses/' },
];

const themeOverrides = {
  "common": {
    "primaryColor": "#DE950BFF"
  }
}

</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="container py-2">
      <div v-if="failure !== ''" class="mt-4">{{ failure }}</div>
      <div v-else class="row mb-4">
          <div class="col">
            <n-tabs v-model:value="activeTab" type="line" size="large" animated @update:value="handleTabChange" :default-value="activeTab">
              <n-tab v-for="tab in tabs" :key="tab.path" :name="tab.name" @click="handleTabChange(tab.name)">
                {{  tab.name }}
              </n-tab>
            </n-tabs>
          </div>
          <div class="col">
            <template v-if="!authenticated">
              <ul class="nav nav-pills navbar-right">
                <li class="nav-item">
                  <div class="btn btn-primary" @click="login">Login</div>
                </li>
              </ul>
            </template>  
            <template v-else>
              <ul class="nav nav-pills navbar-right mt-2">
                <li class="nav-item mr-4">
                  <div class="btn btn-outline-secondary" @click="openProfile">Profile</div>
                </li>
                <li class="nav-item">
                  <div class="btn btn-outline-secondary" @click="logout">Logout</div>
                </li>
              </ul>
            </template>
          </div>
        </div>     
        <n-message-provider placement="bottom-right">
            <RouterView/>
        </n-message-provider>
    </div>
  </n-config-provider>
</template>