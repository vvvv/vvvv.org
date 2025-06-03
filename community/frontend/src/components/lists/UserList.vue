<script setup>
import { ref } from 'vue'
import UserListTable from './UserListTable.vue'

const emit = defineEmits(['showProfile'])
</script>

<template>
    <UserListTable @showProfile="(e) => emit('showProfile', e)"/>
</template>