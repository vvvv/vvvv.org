<script setup>
import { NButton, NRow, NCol } from 'naive-ui'

const emit = defineEmits(['submit', 'revert'])

</script>

<template>
    <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-start; margin-left: 160px">
            <n-form-item>
              <n-button @click="emit('revert')" :disabled="updating">
                Revert
              </n-button>
              <n-button @click="emit('submit')" :disabled="updating" type="primary">
                Submit
              </n-button>
            </n-form-item>
          </div>
        </n-col>
      </n-row>
</template>