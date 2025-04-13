<script setup>
import { ref } from 'vue'
import UserListNavi from './UserListNavi.vue'
import UserListTable from './UserListTable.vue'

const emit = defineEmits(['showProfile'])

var stateObject = {
    currentPage: 1,
    totalPages: 0,
    pageLimit: 10,
    filter: ""
}

const state = ref (stateObject)

</script>

<template>
    <UserListNavi v-model="state"/>
    <UserListTable v-model="state" @showProfile="(e) => emit('showProfile', e)"/>
</template>