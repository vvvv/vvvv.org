<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BusinessList from '../components/lists/BusinessList.vue'
import BusinessView from '../components/views/BusinessView.vue'
import '../styles/style.scss'

// Usermap
// const UserMap = defineAsyncComponent(() =>
//   import('../components/UserMap.vue')
// )
// const isMap = ref(false)

const route = useRoute();
const companyName = computed(()=> route.query.company || null);
const map = ref(route.query.map);

</script>

<template>
    <BusinessView v-if="companyName" :name="companyName"/>
    <BusinessList v-else/>
</template>
