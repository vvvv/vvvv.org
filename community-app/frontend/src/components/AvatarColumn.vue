<script setup>
import { NAvatar, NIcon } from "naive-ui"
import { showUserProfile } from "../utils.js"

defineProps(['src', 'username']);

</script>

<template>
    <a :href="'/user/'+username" @click="(event)=> showUserProfile(username, event)">
        <NIcon style="cursor: 'pointer';">
            <NAvatar round :size="48" :src="src" objectFit="contain"/>
        </NIcon>
    </a>
</template>