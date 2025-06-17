<script setup>
import { NAvatar, NIcon } from "naive-ui"

const props = defineProps(['src']);

</script>

<template>
    <NIcon style="cursor: 'pointer';">
        <NAvatar round :size="48" :src="props.src" objectFit="contain"/>
    </NIcon>
</template>