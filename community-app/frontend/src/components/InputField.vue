<script setup>
import { NFormItem, NInput } from 'naive-ui';
import InfoButton from "./InfoButton.vue";
import Helps from "./profile/HelpTexts.js";

const model = defineModel();
const { path, placeholder, label, info } = defineProps(['path', 'placeholder', 'label', 'info']);

</script>

<template>
    <n-form-item :path="path">
        <template #label v-if="label !== ''">
            {{ label }}
            <InfoButton v-if="Helps[path]" :info="Helps[path]"/>
        </template>
            <n-input v-model:value="model" :placeholder="placeholder"/>
    </n-form-item>
</template>