<script setup>
import { ref, watch } from 'vue'
import { removeFile, uploadFile, createAssetUrl } from '../../utils.js'
import { NButton, NUpload, NAlert } from 'naive-ui'
import Constants from '../../constants.js'
import { getImageHelps } from './HelpTexts.js'

const { buttonText, folder, type } = defineProps(['buttonText','folder', 'type']);

const emit = defineEmits(['change']);

const fileList = ref([]);
const tempFile = ref(null);
const message = ref(null);

const reset = () => {
    fileList.value = [];
    tempFile.value = null;
}

defineExpose({
    reset
})

const beforeUpload = async (data)=>{

    const mimes = Constants.FILE_TYPES.map(f=>f.mime);

    if (!mimes.includes(data.file.file?.type)) {
          message.value = "Only upload image files in correct format, please re-upload.";
          return false;
        }
        message.value = null;
        return true;
}

const handleFileChange = async (data) => {

    if (data.file.status == 'removed')
    {
        removeFile(tempFile.value)
        tempFile.value = null
    }
    else
    {
        tempFile.value = await uploadFile(data.file, folder)
    }

    emit('change', tempFile.value)
}

const updateFileList = (newFileList) => {
      fileList.value = newFileList;
}

const createThumbnailUrl = (file)=>{
  if (file && tempFile.value !== null)
  {
    return createAssetUrl(tempFile.value)
  }

  return undefined
}

</script>
<template>
    <NUpload
        list-type="image"
        :max="1"
        accept="image/*"
        :default-upload="false"
        :file-list="fileList"
        
        @before-upload="beforeUpload"
        @change="handleFileChange"
        @update:file-list="updateFileList"
        :create-thumbnail-url="createThumbnailUrl"
    >
        <NButton type="primary">{{ buttonText }}</NButton>
            <p class="text-muted imageHelp mt-1"> ({{ getImageHelps(type).help }})</p>
    </NUpload>
    <NAlert v-if="message" title="Careful" type="error">
        {{ message }}
    </NAlert>
</template>