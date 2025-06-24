<script setup>
import { ref } from "vue";
import { getValue } from "./HelpTexts.js"
import { NFormItem } from 'naive-ui'
import InfoButton from '../InfoButton.vue'
import { isString } from '../../utils.js'

const props = defineProps(['path','type']);

const help = ref(getValue(props.path, "help", props.type));
const label = ref(getValue(props.path, "label", props.type));

</script>
<template>
    <n-form-item :label="label" :path="path">
        <template #label v-if="label">
            {{ label }}
            <InfoButton v-if="help" :info="help"/>
        </template>
        <slot name="content"></slot>
    </n-form-item>
</template>