<script setup>

import { ref, watchEffect, onMounted, computed, watch} from 'vue'
import Constants from '../constants'
import { NSpin, NAvatar, NIcon, esAR } from 'naive-ui'
import HireView from '../components/HireView.vue'
import SocialView from '../components/SocialView.vue'
import Location from '../components/Location.vue'
import ClippedText from '../components/ClippedText.vue'
import { useRoute, useRouter } from 'vue-router'
import { isEmpty, toHtml, clone, createAssetUrl, getCountry, showBusinessProfile } from '../utils'


const route = useRoute();
const router = useRouter();

const userpicSize = 120;
const username = route.params.username;

const user = ref(null);
const hire = ref (null);
const social = ref (null);
const userpic = ref(null);
const loading = ref(false);
const company = ref(null);
const showMore = ref("Show More");
const statement = ref(null);
const textLong = ref(false);

const socialKeys = ["contact", "website", "github", "nuget", "mastodon", "pixelfed"];
const imageParams = `?withoutEnlargement=true&quality=90&fit=cover&width=${userpicSize}&height=${userpicSize}`;
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

    statement.value = user.value.statement;
    toggleStatement();

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
  router.push ({name: 'User Profile'});
}

const location = computed(()=>{
  return {city: user.value.location_city, country: user.value.location_country}
})

const fullName = computed(() => {
  const name = [user.value.name, user.value.surname].filter(Boolean).join(" ");
  return name ? name : null;
})

const statementTooLong = computed(()=>{
  console.log (user.value.statement.length)
  return user.value.statement.length > 200
})

const forumLink = computed(()=>
  'https://forum.vvvv.org/u/'+ user.value.username + '/summary'
)

const toggleStatement = ()=>{
  if (textLong.value)
  {
    showMore.value = "Show Less";
    statement.value = user.value.statement;
  }
  else
  {
    showMore.value = "Show More";
    statement.value = user.value.statement.slice(0, 100);
  }

  textLong.value = !textLong.value;
}

</script>

<template>
  <n-spin :show="loading">
    <div v-if="user" class="userView">
      <div class="row">
        <div class="col-12 col-md-6 col-lg-3 text-center mb-sm-4">
              <NAvatar objectFit="contain" round :size="userpicSize" :src="userpic"/>

              <div class="my-3">
                <h5>{{ user.username }}</h5>
                <p class="text-muted mb-1" v-if="fullName">{{ fullName }}</p>
              </div>

              <Location :location="location"/>

              <p class="mb-1">
                <a :href="forumLink">Forum Profile</a>
              </p>

              <div v-if="company" class="border-top pt-2 mt-4">
                <div>Owner of</div>
                <a :href="'/business/'+company" @click="(event) => showBusinessProfile(company, event)">{{ company }}</a>
              </div>

        </div>
        <div class="col-12 col-md-6 col-lg-9">
          <SocialView class="text-left mb-4" :social="social" :order="socialKeys" v-if="social" />

          <div v-if="statement" class="mb-4 statement">
            <ClippedText :text="user.statement" :maxLength="255" :clippedLength="100"/>
          </div>

          <div v-if="hire && hire.available">
            <h4 class="h4">Available for hire</h4>
            <div class="card">
              <HireView :data="hire"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </n-spin>
</template>