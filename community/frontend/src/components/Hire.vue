<script setup>
import { ref, watch, onMounted, computed, onBeforeUnmount } from 'vue'
import Constants from '../constants'
import SubmitRevertButtons from './SubmitRevertButtons.vue'
import Editor from './Editor.vue'
import { clone, post }  from '../utils'
import { NButton, NSelect, NTag, NFlex, NRow, NCol, NSwitch, NForm, NFormItemGi, NRadioButton, NRadioGroup, NFormItem, NInput } from 'naive-ui'

const emit = defineEmits(['reload', 'message', 'updateData'])

const { data, constants } = defineProps(['data', 'constants'])
const hireOptions = ref([])
const isChanged = ref(false)
const form = ref(null)
const formRef = ref(null)
const formRef2 = ref(null)
const updating = ref(false)

const prepareData = () =>{
  const temp = clone(data)
  form.value = temp.hire
  hireOptions.value = constants.hireOptions
}

const submit = async () => {

  updating.value = true
  const formValue = clone(form.value)

  post(Constants.EDIT_HIRE, formValue)
  .then((response)=>{
    if (response.result == 'Updated')
    {
      // Update Data
      data.hire = formValue
      emit('updateData', data)
      emit('message', { type: 'success', string: 'Updated'})
    }
  })
  .catch((error)=>{
    emit('message', { type: 'error', string: 'Ooops. Something has happened on update'})
  })
  .finally(()=>{
    updating.value = false
  })
}

onMounted(async ()=>{
  prepareData();
})

const handleChange = () => {
  isChanged.value = true
}

</script>

<template>
  <n-form
      v-if="form !== null"
      ref="formRef"
      :model="form"
      label-placement="left"
      :label-width="160"
      require-mark-placement="right-hanging"
      >
    <n-form-item label="Available for Hire" path="available">
      <n-switch v-model:value="form.available" placeholder="Available for Hire"/>
    </n-form-item>
  </n-form>
  <n-form
      v-if="form !== null"
      ref="formRef2"
      :model="form"
      label-placement="left"
      :label-width="160"
      require-mark-placement="right-hanging"
      :disabled="!form.available"
      >
    <n-form-item label="Description" path="description">
      <Editor v-model="form.description"/>
    </n-form-item>
    <n-form-item label="VVVV skills" path="vvvv_skills">
      <Editor v-model="form.vvvv_skills"/>
    </n-form-item>
    <n-form-item label="Other skills" path="other_skills">
      <Editor v-model="form.other_skills"/>
    </n-form-item>
    <n-form-item label="Available for" path="availableFor">
      <n-select v-model:value="form.availableFor" multiple :options="hireOptions" />
    </n-form-item>
  </n-form>
  <SubmitRevertButtons @revert="prepareData" @submit="submit"/>
</template>