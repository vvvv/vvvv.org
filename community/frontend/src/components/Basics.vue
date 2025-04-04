<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import Constants from '../constants'
import { clone, post, submitForm, removeFile, errorHandler, uploadFile }  from '../utils'

import { NButton, NUpload, NFlex, NRow, NCol, NSwitch, NForm, NRadioButton, NRadioGroup, NFormItem, NInput, NModal, NAvatar } from 'naive-ui'

  const emit = defineEmits(['reload'])

  const { data, constants } = defineProps(['data', 'constants'])
  const isChanged = ref(false)
  const formRef = ref(null)
  const form = ref(null)
  const userpic = ref(null)
  const tempUserpic = ref(null)
  const updating = ref(false)


  const prepareData = ()=>{
    form.value = clone(data)
    form.value.status = form.value.status == "1"
    form.value.related = form.value.related[0]
    
    if (form.value.hasOwnProperty('userpic'))
    {
      userpic.value = Constants.ASSETS + form.value.userpic.id;
    }

    var fields = form.value.related.social.fields
    const missingFields = 4 - fields.length
    if (missingFields > 0)
    {
      for (var i=0; i<missingFields; i++)
      {
        fields.push ({key:"", value:""}) 
      }
      form.value.related.social.fields = fields
    }
  }

  const handleFileChange = (data) => {
    console.log (data)

    if (data.file.status != 'removed')
    {
      uploadFile(data.file, tempUserpic);
    }
    else
    {
      removeFile(tempUserpic.value);
    }
  }
  
  onMounted(()=>{
    prepareData()
  })

const handleSuccess = (response, form$) => {
  form$.messageBag.clear() // clear message bag
  form$.messageBag.append('Updated', 'message') // add success message

  emit ('reload')
}

const formChanged = (data)=> {
  isChanged.value = true
}

const revert = ()=>{
  prepareData()
}

const submit = async () => {

  updating.value = true
  const temp  = clone(form.value)
  const social = temp.related.social
  const hire = temp.related.hire
  delete temp.related
  const user = temp

  const data = {
    user: user,
    social: social,
    hire: hire
  }

  post(Constants.EDIT_BASICS, data)
  .then((response)=>{
    console.log (response)
  })
  .catch((error)=>{
    console.log(error)
  })
  .finally(()=>{
    updating.value = false
  })

  // if (FormData.basics.avatar_upload)
  //   {
  //     FormData.basics.userpic = tempUserpic = FormData.basics.avatar_upload.tmp;
  //     delete FormData.basics.avatar_upload
  //   }

  //   var postData = {
  //     basics: FormData.basics,
  //     social: {
  //       nuget: FormData.social.nuget,
  //       github: FormData.social.github,
  //       fields: FormData.fields
  //     }
  //   }

  // return submitForm (form$, data, Constants.EDIT_BASICS)
}

const createThumbnailUrl = (file)=>{
  if (file && tempUserpic.value !== null)
  {
    const url = Constants.ASSETS + tempUserpic.value
    return url
  }

  return undefined
}

</script>

<template>
  
   <n-row :gutter="[0, 24]">
    <n-col :span="6">
      <n-avatar
        round
        :size="64"
        :src="userpic"
        fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
    </n-col>
    <n-col :span="18">
        <n-upload
        list-type="image"
        :max="1"
        accept="image/*"
        :default-upload="false"
        @change="handleFileChange"
        :create-thumbnail-url="createThumbnailUrl"
        >
          <n-button type="primary">Upload New Avatar</n-button>
        </n-upload>
    </n-col>
  </n-row> 
 

<n-form
    v-if="form !== null"
    ref="formRef"
    :model="form"
    label-placement="left"
    :label-width="160"
    require-mark-placement="right-hanging"
    >
    <n-form-item label="Confirmed" path="status">
      <n-switch v-model:value="form.status" placeholder="Confirmed" disabled/>
    </n-form-item>
    <n-form-item label="E-Mail" path="email">
      <n-input v-model:value="form.email" placeholder="E-Mail" disabled/>
    </n-form-item>
    <n-form-item label="Profile is public" path="public">
      <n-switch v-model:value="form.public" placeholder="Newsletter"/>
    </n-form-item>
    <n-form-item label="Name" path="name">
      <n-input v-model:value="form.name" placeholder="Name" />
    </n-form-item>
    <n-form-item label="Surname" path="surname">
      <n-input v-model:value="form.surname" placeholder="Surname" />
    </n-form-item>
    <n-form-item label="Newsletter" path="newsletter">
      <n-switch v-model:value="form.newsletter" placeholder="Newsletter"/>
    </n-form-item>
    <n-form-item label="Website" path="website">
      <n-input v-model:value="form.related.social.website" placeholder="Website"/>
    </n-form-item>
    <n-form-item label="Github" path="github">
      <n-input v-model:value="form.related.social.github" placeholder="Github"/>
    </n-form-item>
    <n-form-item label="NuGet" path="nuget">
      <n-input v-model:value="form.related.social.nuget" placeholder="NuGet"/>
    </n-form-item>
    <n-form-item label="Custom Fields">
      <n-flex v-for="(field, index) in form.related.social.fields" :key="index" class="field-row">
          <n-input 
            v-model="field.key" 
            placeholder="Key" 
            style="margin-right: 10px;" 
          />
          <n-input 
            v-model="field.value" 
            placeholder="Value" 
          />
      </n-flex>
    </n-form-item>
    <n-row :gutter="[0, 24]">
      <n-col :span="24">
        <div style="display: flex; justify-content: flex-end">
          <n-form-item>
            <n-button @click="revert" :disabled="updating">
              Revert
            </n-button>
            <n-button @click="submit" :disabled="updating" type="primary">
              Submit
            </n-button>
          </n-form-item>
        </div>
      </n-col>
    </n-row>
</n-form>

</template>