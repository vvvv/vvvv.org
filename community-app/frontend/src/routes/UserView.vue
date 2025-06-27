<script setup>

import { ref, watchEffect, onMounted, computed, watch} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Constants from '../constants'
import { NSpin, NAvatar, NIcon, NTooltip } from 'naive-ui'
import { CalendarOutline } from '@vicons/ionicons5'
import LogoDiscourse from '../components/logos/LogoDiscourse.js' 
import HireView from '../components/HireView.vue'
import SocialView from '../components/SocialView.vue'
import Location from '../components/Location.vue'
import ClippedText from '../components/ClippedText.vue'
import BetaGammaUser from '../components/BetaGammaUser.vue'
import Maintains from '../components/Maintains.vue'

import { isEmpty, toHtml, clone, createAssetUrl, getCountry, showBusinessProfile, ensureHttps, stripHttp } from '../utils.js'


const route = useRoute();
const router = useRouter();

const userpicSize = 120;
const username = route.params.username;

const user = ref(null);
const hire = ref (null);
const social = ref (null);
const userpic = ref(null);
const loading = ref(false);
const description = ref(null);
const partOf = ref({});

const imageParams = `?withoutEnlargement=true&quality=90&fit=cover&width=${userpicSize}&height=${userpicSize}`;
const url = `${Constants.GET_USERS}?filter[username][_eq]=${username}
            &fields=*,related.hire.*,related.hire.availableFor.AvailableFor_Options_id.value,related.social.*`;

const companyURL = `${Constants.GET_COMPANIES}?filter[owner][username][_eq]=${username}&fields=name,logo`;
const eduURL = `${Constants.GET_EDUS}?filter[owner][username][_eq]=${username}&fields=name,logo`;

onMounted(async ()=>
{
  loading.value = true;

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  try
  {
    // Fetch User Info
    let response = await fetch(url);
    let json = await response.json();

    if (!response.ok || json.data?.length == 0)
    {
      throw ("Can't find a profile for this user") 
    }
    
    const data = json.data[0];

    document.title = 'Profile: '+ data.username;
    user.value = data;

    userpic.value = user.value.userpic ? `${createAssetUrl(user.value.userpic)}${imageParams}` : null;

    hire.value = data.related[0]?.hire;
    social.value = data.related[0]?.social;

    description.value = user.value.description;

    const partOfRequests = [getPartOf(companyURL), getPartOf(eduURL)];
    const [companyResult, eduResult] = await Promise.allSettled(partOfRequests);

    if (companyResult.status === 'fulfilled' && companyResult.value) 
      partOf.value.company = companyResult.value;
    if (eduResult.status === 'fulfilled' && eduResult.value) 
      partOf.value.edu = eduResult.value;
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

async function getPartOf(url)
{
   const response = await fetch(url);
   const json = await response.json();

   if (response.ok && json.data?.length > 0)
    {
      return {
        name: json.data[0].name,
        logo: json.data[0].logo ? `${createAssetUrl(json.data[0].logo)}${imageParams}` : null
      }
    }
    return null;
}

const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
};

const joined = computed(()=> new Date(user.value.date_created).toLocaleString("en-US", dateOptions)); 

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

const forumLink = computed(()=>
  `${Constants.FORUM}u/${user.value.username}/summary`
)

const betagammauser = computed(()=>
{
  const result = {};
  if (user.value.beta_since) result.beta = new Date(user.value.beta_since).getFullYear();
  if (user.value.gamma_since) result.gamma = new Date(user.value.gamma_since).getFullYear();

  return Object.keys(result).length > 0 ? result : null;
})

const website = computed(()=>{

    let url = null;

    if (social.value?.website && social.value.website !== '')
    {
        url = {
            name: stripHttp(social.value.website),
            link: ensureHttps(social.value.website)
        }
    }

    return url;
})

const hireCardVisible = computed(()=>{
  return  hire.skills_other || 
          hire.skills_vvvv || 
          hire.contact || 
          hire.availableFor.length > 0 || 
          hire.description || 
          hire.image;
 })


</script>

<template>
  <n-spin :show="loading">
    <div v-if="user" class="userView">
      <div class="row">
        <div class="col-12 col-md-6 col-lg-4 mb-sm-4">
              <NAvatar objectFit="contain" round :size="userpicSize" :src="userpic"/>

              <div class="my-3">
                <h5>{{ user.username }}
                  <a :href="forumLink" target="_blank" class="pl-2" alt="Forum Profile">
                    <NTooltip trigger="hover">
                      <template #trigger>
                        <NIcon>
                          <LogoDiscourse/>
                        </NIcon>
                      </template>
                      Open Forum Profile 
                    </NTooltip>
                  </a>
                </h5>
                <p class="text-muted mb-1" v-if="fullName">{{ fullName }}</p>
              </div>

              <div class="joined mb-2">
                <NTooltip trigger="hover">
                    <template #trigger>
                      <NIcon size="1.2rem" class="mr-2">
                        <CalendarOutline/>
                      </NIcon>
                    </template>
                    Joined
                </NTooltip>
                {{ joined }}
              </div>

              <Location v-if="location" :location="location"/>

              <Maintains v-if="Object.keys(partOf).length > 0" :data="partOf" class="border-top pt-2 mt-4"/>

              <SocialView class="mt-4 mb-4 pt-3 border-top" :social="social" v-if="social" />

              <BetaGammaUser v-if="betagammauser" :data="betagammauser"/>

        </div>
        <div class="col-12 col-md-6 col-lg-8 profileContent">

          <div v-if="description" class="mb-4 description">
            <ClippedText :text="description" :maxLength="255" :clippedLength="100"/>
          </div>

          <div v-if="hire && hire.available">
            <h4 class="h4">Available for hire</h4>
            <div class="card" v-if="hireCardVisible">
              <HireView :data="hire"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </n-spin>
</template>