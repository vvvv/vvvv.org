<script setup>
import { ref, reactive, watchEffect, watch, h, computed, onMounted, onUnmounted, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { NDataTable, NButton, NInput, NPagination, NSpace, NA, NAvatar, NSwitch, NTag, NIcon, loadingBarProviderProps } from "naive-ui"
import { CheckmarkCircle as Check } from '@vicons/ionicons5'
import { fetchUserData } from "./fetchUserData.js";
import { showUserProfile } from "../utils.js"
import AvatarColumn from '../components/AvatarColumn.vue'
import ForHireColumn from '../components/ForHireColumn.vue'
import debounce from 'lodash/debounce'

const windowWidth = ref(window.innerWidth);
const router = useRouter();
const route = useRoute();
const initialized = ref(false);

const state = reactive({
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
    pageSize: 10,
    filter: "",
    sort: {
        order: "ascend",
        columnKey: "last_modified"
    }
})

onMounted(()=>{
    if (route.query.p)
    {
        showUserProfile (route.query.p);
        return;
    }

    window.addEventListener('resize', onWidthChange);
    state.currentPage = Number(route.query.page) || 1;

    initialized.value = true;
})

onUnmounted(() => {
    window.removeEventListener('resize', onWidthChange)
})

function onWidthChange(){
    windowWidth.value = window.innerWidth; 
}

const pageSizes = [
    { label: '10 per page', value: 10 },
    { label: '50 per page', value: 50 },
    { label: '100 per page', value: 100 }
]



const paginationRef = ref({
    pageSize: pageSizes[0].value,
    pageSizes: pageSizes,
    page: 1,
    showSizePicker: true,
    pageCount: 10
})

const filterField = ref("");
const filterFieldForHire = ref(false);

function applyFilter()
{
    state.currentPage = 1;
    state.filter = filterField.value;
}

function resetFilter()
{
    state.filter = filterField.value = '';
}

const isLess = ref(false)

const handlePageChange = (curPage) => {
      state.currentPage = curPage
};

const handlePageSizeChange = (pageSize) => {
    isLess.value = pageSize < state.pageSize;

    state.pageSize = pageSize;
    state.currentPage = 1;
};

function clearFilter()
{
    state.filter = "";
}

const tableData = ref([])
const loading = ref(true)

const columns = [
    {
        key: 'avatar',
        width: 30,
        render(row) {
            return h(
                AvatarColumn,
                {
                    src: row.src,
                    username: row.username
                }
            )
        }
    },
    {
        title: 'Username',
        key: 'username',
        width: 100,
        sorter: true,
        ellipsis: true,
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
        width: 70,
        ellipsis: true,
        sorter: true
    },
    {
        title: 'Available for Hire',
        key: 'related.hire.available',
        width: 60,
        ellipsis: true,
        sorter: true,
        render(row) {
            return h(
                ForHireColumn, 
                { value: row.available}
            )
        }
    },
    {
        title: 'Since',
        key: 'date_created',
        width: 50,
        ellipsis: true,
        sorter: true
    },
    {
        title: 'Updated',
        key: 'last_modified',
        width: 50,
        ellipsis: true,
        sorter: true
    }    

]

const columnsRef = ref(columns);

function jumpToPage()
{
    if (pageToJump.value < 1 || pageToJump.value > totalPages.value ){
        pageToJump.value = state.currentPage
    }
    else{
        state.currentPage = pageToJump.value
    }        
}

watch (()=>state.sort, (sort, oldSort)=>{
    if (sort !== oldSort) state.currentPage = 1;
})

watchEffect(()=>{
    router.push({ query: { ...route.query, page: state.currentPage } });
})

watchEffect (()=>{
    const w = windowWidth.value;
    columnsRef.value = w < 600 ? columns.slice(0, 2) : w < 1024 ? columns.slice(0, 4) : columns;
})

watchEffect(() => {
    if (filterField.value === "")
        applyFilter();
});

watchEffect(async ()=>{
    if (initialized.value) {
        await fetch();
    }
})

async function fetch()
{
    try{

        loading.value = true;
    
        const result = await fetchUserData(state);

        tableData.value = result.data;
        state.totalCount = result.totalCount;
        state.totalPages = result.totalPages;

        if (result.totalPages > 0)
        {
            paginationRef.value = {
                pageSize: state.pageSize,
                pageSizes: pageSizes,
                page: state.currentPage,
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
}

const setDebouncedFilter = debounce((value)=>{
        state.filter = value;
        console.log (value);
}, 400);

const onInput = (value) => {
    setDebouncedFilter(value);
};

</script>

<template>
    <div class="row mb-3">
        <div class="col-12 col-md-5 mb-3 mb-md-0">
            <n-input 
                v-model:value="filterField" 
                type="text" 
                placeholder="Username" 
                style="width: 10rem;" 
                @clear="clearFilter" 
                @keyup.enter="applyFilter"
                @keyup.esc="clearFilter"
                @update:value="onInput"
                :loading="loading ? loading : undefined"
                clearable/>
            <n-button 
                strong 
                secondary 
                @click="applyFilter" 
                class="ml-xs-0 ml-2 mr-3 mb-md-2">Search</n-button>
        </div>
        <div class="ml-3 mr-3 ml-md-auto">
            <n-pagination 
                :page="state.currentPage" 
                :page-count="state.totalPages"
                :page-sizes="pageSizes"
                :page-size="state.pageSize"
                :page-slot="5"
                show-size-picker
                :on-update:page="handlePageChange"
                :on-update:page-size="handlePageSizeChange"/>
        </div>
    </div>
    <div class="overflow-auto">
            <n-data-table
                :loading="loading"
                :bordered="false"
                :columns="columnsRef"
                :data="tableData"
                :sorter="state.sort"
                @update:sorter="s => state.sort = s"
                class="userTable"
                style="white-space: pre;"/>
    </div>
        <div class="row mt-3">
            <div class="ml-auto">
                <n-pagination 
                    :page="state.currentPage" 
                    :page-count="state.totalPages"
                    :page-sizes="pageSizes"
                    :page-size="state.pageSize"
                    :page-slot="5"
                    show-size-picker
                    :on-update:page="handlePageChange"
                    :on-update:page-size="handlePageSizeChange"
                />
            </div>
        </div>
</template>