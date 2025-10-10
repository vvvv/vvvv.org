<script setup>

import { ref, shallowRef, onMounted, h } from 'vue'
import { useMessage, NIcon, NMenu, NSpin, NButton } from 'naive-ui'

import { useRouter, useRoute } from 'vue-router'
import { fetchProfileData } from './fetchProfileData.js'

import Personal from '../components/profile/Personal.vue'
import Business from '../components/profile/Business.vue'
import Edu from '../components/profile/Edu.vue'
import ForHire from '../components/profile/ForHire.vue'

import {
  PersonCircleOutline as PersonIcon,
  HomeOutline as HomeIcon,
  WalletOutline as WalletIcon,
  StorefrontOutline as CompanyIcon,
  SchoolOutline as EduIcon,
} from '@vicons/ionicons5'

const emit = defineEmits(['logout']);

const router = useRouter();
const route = useRoute();
const message = useMessage();

const messageDuration = 3000;
const data = ref(null);
const loading = ref(true);
const constants = ref(null);
const failure = ref ("");

const selected = ref({
  key: "basics",
  component: Personal
})

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

async function reload()
{
  const route_key = route.query.p ?? "personal";

  selected.value = {
    key: route_key,
    component: menuOptions.find(m => m.key == route_key).component
  }

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
}

onMounted(async() => {

  await reload();
  
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
    label: "Personal",
    component: Personal,
    key: "personal",
    icon: renderIcon(PersonIcon)
  },
  {
    label: 'For Hire',
    component: ForHire,
    key: "forhire",
    icon: renderIcon(WalletIcon)
  },
  {
    label: 'Business',
    component: Business,
    key: "business",
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
  selected.value = {
    key: key,
    component: item.component,
  }
}

</script>

<template>

  <div id="profile">
      <n-spin :show="loading">
        <!-- On Failure -->
        <div v-if="!loading && failure" class="mt-4">
          {{ failure }}
          <div class="mt-2"><n-button @click="emit('logout')">Logout</n-button></div>
        </div>

        <!--  On Data -->
        <template v-if="data">
          <div class="row mb-2">
            <div class="col">
              <div class="h1">{{ data.username }}</div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-lg-3 mb-lg-0 mb-5 profile-menu">  
              <n-menu responsive :value="selected.key" :options="menuOptions" @update:value="handleUpdateValue" :default-value="menuOptions[0].key"/>
            </div>
            <div class="col-12 col-lg-8 ml-lg-1">
                <component :is="selected.component" :data="data" :constants="constants" @message="showMessage" @updateData="updateData"/>
              </div>
            </div>
        </template>
      </n-spin>
  </div>
</template>