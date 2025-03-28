<script setup>
  import { ref, watch, onMounted } from 'vue'
  import Constants from '../constants'
  import { submitForm, removeFile, uploadTempFile, errorHandler }  from '../utils'

  const emit = defineEmits(['reload'])

  const { data, constants, keycloak } = defineProps(['data', 'constants', 'keycloak'])
  const isChanged = ref(false)
  const form$ = ref(null)
  const userpic = ref(null)
  var fields = new Array(4)
  var tempUserpic = ""
  const columns = {
    sm: { container: 12, label: 4, wrapper: 12 },
    lg: { container: 12, label: 4, wrapper: 12 }
  }

  onMounted(async ()=>{
    fields = fields.map ((e)=>{
      return {
        key: "",
        value: ""
      }
    })

    setFormData()

  })

  const setFormData = async ()=>{
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

  if (data.user.userpic != null)
  {
    userpic.value = Constants.ASSETS + data.user.userpic;
  }

  var d = {
      basics:{
        name: data.user.name,
        surname: data.user.surname,
        username: data.user.username,
        statement: data.user.statement,
        homepage: data.user.homepage,
        email: data.user.email,
        newsletter: data.user.newsletter,
        userpic: data.user.userpic,
      },
      social:
      {
        github: data.social.github,
        nuget: data.social.nuget
      },
      fields: data.social.fields
    }

  return d
}

const handleSuccess = (response, form$) => {
  form$.messageBag.clear() // clear message bag
  form$.messageBag.append('Updated', 'message') // add success message

  emit ('reload')
}

const formChanged = (data)=> {
  isChanged.value = true
}

const submit = async (FormData, form$) => {

  if (FormData.basics.avatar_upload)
    {
      FormData.basics.userpic = tempUserpic = FormData.basics.avatar_upload.tmp;
      delete FormData.basics.avatar_upload
    }

    var postData = {
      basics: FormData.basics,
      social: {
        nuget: FormData.social.nuget,
        github: FormData.social.github,
        fields: FormData.fields
      }
    }

  return submitForm (form$, data, Constants.EDIT_BASICS, keycloak)
}

const upload = async (value, el$) => {
  return uploadTempFile(value, el$, keycloak)
}

const remove = async (value, el$) => {
  removeFile(value, el$, keycloak)
}



</script>

<template>
  <Vueform 
    ref="form$" 
    form-key="basics"
    method="post"
    @success="handleSuccess"
    @error="errorHandler"
    @change="formChanged"
    :endpoint="submit"
    :format-load="formatLoadedData" 
    :previewUrl="Constants.ASSETS"
    >

    <StaticElement v-if="userpic != null"
        name="userpic" 
        tag="img"
        :src="userpic"
        :width="`${100}`"
        >
    </StaticElement>

    <ObjectElement name="basics">

        <!-- TODO: ADD TOKEN FOR UPLOADING -->
        <FileElement
          view="image"
          name="avatar_upload"
          accept="image/*"
          description="Choose an avatar"
          :rules="[
            'max:1024',
          ]"
          :upload-temp-endpoint="upload"
          :remove-temp-endpoint="remove"
          :remove-endpoint="remove"
        />

        <TextElement name="username" label="Username" :columns="columns" disabled/>
        <TextElement name="email" :columns="columns" label="Email" disabled/>
        <TextElement name="name" :columns="columns" label="Name"/>
        <TextElement name="surname" :columns="columns" label="Surname"/>
        <TextElement name="homepage" :columns="columns" label="Homepage"/>
        <TextareaElement name="statement" :columns="columns" label="Statement"/>
        <ToggleElement name="newsletter" true-value="true" false-value="false" :columns="columns" label="Newsletter"/>
      </ObjectElement>
      <ObjectElement name="social" label="Social" :columns="columns">
          <TextElement
          name="github"
          placeholder="GitHub"
          size="lg"
          :columns="{
            default: 12,
            sm: 6
          }"
          />
          <TextElement
            name="nuget"
            placeholder="NuGet"
            size="lg"
            :columns="{
              default: 12,
              sm: 6
            }"
          />
        </ObjectElement>

        <!-- Fields -->
        <ObjectElement name="fields" label="Custom Fields" :columns="columns">
          <template v-for="(item, index) in fields">
              <ObjectElement :name="index">
                <TextElement
                name="key"
                placeholder="Key"
                size="lg"
                :columns="{
                  default: 12,
                  sm: 6
                }"
                />
                <TextElement
                  name="value"
                  placeholder="Value"
                  size="lg"
                  :columns="{
                    default: 12,
                    sm: 6
                  }"
                />
              </ObjectElement>
          </template>
        </ObjectElement>
      
      <StaticElement tag="hr" name="separator"/>

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