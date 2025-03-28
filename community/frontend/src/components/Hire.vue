<script setup>
import { email } from '@vueform/vueform';
import { ref, watch, onMounted, computed } from 'vue'
import Constants from '../constants'
import { submitForm, errorHandler }  from '../utils'

const emit = defineEmits(['reload'])

const { data, constants, keycloak } = defineProps(['data', 'constants', 'keycloak'])
const hiretypes = ref([])
const isChanged = ref(false)
const form$ = ref(null)
const columns = {
  sm: { container: 12, label: 4, wrapper: 12 },
  lg: { container: 12, label: 4, wrapper: 12 }
}
  
onMounted(async ()=>{
  setFormData();
})

const setFormData = async ()=>{
  hiretypes.value = constants.hireOptions

  if (form$.value != null)
  {
    await form$.value.load(data, true)
    form$.value.clean()
    isChanged.value=false;
  }
}

watch (()=>data, async(newValue, oldValue) => {
  if (form$.value != null)
  {
    setFormData()
  }
}, { immediate: true })

const formatLoadedData = (data) => {

  var d = {
        available: data.hire[0].available,
        types: data.hire[0].types.map((e)=>{return e.value}),
        // workFor: data.hire.workFor.map ((e)=>{
        //   return {
        //     status: e.status,
        //     company: e.company,
        //     role: constants.companyRoles.find((el)=> el.id == e.role).role
        //   }
        // })
    }
   
  return d
}

const handleSuccess = (response, form$) => {
  form$.messageBag.clear() // clear message bag
  form$.messageBag.append('Updated', 'message') // add success message

  emit ('reload')
}

const handleError = errorHandler

const submit = async (FormData, form$) => {
  const data = {
      available: FormData.available,
      types: FormData.types
  }
  const result = submitForm (form$, data, Constants.EDIT_HIRE, keycloak)
  return result
}

const handleChange = () => {
  isChanged.value = true
}

const disable = (form$) => ({
  ElementLayout: {
    container: [
      { 'disabled': form$.el$('hire.available')?.value === 'false' }
    ],
  }
})

</script>

<template>
  <Vueform
    size="md"
    ref="form$" 
    form-key="hire"
    method="post"
    @success="handleSuccess"
    @error="handleError"
    @change="handleChange"
    :endpoint="submit"
    :format-load="formatLoadedData"
    >

    <!-- <StaticElement
      name="hire_title"
      content="Hire"
      tag="h2"
    /> -->
    
    <GroupElement name="hire">
        <ToggleElement name="available" true-value="true" false-value="false" :columns="columns" label="Available for Hire"/>
    
        <GroupElement name="hiregroup" :add-classes="disable">
            <CheckboxgroupElement 
                :columns="columns"
                name="types" 
                label="Available For"
                :items="hiretypes"/>
        </GroupElement>
    </GroupElement>

    <GroupElement :columns="columns" name="buttons">
      <ButtonElement full
      name="submit"
      :submits="true"
      button-label="Update"
      :columns="{
        default: 12,
        sm: 6
      }"
      :disabled="!isChanged"
      size="sm"/>

      <ButtonElement secondary
        name="reset"
        button-label="Revert"
        align="right"
        :resets="true"
        :columns="{
          default: 12,
          sm: 6
        }"/>
    </GroupElement>

  </Vueform>
</template>