<script setup>
import { computed } from 'vue'
import { NIcon } from 'naive-ui'
import { LocationOutline } from '@vicons/ionicons5'
import { locationCityCountry } from '../utils.js'

const { location } = defineProps(['location']);

const text = computed(() => {
    const t = locationCityCountry(location.city, location.country);
    return t ?? null
})

</script>
<template>
    <div v-if="text" class="location">
        <NIcon size="1.2rem" class="mr-2"><LocationOutline /></NIcon>
        {{ text }} 
    </div>
</template>