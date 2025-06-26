<script setup>
import { NTooltip, NIcon } from 'naive-ui'
import { InformationCircle } from '@vicons/ionicons5'

const { info } = defineProps(['info']) 
</script>

<template>
<n-tooltip trigger="hover" placement="top">
    <template #trigger>
        <n-icon>
            <InformationCircle />
        </n-icon>
    </template>
    <span>{{ info }}</span>
</n-tooltip>
</template>