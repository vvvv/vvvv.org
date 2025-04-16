<script setup>
import { ref, onMounted, defineModel } from 'vue'
import { NFormItem, NInput } from 'naive-ui'

const model = defineModel('value')

</script>
<template>
    <div class="row">
        <div class="col-12 col-lg-6">
            <n-form-item label="Website" path="website">
                <n-input v-model:value="model.website" placeholder="Website"/>
            </n-form-item>
            <n-form-item label="Github" path="github">
                <n-input v-model:value="model.github" placeholder="Github"/>
            </n-form-item>
            <n-form-item label="NuGet" path="nuget">
                <n-input v-model:value="model.nuget" placeholder="NuGet"/>
            </n-form-item>
        </div>
        <div class="col-12 col-lg-6">
            <n-form-item label="Mastodon" path="mastodon">
                <n-input v-model:value="model.mastodon" placeholder="mastodon.xyz/@vvvv"/>
            </n-form-item>
            <n-form-item label="Pixelfed" path="pixelfed">
                <n-input v-model:value="model.pixelfed" placeholder="pixelfed.social/madewithvvvv"/>
            </n-form-item>
        </div>
    </div>

    <n-form-item label="Custom Fields">
        <div class="d-flex flex-column">
            <template v-for="(field, index) in model.fields" :key="index">
                <div class="row mb-2">
                    <div class="col-12 col-lg-6">
                        <n-input 
                            v-model:value="field.key" 
                            placeholder="Key"
                        />
                    </div>
                    <div class="col-12 col-lg-6">
                        <n-input 
                            v-model:value="field.value" 
                            placeholder="Value" 
                        />
                    </div>
                </div>
            </template>
        </div>   
    </n-form-item>
</template>