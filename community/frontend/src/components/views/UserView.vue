<script setup>

import { ref, watchEffect, onMounted, computed, watch} from 'vue'
import Constants from '../../constants'
import { NSpin } from 'naive-ui'
import HireView from '../partials/HireView.vue'
import SocialView from '../partials/SocialView.vue'
import Location from '../partials/Location.vue'
import { isEmpty, toHtml, clone, createAssetUrl, getCountry } from '../../utils'


const { username = 'someuser'} = defineProps({username: String});

const user = ref(null);
const hire = ref (null);
const social = ref (null);
const userpic = ref(null);
const loading = ref(false);
const company = ref(null);

const socialKeys = ["contact", "website", "github", "nuget", "mastodon", "pixelfed"];
const imageParams = "?withoutEnlargement=true&quality=90&fit=cover&width=120&height=120";
const url = `${Constants.GET_USERS}?filter[username][_eq]=${username}
            &fields=*,related.hire.*,related.hire.availableFor.AvailableFor_Options_id.value,related.social.*`;

const companyURL = `${Constants.GET_COMPANIES}?filter[owner][username][_eq]=${username}&fields=name`;

onMounted(async ()=>
{
  loading.value = true;

  try
  {
    // Fetch User Info
    let response = await fetch(url);
    let json = await response.json();

    if (json.data.length == 0)
    {
      throw ("Can't find a profile for this user") 
    }
    
    const data = json.data[0];
    user.value = data;

    userpic.value = user.value.userpic ? `${createAssetUrl(user.value.userpic)}${imageParams}` : null;

    hire.value = data.related[0]?.hire;
    social.value = data.related[0]?.social;

    // Fetch Company
    response = await fetch(companyURL);
    json = await response.json();

    if (json.data.length > 0)
    {
      company.value = json.data[0].name
    }
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

const location = computed(()=>{
    return {city: user.value.location_city, country: user.value.location_country}
})

const fullName = computed(() => {
    const name = [user.value.name, user.value.surname].filter(Boolean).join(" ");
    return name ? name : null;
})

const forumLink = computed(()=>
  'https://forum.vvvv.org/u/'+ user.value.username + '/summary'
)

function openCompany( name )
{
  console.log ("open Company");
}


</script>

<template>
  <n-spin :show="loading">
    <div v-if="user">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-3 text-center">
              <img :src="userpic" alt="userpic" v-if="userpic" class="rounded-circle img-fluid"/>
              <div class="emptypic rounded-circle" v-else></div>
              <div class="my-3">
                <h5>{{ user.username }}</h5>
                <p class="text-muted mb-1" v-if="fullName">{{ fullName }}</p>
              </div>
              <Location :location="location"/>
              <p class="text-muted mb-1">{{ user.statement ?? ''}}</p>
              <p class="mb-1"><a class="btn btn-outline-secondary" :href="forumLink">Open Forum Profile</a></p>

              <div v-if="company">
                <div>Owner of</div>
                <a href="#" @click.prevent="openCompany(company)">{{ company }}</a>
              </div>
        </div>
        <div class="col-12 col-sm-6 col-md-6">
          <div class="row mt-4" v-if="hire && hire.available">
            <div class="col">
              <h4 class="h4">Available for hire</h4>
              <div class="card">
                <HireView :data="hire"/>
              </div>
            </div>
          </div>  
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <SocialView :social="social" :order="socialKeys" v-if="social" />
        </div>
      </div>
    </div>
  </n-spin>
</template>