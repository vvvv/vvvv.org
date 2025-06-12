<script setup>
import { computed } from 'vue';

const props = defineProps(['id'])

const link = computed(()=>{
    return "https://www.youtube-nocookie.com/embed/"+props.id
})

</script>
<template>
    <div class="embed-responsive embed-responsive-16by9 mt-3 mb-4">
        <iframe width="560" height="315" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" :src="link"></iframe>
    </div>
</template>