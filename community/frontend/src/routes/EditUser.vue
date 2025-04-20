<script setup>

import { ref, shallowRef, onMounted, h } from 'vue'
import { useMessage, NIcon, NMenu, NSpin } from 'naive-ui'

import {
  PersonCircleOutline as PersonIcon,
  HomeOutline as HomeIcon,
  WalletOutline as WalletIcon,
  StorefrontOutline as CompanyIcon
} from '@vicons/ionicons5'

import { useRouter, useRoute } from 'vue-router'
import { fetchProfileData } from './fetchProfileData.js'

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

onMounted(async() => {
  ({ profileData: data.value, constantsData: constants.value } = await fetchProfileData( loading, failure ));
})

const updateData = (d)=>{
  data.value = d
}

// Sync the active tab with the current route
const activeTab = ref(route.path);

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

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
      <div v-if="!loading && failure" class="mt-4">{{ failure }}</div>
      <template v-if="data">
        <div class="row mb-2">
          <div class="col">
            <div class="h1">{{ data.username }}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-3 mb-md-0 mb-5 profile-menu">  
            <n-menu responsive :options="menuOptions" @update:value="handleUpdateValue" :default-value="menuOptions[0].key"/>
          </div>
          <div class="col-12 col-md-8 ml-md-1">
              <component :is="selected" :data="data" :constants="constants" @reload="reload" @message="showMessage" @updateData="updateData"/>
            </div>
          </div>
        </template>
      </n-spin>
  </div>
</template>