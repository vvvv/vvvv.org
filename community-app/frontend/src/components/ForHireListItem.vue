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

const imageParams = "?withoutEnlargement=true&quality=90&fit=cover&width=256";

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
            image: data.hire.image ? createAssetUrl(data.hire.image)+imageParams : null,
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
        <tr @click="(event)=>showUserProfile(hire.username, event)">
            <td>
                <img v-if="hire.image" :src="hire.image" :alt="hire.username || hire.name" />
                <div v-else class="imgDefault"></div>
            </td>
            <td>
                <p><strong>{{ hire.name || hire.username }}</strong></p>
                <p v-if="hire.name && hire.username" class="username"> {{ hire.username }}</p>
            </td>
            <td>
                <NPerformantEllipsis v-if="hire.skills_vvvv" line-clamp="3" :tooltip=false>
                    <span v-html="hire.skills_vvvv" class="text"></span>
                </NPerformantEllipsis>
                <p v-else> - - - </p>
                <div v-if="hire.availableFor.length > 0" class="tags">
                    <NTooltip trigger="hover" placement="top-start">
                        <template #trigger>
                            <div>
                                <NTag v-for="t in hire.availableFor" :bordered="false" class="mr-2">{{ t }}</NTag>
                            </div>
                        </template>
                        Available for
                    </NTooltip>
                </div>
            </td>
            <td>
                <Location :location="hire.location"/>
            </td>
        </tr>
    </template>
</template>