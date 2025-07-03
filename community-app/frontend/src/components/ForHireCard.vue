<script setup>

import { ref, computed, onMounted } from 'vue'
import { NTag, NSpace, NPerformantEllipsis, NTooltip } from 'naive-ui'
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
            username: data.username,
            name: data.name,
            description: toHtml(data.hire.description),
            contact: data.hire.contact,
            skills_vvvv: toHtml(data.hire.skills_vvvv),
            skills_other: toHtml(data.hire.skills_other),
            image: data.hire.image ? createAssetUrl(data.hire.image) : null,
            location: data.location,
            availableFor: data.hire.availableFor
                ? data.hire.availableFor.map(item => item.AvailableFor_Options_id ? item.AvailableFor_Options_id.value : "")
                : []
        }
    }
})

</script>

<template>
    <template v-if="hire">
        <div class="card h-100" @click="(event)=>showUserProfile(hire.username, event)">
            <div class="imageContainer">
                <img v-if="hire.image" :src="hire.image" class="card-img-top" :alt="hire.username" />
            </div>
            <div class="card-body">
                <h4 class="card-title">{{ hire.name || hire.username }}</h4>
                <p class="card-text text-muted" v-if="hire.name">{{ hire.username }}</p>
                <NPerformantEllipsis v-if="hire.skills_vvvv" line-clamp="3" :tooltip=false class="card-text">
                    <span v-html="hire.skills_vvvv"></span>
                </NPerformantEllipsis>
                <div v-if="hire.availableFor.length > 0" class="mt-3 card-text">
                    <NTooltip trigger="hover" placement="top-start">
                        <template #trigger>
                            <div>
                                <NTag v-for="t in hire.availableFor" :bordered="false" class="mr-2">{{ t }}</NTag>
                            </div>
                        </template>
                        Available for
                    </NTooltip>
                </div>
            </div>
            <Location :location="hire.location" class="card-footer"/>
        </div>
    </template>
</template>