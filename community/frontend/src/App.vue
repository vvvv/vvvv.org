<script setup>
import { ref, onMounted, computed } from 'vue'
import Constants from './constants'
import { useRouter, useRoute } from 'vue-router'
import { kclogin, kclogout, isAuthenticated, getAccessToken, getMail, getUsername } from './keycloak-helper'
import { NMessageProvider, NTab, NTabs, NConfigProvider, NIcon } from 'naive-ui'
import {
  PersonCircleOutline as PersonIcon,
} from '@vicons/ionicons5'

const router = useRouter();
const route = useRoute();

const data = ref(null);
const failure = ref ("");
const businessesCount = ref (0);
const activeTab = ref(null);

const login = ()=> {
  kclogin(window.location.origin + window.location.pathname.split('#')[0])
}

const logout = ()=> {
  kclogout(window.location.origin + `/user`)
}

const leftTabs = computed(() =>
  router.getRoutes().filter((r) => r.meta?.isLeft).map((r) => ({
    name: r.meta.tabName,
    path: r.path,
  }))
);

const rightTabs = computed(() =>
  router.getRoutes().filter((r) => !r.meta?.isLeft).map((r) => ({
    name: r.meta.tabName,
    path: r.path,
  }))
);

const tabs = computed(()=>
  leftTabs.value.concat(rightTabs.value)
)

onMounted(() => {

  if (route.path === '/')
  {
    router.currentRoute.value.path = window.location.pathname
  }

  const matchedTab = tabs.value.find(t => t.path === route.path);
  activeTab.value = matchedTab ? matchedTab.name : tabs.value[0]?.name;
});

const authenticated = computed(()=>isAuthenticated())

const handleTabChange = ( tabName ) => {
  const tab = tabs.value.find(t => t.name === tabName)
  if (tab) {
    activeTab.value = tabName;
    router.push(tab.path); // Navigate to the selected tab's route
  }
};


const themeOverrides = {
  "common": {
    "primaryColor": "#DE950BFF"
  }
}

</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="container py-2">
      <div v-if="failure" class="mt-4">{{ failure }}</div>
      <div v-else class="d-flex justify-content-between mb-4">
          <div class="col-auto">
            <n-tabs v-model:value="activeTab" type="line" size="large" animated @update:value="handleTabChange">
              <n-tab v-for="tab in leftTabs" :key="tab.path" :name="tab.name" @click="handleTabChange(tab.name)">
                {{  tab.name }}
              </n-tab>
            </n-tabs>
          </div>
          <div class="col-auto">
            <div class="row">
              <div class="col">
                <n-tabs v-model:value="activeTab" type="line" size="large" :default-value="activeTab">
                  <n-tab name="Profile" @click="handleTabChange('Profile')" class="px-2">
                    <NIcon size="20" class="mr-2">
                      <PersonIcon/>
                    </NIcon>
                    Profile
                  </n-tab>
                  <n-tab v-if="authenticated" name="Logout" @click="logout" class="px-2">
                    Logout
                  </n-tab>
                </n-tabs>
              </div>
              <div class="col" v-if="!authenticated">
                <div class="btn btn-primary mt-2" @click="login">Login</div>
              </div>
            </div>
          </div>
       </div>     
        <n-message-provider placement="bottom-right">
            <RouterView/>
        </n-message-provider>
    </div>
  </n-config-provider>
</template>