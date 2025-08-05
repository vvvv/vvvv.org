<script setup>
import { ref, onMounted, computed } from "vue";
import { useStaffpicksStore } from './StaffpicksStore.js'
import Video from '../Video.vue'

const store = useStaffpicksStore();
const selected = ref(0);
const loading = ref (false);

onMounted(async ()=>{   
    try {
        loading.value = true;
        await store.fetch();
    }
    catch(error) {
        console.log (error);
    }
    finally {
        loading.value = false;
    }
})

const selectedVideo = computed(()=>store.videos[selected.value]);

</script>

<template>
    <div v-if="!loading && store.videos.length > 0" class="staffpicks">
        <h5 class="pb-0">Staff picks</h5>
        <Video :platform="selectedVideo.platform" :id="selectedVideo.id" :thumb="selectedVideo.bigThumb"></Video>
        <div>
            <template v-for="(item, index) of store.videos" :index="index">
                <div class="row mb-0 mx-1 py-2 pr-1 mb-2" @click="selected = index" :class="{ selected: selected == index }">
                    <div class="col-3">
                        <img :src="item.smallThumb" :alt="item.title"/>
                    </div>
                    <div class="col-9">
                        <p>{{ item.title }}</p>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
