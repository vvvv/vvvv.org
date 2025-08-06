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
        store.shuffle();
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
    <div v-if="!loading && store.videos.length > 0" class="staffpicks mr-2">
        <h5 class="pb-0">Staff picks</h5>
            <Video :platform="selectedVideo.platform" :id="selectedVideo.id" :thumb="selectedVideo.bigThumb" class=" mt-3 mb-2"></Video>
        <div>
            <template v-for="(item, index) of store.videos" :index="index">
                <div class="row my-0 px-3 py-2 mb-1 d-flex align-items-center" @click="selected = index" :class="{ selected: selected == index }">
                    <div class="col-2 px-0">
                        <img :src="item.smallThumb" :alt="item.title" class="img-fluid"/>
                    </div>
                    <div class="col-10 pl-4">
                        <p>{{ item.title }}</p>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
