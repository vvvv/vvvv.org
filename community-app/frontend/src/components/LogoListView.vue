<script setup>
import defaultLogo from '../assets/defaultLogo.png'
import Location from "../components/Location.vue"
import { showBusinessProfile } from "../utils.js"
import Internships from '../components/Internships.vue';

const props = defineProps(['list'])

</script>

<template>
    <div class="logoListView" v-if="list && list.total > 0">
        <p>{{ list.total }} Businesses that use vvvv:</p>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
            <div v-for="item in list.items" track-by="item.name" class="col mb-4">
                <div class="companyCard p-3 h-100" @click="(event)=> showBusinessProfile(item.slug, event)">
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
</template>