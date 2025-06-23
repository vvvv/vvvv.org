<script setup>

import { ref, shallowRef, onMounted, h } from 'vue'
import { useMessage, NIcon, NMenu, NSpin, NButton } from 'naive-ui'

import {
  PersonCircleOutline as PersonIcon,
  HomeOutline as HomeIcon,
  WalletOutline as WalletIcon,
  StorefrontOutline as CompanyIcon,
  SchoolOutline as EduIcon,
} from '@vicons/ionicons5'

import { useRouter, useRoute } from 'vue-router'
import { fetchProfileData } from './fetchProfileData.js'

import Basics from '../components/profile/Basics.vue'
import Company from '../components/profile/Company.vue'
import Edu from '../components/profile/Edu.vue'
import Hire from '../components/profile/Hire.vue'

const emit = defineEmits(['logout']);

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
  try{
    loading.value = true;

    [ data.value, constants.value ] = await fetchProfileData();  
  }
  catch (error) {
    failure.value = error.message;
  }
  finally
  {
    loading.value = false;
  }
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
  },
  {
    label: 'Educational Institution',
    component: Edu,
    key: "edu",
    icon: renderIcon(EduIcon)
  }
];

const handleUpdateValue = (key, item) => {
  selected.value = item.component
}

</script>

<template>

  <div id="profile">
      <n-spin :show="loading">
        <!-- On Failure -->
        <div v-if="!loading && failure" class="mt-4">
          {{ failure }}
          <div class="mt-2"><n-button @click="auth.logout()">Logout</n-button></div>
        </div>

        <!--  On Data -->
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
                <component :is="selected" :data="data" :constants="constants" @message="showMessage" @updateData="updateData"/>
              </div>
            </div>
        </template>
      </n-spin>
  </div>
</template>