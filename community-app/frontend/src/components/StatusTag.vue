<script setup>
import { NSelect, NTag, NSwitch, NForm, NFormItem, NInput, NAlert } from 'naive-ui'

defineProps(['value'])

const status = [
    "Submitted for review",
    "Confirmed",
    "Suspected spam. Please get in touch via devvvvs@vvvv.org to clarify"
]

</script>

<template>
    <n-form-item label="Status" path="status" v-if="value && value != '1'">
        <n-tag :bordered="false" type="warning" v-if="value == '0'">{{ status[0] }}</n-tag>
        <n-tag :bordered="false" type="error" v-if="value == '2'">{{ status[2] }}</n-tag>
    </n-form-item>
</template>