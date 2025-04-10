<script setup>
import { ref, onMounted, defineModel } from 'vue'
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill's Snow theme CSS

const editorContainer = ref(null);
let quill = null;

const emit = defineEmits(['update'])
const { id } = defineProps (['id'])

const model = defineModel()

onMounted(async ()=>{
    quill = new Quill(editorContainer.value, {
          theme: 'snow', // Use the 'snow' theme
          modules: {
            toolbar: [
              ['bold', 'italic'], // Text formatting
              [{ list: 'bullet' }], // Lists
              ['link'], // Links and images
            ],
          },
        });

        quill.root.innerHTML = model.value
  
        // Listen for text changes and emit updates
        quill.on('text-change', () => {
          model.value = quill.root.innerHTML
        });
  })
</script>

<template>
    <div>
        <div ref="editorContainer" style="z-index: 1000;" :id="id"></div>
    </div>
</template>