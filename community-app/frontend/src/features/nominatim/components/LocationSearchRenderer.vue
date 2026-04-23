<script setup>
import { watch, ref, computed } from 'vue'
import { NList, NListItem, NTag, NSpin, NButton, NSelect } from 'naive-ui'
import LocationErrorRenderer from './LocationErrorRenderer.vue'

const props = defineProps({
    state: { type: Object, required: true}
})

const emit = defineEmits(['select', 'retry']);

function select(place)
{
    selectedOption.value = place.text;
    emit('select', place);
}

const options = ref([]);
const defaultValue = ref("");
const selectedOption = ref(null);

watch (()=>props.state, (newValue)=>{

    if (newValue)
    {
        selectedOption.value = null;

        if (newValue.type === 'found' && newValue.results.length >0)
        {
            options.value = newValue.results.map((r)=>{
                return {
                    label: r.text,
                    value: r
                }
            })

            defaultValue.value = "Navigate map to:";
        }
        else if (newValue.type === 'loading')
        {
            defaultValue.value = "Searching..."
        }   
        else {
            defaultValue.value = "Location can't be found";
        }
    }
})

</script>

<template>
    <div class="results">
        <div v-if="state.type === 'loading'" class="loading">
            <NSpin size="small" />
        </div>

        <LocationErrorRenderer v-if="state.type === 'error'" :error="state.error" @retry="emit('retry')"/>

        <NSelect
                v-model:value ="selectedOption"
                :on-update:value="select" 
                :options="options" 
                :disabled="options.length == 0" 
                :placeholder="defaultValue"
                :reset-menu-on-options-change="true"
                >
        </NSelect>      

    </div>
</template>