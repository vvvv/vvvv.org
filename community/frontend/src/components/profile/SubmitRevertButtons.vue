<script setup>
import { computed } from 'vue'
import { NButton, NRow, NCol } from 'naive-ui'

const { ml = 100 } = defineProps({ ml: Number});

const style = computed(()=>{
  return `margin-left: ${ml}px`;
});

const emit = defineEmits(['submit', 'revert'])

</script>

<template>
  <div class="row" :style="style">
    <div class="col-6 col-md-2 mb-2">
      <n-button @click="emit('submit')" :disabled="updating" type="primary">
        Submit
      </n-button>
    </div>
    <div class="col-6 col-md-2">
      <n-button @click="emit('revert')" :disabled="updating">
        Revert
      </n-button>
    </div>
  </div>
</template>