<script setup>

defineProps(['data']);

</script>

<template>
    <div class="joined border-top pt-3">
        <p class="joined mb-2">Using:</p>
        <div v-if="data.beta">beta since <b>{{ data.beta }}</b></div>
        <div v-if="data.gamma">gamma since <b>{{ data.gamma }}</b></div>
    </div>
</template>