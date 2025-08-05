<script setup>
import { ref } from 'vue'

const props = defineProps(['id', 'thumb']);

const showVideo = ref(false)
const videoId = props.id
const iframeUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`
</script>

<template>
  <div class="youtube-wrapper">
    <div v-if="!showVideo" class="youtube-placeholder" @click="showVideo = true">
      <img :src="thumb" alt="Video thumbnail" />
      <button class="play-btn">▶</button>
    </div>
    <div v-else class="youtube-iframe">
      <iframe
        :src="iframeUrl"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>