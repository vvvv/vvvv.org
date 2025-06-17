<script setup>
import { NIcon } from "naive-ui"
import { CheckmarkCircle } from '@vicons/ionicons5'

const props = defineProps(['value']);

</script>

<template>
    <NIcon v-if="props.value" color="#0e7a0d" size="20">
        <CheckmarkCircle/>
    </NIcon>
</template>