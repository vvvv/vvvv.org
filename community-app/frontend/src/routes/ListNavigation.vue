<script setup>
import { computed, ref } from 'vue'
import { ChevronDown } from '@vicons/ionicons5'
import { NButton, NButtonGroup, NDropdown, NIcon, NTab, NTabPane, NTabs } from 'naive-ui'

const props = defineProps(['selected', 'sections']);
const emit = defineEmits (['select', 'logout']);

</script>

<template>
    <div class="">
        <NTabs :value="selected" type="segment" animated @update:value="(key)=>emit('select', key)">
            <NTabPane v-for="section in sections" :name="section.key" :tab="section.label" :key="section.key"/>        
        </NTabs>
    </div>
</template>
