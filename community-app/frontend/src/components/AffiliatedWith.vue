<script setup>
import { NIcon, NTooltip } from 'naive-ui';
import { PersonCircleOutline } from '@vicons/ionicons5'
import { toHtml, showBusinessProfile, showEduProfile } from '../utils.js'

defineProps(['data']);

function click(item){
    item.isEdu ? showEduProfile(item.slug) : showBusinessProfile(item.slug)
}

</script>
<template>
    <div>
        <p class="text-muted mb-1 border-top pt-3 smallTitle">Affiliated with</p>
        <div v-for="item in data" class="mb-2">
            <NTooltip trigger="hover" :disabled="!item.role" placement="top-start">
                <template #trigger>
                    <a :href="item.link" @click.prevent="click(item)">{{ item.name }}</a>
                </template>
                {{ item.role }}
            </NTooltip>
        </div>
    </div>
</template>