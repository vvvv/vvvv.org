<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { countries } from '../../countries.js'
import Constants from '../../constants.js'
import SocialFields from './SocialFields.vue'
import FileUploader from './FileUploader.vue'
import FieldInput from './FieldInput.vue'
import SubmitRevertButtons from './SubmitRevertButtons.vue'
import { post, createAssetUrl, makeFields }  from '../../utils.js'
import { NAvatar, NSelect, NButton, NTag, NFlex, NRow, NCol, NSwitch, NForm, NRadioButton, NRadioGroup, NFormItem, NInput } from 'naive-ui'

const emit = defineEmits(['reload', 'message', 'updateData']);

const { data, constants } = defineProps(['data', 'constants']);
const isChanged = ref(false);
const formRef = ref(null);
const form = ref(null);
const userpic = ref(null);
const tempUserpic = ref(null);
const updating = ref(false);
const uploader = ref(null);

const prepareData = ()=>{

  var temp = { ...data };

  if (temp.user.hasOwnProperty('userpic'));
  {
    userpic.value = createAssetUrl(temp.user?.userpic?.id);
  }

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
    emit('message', { type: 'success', string: 'New image uploaded'})
  }

  tempUserpic.value = id
}

const submit = async () => {

  updating.value = true;
  const formValue  = { ...form.value };
  
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

  try {
    const response = await post(Constants.EDIT_BASICS, body);

    if (response.result == 'Updated')
    {
      if (tempUserpic.value !== null)
      {
        userpic.value = createAssetUrl(tempUserpic.value);
        tempUserpic.value = null;
      }

      //Update fields in data
      data.user = formValue.user;
      data.social = formValue.social;

      if (uploader.value)
      {
        uploader.value.reset() 
      }

      emit('updateData', data);
      emit('message', { type: 'success', string: response.result});
    }
  }
  catch (error) {
    emit('message', { type: 'error', string: 'Ooops. Something has happened on update'});
    console.log (error);
  }
  finally {
    updating.value = false
  }
}

const avatarButtonText = computed(()=>{
  return userpic.value !== null ? "Upload new" : "Upload avatar" 
})

</script>

<template>
  <template v-if="form !== null">
    <div class="form-group row mb-2">
      <div class="col-sm-2"></div>
      <div class="col-sm-10">
        <div class="row">
          <div class="col-2" v-if="userpic !== null">
            <n-avatar :round="true" :size="64" :src="userpic" object-fit="cover"/>
          </div>    
          <div class="col-10">
            <FileUploader class="mt-3" :buttonText="avatarButtonText" @change="updateTempUserpic" folder="avatar" ref="uploader"/>
            <p class="text-muted" v-if="tempUserpic">Press submit to confirm your new avatar.</p>
          </div>
        </div>
      </div>
    </div>

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
        <n-form-item label="Location" path="location">
          <div class="row">
            <div class="col">
              <n-input v-model:value="form.user.location_city" placeholder="City" clearable/>
            </div>
            <div class="col">
              <n-select :options="countries" filterable clearable v-model:value="form.user.location_country" placeholder="Country"/>
            </div>
          </div>
        </n-form-item>
        <n-form-item label="Newsletter" path="newsletter">
          <n-switch v-model:value="form.user.newsletter" placeholder="Newsletter"/>
        </n-form-item>

        <SocialFields v-model:value="form.social"/>

        <SubmitRevertButtons @revert="revert" @submit="submit"/>
    </n-form>
  </template>
</template>