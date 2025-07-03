<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from "vue-router";
import { NSpin } from 'naive-ui'
import { useEduListStore} from "./EduListStore.js";
import defaultLogo from '../assets/defaultLogo.png'
import Location from "../components/Location.vue"
import { showEduProfile } from "../utils.js"

const loading = ref (true);
const route = useRoute();
const store = useEduListStore();

onMounted( async ()=>
{
    if (route.query.e)
    {
        showEduProfile (route.query.e);
        return;
    }

    try{
        loading.value = true;
        await store.fetch();
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
        <div class="logoListView" v-if="!loading && store">
            <!-- <Map v-model:state="state"/> -->
            <p v-if="store.total > 0">{{ store.total }} educational institutions teaching vvvv:</p>
            <div class="row">
                <div v-for="{ name, description, logo, location_city, location_country } in store.items" 
                    track-by="name"
                    :class="elementClass">
                    <div class="companyCard p-3" @click="(event)=> showEduProfile(name, event)">
                        <div class="company">
                            <div class="logo">
                                <img :src="logo || defaultLogo"/>
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