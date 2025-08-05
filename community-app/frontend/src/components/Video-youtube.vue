<script setup>
import { ref } from 'vue'

const props = defineProps(['id', 'thumb']);

const showVideo = ref(false)
const videoId = props.id
const iframeUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`
</script>

<template>
  <div class="youtube-wrapper mt-3 mb-4 pr-2">
    <div v-if="!showVideo" class="youtube-placeholder" @click="showVideo = true">
        <img :src="thumb" alt="Video thumbnail"/>
        <button class="play-btn">▶</button>
    </div>
    <div v-else class="youtube-iframe">
        <iframe width="525" 
                height="330" 
                title="YouTube video player"
                allow="autoplay; encrypted-media" 
                allowfullscreen="true"
                frameborder="0"
                :src="iframeUrl"></iframe>
    </div>
  </div>
</template>