<script setup>
import SyncButton from "../SyncButton.vue"

defineProps(['showRefresh', 'loading', 'title', 'showAllLink']);
const emit = defineEmits(['showAll', 'sync']);

</script>

<template>
    <div class="row pb-1 mb-2 sectionBorder no-gutter">
        <div class="d-flex col-auto">
            <a v-if="showAllLink" :href="showAllLink" @click.prevent="emit('showAll')" class="pr-3"><h2>{{title}}</h2></a>
            <h2 v-else>{{ title }}</h2>
            <slot></slot>
        </div>
        <div v-if="showRefresh" class="col-1 ml-auto">
            <SyncButton v-if="!loading" @click="emit('sync')"/>
            <span v-else>...</span>
        </div>
    </div>
</template>