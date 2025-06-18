<script setup>
import MaintainedBy from './MaintainedBy.vue'
import SocialView from './SocialView.vue'
import LocationFull from './LocationFull.vue'

defineProps(['data']);
const socialKeys = ["website", "github", "nuget", "mastodon", "pixelfed"];

</script>

<template>
    <div>
        <img v-if="data.logo" :src="data.logo" alt="logo" class="img-fluid"/>
        <div class="my-3">
            <h5>{{ data.name }}</h5>
        </div>                     
        <LocationFull :data="data"/>

        <SocialView class="text-left mt-4 mb-4 pt-3 border-top" v-if="data.social" :social="data.social" :order="socialKeys"/>                      

        <MaintainedBy class="text-left maintained mt-4 pt-3 border-top" :data="data.owner"/>
    </div>
</template>
