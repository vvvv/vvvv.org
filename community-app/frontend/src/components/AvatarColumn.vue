<script setup>
import { NAvatar, NIcon } from "naive-ui"
import { showUserProfile } from "../utils.js"

const props = defineProps(['src', 'username']);

</script>

<template>
    <a :href="'/people/'+username" @click="(event)=> showUserProfile(username, event)">
        <NIcon style="cursor: 'pointer';">
            <NAvatar round :size="48" :src="src" objectFit="contain" :class="{ 'noImageBack': src !== null }"/>
        </NIcon>
    </a>
</template>