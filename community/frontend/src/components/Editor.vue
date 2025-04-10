<script setup>
import { ref, onMounted, defineModel } from 'vue'
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill's Snow theme CSS

const editorContainer = ref(null);
let quill = null;

const emit = defineEmits(['update'])
const { id, limit } = defineProps (['id', 'limit'])

const count = ref(0)
const model = defineModel()

onMounted(async ()=>{

    count.value = limit || 0

    quill = new Quill(editorContainer.value, {
          theme: 'snow', // Use the 'snow' theme
          modules: {
            toolbar: [
              [{ list: 'bullet' }], // Lists
              ['link'], // Links and images
            ],
          },
        });

        quill.root.innerHTML = model.value
  
        // Listen for text changes and emit updates
        quill.on('text-change', () => {
          if (limit != 0) {
            count.value = Math.max(limit - quill.getLength(), 0)
          }
          model.value = quill.root.innerHTML
        });

        quill.root.addEventListener('keydown', function(event) {
          if (quill.getLength() > limit && event.key !== 'Backspace' && event.key !== 'Delete') {
            event.preventDefault();
          }
        })
  })
</script>

<template>
    <div>
        <div ref="editorContainer" style="z-index: 1000;" :id="id"></div>
        <div class="" v-if="limit != 0">Limit: {{count}}</div>
    </div>
</template>