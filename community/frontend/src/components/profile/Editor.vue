<script setup>
import { ref, watch, onMounted, defineModel } from 'vue'
import { toHtml, toMd } from '../../utils.js'
import { NInput } from 'naive-ui';

const editorContainer = ref(null);

const emit = defineEmits(['update'])
const { id, limit } = defineProps (['id', 'limit'])

const count = ref(0)
const model = defineModel()
const html = ref('')
const field = ref(null)

onMounted(async ()=>{

    html.value = toHtml(model.value);

    if (limit != 0)
    {
      count.value = Math.max (limit - model.value,0);
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
  html.value = model.value ? toHtml(model.value) : "Preview"
})

</script>

<template>
    <div class="row">
      <div class="col px-0 ml-3">
        <n-input type="textarea" :maxlength="limit" v-model:value="model" show-count clearable class="field-input"/>
      </div>
        <div class="col overflow-auto rounded field-preview py-1 text-muted" v-html="html">
      </div>
    </div>
</template>