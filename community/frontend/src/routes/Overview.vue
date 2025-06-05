<script setup>
import { ref, computed, onMounted } from 'vue'
import NewestUsers from "../components/overview/NewestUsers.vue"
import Businesses from "../components/overview/Businesses.vue"
import ForHire from "../components/overview/ForHire.vue"
import '../styles/style.scss'
import { fetchOverview } from '../routes/fetchOverview.js'

const data = ref (null);

onMounted(async ()=>{
    try{
        data.value = await fetchOverview();
    }
    catch (error)
    {
        console.log (error);
    }
})

const columnClass='col-12 col-md-6 col-lg mb-3 mb-lg-0';

</script>

<template>
    <h1>Overview</h1>
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
</template>
