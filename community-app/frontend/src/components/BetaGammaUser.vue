<script setup>

defineProps(['data']);

</script>

<template>
    <div class="joined border-top pt-3">
        <p class="joined mb-2">Using</p>
        <div v-if="data.beta">vvvv beta since <b>{{ data.beta }}</b></div>
        <div v-if="data.gamma">vvvv gamma since <b>{{ data.gamma }}</b></div>
    </div>
</template>