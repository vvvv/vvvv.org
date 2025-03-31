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

const loading = ref(false)
const data = ref(null)
const failure = ref ("")

const mail = ref(null)

const login = ()=> {
  this.$keycloak.logout(window.location.href)
}

const logout = () => {
  this.$keycloak.logout(`${location.origin}/user`)
}
</script>

<template>
  <div class="container px-4 py-2">
    <div v-if="loading" class="spinner-border text-light" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    <div v-if="failure !== ''" class="mt-4">{{ failure }}</div>
    <template v-if="!loading">
      <nav class="navbar">
        <ul class="nav nav-pills">
          <li class="nav-item">
              <router-link to="/user">Users</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/user/businesses">Businesses</router-link>
          </li>
        </ul>  
        <template v-if="mail == null">
          <ul class="nav nav-pills navbar-right">
            <li class="nav-item">
              <div class="btn btn-primary" @click="login">Login</div>
            </li>
          </ul>
        </template>  
        <template v-if="mail != null">
          <ul class="nav nav-pills navbar-right">
            <li class="nav-item mr-4">
                <router-link to="/user/edit">Profile</router-link>
            </li>
            <li class="nav-item">
              <div class="btn btn-outline-secondary" @click="logout">Logout</div>
            </li>
          </ul>
        </template>
      </nav>
      <div class="container px-4">
        <router-view></router-view>
      </div>
    </template>
  </div>
</template>