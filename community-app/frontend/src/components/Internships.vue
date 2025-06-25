<script setup>
import { NIcon } from 'naive-ui';
import { CheckmarkCircle } from '@vicons/ionicons5';

defineProps(['data', 'text']);

</script>
<template>
    <div v-if="data" class="location">
        <NIcon size="1.2rem" color="green" class="mr-2">
            <CheckmarkCircle/>
        </NIcon>
        {{ text }}
    </div>
</template>