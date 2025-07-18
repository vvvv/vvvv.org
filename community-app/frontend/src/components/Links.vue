<script setup>
import { ref, computed } from 'vue'
import { ensureHttps } from '../utils.js'

const props = defineProps(['data']);

const links=ref([
    {   
        name: "Contact",
        url: ensureHttps(props.data.contact_url)
    },
    {
        name: "Projects",
        url: ensureHttps(props.data.projects_url)
    },
    {
        name: "Jobs",
        url: ensureHttps(props.data.jobs_url)
    }
])

const exists = computed(()=>{
    return links.value.some( link => link.url != null || "");
})

</script>
<template>
    <div class="mb-3 pt-2 border-top" v-if="exists">
        <p class="text-muted mb-2 smallTitle">Direct links</p>
        <template v-for="link in links" :key="link.name">
            <p v-if="link.url" class="mb-1">
                <a :href="link.url" target="_blank">{{ link.name }}</a>
            </p>
        </template>
    </div>
</template>