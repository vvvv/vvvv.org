<script setup>
import { ref } from "vue"
import { NFormItem, NInput } from 'naive-ui'
import InfoButton from "./InfoButton.vue"
import { getValue } from "./profile/HelpTexts.js"
import { isString } from '../utils.js'

const model = defineModel();
const props = defineProps(['path', 'type']);

const help = ref(getValue(props.path, "help", props.type));
const label = ref(getValue(props.path, "label", props.type));
const placeholder = ref(getValue(props.path, "placeholder", props.type));

console.log (props.path);
console.log (props.type);

console.log (`${help.value} ${label.value} ${placeholder.value}`)

</script>

<template>
    <n-form-item :path="path">
        <template #label v-if="label">
            {{ label }}
            <InfoButton v-if="help" :info="help"/>
        </template>
            <n-input v-model:value="model" :placeholder="placeholder"/>
    </n-form-item>
</template>