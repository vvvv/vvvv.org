<script setup>
import { ref, watch, onMounted } from 'vue'
import { removeFile, uploadFile, createAssetUrl } from '../utils.js'
import { NButton, NUpload, NRow, NCol, NAvatar } from 'naive-ui'

const { src, buttonText, round } = defineProps(['src', 'buttonText', 'round'])

const emit = defineEmits(['change'])

const fileList = ref([])
const tempUserpic = ref(null)
const userpic = ref(src)

watch(()=> src, (newVal) =>{
    userpic.value = newVal
    fileList.value = []   
})

const handleFileChange = async (data) => {

    if (data.file.status == 'removed')
    {
        removeFile(tempUserpic.value)
        tempUserpic.value = null
    }
    else
    {
        tempUserpic.value = await uploadFile(data.file)
        emit('change', tempUserpic.value)
    }
}

const updateFileList = (newFileList) => {
      fileList.value = newFileList;
}

const createThumbnailUrl = (file)=>{
  if (file && tempUserpic.value !== null)
  {
    return createAssetUrl(tempUserpic.value)
  }

  return undefined
}

</script>
<template>
    <n-row :gutter="[0, 24]">
        <n-col :span="6">
        <n-avatar
            :round="round"
            :size="64"
            :src="userpic"
            fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
        </n-col>
        <n-col :span="18">
            <n-upload
            list-type="image"
            :max="1"
            accept="image/*"
            :default-upload="false"
            :file-list="fileList"
            @change="handleFileChange"
            @update:file-list="updateFileList"
            :create-thumbnail-url="createThumbnailUrl"
            >
            <n-button type="primary">{{ buttonText }}</n-button>
            </n-upload>
        </n-col>
    </n-row> 
</template>