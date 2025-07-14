<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import slugify from 'slugify'
import Constants from '../../constants.js'
import FileUploader from './FileUploader.vue'
import SocialFields from './SocialFields.vue'
import { countries } from '../../countries.js'
import SubmitRevertButtons from './SubmitRevertButtons.vue'
import Editor from './Editor.vue'
import { post, createAssetUrl, makeFields, showEduProfile, clone }  from '../../utils.js'
import { NAvatar, NAlert, NButton, NSelect, NTag, NFlex, NRow, NCol, NSwitch, NForm, NRadioButton, NRadioGroup, NFormItem, NInput } from 'naive-ui'
import FormItem from './FormItem.vue'
import InputField from '../InputField.vue'
import StatusTag from '../StatusTag.vue'
import PersonPicker from './PersonPicker.vue'
import { useEduListStore } from "../../routes/EduListStore.js"
import { transformer } from './FormHelper.js'

const emit = defineEmits(['reload', 'message', 'updateData']);
const { data, constants } = defineProps(['data', 'constants']);

const store = useEduListStore();

const isChanged = ref(false);
const formRef = ref(null);
const form = ref(null);
const logo = ref(null);
const tempLogo = ref(null);
const updating = ref(false);
const eduExists = ref(false);
const uploader = ref(null);

const emptyData = {
  enabled: false,
  logo: null,
  name: "",
  slug: "",
  description: "",
  status: 0,
  website: "",
  social: {},
  people: []
}

const prepareData = ()=>{
  const temp = clone(data);

  if (temp.edus?.length > 0)
  {
    logo.value = createAssetUrl(temp.edus[0].logo)

    if (!temp.edus[0].social)
    {
      temp.edus[0].social = {}
    }

    eduExists.value = true;

    if (temp.edus[0].people)
    {
      temp.edus[0].people = transformer.people.toForm(temp.edus[0].people);
    }
  }
  else
  {
    temp.edus = [{ ...emptyData}];
    const defaultSocial = {
      fields: makeFields([], 4),
      website: ""
    };
    temp.edus[0].social = defaultSocial;
    eduExists.value = false;
  }

  form.value = temp.edus
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
  prepareData()
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

  updating.value = true;
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
    const response = await post(Constants.EDIT_EDU, formValue)
  
    if (response.code == 'SUCCESS' || 'NEW')
    {
      if (tempLogo.value)
      {
        logo.value = createAssetUrl(tempLogo.value);
        tempLogo.value = null;
      }
    
      //Update fields in data
      data.edus[0] = formValue;
      if (response.code === 'NEW') 
      {
        data.edus[0].status = form.value[0].status = '0';
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
    updating.value = false
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
          <label class="text-nowrap mr-3">Institution publicly visible</label>
          <n-switch v-model:value="form[0].enabled" placeholder="Institution publicly visible" @update:value="submit" :disabled="!(eduExists || form[0].name)"/>
      </div>
      <div class="col-12 col-sm-4 text-sm-right" v-if="eduExists && form[0].enabled">
        <a :href="'/edu/'+form[0].name" @click="(event) => showEduProfile(form[0].name, event)">View Institution</a>
      </div>
    </div>

      <hr class="mt-1 mb-4"/>

      <div class="h2 mb-3" v-if="eduExists">{{ form[0].name }}</div>

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
                <FileUploader :buttonText="logoButtonText" @change="updateTempLogo" folder="logo" ref="uploader" type="edu"/>
                <NAlert v-if="tempLogo" title="Uploaded" type="success">
                    Press 'Submit' below to update the Logo.
                </NAlert>
              </div>
            </div>
          </div>
        </n-form-item>

        <StatusTag :value="form[0].status"/>

        <InputField path="name" v-if="!eduExists" type="edu" v-model="form[0].name"/>
        <InputField path="slug" type="edu" v-model="slug" :disabled="true"/>

        <FormItem path="description" type="edu">
          <template #content>
            <Editor class="fullWidth" v-model="form[0].description" :limit="limit"/>
          </template>
        </FormItem>

        <InputField path="course_language" type="edu"/>

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

        <SocialFields v-model:value="form[0].social" type="edu"/>

        <FormItem path="people" type="edu">
          <template #content>
            <PersonPicker v-model="form[0].people" path="people" type="edu"/>
          </template>
        </FormItem>

      </NForm>
      <SubmitRevertButtons @revert="prepareData" @submit="submit" :updating="updating"/>
</template>