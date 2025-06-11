<script setup>
import { ref, onMounted } from 'vue';
import { NFormItem, NInput } from 'naive-ui';
import InfoButton from "../InfoButton.vue";
import InputField from "../InputField.vue";
import Helps from "./helps.js";

const model = defineModel('value')

</script>
<template>
    <div class="row">
        <div class="col-12 col-lg-6">
            <InputField path="website" label="Website" info="Website" v-model="model.website"/>
            <InputField path="github" label="Github" info="Github" placeholder="Github" v-model="model.github"/>
            <InputField path="nuget" label="NuGet" info="Nuget" placeholder="NuGet" v-model="model.nuget"/>
        </div>
        <div class="col-12 col-lg-6">
            <InputField path="mastodon" label="Mastodon" info="Mastodon" placeholder="mastodon.xyz/@vvvv" v-model="model.mastodon"/>
            <InputField path="pixelfed" label="Pixelfed" info="Pixelfed" placeholder="pixelfed.social/madewithvvvv" v-model="model.pixelfed"/>
        </div>
    </div>

    <n-form-item>
        <template #label>
            Custom Fields
            <InfoButton :info="Helps['customFields']"/>
        </template>
        <div class="d-flex flex-column">
            <template v-for="(field, index) in model.fields" :key="index">
                <div class="row mb-3 mb-lg-2">
                    <div class="col-12 col-lg-6 mb-2 mb-lg-0">
                        <n-input 
                            v-model:value="field.key" 
                            placeholder="Label"
                        />
                    </div>
                    <div class="col-12 col-lg-6">
                        <n-input 
                            v-model:value="field.value" 
                            placeholder="Content" 
                        />
                    </div>
                </div>
            </template>
        </div>   
    </n-form-item>
</template>