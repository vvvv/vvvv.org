<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from "vue-router";
import { NSpin } from 'naive-ui'
import { useBusinessListStore } from "./BusinessListStore.js";
import defaultLogo from '../assets/defaultLogo.png'
import Location from "../components/Location.vue"
import { showBusinessProfile } from "../utils.js"
import Internships from '../components/Internships.vue';

const loading = ref (true);

const route = useRoute();
const store = useBusinessListStore();

onMounted( async ()=>
{
    if (route.query.b)
    {
        showBusinessProfile(decodeURI(route.query.b));
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
            <p v-if="store.total > 0">{{ store.total }} Businesses that use vvvv:</p>
            <div class="row">
                <div v-for="item in store.items" track-by="item.name" :class="elementClass">
                    <div class="companyCard p-3" @click="(event)=> showBusinessProfile(item.name, event)">
                        <div class="company">
                            <div class="logo">
                                <img :src="item.logo || defaultLogo"/>
                            </div>
                            <p class="name">{{ item.name }}</p>
                            
                            <Internships :data="item" text="Accepting internship" class="mb-1"/>
                            <Location :location="{city: item.location_city, country: item.location_country}"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </n-spin>
</template>