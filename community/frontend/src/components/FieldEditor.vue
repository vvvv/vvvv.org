<script setup>
import { defineModel } from 'vue'
import Editor from './Editor.vue'

const { label } = defineProps(['id', 'label'])
const model = defineModel()

</script>
<template>
    <div class="form-group row">
        <label for="{{ id }}" class="col-sm-2 col-form-label">{{ label }}</label>
        <div class="col-sm-10">
            <Editor v-model="model" :id="id"/>
        </div>
    </div>
</template>