<script setup>
import { ref, watch, onMounted, defineModel } from 'vue'
import { toHtml, toMd } from '../../utils.js'
import { NInput } from 'naive-ui';

const editorContainer = ref(null);
let quill = null;

const emit = defineEmits(['update'])
const { id, limit } = defineProps (['id', 'limit'])

const count = ref(0)
const model = defineModel()
const html = ref('')
const field = ref(null)

onMounted(async ()=>{

    html.value = toHtml(model.value)

    if (limit != 0)
    {
      count.value = Math.max (limit - model.value,0)
    }

    if (field.value)
    {
      field.value.addEventListener('keydown', function(event) {
          if (model.value.length > limit && event.key !== 'Backspace' && event.key !== 'Delete') {
            event.preventDefault();
          }
      })
    }
})

watch (model, (newValue)=>{
  html.value = toHtml(model.value)
})

</script>

<template>
    <div class="row">
      <div class="col">
        <n-input type="textarea" :maxlength="limit" v-model:value="model" show-count clearable rows="5"/>
      </div>
      <div class="col overflow-auto border rounded field-preview py-1" v-html="html" style="max-height: 200px;">
      </div>
    </div>
</template>