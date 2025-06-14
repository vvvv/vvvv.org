<script setup>
import { ref, onMounted } from 'vue'
import { NSpin } from 'naive-ui'
import { fetchEduData } from "./fetchEduData.js";
import defaultLogo from '../assets/defaultLogo.png'
import Location from "../components/Location.vue"
import { showEduProfile } from "../utils.js"

const data = ref(null);
const loading = ref (true);

onMounted( async ()=>
{
    try{
        loading.value = true;
        data.value = await fetchEduData();
    }
    catch (error)
    {
        console.log (error);
    }
    finally{
        loading.value = false;
    }
})

const elementClass = "col-12 col-sm-6 col-md-4 col-lg-3 my-2";

</script>

<template>
    <n-spin :show="loading">
        <div class="edus" v-if="!loading && data">
            <!-- <Map v-model:state="state"/> -->
            <p v-if="data">A list of {{ data.count }} Educational Institutions that teach vvvv.</p>
            <div class="row">
                <div v-for="{ name, description, logo, location_city, location_country } in data.items" 
                    track-by="name"
                    :class="elementClass">
                    <div class="companyCard p-3" @click="(event)=> showEduProfile(name, event)">
                        <div class="company">
                            <div class="logo">
                                <img :src="logo || defaultLogo" v-if="profilepic !== null"/>
                            </div>
                            <p class="name">{{ name }}</p>
                            
                        <Location :location="{city: location_city, country: location_country}"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </n-spin>
</template>