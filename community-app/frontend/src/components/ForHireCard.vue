<script setup>

import { ref, computed, onMounted } from 'vue'
import { NTag, NSpace, NPerformantEllipsis } from 'naive-ui'
import { toHtml, createAssetUrl, showUserProfile } from '../utils'
import Location from './Location.vue';
import ClippedText from './ClippedText.vue';

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
                <NPerformantEllipsis line-clamp="3" tooltip=false>
                    <span v-html="hire.skills_vvvv"></span>
                </NPerformantEllipsis>
                <div v-if="hire.availableFor.length > 0" class="mt-2">
                    <NSpace>
                        <NTag v-for="t in hire.availableFor" :bordered="false">{{ t }}</NTag>
                    </NSpace>
                </div>
                <Location :location="data.location" class="border-top pt-2 mt-3"/>
            </div>
        </div>
    </template>
</template>