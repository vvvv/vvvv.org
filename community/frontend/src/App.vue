<script setup>
import { ref, onMounted, computed } from 'vue'
import EditUser from './Pages/EditUser.vue'
import Business from './Pages/Business.vue'
import Users from './Pages/Users.vue'
import Professionals from './Pages/Professionals.vue'
import axios from 'axios'
import Constants from './constants'
import KC from './keycloak'

const props = defineProps(['page'])
var keycloak = null

const loading = ref(false)
const data = ref(null)

var mail = null
var username = null

const currentView = computed(() => {
  return routes[props.page]
})

const routes = {
  '': EditUser,
  'edit': EditUser,
  'community': Users,
  'users': Users,
  'professionals': Professionals,
  'businesses': Business
}

onMounted( async ()=> {
  keycloak = new KC()

  keycloak.onAuth = async ()=> {
    loading.value = true;
    try{
      mail = keycloak.getMail()
    }
    catch (error) {
      failure.value = "Can't get data, please try login later."
    }
    finally{
      loading.value = false;
    }
  }
})

const login = ()=> {
  keycloak.login(window.location.href)
}

const logout = () => {
  keycloak.logout(`${location.origin}/user`)
}
</script>

<template>
    <div v-if="loading" class="spinner-border text-light" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    <template v-if="!loading">
      <ul class="nav nav-pills">
        <li class="nav-item">
            <a class="nav-link" :class="{active: currentView == Users}" href="/user">Users</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/companies">Companies</a>
        </li>
        <template v-if="mail == null">
          <li class="nav-item">
            <a class="nav-link" href="#" @click="login">Login</a>
          </li>
        </template>
        <template v-if="mail != null">
          <li class="nav-item">
            <a class="nav-link" :class="{active: currentView == EditUser}" href="/user/edit">Profile</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="logout">Logout</a>
          </li>
        </template>
      </ul>    
      <component :is="currentView" :keycloak="keycloak"/>
    </template>

</template>