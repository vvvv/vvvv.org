<script setup>
import { ref, onMounted } from 'vue';
import { NFormItem, NInput } from 'naive-ui';
import InfoButton from "../InfoButton.vue";
import InputField from "../InputField.vue";
import Helps from "./HelpTexts.js";

const model = defineModel('value');
defineProps(['type']);

</script>
<template>
    <div class="row">
        <div class="col-12 col-lg-6">
            <InputField path="website" :type="type" v-model="model.website"/>
            <InputField path="github" :type="type" v-model="model.github"/>
            <InputField path="nuget" :type="type" v-model="model.nuget"/>
        </div>
        <div class="col-12 col-lg-6">
            <InputField path="mastodon" :type="type" v-model="model.mastodon"/>
            <InputField path="pixelfed" :type="type" v-model="model.pixelfed"/>
            <InputField path="peertube" :type="type" v-model="model.peertube"/>
        </div>
        <div class="col-12 col-lg-6">
            <InputField path="vimeo" :type="type" v-model="model.vimeo"/>
        </div>
        <div class="col-12 col-lg-6">
            <InputField path="youtube" :type="type" v-model="model.youtube"/>
        </div>
        <div class="col-12 col-lg-6">
            <InputField path="linkedin" :type="type" v-model="model.linkedin"/>
        </div>
    </div>

    <n-form-item>
        <template #label>
            Custom Fields
            <InfoButton :info="Helps['customFields'].help"/>
        </template>
        <div class="d-flex flex-column w-100">
            <template v-for="(field, index) in model.fields" :key="index">
                <div class="row mb-3 mb-lg-2">
                    <div class="col-12 col-lg-6 mb-2 mb-lg-0">
                        <n-input 
                            v-model:value="field.key" 
                            :placeholder="Helps['customFields'].placeholder?.key"
                        />
                    </div>
                    <div class="col-12 col-lg-6">
                        <n-input 
                            v-model:value="field.value" 
                            :placeholder="Helps['customFields'].placeholder?.value" 
                        />
                    </div>
                </div>
            </template>
        </div>   
    </n-form-item>
</template>