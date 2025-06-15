<script setup>
import { ref, computed, onMounted } from 'vue'
import { NSpin } from 'naive-ui'
import Constants from '../constants.js'
import Businesses from "../components/overview/Businesses.vue"
import Edus from "../components/overview/Edus.vue"
import ForHire from "../components/overview/ForHire.vue"
import SocialHeader from '../components/SocialHeader.vue'
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
    <div class="row overview">
        <div class="col-12 mb-3">
            <div class="row">
                <div class="col-12 col-md-6">
                    <template v-if="content?.video">
                        <h4 class="border-bottom pb-2">Staff picks</h4>
                        <YouTubePlayer :id="content.video"/>
                    </template>
                </div>
                <div class="col-12 col-md-6">
                    <LatestTopics/>
                </div>
            </div>
        </div>
        <div class="col-12 mb-4">
            <div class="row">
                <div :class="columnClass">
                    <Edus/>
                </div>
                <div :class="columnClass">
                    <ForHire/>
                </div>
            </div>
        </div>
        <div class="col-12 mb-4">
            <Businesses/>
        </div>
        <div class="col-12">
            <h4>Connections</h4>
            <SocialHeader class="mt-2 mb-4"/>
        </div>
    </div>
</template>
