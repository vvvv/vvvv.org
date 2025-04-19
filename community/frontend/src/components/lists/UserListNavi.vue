<script setup>

import { ref } from 'vue'
import { NSwitch, NButton, NInput } from "naive-ui"

const state = defineModel()

const filterField = ref("")
const columns = ref(null)
const filterFieldForHire = ref(false)

function applyFilter()
{
    state.value.currentPage = 1
    state.value.filter = filterField.value
}

function resetFilter()
{
    state.value.filter = filterField.value = ''
}

</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-color">
            <!-- <ul class="navbar-nav nav nav-pills" role="tablist">
                <li class="nav-item mr-1" :class="{active: !state.isMap}">
                    <a class="nav-link px-4" :class="{active: !state.isMap}" href="#" @click="state.isMap=false">List</a>
                </li>
                <li class="nav-item" :class="{active: state.isMap}">
                    <a class="nav-link px-4" :class="{active: state.isMap}" href="#" @click="state.isMap=true">Map</a>
                </li>
            </ul>
        <div class="mr-auto"></div> -->
        <n-input v-model:value="filterField" type="text" placeholder="Username" style="width: 10rem;" />
        <n-button strong secondary @click="applyFilter" size="large" class="ml-md-2">Search</n-button>
    </nav>
    <template>

        <n-space vertical :size="12">
            <n-data-table
                :bordered="false"
                :single-line="false"
                :columns="columns"
                :data="data"
                :pagination="pagination"
                />
        </n-space>

        <nav class="navbar navbar-expand-lg navbar-color border-top">
                <ul class="navbar-nav nav nav-pills mr-auto mt-1" role="tablist">       
                    <li class="nav-item">
                        <div class="vr"></div>
                    </li>
                    <li class="nav-item mr-1">
                        <button class="btn btn-sm btn-outline-secondary" href="#" @click="state.currentPage--" :disabled="state.currentPage <= 1">Prev</button>
                    </li>
                    <li class="nav-item">
                        <button class="btn btn-sm">{{  state.currentPage }} of {{ state.totalPages }}</button>
                    </li>
                    <li class="nav-item mr-3">
                        <button class="btn btn-sm btn-outline-secondary" href="#" @click="state.currentPage++" :disabled="state.currentPage >= state.totalPages">Next</button>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="btn btn-sm btn-outline-secondary" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Per Page ({{ state.pageLimit }})
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a class="dropdown-item" href="#" @click="state.pageLimit=10">10</a>
                            <a class="dropdown-item" href="#" @click="state.pageLimit=20">20</a>
                            <a class="dropdown-item" href="#" @click="state.pageLimit=50">50</a>
                        </div>
                    </li>
                </ul>
        </nav>
            <!-- border-left pl-2 -->
    </template>
</template>