<script setup>
import { watch, ref } from 'vue'
import { NList, NListItem, NTag, NSpin, NButton } from 'naive-ui'
import LocationErrorRenderer from './LocationErrorRenderer.vue'

const props = defineProps({
    state: { type: Object, required: true}
})
const selected = ref(false);

const emit = defineEmits(['select', 'retry']);

function select(place)
{
    emit('select', place);
    selected.value = true;
}

watch (()=>props.state, (newValue)=>{
    selected.value = false;
})

</script>

<template>
    <div class="results">
        <div v-if="state.type === 'loading'" class="loading">
            <NSpin size="small" />
        </div>

        <LocationErrorRenderer v-if="state.type === 'error'" :error="state.error" @retry="emit('retry')"/>

        <div v-else-if="!selected && state.type === 'found'" class="many">
            <p class="info">Pick a location below and adjust the pin if needed:</p>
            <NList clickable show-divider bordered>
                <NListItem v-for="place in state.results" :key="place.place_id" @click="select(place)">
                    {{ place.text }}<br/>
                    <template #suffix>
                        <NButton @click="select(place)" type="primary">Pin on map</NButton>
                    </template>
                </NListItem>
            </NList>
        </div>
    </div>
</template>