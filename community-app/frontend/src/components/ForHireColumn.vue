<script setup>
import { NIcon } from "naive-ui"
import { CheckmarkCircle } from '@vicons/ionicons5'

const props = defineProps(['value']);

</script>

<template>
    <NIcon v-if="props.value" color="black" size="20">
        <CheckmarkCircle/>
    </NIcon>
</template>