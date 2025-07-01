<script setup>
import { ref, computed, onMounted } from 'vue'
import { NSpin } from 'naive-ui'
import Constants from '../constants.js'
import Businesses from "../components/overview/Businesses.vue"
import Edus from "../components/overview/Edus.vue"
import ForHire from "../components/overview/ForHire.vue"
import Connections from '../components/overview/Connections.vue'
import YouTubePlayer from '../components/YouTubePlayer.vue'
import LatestTopics from '../components/overview/LatestTopics.vue'

const content = ref (null);
const loading = ref (false);

onMounted(async ()=>{

    const url = Constants.BASEURL+"items/Community";

    try{
        loading.value = true;

        const response = await fetch (url);

        if (response.ok)
        {
            const json = await response.json();
            content.value = json.data;
        }

    }
    catch (error)
    {
        console.log (error);
    }
    finally{
        loading.value = false;
    }
})


const columnClass='col-12 col-md-6 mb-3 mb-lg-0';

</script>

<template>
    <div class="row row-cols-1 row-cols-md-2 overview">
        <div class="col mb-4">
            <template v-if="content?.video">
                <h4 class="border-bottom pb-2">Staff picks</h4>
                <YouTubePlayer :id="content.video"/>
            </template>
        </div>
        <div class="col mb-4">
            <LatestTopics/>
        </div>
        <div class="col mb-4">
            <Edus class="h-100"/>
        </div>
        <div class="col mb-4">
            <ForHire/>
        </div>
    </div>
    <div class="row overview mb-4">
        <div class="col-12 mb-4">
            <Businesses/>
        </div>
    </div>
    <div class="overview">
        <h4 class="border-bottom pb-2">Connections</h4>
        <div class="row row-cols-1 row-cols-md-2 row-cols-xl-4">
            <Connections/>
        </div>
    </div>
</template>
