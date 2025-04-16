<script setup>
import { defineModel } from 'vue'

const { label } = defineProps(['id', 'label']);
const model = defineModel('value');

</script>
<template>
    <div class="col">
        <label for="{{ id }}" class="col-sm-2 col-form-label">{{ label }}</label>
        <Input v-model="model" :id="id" class="form-control"/>
    </div>
</template>