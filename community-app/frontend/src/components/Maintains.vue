<script setup>
import { showBusinessProfile, showEduProfile } from '../utils.js'

defineProps(['data']);

</script>

<template>
<div>
    <div class="mb-2">Maintains</div>
    <a v-if="data.company" :href="'/business/'+data.company.name" @click="(event) => showBusinessProfile(data.company.name, event)">
        <div class="mb-1 d-flex text-align-center">
            {{ data.company.name }}
        </div>
    </a>
    <a v-if="data.edu" :href="'/edu/'+data.edu.name" @click="(event) => showEduProfile(data.edu.name, event)">
        <p class="mb-1">
            {{ data.edu.name }}
        </p>
    </a>
</div>
</template>