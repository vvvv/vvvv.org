<script setup>
import { ref } from "vue"
import { NFormItem, NInput } from 'naive-ui'
import InfoButton from "./InfoButton.vue"
import { getValue } from "./profile/HelpTexts.js"
import { isString } from '../utils.js'

const model = defineModel();
const props = defineProps(['path', 'type', 'disabled']);

const help = ref(getValue(props.path, "help", props.type));
const label = ref(getValue(props.path, "label", props.type));
const placeholder = ref(getValue(props.path, "placeholder", props.type));

</script>

<template>
    <n-form-item :path="path">
        <template #label v-if="label">
            {{ label }}
            <InfoButton v-if="help" :info="help"/>
        </template>
        <template #default>
            <n-input v-model:value="model" :placeholder="placeholder" :disabled="disabled"/>
        </template>
    </n-form-item>
</template>