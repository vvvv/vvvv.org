<script setup>
import { computed } from 'vue'
import { NButton } from 'naive-ui'

const { updating = false } = defineProps({ updating: Boolean});

const emit = defineEmits(['submit', 'revert'])

const buttonLabel = computed(()=>
  updating ? 'Updating...' : 'Submit'
);

const style="margin-left: 150px;"

</script>

<template>
  <div class="d-flex" :style="style">
    <NButton @click="emit('submit')" :disabled="updating" type="primary" class="mr-5">
      {{ buttonLabel }}
    </NButton>
    <NButton @click="emit('revert')" :disabled="updating">
      Revert
    </NButton>
  </div>
</template>