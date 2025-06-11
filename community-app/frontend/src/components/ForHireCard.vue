<script setup>

import { ref, computed, onMounted } from 'vue'
import { NTag, NSpace } from 'naive-ui'
import { toHtml, createAssetUrl, showUserProfile } from '../utils'

const { data } = defineProps({
    data: Object,
})

const hire = ref(null);

onMounted(()=>{

    if (data.hire) 
    {
        hire.value = {
            description: toHtml(data.hire.description),
            contact: data.hire.contact,
            skills_vvvv: toHtml(data.hire.skills_vvvv),
            skills_other: toHtml(data.hire.skills_other),
            image: data.hire.image ? createAssetUrl(data.hire.image) : null,
            availableFor: data.hire.availableFor
                ? data.hire.availableFor.map(item => item.AvailableFor_Options_id ? item.AvailableFor_Options_id.value : "")
                : []
        }
    }
})

</script>

<template>
    <template v-if="hire">
        <div class="card mb-5" @click="(event)=>showUserProfile(data.username, event)">
            <div class="imageContainer">
                <img v-if="hire.image" :src="hire.image" class="card-img-top" :alt="data.username" />
            </div>
            <div class="card-body">
                <h4 class="card-title">{{ data.username }}</h4>
                <p class="card-text"> {{ data.title }}</p>
                <template v-if="hire.availableFor.length > 0">
                    <p class="py-0 mb-2 text-muted font-weight-bold" style="font-variant-caps: all-small-caps;"><b>Available for</b></p>
                    <NSpace>
                        <NTag class="mr-2" v-for="t in hire.availableFor" :bordered="false">{{ t }}</NTag>
                    </NSpace>
                </template>
            </div>
        </div>
    </template>
</template>