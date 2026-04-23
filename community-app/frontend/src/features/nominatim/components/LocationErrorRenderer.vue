<script setup>

import { computed } from 'vue'

const props = defineProps({
    error: { type: Object, required: true}
})

const ERROR_MAP = {
    InvalidInput: { message: 'Please correct you input', showRetry: false},
    Network: { message: 'Offline? Check your connection', showRetry: true},
    RateLimit: { message: 'Too many requests to Nominatim service, please wait a moment', showRetry: true},
    Server: { message: 'The Nominatim service is unavailable, try again later', showRetry: true},
    Abort: { message: '', showRetry: false},
}

const emit = defineEmits(['retry']);

const errorContent = computed(()=>{
    const error = props.error;
    if (!error) return { message: '', showRetry: false};

    return ERROR_MAP[error.type] || { message: "Unexpected Error", showRetry: true}
})

</script>

<template>
    <div class="error">
        <p> {{ errorContent.message }}</p>
        <button v-if="errorContent.showRetry" @click="emit('retry')">Retry</button>
    </div>

</template>