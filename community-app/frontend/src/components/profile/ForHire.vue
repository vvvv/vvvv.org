<script setup>
import { ref, watch, onMounted, computed, onBeforeUnmount } from 'vue'
import Constants from '../../constants'
import SubmitRevertButtons from './SubmitRevertButtons.vue'
import FieldEditor from './FieldEditor.vue'
import FileUploader from './FileUploader.vue'
import Editor from './Editor.vue'
import { clone, post, toHtml, toMd, removeFile, createAssetUrl, showUserProfile }  from '../../utils'
import { NButton, NAlert, NSelect, NTag, NFlex, NRow, NCol, NSwitch, NForm, NFormItemGi, NRadioButton, NRadioGroup, NFormItem, NInput } from 'naive-ui'

const emit = defineEmits(['reload', 'message', 'updateData']);

const { data, constants } = defineProps(['data', 'constants']);
const hireOptions = ref([]);
const isChanged = ref(false);
const form = ref(null);
const formRef = ref(null);
const formRef2 = ref(null);
const formImage = ref(null);
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

const submitVisible = async ()=>{
  const body = 
  {
    available: form.value.available
  }

  try {
    updating.value = true;
    const response = await post(Constants.EDIT_HIRE, body);

    if (response.result == 'Updated')
    {
      data.hire.available = form.value.available;

      emit('updateData', data);
      emit('message', { type: 'success', string: response.result});
    }
  }
  catch (error) {
    emit('message', { type: 'error', string: 'Ooops. Something has happened on update'});
  }
  finally {
    updating.value = false;
  }
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
  <template v-if="form !== null">

    <div class="row justify-content-between">
      <div class="col-12 col-sm-8">
          <label class="text-nowrap mr-3">Available for Hire</label>
          <n-switch v-model:value="form.available" placeholder="Available for Hire" @update:value="submitVisible"/>
      </div>
      <div class="col-12 col-sm-4 text-sm-right" v-if="form.available && data.user.visible">
        <a :href="'/user/'+data.user.username" @click="(event) => showUserProfile(data.user.username, event)">Open Public Profile</a>
      </div>
    </div>

    <hr class="mt-1 mb-4"/>

    <n-form
        ref="formImage"
        :model="form"
        label-placement="left"
        :label-width="150"
        require-mark-placement="right-hanging"
        >
        <n-form-item label="Image">
          <div class="container mx-0 px-0">
            <div class="row">
              <div class="col-6" v-if="image !== null">
                <img :src="image" class="img-fluid"/>
              </div>
              <div class="col-auto">
                <FileUploader :buttonText="imageButtonText" @change="updateTempImage" folder="hire" ref="uploader" type="hire"/>
                <NButton @click="removeImage" v-if="image !== null">Remove Image</NButton>
                <NAlert v-if="tempImage" title="Uploaded" type="success">
                    Press 'Submit' below to update the Image.
                </NAlert>
              </div>
            </div>
          </div>
        </n-form-item>
    </n-form>

    <n-form
        ref="formRef2"
        :model="form"
        label-placement="left"
        :label-width="150"
        require-mark-placement="right-hanging"
        >
      <n-form-item label="Description">
        <Editor v-model="form.description" class="fullWidth" :limit="limit"/>
      </n-form-item>
      <n-form-item label="VVVV skills">
        <Editor v-model="form.skills_vvvv" class="fullWidth" :limit="limit"/>
      </n-form-item>
      <n-form-item label="Other skills">
        <Editor v-model="form.skills_other" class="fullWidth" :limit="limit"/>
      </n-form-item>

      <div class="form-group row mb-2">
        <label class="col-sm-2 col-form-label">Available for</label>
        <div class="col-sm-10">
          <n-select v-model:value="form.availableFor" multiple :options="hireOptions" />
        </div>
      </div>
    </n-form>
    <SubmitRevertButtons @revert="prepareData" @submit="submit" :updating="updating"/>
  </template>
</template>