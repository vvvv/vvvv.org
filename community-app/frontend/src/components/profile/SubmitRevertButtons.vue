<script setup>
import { computed } from 'vue'
import { NButton } from 'naive-ui'

const { updating = false, messageContainer } = defineProps({
   updating: { type: Boolean },
  //  messageContainer: { type: Object, required: true}
});

const emit = defineEmits(['submit', 'revert'])

const buttonLabel = computed(()=>
  updating ? 'Updating...' : 'Submit'
);

</script>

<template>
  <div class="d-flex">
    <NButton @click="emit('submit')" :disabled="updating" type="primary" class="mr-3">
      {{ buttonLabel }}
    </NButton>
    <NButton @click="emit('revert')" :disabled="updating" class="mr-3">
      Revert Changes
    </NButton>
    <div class="messages" ref="messageContainer"></div>
  </div>
</template>