<script setup>
import { ref, watchEffect, h, computed } from 'vue'
import { useRouter } from 'vue-router'
import { NDataTable, NButton, NInput, NPagination, NSpace, NA, NAvatar, NSwitch, NTag, NIcon, loadingBarProviderProps } from "naive-ui"
import { CheckmarkCircle as Check } from '@vicons/ionicons5'
import { fetchUserData } from "./fetchUserData.js";

const router = useRouter()

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
    filter: ""
})

const paginationRef = ref({
    pageSize: pageSizes[0].value,
    pageSizes: pageSizes,
    page: 2,
    showSizePicker: true,
    pageCount: 10
})

const showProfile = (username)=>{
    router.push(`/user/?u=${username}`);
}

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
                'div',
                {
                    style: { cursor: 'pointer' },
                    onClick: ()=> showProfile(row.username)
                },
                h(
                    NAvatar,
                    {
                        objectFit: 'contain',
                        round: true,
                        size: 48,
                        src: row.src
                    }
                )
            )
        }
    },
    {
        title: 'Username',
        key: 'username',
        render(row) {
            return h(
                'a',
                {
                    href: '#',
                    onClick: ()=> showProfile(row.username)
                },
                row.username
            )
        }
    },
    {
        title: 'Registered since',
        key: 'date_created',
    },
    {
        title: 'Available for Hire',
        key: 'available',
        render(row) {
            return row.available ? h(NIcon, {color: "#0e7a0d", size: "20"}, [h(Check)]) : null
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

watchEffect(async () => { 

    loading.value = true;
    
    await fetchUserData( tableData, state );

    loading.value = false;

    if (state.value.totalPages > 0)
    {
        paginationRef.value = {
            pageSize: state.value.pageSize,
            pageSizes: pageSizes,
            page: state.value.currentPage,
            showSizePicker: true,
            pageCount: state.value.totalPages || 1
        }
    }

    if (isLess.value){
        window.scrollTo({ top: 0, behavior: 'smooth' });
        isLess.value = false;
    }
})


</script>

<template>
    <div class="row mb-3">
        <div class="col">
            <n-input v-model:value="filterField" type="text" placeholder="Username" style="width: 10rem;" @clear="clearFilter" clearable/>
            <n-button strong secondary @click="applyFilter" class="ml-xs-0 ml-2">Search</n-button>
        </div>
        <div class="ml-auto mr-1">
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
    <n-space vertical :size="12">
        <n-data-table
            :loading="loading"
            :bordered="false"
            :columns="columns"
            :data="tableData"
            />
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