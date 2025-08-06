<script setup>
import { ref, computed, watch } from "vue";
import { Play } from "@vicons/ionicons5";
import { NIcon } from "naive-ui";

const props = defineProps(['id', 'platform', 'thumb']);
const showVideo = ref(false);

watch(()=>props.id, (oldValue, newValue)=>{
    if (oldValue != newValue) showVideo.value = false;
})

const link = computed(()=>{
    if (props.platform == 'youtube') return `https://www.youtube-nocookie.com/embed/${props.id}?autoplay=1`;
    if (props.platform == 'vimeo') return `https://player.vimeo.com/video/${props.id}?&autoplay=1`;
})

</script>

<template>
    <div class="video">
        <div v-if="!showVideo" class="video-placeholder" @click="showVideo = true">
            <img v-if="thumb" :src="thumb" alt="Video thumbnail" class="img-fluid"/>
            <Play class="play-btn"/>
        </div>
        <div v-else-if="platform == 'youtube'" class="video-iframe">
            <iframe 
                title="YouTube video player"
                allow="autoplay; encrypted-media" 
                allowfullscreen="true"
                frameborder="0"
                :src="link">
            </iframe>
        </div>
        <div v-else-if="platform == 'vimeo'" class="video-iframe">
            <iframe 
                title="YouTube video player"
                allow="autoplay; encrypted-media" 
                allowfullscreen="true"
                frameborder="0"
                :src="link">
            </iframe>
        </div>
    </div>
        <!-- <VideoVimeo v-if="platform == 'vimeo'" :id="id" :thumb="thumb"/> -->
</template>