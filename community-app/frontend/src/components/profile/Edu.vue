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
import MapPicker from './MapPicker.vue'
import { eduMessages } from "./HelpTexts.js"
import { useFormHelper } from './composables/useFormHelper.js'
import { useMapHelper } from './composables/useMapHelper.js'

const emit = defineEmits(['reload', 'message', 'updateData']);
const { data, constants } = defineProps(['data', 'constants']);

const formRef = ref(null);
const form = ref(null);
const logo = ref(null);
const tempLogo = ref(null);
const updating = ref(false);
const eduExists = ref(false);
const uploader = ref(null);

const formHelper = useFormHelper(form);
const { location, zoom, address, updateZoom, updateLoc, addressChangeHandler, disabled, searching, setWatchers : mapHelperSetWatchers } = useMapHelper(form, formHelper);

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
      temp.edus[0].people = formHelper.transformer.people.toForm(temp.edus[0].people);
    }

    if (temp.edus[0].location)
    {
      temp.edus[0].location = formHelper.transformer.map.toLocation(temp.edus[0].location);
      location.value = temp.edus[0].location;
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

  form.value = temp.edus;
  formHelper.setNewData(form.value);

  if (!form.value[0]?.location)
  {
    addressChangeHandler();
  }
}

const rules = {
  name: {
    required: true,
    message: "Name is required",
    trigger: ['input', 'blur'],
  },
  location_country: {
    required: true,
    message: "Country is required",
    trigger: ['input', 'blur', 'change'],
  },
  location_city: {
    required: true,
    message: "City is required",
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
  mapHelperSetWatchers();
})

watch (()=>data, (newValue)=>{
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
    formValue.people = formHelper.transformer.people.toPayload(formValue.people);
  }

  if (location.value)
  {
    formValue.location = location.value;
  }
  else
  {
    delete formValue.location;
  }


  try{
    updating.value = true;

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

      emit('updateData', data);
      emit('message', { type: 'success', string: response.result});

      formHelper.setNewData(form.value);
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

const errors = computed(()=>{

  if (eduExists.value)
  {
    const list = [];
  
    if (!data.user.visible) list.push(eduMessages.ownerNotVisible);
    if (form.value[0].status !== "1") list.push(eduMessages.notConfirmed);
  
    if (list.length)
    {
      return {
        header: eduMessages.header,
        list: list
      }
    }    
  }

  return null;
})

</script>

<template>

    <div class="row justify-content-between" v-if="form !== null">
      <div class="col-12 col-sm-9">
        <div class="h2 mb-3" v-if="eduExists">{{ form[0].name }}</div>
     </div>
      <div class="col-12 col-sm-3 text-sm-right mt-2" v-if="eduExists && data.edus[0]?.enabled && !errors">
        <a :href="'/edu/'+form[0].name" @click="(event) => showEduProfile(form[0].name, event)">View Institution</a>
      </div>
    </div>

      <hr class="mt-1 mb-4"/>

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
              <div class="col-12 col-xl-auto mt-2 mt-xl-0">
                <FileUploader :buttonText="logoButtonText" @change="updateTempLogo" folder="logo" ref="uploader" type="edu"/>
                <NAlert v-if="tempLogo" title="Uploaded" type="success">
                    Press 'Submit' below to update the Logo.
                </NAlert>
              </div>
            </div>
          </div>
        </n-form-item>

        <StatusTag :value="form[0].status"/>

        <FormItem path="enabled" type="edu">
          <template #content>
            <div class="w-100">
              <n-switch v-model:value="form[0].enabled" placeholder="Publicly visible" :disabled="!eduExists || !form[0].name"/>
              <div class="mt-2 errors" v-if="errors">
                <n-alert :title="errors.header" type="warning">
                  <span v-for="(error, index) in errors.list" :key="index">
                    - {{  error }}
                  <br/>
                  </span> 
                </n-alert>
              </div>
            </div>
          </template>
        </FormItem>

        <InputField path="name" v-if="!eduExists" type="edu" v-model="form[0].name"/>
        <InputField path="slug" type="edu" v-model="slug" :disabled="true"/>

        <n-form-item label="Address" @input="addressChangeHandler">
          <div class="d-flex flex-column w-100">
            <div class="row">
              <div class="col-12">
                <n-form-item path="location_country">
                  <n-select :options="countries" filterable clearable v-model:value="form[0].location_country" placeholder="Country" @update:value="addressChangeHandler"/>
                </n-form-item>
                <div class="row">
                  <div class="col-8">
                    <n-form-item path="location_city">
                      <n-input v-model:value="form[0].location_city" placeholder="City"/>
                    </n-form-item>
                  </div>
                  <div class="col-4">
                    <n-input v-model:value="form[0].location_postalcode" placeholder="Postal code"/>
                  </div>
                </div>
                <n-form-item>
                  <n-input v-model:value="form[0].location_street" placeholder="Street and house number"/>
                </n-form-item>
                <n-form-item>
                  <n-input v-model:value="form[0].location_additionalInfo" placeholder="Additional Info"/>
                </n-form-item>
              </div>
            </div>
          </div>
        </n-form-item>

        <FormItem path="map" type="edu">
            <template #content>
            <div class="d-flex flex-column w-100">
              <div class="row">
                <div class="col-12 map">
                  <p class="info">Drag and drop the pin to set your location:</p>
                  <MapPicker :coords="location" @coords="updateLoc" :zoom="zoom" @zoom="updateZoom" :disabled="disabled" :searching="searching"/>
                  <div class="attribution">
                      We're using OpenStreetMap's <a href="https://nominatim.org/">Nominatim</a> for map lookups &#x2764.
                  </div>
                </div>
              </div>
            </div>
            </template>
        </FormItem>

        <FormItem path="description" type="edu">
          <template #content>
            <Editor class="fullWidth" v-model="form[0].description" :limit="limit"/>
          </template>
        </FormItem>

        <InputField path="course_language" type="edu"/>

        <SocialFields v-model:value="form[0].social" type="edu"/>

        <FormItem path="people" type="edu">
          <template #content>
            <PersonPicker v-model="form[0].people" path="people" type="edu"/>
          </template>
        </FormItem>

      </NForm>

      <div class="stickyFormButtons" v-if="formHelper.changed.value">
        <SubmitRevertButtons @revert="formHelper.revert" @submit="submit" :updating="updating"/>
      </div>
</template>