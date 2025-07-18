<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import slugify from 'slugify'
import Constants from '../../constants.js'
import FileUploader from './FileUploader.vue'
import SocialFields from './SocialFields.vue'
import { countries } from '../../countries.js'
import SubmitRevertButtons from './SubmitRevertButtons.vue'
import Editor from './Editor.vue'
import { post, clone, createAssetUrl, makeFields, showBusinessProfile }  from '../../utils.js'
import { NSelect, NTag, NSwitch, NForm, NFormItem, NInput, NAlert } from 'naive-ui'
import FormItem from './FormItem.vue'
import InputField from '../InputField.vue'
import StatusTag from '../StatusTag.vue'
import PersonPicker from './PersonPicker.vue'
import { useBusinessListStore } from "../../routes/BusinessListStore.js"
import { transformer } from './FormHelper.js'

const emit = defineEmits(['reload', 'message', 'updateData']);
const { data, constants } = defineProps(['data', 'constants']);

const store = useBusinessListStore();

const formRef = ref(null);
const form = ref(null);
const logo = ref(null);
const tempLogo = ref(null);
const updating = ref(false);
const companyExists = ref(false);
const uploader = ref(null);
const limit = 500;

const emptyCompany = {
  enabled: false,
  logo: null,
  name: "",
  slug: "",
  tagline: "",
  description: "",
  internships: false,
  contact_url: "",
  projects_url: "",
  jobs_url: "",
  status: 0,
  website: "",
  people: [],
  social: {}
}



const prepareData = ()=>{

  const temp = clone(data);

  if (temp.companies?.length > 0)
  {
    logo.value = createAssetUrl(temp.companies[0].logo)

    if (!temp.companies[0].social)
    {
      temp.companies[0].social = {}
    }

    companyExists.value = true;

    if (temp.companies[0].people)
    {
      temp.companies[0].people = transformer.people.toForm(temp.companies[0].people);
    }
  }
  else
  {
    temp.companies = [{ ...emptyCompany}];
    const defaultSocial = {
      fields: makeFields([], 4),
      website: ""
    };
    temp.companies[0].social = defaultSocial;
    companyExists.value = false;
  }

  form.value = temp.companies;
}

const noSpaces = (rule, value) =>{
   if (/\s/.test(value)) {
          return new Error('No spaces allowed');
  }
  return true;
}

const rules = {
  name: {
    required: true,
    message: "Name is required",
    trigger: ['input', 'blur'],
  },
  website: {
    required: true,
    message: "Website is required",
    trigger: ['input', 'blur'],
    validator: (rule, value)=>{
      return form.value[0]?.social?.website?.length > 0;
    }
  },
  logo: {
    required: true,
    message: "Logo is required",
    trigger: ['input', 'blur'],
    validator: (rule, value)=>{
      return logo.value != null || tempLogo.value != null ;
    }
  }
}

onMounted(()=>{
  prepareData();
})

const updateTempLogo = (id) =>{
  if (id !== null)
  {
    emit('message', { type: 'success', string: 'New image uploaded'})
  }

  tempLogo.value = id
}

const submit = async () => {

  try{
    await formRef.value.validate();
  }
  catch (error)
  {
    emit('message', { type: 'error', string: 'Please fill requiered fields'});
    return;        
  }

  const formValue = clone(form.value[0]);
  delete formValue.status;
  delete formValue.website;

  if (!form.value[0].slug)
  {
    formValue.slug = slug.value;
  }
  else
  {
    delete formValue.slug;
  }

  if (tempLogo.value == null)
  {
    delete formValue.logo
  }
  else
  {
    formValue.logo = tempLogo.value
  }

  if (formValue.people.length > 0)
  {
    formValue.people = transformer.people.toPayload(formValue.people);
  }

  try{
    
    const response = await post(Constants.EDIT_COMPANY, formValue)
    
    if (response.code === 'SUCCESS' || 'NEW')
    {
      if (tempLogo.value)
      {
        logo.value = createAssetUrl(tempLogo.value);
        tempLogo.value = null;
      }
    
      //Update fields in data
      data.companies[0] = formValue;
      
      if (response.code === 'NEW') 
      {
        data.companies[0].status = form.value[0].status = '0';
      }

      if (uploader.value) 
      {
        uploader.value.reset()
      }
    
      store.fetch(true);
      
      emit('updateData', data);
      emit('message', { type: 'success', string: response.result});
    }
  }
  catch (error)
  {
    emit('message', { type: 'error', string: 'Ooops. Something has happened on update'});
  }
  finally{
    formRef.value.restoreValidation();
    updating.value = false;
  }
}

const logoButtonText = computed(()=>{
  return logo.value !== null ? "Upload new" : "Upload Logo" 
})

const slug = computed(()=>{
  return form.value[0].slug ? form.value[0].slug : slugify (form.value[0].name ?? "", { lower: true, strict: true});
})

</script>

<template>

    <div class="row justify-content-between" v-if="form !== null">
      <div class="col-12 col-sm-8">
          <label class="text-nowrap mr-3">Business publicly visible</label>
          <n-switch v-model:value="form[0].enabled" placeholder="Business publicly visible" @update:value="submit" :disabled="!(companyExists || form[0].name)"/>
      </div>
      <div class="col-12 col-sm-4 text-sm-right" v-if="companyExists && form[0].enabled">
        <a :href="'/company/'+form[0].name" @click="(event) => showBusinessProfile(form[0].name, event)">View Business</a>
      </div>
    </div>

      <hr class="mt-1 mb-4"/>

      <div class="h2 mb-3" v-if="companyExists">{{ form[0].name }}</div>


      <NForm
          v-if="form !== null"
          ref="formRef"
          :model="form[0]"
          :rules="rules"
          label-placement="left"
          :label-width="150"
          require-mark-placement="right-hanging"
          >
        <n-form-item label="Logo" path="logo">
          <div class="container mx-0 px-0">
            <div class="row">
              <div class="col-12 col-xl-3" v-if="logo">
                <img :src="logo" class="img-fluid"/>
              </div>
              <div class="col-12 col-xl-auto">
                <FileUploader :buttonText="logoButtonText" @change="updateTempLogo" folder="logo" ref="uploader" type="company"/>
                <NAlert v-if="tempLogo" title="Uploaded" type="success">
                        Press 'Submit' below to update the Logo.
                </NAlert>
              </div>
            </div>
          </div>
        </n-form-item>

        <StatusTag :value="form[0].status"/>

          <InputField v-if="!companyExists" path="name" type="company" v-model="form[0].name"/>
          <InputField path="slug" type="company" v-model="slug" :disabled="true"/>
        <div class="row">
          <div class="col">
          <InputField path="tagline" type="company" v-model="form[0].tagline"/>
          </div>
        </div>
        <n-form-item label="Address" path="address">
          <div class="row">
            <div class="col">
              <n-input v-model:value="form[0].location_street" placeholder="Street and house number" class="mb-1" />
              <n-input v-model:value="form[0].location_additionalInfo" placeholder="Additional Info" class="mb-1"/>
              <div class="row mb-1">
                <div class="col-4">
                  <n-input v-model:value="form[0].location_postalcode" placeholder="Postal code"/>
                </div>
                <div class="col-8">
                  <n-input v-model:value="form[0].location_city" placeholder="City" />
                </div>
              </div>
              <n-select :options="countries" filterable clearable v-model:value="form[0].location_country" placeholder="Country"/>
            </div>
          </div>
        </n-form-item>

        <FormItem path="description" type="company">
          <template #content>
            <Editor class="fullWidth" v-model="form[0].description" :limit="limit"/>
          </template>
        </FormItem>
        
        <SocialFields v-model:value="form[0].social" type="company"/>

        
        <InputField path="contact_url" v-model="form[0].contact_url"/>
        <InputField path="projects_url" v-model="form[0].projects_url"/>
        <InputField path="jobs_url" v-model="form[0].jobs_url"/>

        <FormItem path="internships">
          <template #content>
            <NSwitch v-model:value="form[0].internships"/>
          </template>
        </FormItem>
        
        <FormItem path="people" type="company">
          <template #content>
            <PersonPicker v-model="form[0].people" path="people" type="company"/>
          </template>
        </FormItem>
        

      </NForm>
      <SubmitRevertButtons @revert="prepareData" @submit="submit" :updating="updating"/>
</template>