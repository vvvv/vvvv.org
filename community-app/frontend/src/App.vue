<script setup>
import { ref, onMounted, computed, watch, watchEffect } from 'vue'
import Constants from './constants'
import { isRouteLoading } from "./globalState.js";
import { useRouter, useRoute } from 'vue-router'
import { kclogin, kclogout, isAuthenticated, getAccessToken, getMail, getUsername } from './keycloak-helper'
import { NMessageProvider, NTab, NTabs, NConfigProvider, NIcon, NSpin } from 'naive-ui'
import { PersonCircleOutline } from '@vicons/ionicons5'

const router = useRouter();
const route = useRoute();

const data = ref(null);
const failure = ref ("");
const businessesCount = ref (0);

const activeTab = ref(router.getRoutes()[0]);

const login = ()=> {
  kclogin(window.location.origin + window.location.pathname.split('#')[0])
}

const logout = ()=> {
  kclogout(window.location.origin + `/community`)
}

const authenticated = computed(()=>isAuthenticated())

const leftTabs = computed(() => {

  const tabs =  router.getRoutes().filter((r) => r.meta?.isLeft && r.meta?.visible).map((r) => (
      {
        name: r.meta.tabName,
        path: r.path,
        order: r.order
      }
    )).sort((r)=> r.order);

  return tabs;
});


const rightTabs = computed(() =>
  router.getRoutes().filter((r) => !r.meta?.isLeft).map((r) => ({
    name: r.meta.tabName,
    path: r.path,
  }))
);

const tabs = computed(()=>
  leftTabs.value.concat(rightTabs.value)
)

watchEffect(()=>{
  activeTab.value = route.meta.tabName;
})

const handleTabChange = ( tabName ) => {
  const tab = tabs.value.find(t => t.name === tabName)
  if (tab) {
    activeTab.value = tabName;
    if (tab?.external)
    {
       window.location = tab.path;
    }
    else
    {
      router.push(tab.path); // Navigate to the selected tab's route
    }
  }
};

const themeOverrides = {
  "common": {
    "primaryColor": "#DE950BFF",
    "colorFocusPrimary": "#FFA600FF",
    "primaryColorHover": "#FFA600FF"
  }
}

</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="container py-2">
      <div v-if="failure" class="mt-4">{{ failure }}</div>
      <div v-else class="row mb-4">
        <div class="col-12 col-md-9 order-2 order-md-1">
              <n-tabs v-model:value="activeTab" type="line" size="large" animated @update:value="handleTabChange">
                <n-tab v-for="tab in leftTabs" :key="tab.path" :name="tab.name" @click="handleTabChange(tab.name)">
                  {{  tab.name }}
                </n-tab>
              </n-tabs>
            </div>
            <div class="col-12 col-md-3 order-1 order-md-2">
              <n-tabs v-model:value="activeTab" type="line" size="large" :default-value="activeTab">
                <n-tab name="Profile" @click="handleTabChange('Profile')">
                  <div>
                    <NIcon size="20" class="mr-2">
                      <PersonCircleOutline/>
                    </NIcon>
                    Profile  
                  </div>
                </n-tab>
                <template #suffix>
                  <div v-if="authenticated" @click="logout" class="btn btn-outline-secondary">Logout</div>
                  <div v-else class="btn btn-primary" @click="login">Login</div>
                </template>
              </n-tabs>
            </div>
        </div>     
        <n-message-provider placement="bottom-right">
            <n-spin v-if="isRouteLoading" :delay="10"/>
            <RouterView/>
        </n-message-provider>
      </div>
  </n-config-provider>
</template>