<script setup>
import Editor from './Editor.vue'

const { id, label, limit } = defineProps(['id', 'label', 'limit']);
const model = defineModel();

</script>
<template>
    <div class="form-group row">
        <label :for="id" class="col-sm-2 col-form-label">{{ label }}</label>
        <div class="col-sm-10">
            <Editor v-model="model" :id="id" :limit="limit"/>
        </div>
    </div>
</template>