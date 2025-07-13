<script setup>
import { NIcon } from 'naive-ui'
import { PersonCircleOutline } from '@vicons/ionicons5'
import { showUserProfile } from '../utils.js'

defineProps(['data']);

</script>

<template>
    <div v-if="data">
        <p class="text-muted mb-2">This page is maintained by</p>
        <div>
            <NIcon size="20" class="mr-2">
                <PersonCircleOutline/>
            </NIcon>
            <a :href="'/people/'+data.username" @click="(event) => showUserProfile(data.username, event)">{{ data.username }}</a>
        </div>
    </div>
</template>