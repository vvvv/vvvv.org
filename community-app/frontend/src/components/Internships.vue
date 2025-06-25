<script setup>
import { NIcon } from 'naive-ui';
import { CheckmarkCircle } from '@vicons/ionicons5';

defineProps(['data']);

</script>
<template>
    <div v-if="data">
        <NIcon size="1.2rem" color="green" class="mr-2">
            <CheckmarkCircle/>
        </NIcon>
        Accepting internship applications
    </div>
</template>