<script setup>

import { ref, watchEffect, onMounted, computed, watch} from 'vue'
import Constants from '../../constants'
import { NSpin } from 'naive-ui'
import HireView from '../partials/HireView.vue'
import SocialView from '../partials/SocialView.vue'
import { isEmpty, toHtml, clone, createAssetUrl, getCountry } from '../../utils'

const { username = 'someuser'} = defineProps({username: String});

const user = ref(null);
const hire = ref (null);
const social = ref (null);
const userpic = ref(null);
const loading = ref(false);

const socialKeys = ["contact", "website", "github", "nuget", "mastodon", "pixelfed"];
const imageParams = "?withoutEnlargement=true&quality=90&fit=cover&width=120&height=120";
const url = `${Constants.GET_USERS}?filter[username][_eq]=${username}
            &fields=*,related.hire.*,related.hire.availableFor.AvailableFor_Options_id.value,related.social.*`;

onMounted(async ()=>
{
  loading.value = true;

  try
  {
    const response = await fetch(url);
    const json = await response.json();

    if (json.data.length == 0)
    {
      throw ("Can't find a profile for this user") 
    }
    
    const data = json.data[0];
    user.value = data;

    userpic.value = user.value.userpic ? `${createAssetUrl(user.value.userpic)}${imageParams}` : null;

    hire.value = data.related[0]?.hire;
    social.value = data.related[0]?.social;
  }
  catch (error)
  {
    console.error(error);
  }
  finally
  {
    loading.value = false;
  }
})

function edit()
{
    router.push ('/user/edit/');
}

const location = computed(() => {
    const location = [user.value.location_city, getCountry(user.value.location_country)].filter(Boolean).join(", ");
    return location ? location : null;
})

const fullName = computed(() => {
    const name = [user.value.name, user.value.surname].filter(Boolean).join(" ");
    return name ? name : null;
})

const forumLink = computed(()=>
  'https://forum.vvvv.org/u/'+ user.value.username + '/summary'
)

</script>

<template>
  <n-spin :show="loading">
    <div v-if="user">
      <div class="row">
        <div class="col-lg-4 text-center mb-3">
              <img :src="userpic" alt="userpic" v-if="userpic" class="rounded-circle img-fluid"/>
              <div class="emptypic rounded-circle" v-else></div>
              <div class="my-3">
                <h5>{{ user.username }}</h5>
                <p class="text-muted mb-1" v-if="fullName">{{ fullName }}</p>
              </div>
              <p class="text-muted mb-4" v-if="location">{{ location }}</p>
              <p class="text-muted mb-1">{{ user.statement ?? ''}}</p>
              <p class="mb-1"><a class="btn btn-outline-secondary" :href="forumLink">Open Forum Profile</a></p>
        </div>
        <div class="col-lg-8">
          <SocialView :social="social" :order="socialKeys" v-if="social" />
          <div class="row mt-4" v-if="hire && hire.available">
            <div class="col">
              <h4 class="h4">Available for hire</h4>
              <div class="card">
                <HireView :data="hire"/>
              </div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  </n-spin>
</template>