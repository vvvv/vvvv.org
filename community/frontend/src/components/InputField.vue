<script setup>
import { NFormItem, NInput } from 'naive-ui';
import InfoButton from "./InfoButton.vue";

const model = defineModel();
const { path, placeholder, label, info } = defineProps(['path', 'placeholder', 'label', 'info']);

</script>

<template>
    <n-form-item :path="path">
        <template #label v-if="label !== ''">
            {{ label }}
            <InfoButton v-if="info !== ''" :info="info"/>
        </template>
            <n-input v-model:value="model" :placeholder="placeholder"/>
    </n-form-item>
</template>