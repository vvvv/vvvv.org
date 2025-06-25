<script setup>
import MaintainedBy from './MaintainedBy.vue'
import SocialView from './SocialView.vue'
import LocationFull from './LocationFull.vue'
import Links from './Links.vue'
import Internships from './Internships.vue';

const props = defineProps(['data']);
const socialKeys = ["website", "github", "nuget", "mastodon", "pixelfed"];

</script>

<template>
    <div>
        <img v-if="data.logo" :src="data.logo" alt="logo" class="img-fluid"/>
        <div class="my-3">
            <h5>{{ data.name }}</h5>
        </div>                     
        <LocationFull :data="data"/>

        <SocialView class="mt-4 mb-4 pt-3 border-top" v-if="Object.keys(data.social)>0" :social="data.social" :order="socialKeys"/>                      
        
        <Internships :data="data.internships" text="Accepting internship applications"/>

        <Links class="links" :data="data"/>

        <MaintainedBy class="maintained mt-4 pt-3 border-top" :data="data.owner"/>

    </div>
</template>
