<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import Constants from '../../constants.js'
import FileUploader from './FileUploader.vue'
import SocialFields from './SocialFields.vue'
import { countries } from '../../countries.js'
import SubmitRevertButtons from './SubmitRevertButtons.vue'
import Editor from './Editor.vue'
import { post, createAssetUrl, makeFields }  from '../../utils.js'
import { NAvatar, NButton, NSelect, NTag, NFlex, NRow, NCol, NSwitch, NForm, NRadioButton, NRadioGroup, NFormItem, NInput } from 'naive-ui'

const emit = defineEmits(['reload', 'message', 'updateData']);
const { data, constants } = defineProps(['data', 'constants']);

const isChanged = ref(false);
const formRef = ref(null);
const formRef2 = ref(null);
const form = ref(null);
const logo = ref(null);
const tempLogo = ref(null);
const updating = ref(false);
const companyExists = ref(false);
const uploader = ref(null);

const emptyCompany = {
  enabled: false,
  logo: null,
  name: "",
  tagline: "",
  description: "",
  status: 0,
  website: "",
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

const submit = async () => {

  const valid = await formRef2.value?.validate((errors) => {
    if (errors) {
      emit('message', "Please fill requiered fields")
    }
  })

  if (!valid) return

  updating.value = true;
  const formValue = { ...form.value[0]};

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
  
    if (tempLogo.value)
    {
      logo.value = createAssetUrl(tempLogo.value);
      tempLogo.value = null;
    }
  
    //Update fields in data
    data.companies[0] = formValue;

    if (uploader.value) 
    {
      uploader.value.reset()
    }
  
    emit('updateData', data);
    emit('message', { type: 'success', string: 'Updated'});
  }
  catch (error)
  {
    console.log (error);
    emit('message', { type: 'error', string: 'Ooops. Something has happened on update'});
  }
  finally{
    updating.value = false
  }
}

const logoButtonText = computed(()=>{
  return logo.value !== null ? "Upload new" : "Upload Logo" 
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
          <n-form-item label="I own a company" path="available">
            <n-switch v-model:value="form[0].enabled" placeholder="I own a company"/>
          </n-form-item>
      </n-form>
      
      <hr class="mt-1 mb-4"/>

      <div class="h2" v-if="companyExists">{{ form[0].name }}</div>
      
      <div class="form-group row mb-2">
        <div class="col-sm-2"></div>
        <div class="col-sm-10">
          <div class="row">
            <div class="col-2" v-if="logo !== null">
              <img :src="logo" class="img-fluid"/>
            </div>    
            <div class="col-10">
              <FileUploader :buttonText="logoButtonText" @change="updateTempLogo" folder="logo" ref="uploader"/>
            </div>
          </div>
        </div>
      </div>


      <NForm
          v-if="form !== null"
          ref="formRef2"
          :model="form[0]"
          :rules="rules"
          label-placement="left"
          :label-width="120"
          require-mark-placement="right-hanging"
          >
        <template v-if="companyExists">
          <n-form-item label="Status" path="status" v-if="form[0].status != '1'">
            <n-tag :bordered="false" type="warning" v-if="form[0].status == '0'">Not yet confirmed</n-tag>
            <n-tag :bordered="false" type="error" v-if="form[0].status == '2'">Disabled</n-tag>
          </n-form-item>
        </template>
        <n-form-item label="Name" path="name" v-if="!companyExists">
          <n-input v-model:value="form[0].name" placeholder="Name"/>
        </n-form-item>
        <div class="row">
          <div class="col">
            <n-form-item label="Tagline" path="tagline">
              <n-input v-model:value="form[0].tagline" placeholder="Tagline" />
            </n-form-item>
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

        <n-form-item label="Description" path="description">
          <Editor class="fullWidth" v-model="form[0].description" label="Description" :limit="limit"/>
        </n-form-item>

        <SocialFields v-model:value="form[0].social"/>
      </NForm>
      <SubmitRevertButtons @revert="prepareData" @submit="submit" :updating="updating"/>
</template>