<script setup>
import { ref, computed, onMounted } from 'vue'
import NewestUsers from "../components/overview/NewestUsers.vue"
import Businesses from "../components/overview/Businesses.vue"
import ForHire from "../components/overview/ForHire.vue"
import SocialHeader from '../components/SocialHeader.vue'
import '../styles/style.scss'
import { fetchOverview } from '../routes/fetchOverview.js'
import { NSpin } from 'naive-ui'

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

const columnClass='col-12 col-md-6 col-lg mb-3 mb-lg-0';

</script>

<template>
    <n-spin :show="loading">
        <div class="row">
            <div class="col-12">
                <h4>Connections</h4>
                <SocialHeader class="mt-2 mb-4"/>
            </div>
            
            <div class="col-12">
                <h4>Overview</h4>
                <div class="row" v-if="data">
                    <div :class="columnClass">
                        <NewestUsers :data="data.users"/>
                    </div>
                    <div :class="columnClass">
                        <Businesses :data="data.businesses"/>
                    </div>
                    <div :class="columnClass">
                        <ForHire :data="data.forHire"/>
                    </div>
                </div>
            </div>
        </div>
    </n-spin>
</template>
