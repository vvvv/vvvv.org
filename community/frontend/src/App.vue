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

const logged = ref(false)
const loading = ref(true)
const data = ref(null)
const failure = ref ("")

const mail = ref(null)

const currentView = computed(() => {
  return routes[props.page]
})

const routes = {
  '': Users,
  'edit': EditUser,
  'community': Users,
  'users': Users,
  'businesses': Business
}

onMounted( async ()=> {
  keycloak = new KC()

  keycloak.onAuth = async ()=> {
    try{
      mail.value = keycloak.getMail()
      logged.value = true
    }
    catch (error) {
      failure.value = "Can't get data, please try login later."
    }
  }

  keycloak.onReady = async ()=> {
    loading.value = false
  }

  keycloak.init()

})

const login = ()=> {
  keycloak.login(window.location.href)
}

const logout = () => {
  keycloak.logout(`${location.origin}/user`)
}
</script>

<template>
    <div v-if="loading" class="container px-4 py-2">
      <div class="spinner-border text-light" role="status">
          <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-if="failure !== ''" class="mt-4">{{ failure }}</div>
    <template v-if="!loading">
      <nav class="navbar">
        <ul class="nav nav-pills">
          <li class="nav-item">
              <a class="nav-link" :class="{active: currentView == Users}" href="/user">Users</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{active: currentView == Business}" href="/user/businesses">Businesses</a>
          </li>
        </ul>  
        <template v-if="mail == null">
          <ul class="nav nav-pills navbar-right">
            <li class="nav-item">
              <a class="nav-link" href="#" @click="login">Login</a>
            </li>
          </ul>
        </template>  
        <template v-if="mail != null">
          <ul class="nav nav-pills navbar-right">
            <li class="nav-item">
                <a class="nav-link" :class="{active: currentView == EditUser}" href="/user/edit">Profile</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click="logout">Logout</a>
              </li>
          </ul>
        </template>
      </nav>
      <div class="container px-4">
        <component :is="currentView" :keycloak="keycloak" :logged="logged"/>
      </div>
    </template>

</template>