<script setup>
import { computed } from 'vue'
import EditUser from './Pages/EditUser.vue'
import Business from './Pages/Business.vue'
import Users from './Pages/Users.vue'
import Professionals from './Pages/Professionals.vue'
const props = defineProps(['page'])

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
</script>

<template>
    <component :is="currentView" />
</template>