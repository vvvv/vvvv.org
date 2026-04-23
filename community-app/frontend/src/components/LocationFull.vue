<script setup>
import { computed } from 'vue'
import { NIcon } from 'naive-ui'
import { LocationOutline } from '@vicons/ionicons5'
import { getCountry } from '../utils.js'

const { data } = defineProps(['data']);

const addressFields = [
  'location_street',
  'location_additionalInfo',
  'location_postalcode',
  'location_country',
  'location_city'
];

const addressExists = computed(() =>
  addressFields.some(key => data && data[key])
);

</script>
<template>
    <div class="address mb-3" v-if="addressExists">
        <NIcon class="mb-2"><LocationOutline/></NIcon>
        <div v-if="data.location_street">{{ data.location_street }}</div>
        <div v-if="data.location_additionalInfo">{{ data.location_additionalInfo }}</div>
        <div v-if="data.location_postalcode || data.location_city">{{ data.location_postalcode }} {{ data.location_city }}</div>
        <div v-if="data.location_country">{{ getCountry(data.location_country) }}</div>
    </div>
</template>