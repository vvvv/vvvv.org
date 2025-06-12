<script setup>
import { onMounted, ref } from 'vue';
import { NPerformantEllipsis } from 'naive-ui'

const { text, maxLength, clippedLength } = defineProps(['text', 'maxLength', 'clippedLength']);

const buttonTexts = ['Show More', 'Show Less']

const buttonState = ref(0);
const tooLong = ref(false);
const content = ref(text);

onMounted(()=>{
    if (text.length > maxLength)
        tooLong.value = true;
    content.value = text.trim();
})

function toggleText()
{
    if (buttonState.value)
    {
        buttonState.value = 0;   
    }
    else
    {
        buttonState.value = 1; 
    }
}

</script>

<template>
    <NPerformantEllipsis line-clamp="3" tooltip=false v-if="tooLong && buttonState == 0">
        <span v-html="text"></span>
    </NPerformantEllipsis>
    <span v-else v-html="text"></span>
    <div><a href="#" v-if="tooLong" @click.prevent="toggleText"> {{ buttonTexts[buttonState] }}</a></div>
</template>