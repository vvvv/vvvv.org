<script setup>
import { ref, onMounted, computed, inject } from 'vue'
import EditUser from './components/EditUser.vue'
import Constants from './constants'
import { kclogin, kclogout, isAuthenticated, getAccessToken, getMail, getUsername } from './keycloak'

const loading = ref(false)
const data = ref(null)
const failure = ref ("")
const authenticated = ref (false)
const businessesCount = ref (0)

const login = ()=> {
  kclogin(window.location.href)
}

const logout = ()=> {
  kclogout(`${location.origin}/user`)
}

onMounted(()=>{
  authenticated.value = isAuthenticated()
})

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
              <RouterLink to="/user">Users</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/user/businesses">Businesses<span v-if="businessesCount>0" class="pl-1">{{(businessesCount)}}</span></RouterLink>
          </li>
        </ul>  
        <template v-if="!authenticated">
          <ul class="nav nav-pills navbar-right">
            <li class="nav-item">
              <div class="btn btn-primary" @click="login">Login</div>
            </li>
          </ul>
        </template>  
        <template v-else>
          <ul class="nav nav-pills navbar-right">
            <li class="nav-item mr-4 mt-2">
                <RouterLink to="/user/edit">Profile</RouterLink>
            </li>
            <li class="nav-item">
              <div class="btn btn-outline-secondary" @click="logout">Logout</div>
            </li>
          </ul>
        </template>
      </nav>
      <div class="container px-4">
        <RouterView @setCount="c => { businessesCount = c }"/>
      </div>
    </template>
  </div>
</template>