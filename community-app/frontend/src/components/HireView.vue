<script setup>
import { computed } from 'vue'
import { NTag, NSpace } from 'naive-ui'
import { toHtml, createAssetUrl } from '../utils'
import ClippedText from '../components/ClippedText.vue'

const { data, contact } = defineProps({ data: Object, contact: String })

const imageParams = "?withoutEnlargement=true&quality=90&fit=cover&width=720";

const hire = computed(()=>{

    if (!data) {
        return {}
    }

    return {
        description: toHtml(data.description),
        contact: data.contact,
        skills_vvvv: toHtml(data.skills_vvvv),
        skills_other: toHtml(data.skills_other),
        image: data.image ? createAssetUrl(data.image)+imageParams : null,
        availableFor: data.availableFor
            ? data.availableFor.map(item => item.AvailableFor_Options_id ? item.AvailableFor_Options_id.value : "")
            : []
    }
}) 

</script>

<template>
    <div class="card-body">
        <img v-if="hire.image" :src="hire.image" class="img-fluid pt-2 mb-4"/>
        <p v-if="hire.description" class="card-text" v-html="hire.description"></p>
        <div class="row">
            <div class="col-12 col-lg-6" v-if="hire.skills_vvvv">
                <div class="pr-lg-2">
                    <p class="py-0 mb-0 text-muted font-weight-bold" style="font-variant-caps: all-small-caps;"><b>vvvv skills</b></p>
                    <p class="card-text" v-html="hire.skills_vvvv"></p>
                </div>
            </div>
           <div class="col-12 col-lg-6" v-if="hire.skills_other">
                <div class="pl-lg-2">
                    <p class="py-0 mb-0 text-muted font-weight-bold" style="font-variant-caps: all-small-caps;"><b>other skills</b></p>
                    <p class="card-text" v-html="hire.skills_other"></p>
                </div>
            </div>
        </div>
        <template v-if="hire.contact">
            <p class="py-0 mb-0 text-muted font-weight-bold" style="font-variant-caps: all-small-caps;"><b>contact</b></p>
            <p class="card-text">{{ hire.contact }}</p>
        </template>
        <template v-if="hire.availableFor.length > 0">
            <p class="py-0 mb-2 text-muted font-weight-bold" style="font-variant-caps: all-small-caps;"><b>Available for</b></p>
            <NSpace>
                <NTag class="mr-2" v-for="t in hire.availableFor" :bordered="false">{{ t }}</NTag>
            </NSpace>
        </template>
    </div>
</template>