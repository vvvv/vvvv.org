<script setup>
import VideoYoutube from './Video-youtube.vue';
import VideoVimeo from './Video-vimeo.vue';

const props = defineProps(['id', 'platform', 'thumb']);
</script>

<template>
    <VideoYoutube v-if="platform == 'youtube'" :id="id" :thumb="thumb"/>
    <VideoVimeo v-if="platform == 'vimeo'" :id="id" :thumb="thumb"/>
</template>