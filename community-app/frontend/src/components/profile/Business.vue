<script setup>
import { ref, onMounted, computed } from 'vue'
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
import { useBusinessListStore } from "../../routes/BusinessListStore.js";

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
  tagline: "",
  description: "",
  internships: false,
  contact_url: "",
  projects_url: "",
  jobs_url: "",
  status: 0,
  social: {}
}

const prepareData = ()=>{
  const temp = { ...data };

  if (temp.companies?.length > 0)
  {
    logo.value = createAssetUrl(temp.companies[0].logo)

    if (!temp.companies[0].social)
    {
      temp.companies[0].social = {}
    }

    companyExists.value = true;
  }
  else
  {
    temp.companies = [{ ...emptyCompany}];
    temp.companies[0].social.fields = makeFields([], 4);
    companyExists.value = false;
  }

  form.value = temp.companies
}

const noSpaces = (rule, value) =>{
   if (/\s/.test(value)) {
          return new Error('No spaces allowed');
  }
  return true;
}

const noSpacesValidator = {
    validator: noSpaces,
    trigger: ['blur', 'input']
  }

const rules = {
  name: {
    required: true,
    message: "Name is required",
    trigger: ['blur', 'input']
  }
}

onMounted(()=>{
  prepareData()
})

const updateTempLogo = (id) =>{
  if (id !== null)
  {
    emit('message', { type: 'success', string: 'New image uploaded'})
  }

  tempLogo.value = id
}

async function validate(form)
{
    return new Promise (async (resolve, reject)=>{
        form.value.validate((error)=>{
          if (error) reject(error);
          else resolve();
        });
    })
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

  if (tempLogo.value == null)
  {
    delete formValue.logo
  }
  else
  {
    formValue.logo = tempLogo.value
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
      
      if (response.code === 'NEW') data.companies[0].status = 0;

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
    console.log (error);
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

      <div class="h2" v-if="companyExists">{{ form[0].name }}</div>


      <NForm
          v-if="form !== null"
          ref="formRef"
          :model="form[0]"
          :rules="rules"
          label-placement="left"
          :label-width="150"
          require-mark-placement="right-hanging"
          >
        <n-form-item label="Logo">
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

        <template v-if="companyExists">
          <n-form-item label="Status" path="status" v-if="form[0].status && form[0].status != '1'">
            <n-tag :bordered="false" type="warning" v-if="form[0].status == '0'">Not yet confirmed</n-tag>
            <n-tag :bordered="false" type="error" v-if="form[0].status == '2'">Disabled</n-tag>
          </n-form-item>
        </template>
        <InputField v-if="!companyExists" path="name" type="company" v-model="form[0].name"/>
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

        <FormItem path="internships">
          <template #content>
            <NSwitch v-model:value="form[0].internships"/>
          </template>
        </FormItem>
        
        <InputField path="contact_url" v-model="form[0].contact_url"/>
        <InputField path="projects_url" v-model="form[0].projects_url"/>
        <InputField path="jobs_url" v-model="form[0].jobs_url"/>
      </NForm>
      <SubmitRevertButtons @revert="prepareData" @submit="submit" :updating="updating"/>
</template>