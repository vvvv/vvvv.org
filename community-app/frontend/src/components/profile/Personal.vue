<script setup>
import { ref, onMounted, computed } from 'vue'
import { countries } from '../../countries.js'
import Constants from '../../constants.js'
import SocialFields from './SocialFields.vue'
import FileUploader from './FileUploader.vue'
import Editor from './Editor.vue'
import SubmitRevertButtons from './SubmitRevertButtons.vue'
import { post, clone, createAssetUrl, showUserProfile }  from '../../utils.js'
import { NAvatar, NSelect, NDatePicker, NAlert, NTag, NSwitch, NForm, NFormItem, NInput } from 'naive-ui'
import FormItem from './FormItem.vue'
import StatusTag from '../StatusTag.vue'

const emit = defineEmits(['reload', 'message', 'updateData']);
const avatarSize = 120;

const { data, constants } = defineProps(['data', 'constants']);
const isChanged = ref(false);
const formRef = ref(null);
const form = ref(null);
const userpic = ref(null);
const tempUserpic = ref(null);
const updating = ref(false);
const uploader = ref(null);
const limit = 500;
const betaYears = ref([]);
const gammaYears = ref([]);

const imageParams = `?withoutEnlargement=true&quality=90&fit=cover&width=${avatarSize}&height=${avatarSize}`;

const prepareData = ()=>{

  var temp = clone(data);

  if (!userpic.value && temp.user?.userpic?.id)
  {
    userpic.value = createAssetUrl(temp.user.userpic.id) + imageParams;
  }

  if (temp.user?.beta_since)
    temp.user.beta_since = Date.parse(temp.user.beta_since);

  if (temp.user?.gamma_since)
    temp.user.gamma_since = Date.parse(temp.user.gamma_since);

  form.value = {
    user: temp.user,
    social: temp.social
  }

  betaYears.value = [];

}
 
onMounted(()=>{  
  prepareData();
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
  const formValue  = clone(form.value);
  delete formValue.status;

  let discourse = {};

  if (tempUserpic.value == null)
  {
    delete formValue.user.userpic
  }
  else
  {
    formValue.user.userpic = tempUserpic.value;
  }

  const infoForDiscourseChanged = formValue.user?.description != data.user?.description ||
      formValue.social?.website != data.social?.website ||
      formValue.user?.location_city != data.user?.location_city ||
      formValue.user?.location_country != data.user?.location_country ||
      formValue.user?.name != data.user?.name ||
      formValue.user?.surname != data.user?.surname ||
      formValue.user?.visible != data.user?.visible;

  if (infoForDiscourseChanged) 
    discourse.info = true;

  if (formValue.user?.userpic && (formValue.user.userpic != data.user?.userpic))
    discourse.avatar = true;

  if (formValue.user?.gamma_since)
    formValue.user.gamma_since = new Date(formValue.user.gamma_since).toISOString(); 
  if (formValue.user?.beta_since)
    formValue.user.beta_since = new Date(formValue.user.beta_since).toISOString();   

  const body = {
    user: formValue.user,
    social: formValue.social
  }

  if (Object.keys(discourse).length > 0)
  {
    body.discourse = discourse;
  }

  if (formValue.user?.newsletter != data.user?.newsletter)
  {
    body.newsletter = formValue.user.newsletter;
  }

  try {
    const response = await post(Constants.EDIT_PERSONAL, body);

    if (response.code == 'SUCCESS' || 'NEW')
    {
      if (tempUserpic.value !== null)
      {
        userpic.value = createAssetUrl(tempUserpic.value) + imageParams;
        tempUserpic.value = null;
      }

      //Update fields in data
      formValue.user.userpic = { id: formValue.user.userpic } // data has userpic as an object with id
      data.user = clone (formValue.user);
      data.social = clone (formValue.social);

      if (response.code === 'NEW') data.user.status = form.value.user.status = '0';

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
  }
  finally {
    updating.value = false;
  }
}

const avatarButtonText = computed(()=>{
  return userpic.value !== null ? "Upload new" : "Upload avatar" 
})

</script>

<template>
  <template v-if="form !== null">

    <div class="row justify-content-between">
      <div class="col-12 col-sm-8">
          <label class="text-nowrap mr-3">Profile publicly visible</label>
          <n-switch v-model:value="form.user.visible" placeholder="Profile publicly visible" @update:value="submit"/>
      </div>
      <div class="col-12 col-sm-4 text-sm-right" v-if="form.user.visible">
        <a :href="'/user/'+data.user.username" @click="(event) => showUserProfile(data.user.username, event)">View Profile</a>
      </div>
    </div>

    <hr class="mt-1 mb-4"/>

    <n-form
        ref="formRef"
        :model="form"
        label-placement="left"
        :label-width="150"
        require-mark-placement="right-hanging"
        >

        <n-form-item label="Avatar">
            <div class="container mx-0 px-0">
              <div class="row">
                  <div class="col-12 col-xl-3" v-if="userpic !== null">
                    <NAvatar :round="true" :size="avatarSize" :src="userpic" object-fit="cover"/>
                  </div>
                  <div class="col-12 col-xl-auto">
                    <FileUploader class="mt-3" :buttonText="avatarButtonText" @change="updateTempUserpic" folder="avatar" ref="uploader" type="user"/>
                    <NAlert v-if="tempUserpic" title="Uploaded" type="success">
                        Press 'Submit' below to update the Avatar.
                    </NAlert>
                  </div>
                </div>
            </div>  
        </n-form-item>

        <StatusTag :value="form.user?.status"/>

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

        <!-- TODO: CONTACT FIELD -->
        <!-- <n-form-item label="Contact" path="contact">
          <n-input v-model:value="form.social.contact" placeholder="Prefered way of contact in human readable forms" />
        </n-form-item> -->

        <FormItem path="description" type="user">
          <template #content>
            <Editor class="fullWidth" v-model="form.user.description" :limit="limit"/>
          </template>
        </FormItem>

        <FormItem path="location">
          <template #content>
            <div class="row">
              <div class="col">
                <n-input v-model:value="form.user.location_city" placeholder="City" clearable/>
              </div>
              <div class="col">
                <n-select :options="countries" filterable clearable v-model:value="form.user.location_country" placeholder="Country"/>
              </div>
            </div>
          </template>
        </FormItem>

        <FormItem path="newsletter">
          <template #content>
            <n-switch v-model:value="form.user.newsletter"/>
          </template>
        </FormItem>

        <SocialFields v-model:value="form.social" type="user"/>

        <div class="row">
          <div class="col">
            <FormItem path="beta_since">
              <template #content>
                <NDatePicker v-model:value="form.user.beta_since" type="year" clearable/>
              </template>
            </FormItem>
          </div>
          <div class="col">
            <FormItem path="gamma_since">
              <template #content>
                <NDatePicker v-model:value="form.user.gamma_since" type="year" clearable/>
              </template>
            </FormItem>
          </div>

        </div>
        <SubmitRevertButtons @revert="revert" @submit="submit" :updating="updating"/>
    </n-form>
  </template>
</template>