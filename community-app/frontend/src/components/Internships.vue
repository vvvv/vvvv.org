<script setup>
import { computed } from "vue";
import { NIcon } from 'naive-ui';
import { CheckmarkCircle } from '@vicons/ionicons5';
import { ensureHttps } from '../utils.js'

const props = defineProps(['data', 'text', 'isLink']);

const link = computed(()=>{
    return ensureHttps(props.data.contact_url || props.data.social?.website);
})

</script>
<template>
    <div v-if="data.internships" class="internship">
        <template v-if="isLink">
            <a :href="link" taret="_blank">
                <NIcon size="1.2rem" color="black" class="mr-2">
                    <CheckmarkCircle/>
                </NIcon>{{ text }}
            </a>
        </template>
        <template v-else>
                <NIcon size="1.2rem" color="black" class="mr-2">
                    <CheckmarkCircle/>
                </NIcon>{{ text }}
        </template>
    </div>
</template>