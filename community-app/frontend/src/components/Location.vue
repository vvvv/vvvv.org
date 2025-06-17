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
    <div v-if="location.city || location.country" class="location">
        <NIcon size="18"><LocationOutline /></NIcon>
        {{ text }} 
    </div>
</template>