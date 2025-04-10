<script setup>
import { ref, watch, onMounted } from 'vue'
import Constants from '../constants'
import Userpic from './Userpic.vue'
import { countries } from '../countries.js'
import SubmitRevertButtons from './SubmitRevertButtons.vue'
import { clone, post, removeFile, uploadFile, createAssetUrl, makeFields }  from '../utils'
import { NButton, NSelect, NTag, NFlex, NRow, NCol, NSwitch, NForm, NRadioButton, NRadioGroup, NFormItem, NInput } from 'naive-ui'

const emit = defineEmits(['reload', 'message', 'updateData'])
const { data, constants } = defineProps(['data', 'constants'])

const isChanged = ref(false)
const formRef = ref(null)
const form = ref(null)
const logo = ref(null)
const tempLogo = ref(null)
const updating = ref(false)
const companyExists = ref(false)

const prepareData = ()=>{
  const temp = clone(data)

  if (temp.companies.length > 0)
  {
    if (temp.companies[0].hasOwnProperty('logo'))
    {
      logo.value = createAssetUrl(temp.companies[0].logo)
    }

    companyExists.value = true
  }
  else
  {
    form.value = [clone(emptyCompany)]
    form.value[0].fields = makeFields(null, 4)

    companyExists.value = false
  }

  form.value = temp.companies
}

const emptyCompany = {
  logo: "",
  name: "",
  description: "",
  status: 0,
  website: "",
  fields: []
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
    tempLogo.value = id
    emit('message', { type: 'success', string: 'New image uploaded'})
  }
  else{
    emit('message', { type: 'error', string: 'Something went wrong'})
  } 
}

const submit = async () => {

  const valid = await formRef.value?.validate((errors) => {
    if (errors) {
      emit('message', "Please fill requiered fields")
    }
  })

  if (!valid) return

  updating.value = true
  const formValue = clone(form.value[0])

  console.log (formValue)


  if (tempLogo.value == null)
  {
    delete formValue.logo
  }
  else
  {
    formValue.logo = tempLogo.value
  }

  post(Constants.EDIT_COMPANY, formValue)
  .then((response)=>{
    if (tempLogo.value !== null)
      {
        logo.value = createAssetUrl(tempLogo.value)
        tempLogo.value = null
      }

      //Update fields in data
      data.companies[0] = formValue
      emit('updateData', data)
      emit('message', { type: 'success', string: 'Updated'})
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

      <n-form
          v-if="form !== null"
          ref="formRef"
          :model="form"
          label-placement="left"
          :label-width="160"
          require-mark-placement="right-hanging"
          >
          <n-form-item label="I own a company" path="available">
            <n-switch v-model:value="companyExists" placeholder="I own a company"/>
          </n-form-item>
      </n-form>

      <hr class="my-1"/>

      <Userpic :src="logo" buttonText="Upload new" @change="updateTempLogo" round="false" v-if="companyExists"/>

      <NForm
          v-if="form !== null"
          ref="formRef"
          :model="form[0]"
          :rules="rules"
          label-placement="left"
          :label-width="160"
          require-mark-placement="right-hanging"
          :disabled="!companyExists"
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
        <div v-else style="margin-left: 160px">{{ form[0].name }}</div>
        <n-form-item label="Tagline" path="description">
          <n-input v-model:value="form[0].description" placeholder="Tagline" />
        </n-form-item>
        <n-form-item label="Website" path="website">
          <n-input v-model:value="form[0].website" placeholder="Name" />
        </n-form-item>
        <n-form-item label="Address" path="address">
          <div class="row">
            <div class="col">
              <n-input v-model:value="form[0].location_street" placeholder="Street and house number" class="mb-1" />
              <n-input v-model:value="form[0].location_street_addon" placeholder="Additional Info" class="mb-1"/>
              <div class="row mb-1">
                <div class="col-4">
                  <n-input v-model:value="form[0].location_postalcode" placeholder="Postal code"/>
                </div>
                <div class="col-8">
                  <n-input v-model:value="form[0].location_city" placeholder="City" />
                </div>
              </div>
              <n-select :options="countries" filterable v-model:value="form[0].location_country" placeholder="Country"/>
            </div>
          </div>
        </n-form-item>
        <n-form-item label="Custom Fields">
          <n-flex v-for="(field, index) in form[0].fields" :key="index" class="field-row">
              <n-input 
                v-model="field.key" 
                placeholder="Key" 
                style="margin-left: 10px;" 
              />
              <n-input 
                v-model="field.value" 
                placeholder="Value" 
              />
          </n-flex>
        </n-form-item>
      </NForm>
      <SubmitRevertButtons @revert="prepareData" @submit="submit"/>
</template>