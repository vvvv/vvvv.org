<script setup>
import { computed } from 'vue';
import { connections } from '../connections.js'
import SocialHeaderItem from './SocialHeaderItem.vue';

const sortedConnections = computed(()=>
    [...connections].sort((a, b) => (a.order ?? 100) - (b.order ?? 100))
)
</script>

<template>
    <div class="row socialHeader">
        <SocialHeaderItem v-for="connection in sortedConnections" :item="connection" :key="connection.name"/>
    </div>
</template>