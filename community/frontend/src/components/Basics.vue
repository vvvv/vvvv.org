<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import Constants from '../constants'
import Userpic from './Userpic.vue'
import FieldInput from './FieldInput.vue'
import SubmitRevertButtons from './SubmitRevertButtons.vue'
import { clone, post, removeFile, uploadFile, createAssetUrl, makeFields }  from '../utils'
import { NButton, NTag, NFlex, NRow, NCol, NSwitch, NForm, NRadioButton, NRadioGroup, NFormItem, NInput } from 'naive-ui'

const emit = defineEmits(['reload', 'message', 'updateData'])

const { data, constants } = defineProps(['data', 'constants'])
const isChanged = ref(false)
const formRef = ref(null)
const form = ref(null)
const userpic = ref(null)
const tempUserpic = ref(null)
const updating = ref(false)

const prepareData = ()=>{

  var temp = clone(data)

  if (temp.user.hasOwnProperty('userpic'))
  {
    userpic.value = createAssetUrl(temp.user.userpic.id)
  }

  console.log (temp)
  temp.social.fields = makeFields(temp.social.fields, 4)
  console.log (temp)

  form.value = {
    user: temp.user,
    social: temp.social
  }

}
 
onMounted(()=>{
  prepareData()
})

const formChanged = (data)=> {
  isChanged.value = true
}

const revert = ()=>{
  prepareData()
}

const updateTempUserpic = (id) =>{
  if (id !== null)
  {
    tempUserpic.value = id
    emit('message', { type: 'success', string: 'New image uploaded'})
  }
  else{
    emit('message', { type: 'error', string: 'Something went wrong'})
  } 
}

const submit = async () => {

  updating.value = true
  const formValue  = clone(form.value)
  
  if (tempUserpic.value == null)
  {
    delete formValue.user.userpic
  }
  else
  {
    formValue.user.userpic = tempUserpic.value
  }
    
  const body = {
    user: formValue.user,
    social: formValue.social
  }

  post(Constants.EDIT_BASICS, body)
  .then((response)=>{
    if (response.result == 'Updated')
    {
      if (tempUserpic.value !== null)
      {
        userpic.value = createAssetUrl(tempUserpic.value)
        tempUserpic.value = null
      }

      //Update fields in data
      data.user = formValue.user
      data.social = formValue.social
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

</script>

<template>
  <template v-if="form !== null">
    <Userpic :src="userpic" buttonText="Upload new" @change="updateTempUserpic" round="true"/>
    
    <n-form
        ref="formRef"
        :model="form"
        label-placement="left"
        :label-width="120"
        require-mark-placement="right-hanging"
        >
        <n-form-item label="Status" path="status" v-if="form.user.status != '1'">
          <n-tag :bordered="false" type="warning" v-if="form.user.status == '0'">Not yet confirmed</n-tag>
          <n-tag :bordered="false" type="error" v-if="form.user.status == '2'">Disabled</n-tag>
        </n-form-item>
        <div class="row">
          <div class="col-12 col-lg-6">
            <n-form-item label="Username" path="username">
              <n-input v-model:value="form.user.username" disabled/>
            </n-form-item>
          </div>
          <div class="col-12 col-lg-6">
            <n-form-item label="E-Mail" path="email">
              <n-input v-model:value="form.user.email" disabled/>
            </n-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-lg-6">
            <n-form-item label="Name" path="name">
              <n-input v-model:value="form.user.name" placeholder="Name" />
            </n-form-item>
          </div>
          <div class="col-12 col-lg-6">
            <n-form-item label="Surname" path="surname">
              <n-input v-model:value="form.user.surname" placeholder="Surname" />
            </n-form-item>
          </div>
        </div>
        <n-form-item label="Contact" path="contact">
          <n-input v-model:value="form.social.contact" placeholder="Prefered way of contact in human readable forms" />
        </n-form-item>
        <n-form-item label="Newsletter" path="newsletter">
          <n-switch v-model:value="form.user.newsletter" placeholder="Newsletter"/>
        </n-form-item>
        <div class="row">
          <div class="col-12 col-lg-6">
            <n-form-item label="Website" path="website">
              <n-input v-model:value="form.social.website" placeholder="Website"/>
            </n-form-item>
            <n-form-item label="Github" path="github">
              <n-input v-model:value="form.social.github" placeholder="Github"/>
            </n-form-item>
            <n-form-item label="NuGet" path="nuget">
              <n-input v-model:value="form.social.nuget" placeholder="NuGet"/>
            </n-form-item>
          </div>
          <div class="col-12 col-lg-6">
            <n-form-item label="Mastodon" path="mastodon">
              <n-input v-model:value="form.social.mastodon" placeholder="mastodon.xyz/@vvvv"/>
            </n-form-item>
            <n-form-item label="Instagram" path="instagram">
              <n-input v-model:value="form.social.instagram" placeholder="@madewithvvvv"/>
            </n-form-item>
            <n-form-item label="Pixelfed" path="pixelfed">
              <n-input v-model:value="form.social.pixelfed" placeholder="pixelfed.social/madewithvvvv"/>
            </n-form-item>
          </div>
        </div>

        <template v-for="(field, index) in form.social.fields" :key="index">
          <n-form-item label="Custom Fields">
            <div class="row">
              <div class="col-12 col-lg-6">
                <n-input 
                  v-model="field.key" 
                  placeholder="Key"
                />
              </div>
              <div class="col-12 col-lg-6">
                <n-input 
                  v-model="field.value" 
                  placeholder="Value" 
                />
              </div>
            </div>
          </n-form-item>
        </template>

        <SubmitRevertButtons @revert="revert" @submit="submit"/>
    </n-form>
  </template>
</template>