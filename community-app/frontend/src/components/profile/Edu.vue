<script setup>
import { ref, watch, onMounted, computed } from 'vue'
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
import { useEduListStore } from "../../routes/EduListStore.js";

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
  description: "",
  status: 0,
  social: {}
}

const prepareData = ()=>{
  const temp = { ...data };

  if (temp.edus?.length > 0)
  {
    logo.value = createAssetUrl(temp.edus[0].logo)

    if (!temp.edus[0].social)
    {
      temp.edus[0].social = {}
    }

    eduExists.value = true;
  }
  else
  {
    temp.edus = [{ ...emptyData}];
    temp.edus[0].social.fields = makeFields([], 4);
    eduExists.value = false;
  }

  form.value = temp.edus
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

  const valid = await formRef.value?.validate((errors) => {
    if (errors) {
      emit('message', "Please fill requiered fields")
    }
  })

  if (!valid) return

  updating.value = true;
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

      if (uploader.value) 
      {
        uploader.value.reset()
      }
    
      emit('updateData', data);
      emit('message', { type: 'success', string: response.result});
      store.fetch(true);
    }

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

      <div class="h2" v-if="eduExists">{{ form[0].name }}</div>

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
              <div class="col-12 col-xl-3" v-if="logo !== null">
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

        <template v-if="eduExists">
          <n-form-item label="Status" path="status" v-if="form[0].status != '1'">
            <n-tag :bordered="false" type="warning" v-if="form[0].status == '0'">Not yet confirmed</n-tag>
            <n-tag :bordered="false" type="error" v-if="form[0].status == '2'">Disabled</n-tag>
          </n-form-item>
        </template>
        <InputField path="name" v-if="!eduExists" type="edu" v-model="form[0].name"/>

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
      </NForm>
      <SubmitRevertButtons @revert="prepareData" @submit="submit" :updating="updating"/>
</template>