<script setup>
import { NButton, NRow, NCol } from 'naive-ui'

const emit = defineEmits(['submit', 'revert'])

</script>

<template>
  <div class="row">
    <div class="col-2">
      <n-button @click="emit('submit')" :disabled="updating" type="primary">
        Submit
      </n-button>
    </div>
    <div class="col-1">
      <n-button @click="emit('revert')" :disabled="updating">
        Revert
      </n-button>
    </div>
  </div>
</template>