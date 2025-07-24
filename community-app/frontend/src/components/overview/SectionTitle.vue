<script setup>
import SyncButton from "../SyncButton.vue"

defineProps(['showRefresh', 'loading', 'title', 'link', 'isExternal']);
const emit = defineEmits(['showAll', 'sync']);

</script>

<template>
    <div class="row pb-1 mb-2 sectionBorder no-gutter align-items-center justify-content-between">
        <div class="d-flex col pl-0">
            <template v-if="link">
                <a v-if="!isExternal" :href="link" @click.prevent="emit('showAll')" class="pr-3"><h2>{{title}}</h2></a>
                <a v-else :href="link" class="pr-3" target="_blank"><h2>{{title}}</h2></a>
            </template> 
            <h2 v-else>{{ title }}</h2>
            <slot></slot>
        </div>
        <div v-if="showRefresh" class="col-auto">
            <div class="d-flex align-items-center">
                <slot name="beforeSync"></slot>
                <SyncButton v-if="!loading" @click="emit('sync')"/>
                <span v-else>...</span>
            </div>
        </div>
    </div>
</template>