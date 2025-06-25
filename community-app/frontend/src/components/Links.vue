<script setup>
import { ref, computed } from 'vue'
import { NIcon } from 'naive-ui'
import { LocationOutline } from '@vicons/ionicons5'
import { getCountry } from '../utils.js'

const props = defineProps(['data']);

const links=ref([
    {   
        name: "Contact",
        url: props.data.contact_url
    },
    {
        name: "Projects",
        url: props.data.projects_url
    },
    {
        name: "Jobs",
        url: props.data.jobs_url
    }
])

const exists = computed(()=>{
    return links.value.some( link => link.url != null || "");
})

</script>
<template>
    <div class="my-3 pt-2 border-top" v-if="exists">
        <p class="text-muted mb-2">Direct links:</p>
        <template v-for="link in links" :key="link.name">
            <p v-if="link.url" class="mb-1">
                <a :href="link.url">{{ link.name }}</a>
            </p>
        </template>
    </div>
</template>