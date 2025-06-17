<script setup>
import { ref, watchEffect, h, computed } from 'vue'
import { NDataTable, NButton, NInput, NPagination, NSpace, NA, NAvatar, NSwitch, NTag, NIcon, loadingBarProviderProps } from "naive-ui"
import { CheckmarkCircle as Check } from '@vicons/ionicons5'
import { fetchUserData } from "./fetchUserData.js";
import { showUserProfile } from "../utils.js"
import AvatarColumn from '../components/AvatarColumn.vue'
import ForHireColumn from '../components/ForHireColumn.vue'

const pageSizes = [
    { label: '10 per page', value: 10 },
    { label: '20 per page', value: 20 },
    { label: '50 per page', value: 50 }
]

const state = ref({
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
    pageSize: 10,
    filter: "",
    sort: null
})

const paginationRef = ref({
    pageSize: pageSizes[0].value,
    pageSizes: pageSizes,
    page: 2,
    showSizePicker: true,
    pageCount: 10
})

const filterField = ref("");
const filterFieldForHire = ref(false);

function applyFilter()
{
    state.value.currentPage = 1;
    state.value.filter = filterField.value;
}

function resetFilter()
{
    state.value.filter = filterField.value = '';
}

const isLess = ref(false)

const handlePageChange = (curPage) => {
      state.value.currentPage = curPage
    };

const handlePageSizeChange = (pageSize) => {
    isLess.value = pageSize < state.value.pageSize;

    state.value.pageSize = pageSize;
    state.value.currentPage = 1;
};

function clearFilter()
{
    state.value.filter = "";
}

const tableData = ref([])
const loading = ref(true)

const columns = [
    {
        width: "60",
        key: 'avatar',
        render(row) {
            return h(
                AvatarColumn,
                {
                    src: row.src,
                    onClick: (event)=> showUserProfile(row.username, event)
                }
            )
        }
    },
    {
        title: 'Username',
        key: 'username',
        sorter: true,
        render(row) {
            return h(
                'a',
                {
                    href: row.username,
                    onClick: (event)=> showUserProfile(row.username, event)
                },
                row.username
            )
        }
    },
    {
        title: 'Location',
        key: 'location',
        sorter: true
    },
    {
        title: 'Registered since',
        key: 'date_created',
        sorter: true
    },
    {
        title: 'Available for Hire',
        key: 'related.hire.available',
        sorter: true,
        render(row) {
            return h(
                ForHireColumn, 
                { value: row.available}
            )
        }
    }
]

function jumpToPage()
{
    if (pageToJump.value < 1 || pageToJump.value > totalPages.value ){
        pageToJump.value = currentPage.value
    }
    else{
        currentPage.value = pageToJump.value
    }        
}

watchEffect(() => {
    if (filterField.value === "")
        applyFilter();
}); 

watchEffect(async () => { 
  
    try{
        loading.value = true;
        const result = await fetchUserData(state.value);

        tableData.value = result.data;
        state.value.totalCount = result.totalCount;
        state.value.totalPages = result.totalPages;

        if (result.totalPages > 0)
        {
            paginationRef.value = {
                pageSize: state.value.pageSize,
                pageSizes: pageSizes,
                page: 1,
                showSizePicker: true,
                pageCount: result.totalPages || 1
            }
        }
     
        if (isLess.value){
        window.scrollTo({ top: 0, behavior: 'smooth' });
        isLess.value = false;
    }

    }
    catch (err){
        console.log (err)
    }
    finally{
        loading.value = false;
    }
})


</script>

<template>
    <div class="row mb-3">
        <div class="col-12 mb-3 mb-md-0 col-md">
            <n-input 
                v-model:value="filterField" 
                type="text" 
                placeholder="Username" 
                style="width: 10rem;" 
                @clear="clearFilter" 
                @keyup.enter="applyFilter"
                @keyup.esc="clearFilter"
                clearable/>
            <n-button 
                strong 
                secondary 
                @click="applyFilter" 
                class="ml-xs-0 ml-2">Search</n-button>
        </div>
        <div class="ml-3 ml-md-auto mr-3">
            <n-pagination 
                :page="state.currentPage" 
                :page-count="state.totalPages"
                :page-sizes="pageSizes"
                show-size-picker
                :on-update:page="handlePageChange"
                :on-update:page-size="handlePageSizeChange"/>
        </div>
    </div>
    <n-space vertical :size="12">
        <n-data-table
            :loading="loading"
            :bordered="false"
            :columns="columns"
            :data="tableData"
            @update:sorter="s => state.sort = s"/>
    </n-space>
        <div class="row mt-3">
            <div class="ml-auto">
                <n-pagination 
                    :page="state.currentPage" 
                    :page-count="state.totalPages"
                    :page-sizes="pageSizes"
                    show-size-picker
                    :on-update:page="handlePageChange"
                    :on-update:page-size="handlePageSizeChange"
                />
            </div>
        </div>
</template>