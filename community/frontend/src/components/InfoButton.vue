<script setup>
import { NTooltip, NButton, NIcon } from 'naive-ui'
import { InformationCircle } from '@vicons/ionicons5'

const { info } = defineProps(['info']) 
</script>

<template>
<n-tooltip trigger="hover" placement="top">
    <template #trigger>
        <n-button quaternary circle size="tiny" style="margin-left: 4px;">
        <template #icon>
            <n-icon>
                <InformationCircle />
            </n-icon>
        </template>
        </n-button>
    </template>
    <span>{{ info }}</span>
</n-tooltip>
</template>