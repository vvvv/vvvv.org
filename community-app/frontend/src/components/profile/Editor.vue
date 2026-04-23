<script setup>
import { ref, watch, onMounted } from 'vue'
import { toHtml, toMd } from '../../utils.js'
import { NInput } from 'naive-ui';
import Helps from "./HelpTexts.js";

const editorContainer = ref(null);

const emit = defineEmits(['update'])
const { limit } = defineProps (['limit'])

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
  <div class="container">
    <div class="row">
      <div class="col px-0 d-flex">
        <n-input type="textarea" :maxlength="limit" v-model:value="model" rows=3 show-count clearable placeholder="Markdown allowed!" />
      </div>
        <div class="col d-flex overflow-auto rounded field-preview py-1 text-muted bg-light">
          <div v-html="html"></div>
        </div>
    </div>
  </div>
</template>