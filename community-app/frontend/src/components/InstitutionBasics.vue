<script setup>
import defaultLogo from '../assets/defaultLogo.png'
import MaintainedBy from './MaintainedBy.vue'
import SocialView from './SocialView.vue'
import LocationFull from './LocationFull.vue'
import Links from './Links.vue'
import Internships from './Internships.vue';
import InstitutionPeople from './InstitutionPeople.vue'

const props = defineProps(['data']);
const socialKeys = ["website", "github", "nuget", "mastodon", "pixelfed"];

</script>

<template>
    <div>
        <div class="d-flex profile-logo align-items-center">
            <img :src="data.logo || defaultLogo" alt="logo" class="img-fluid"/>
        </div>
        <div class="my-3">
            <h5 class="h5 bold">{{ data.name }}</h5>
        </div>
        <div class="mb-4 text-muted pr-4" v-if="data.tagline">
            {{ data.tagline }}
        </div>
        <LocationFull :data="data"/>
        
        <Internships :data="data" text="Accepting internship applications" :isLink="true"/>

        <SocialView class="mt-4 py-2 border-top" v-if="Object.keys(data.social).length>0" :social="data.social" />                      
        
        <Links class="links" :data="data"/>

        <InstitutionPeople v-if="data.people?.length > 0" :data="data.people"/>

        <MaintainedBy class="maintained mt-4 pt-3 border-top d-none d-md-block" :data="data.owner"/>

    </div>
</template>
