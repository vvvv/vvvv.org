<script setup>
import { ref, computed, onMounted } from 'vue'
import { clone, toHtml, createAssetUrl, getCountry } from '../helper'
import SocialView from './SocialView.vue'

const { username = 'testuser1'} = defineProps({username: String})

const baseURL = `http://localhost:8058/items/User`
const imageParams = "?quality=90&fit=cover&width=100&height=100"

const url = `${baseURL}?filter[username][_eq]=${username}&fields=*,related.hire.*.Hire_Types_id.type,related.social.*`
const loading = ref(false)

const user = ref(null)
const userpic = ref(null)
const hire = ref(null)
const social = ref(null)
const socialKeys = ["contact", "website", "github", "nuget", "mastodon", "pixelfed"]

onMounted(async ()=>
{
  loading.value = true

  try
  {
    const response = await fetch(url)
    const json = await response.json()

    console.log (json)

    if (json.data.length == 0)
    {
      throw ("Can't find a profile for this user") 
    }
    
    const data = json.data[0]
    user.value = data

    userpic.value = `${createAssetUrl(user.value.userpic)}${imageParams}`

    if (data.related[0].hire !== null)
    {
        const temp = clone(data.related[0].hire)
        temp.description = toHtml(temp.description)
        temp.skills_vvvv = toHtml(temp.skills_vvvv)
        temp.skills_other = toHtml(temp.skills_other)
        temp.image = createAssetUrl(temp.image)
        hire.value = temp
    }

    social.value = data.related[0].social || null
  }
  catch (error)
  {
    console.error(error)
  }
  finally
  {
    loading.value = false
  }
})

const location = computed(() => {
    const location = [user.value.location_city, getCountry(user.value.location_country)].filter(Boolean).join(", ")
    return location ? location : null
})

const fullName = computed(()=>{
    const name = user.value.name ? `${user.value.name} ` : ""
    const surname = user.value.surname || ""
    return name || surname ? `${name}${surname}` : null
})

</script>

<template>
  <div v-if="loading">Loading</div>

  <template v-if="user">
        <div class="row">
          <div class="col">
            <nav aria-label="breadcrumb" class="bg-body-tertiary rounded-3 p-3 mb-4">
              <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item"><a href="#" @click="$emit('showList')">User List</a></li>
                <li class="breadcrumb-item active" aria-current="page">{{ user.username }}</li>
              </ol>
            </nav>
          </div>
        </div>

      <div class="container">
        <div class="row">
          <div class="col-lg-4 text-center">
                <img :src="userpic" alt="userpic" v-if="userpic" class="rounded-circle img-fluid"/>
                <div class="emptypic rounded-circle" v-else></div>
                <div class="my-3">
                  <h5>{{ user.username }}</h5>
                  <p class="text-muted mb-1" v-if="fullName">{{ fullName }}</p>
                </div>
                <p class="text-muted mb-4" v-if="location">{{ location }}</p>
                <p class="text-muted mb-1">{{ user.statement ?? ''}}</p>
          </div>
          <div class="col-lg-8">
            <SocialView :social="social" :order="socialKeys" v-if="social" />
          </div>
        </div>  
      </div>
  </template>
</template>