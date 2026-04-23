<script setup>
import { NIcon, NTooltip } from 'naive-ui'
import { SyncSharp } from '@vicons/ionicons5'
</script>
<template>
    <div class="text-right">
        <NTooltip trigger="hover" placement="top">
            <template #trigger>
                <NIcon :size="20" alt="Sync" color="DarkGray" style="cursor: pointer;">
                    <SyncSharp/>
                </NIcon>
            </template>
            Sync
        </NTooltip>
    </div>
</template>