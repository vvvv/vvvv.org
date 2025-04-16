<script setup>
import { ref, watch, onMounted, computed, onBeforeUnmount } from 'vue'
import Constants from '../../constants'
import SubmitRevertButtons from './SubmitRevertButtons.vue'
import FieldEditor from './FieldEditor.vue'
import FileUploader from './FileUploader.vue'
import Editor from './Editor.vue'
import { clone, post, toHtml, toMd, removeFile, createAssetUrl }  from '../../utils'
import { NButton, NSelect, NTag, NFlex, NRow, NCol, NSwitch, NForm, NFormItemGi, NRadioButton, NRadioGroup, NFormItem, NInput } from 'naive-ui'

const emit = defineEmits(['reload', 'message', 'updateData']);

const { data, constants } = defineProps(['data', 'constants']);
const hireOptions = ref([]);
const isChanged = ref(false);
const form = ref(null);
const formRef = ref(null);
const formRef2 = ref(null);
const updating = ref(false);
const limit = 500;
const uploader = ref(null);
const tempImage = ref(null);
const image = ref (null);

const prepareData = () =>{
  const temp = clone(data);
  form.value = temp.hire;
  hireOptions.value = constants.hireOptions;

  if (temp.hire?.image)
  {
    image.value = createAssetUrl(temp.hire.image)
  }
}

const updateTempImage = (id) =>{
  if (id !== null)
  {
    emit('message', { type: 'success', string: 'New image uploaded'})
  }

  tempImage.value = id
}

const submit = async () => {

  updating.value = true
  const formValue = clone(form.value)
  
  if (tempImage.value !== null)
  {
    formValue.image = tempImage.value
  }
  else
  {
    delete formValue.image
  }

  try{
    const response = await post(Constants.EDIT_HIRE, formValue)

    if (response.result == 'Updated')
    {
      // Update Data
      data.hire = formValue

      if (tempImage.value !== null)
      {
        image.value = createAssetUrl(tempImage.value)
        form.value.image = tempImage.value
        tempImage.value = null
      }

      if (uploader.value)
      {
        uploader.value.reset() 
      }

      emit('updateData', data)
      emit('message', { type: 'success', string: 'Updated'})
    }
  }
  catch (error) {
    emit('message', { type: 'error', string: 'Ooops. Something has happened on update'})
  }
  finally{
    updating.value = false
  }
}

onMounted(async ()=>{
  prepareData();
})

const removeImage = async () => {

  const result = await removeFile(form.value.image);

  image.value = null;
  tempImage.value = null;

  if (result)
  {
    emit('message', { type: 'success', string: 'Image removed'})
  }
  else
  {
    emit('message', { type: 'error', string: 'Ooops. Something has happened'})
  }
}

const handleChange = () => {
  isChanged.value = true
}

const imageButtonText = computed(()=>{
  return image.value !== null ? "Upload new" : "Upload" 
})

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

  <hr class="mt-1 mb-3"/>

  <div class="form-group row mb-2">
      <label class="col-sm-2 col-form-label">Image</label>
      <div class="col-sm-10">
        <div class="row">
          <div class="col-6" v-if="image !== null">
            <img :src="image" class="img-fluid"/>
          </div>
          <div class="col-6">
            <FileUploader :buttonText="imageButtonText" @change="updateTempImage" folder="hire" ref="uploader"/>
            <NButton @click="removeImage" v-if="image !== null">Remove Image</NButton>
          </div>
        </div>
      </div>
  </div>

  <n-form
      v-if="form !== null"
      ref="formRef2"
      :model="form"
      label-placement="left"
      :label-width="160"
      require-mark-placement="right-hanging"
      >
    <FieldEditor v-model="form.description" id="description" label="Description" :limit="limit"/>
    <FieldEditor v-model="form.skills_vvvv" id="vvvv_skills" label="VVVV skills" :limit="limit"/>
    <FieldEditor v-model="form.skills_other" id="other_skills" label="Other skills" :limit="limit"/>

    <div class="form-group row mb-2">
      <label class="col-sm-2 col-form-label">Available for</label>
      <div class="col-sm-10">
        <n-select v-model:value="form.availableFor" multiple :options="hireOptions" />
      </div>
    </div>
  </n-form>
  <SubmitRevertButtons @revert="prepareData" @submit="submit"/>
</template>