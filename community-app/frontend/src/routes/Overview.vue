<script setup>
import { ref, computed, onMounted } from 'vue'
import Businesses from "../components/overview/Businesses.vue"
import ForHire from "../components/overview/ForHire.vue"
import SocialHeader from '../components/SocialHeader.vue'
import '../styles/style.scss'
import { fetchOverview } from '../routes/fetchOverview.js'
import { NSpin } from 'naive-ui'
import YouTubePlayer from '../components/YouTubePlayer.vue'
import LatestForumTopics from '../components/overview/LatestForumTopics.vue'

const data = ref (null);
const loading = ref(false);

onMounted(async ()=>{
    try{
        loading.value = true;
        data.value = await fetchOverview();
        loading.value = false;
    }
    catch (error)
    {
        console.log (error);
    }
})


const columnClass='col-12 col-md-6 mb-3 mb-lg-0';

</script>

<template>
    <n-spin :show="loading">
        <div class="row overview" v-if="data">
            <div class="col-12 mb-3">
                <div class="row">
                    <div class="col-12 col-md-6" v-if="data.content?.video">
                        <h4 class="border-bottom pb-2">Staff picks</h4>
                        <YouTubePlayer :id="data.content.video"/>
                    </div>
                    <div class="col-12 col-md-6">
                        <LatestForumTopics/>
                    </div>
                </div>
            </div>
            <div class="col-12 mb-4">
                <div class="row">
                    <div v-if="data.businesses" :class="columnClass">
                        <ForHire :data="data.forHire"/>
                    </div>
                    <div v-if="data.forHire" :class="columnClass">
                        <ForHire :data="data.forHire"/>
                    </div>
                </div>
            </div>
            <div class="col-12 mb-4" v-if="data.businesses">
                <Businesses :data="data.businesses"/>
            </div>
            <div class="col-12">
                <h4>Connections</h4>
                <SocialHeader class="mt-2 mb-4"/>
            </div>
        </div>
    </n-spin>
</template>
