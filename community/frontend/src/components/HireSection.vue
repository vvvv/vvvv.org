<script setup>
import { ref } from 'vue'

const { data } = defineProps(['data'])
</script>

<template>
    <div class="row">
        <div class="col">
            <img :src="data.hire.image" class="img-fluid" v-if="data.image !== null"/>
            <p class="card-text" v-html="data.hire.description"></p>
        </div>
        <div class="col">
            <h4>vvvv skills</h4>
            <p class="card-text" v-html="data.hire.skills_vvvv"></p>

            <h4>other skills</h4>
            <p class="card-text" v-html="data.hire.skills_other"></p>
        </div>
    </div>
</template>