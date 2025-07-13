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
import AffiliatedWith from '../components/AffiliatedWith.vue'


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
const worksFor = ref([]);

const imageParams = `?withoutEnlargement=true&quality=90&fit=cover&width=${userpicSize}&height=${userpicSize}`;
const url = `${Constants.GET_USERS}?filter[username][_eq]=${username}
            &fields=*,related.hire.*,related.hire.availableFor.AvailableFor_Options_id.value,related.social.*`;

const companyURL = `${Constants.GET_COMPANIES}?filter[owner][username][_eq]=${username}&fields=name,slug`;
const eduURL = `${Constants.GET_EDUS}?filter[owner][username][_eq]=${username}&fields=name,slug`;

const worksForURL = `${Constants.GET_USER_ROLES}?fields=Company.Company_id.name,Company.Company_id.slug,Edu.Edu_id.name,Edu.Edu_id.slug,role&filter[user_id][id][_eq]=`;

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

    description.value = toHtml(user.value.description);

    const partOfRequests = [getPartOf(companyURL), getPartOf(eduURL)];
    const [companyResult, eduResult] = await Promise.allSettled(partOfRequests);

    if (companyResult.status === 'fulfilled' && companyResult.value) 
      partOf.value.company = companyResult.value;
    if (eduResult.status === 'fulfilled' && eduResult.value) 
      partOf.value.edu = eduResult.value;

    await getWorksFor(worksForURL+user.value.id);

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

async function getWorksFor(url)
{
  const response = await fetch(url);
  const json = await response.json();

  if (response.ok && json.data?.length > 0)
    {
      worksFor.value = json.data.map(i=>{

        if (i.Company[0])
        {
          return {
            name: i.Company[0].Company_id.name,
            slug: i.Company[0].Company_id.slug,
            role: i.role,
            link: '/business/'+i.Company[0].Company_id.slug
          }
        }
        
        if (i.Edu[0])
        {
          return {
            name: i.Edu[0].Edu_id.name,
            slug: i.Edu[0].Edu_id.slug,
            role: i.role,
            link: '/edu/'+i.Edu[0].Edu_id.slug
          }
        }
      });
    }
}

async function getPartOf(url)
{
   const response = await fetch(url);
   const json = await response.json();

   if (response.ok && json.data?.length > 0)
    {
      return {
        name: json.data[0].name,
        logo: json.data[0].logo ? `${createAssetUrl(json.data[0].logo)}${imageParams}` : null,
        slug: json.data[0].slug
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
  router.push ({name: 'Personal Profile'});
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
  const result = {
    beta: user.value.beta_since,
    gamma: user.value.gamma_since
  };
  
  return result.beta || result.gamma ? result : null;
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
  return  hire.value.skills_other || 
          hire.value.skills_vvvv || 
          hire.value.contact || 
          (hire.value.availableFor && hire.value.availableFor.length > 0) || 
          hire.value.description || 
          hire.value.image;
 })


</script>

<template>
  <n-spin :show="loading">
    <div v-if="user" class="userView">
      <div class="row">
        <div class="col-12 col-md-6 col-lg-4 mb-sm-4">
              <NAvatar objectFit="contain" round :size="userpicSize" :src="userpic" :class="{ 'noImageBack': userpic !== null }"/>

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

              <Location v-if="location" :location="location" class="pb-2"/>

              
              <SocialView class="my-1 py-2 border-top" :social="social" v-if="social" />
              
              <Maintains v-if="Object.keys(partOf).length > 0" :data="partOf" class="mb-3"/>
              
              <AffiliatedWith v-if="worksFor.length > 0" :data="worksFor" class="mb-3"/>
                
              <BetaGammaUser v-if="betagammauser" :data="betagammauser"/>

        </div>
        <div class="col-12 mt-3 mt-md-0 pt-md-0 col-md-6 col-lg-8 profileContent">

          <template v-if="description">
            <div class="mb-4 description">
              <p v-html="description"></p>
            </div>
          </template>

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