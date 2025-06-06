<script setup>
import { onMounted, ref } from 'vue';

const { text, maxLength, clippedLength } = defineProps(['text', 'maxLength', 'clippedLength']);

const buttonTexts = ['Show More', 'Show Less']

const content = ref(null);
const buttonState = ref(0);
const tooLong = ref(false);

onMounted(()=>{

    if (text.length > maxLength)
    {
        content.value = text.slice(0, clippedLength).trim();
        tooLong.value = true;
    }
    else
    {
        content.value = text;
    }
})

function toggleText()
{
    if (buttonState.value)
    {
        content.value = text.slice(0, clippedLength).trim();
        buttonState.value = 0;   
    }
    else
    {
        content.value = text;
        buttonState.value = 1; 
    }
}

</script>

<template>
    <span v-html="content"></span><span v-if="tooLong && buttonState == 0">...</span>
    <div><a href="#" v-if="tooLong" @click.prevent="toggleText"> {{ buttonTexts[buttonState] }}</a></div>
</template>