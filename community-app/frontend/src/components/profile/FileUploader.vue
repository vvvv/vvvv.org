<script setup>
import { ref, watch, defineExpose } from 'vue'
import { removeFile, uploadFile, createAssetUrl } from '../../utils.js'
import { NButton, NUpload } from 'naive-ui'

const { buttonText, folder } = defineProps(['buttonText','folder']);

const emit = defineEmits(['change']);

const fileList = ref([]);
const tempFile = ref(null);

const reset = () => {
    fileList.value = [];
    tempFile.value = null;
}

defineExpose({
    reset
})

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
        @change="handleFileChange"
        @update:file-list="updateFileList"
        :create-thumbnail-url="createThumbnailUrl"
    >
        <NButton type="primary">{{ buttonText }}</NButton>
    </NUpload>
</template>