<script setup>
import { computed } from 'vue'
import { NTag, NSpace } from 'naive-ui'
import { toHtml, createAssetUrl } from '../../utils'

const { data, contact } = defineProps({ data: Object, contact: String })

// Use image as is or set the params to control how to transform it before download
// "?withoutEnlargement=true&quality=90&fit=cover&width=512"
const imageParams = "";

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
        <div class="row">
            <div class="col-12 col-lg-6" v-if="hire.image">
                <img :src="hire.image" class="img-fluid pt-2 mb-2"/>
            </div>
            <hr class="d-lg-none mt-3 mt-lg-0"/>
            <div class="col-12 col-lg-6">
                <p class="card-text" v-html="hire.description"></p>
                <template v-if="hire.skills_vvvv">
                    <p class="py-0 mb-0 text-muted font-weight-bold" style="font-variant-caps: all-small-caps;"><b>vvvv skills</b></p>
                    <p class="card-text" v-html="hire.skills_vvvv"></p>
                </template>
                <template v-if="hire.skills_other">
                    <p class="py-0 mb-0 text-muted font-weight-bold" style="font-variant-caps: all-small-caps;"><b>other skills</b></p>
                    <p class="card-text" v-html="hire.skills_other"></p>
                </template>
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
        </div>
    </div>
</template>