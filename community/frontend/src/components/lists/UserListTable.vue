<script setup>
import { ref, watchEffect, h } from 'vue'
import Constants from '../../constants'
import { NDataTable, NSpace, NA, NAvatar, NSwitch, NTag, NIcon } from "naive-ui"

const emit = defineEmits(['showProfile'])

const state = defineModel()

const pagination = ref(20)
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
                    onClick: ()=> emit('showProfile', row.username)
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
                    onClick: ()=> emit('showProfile', row.username)
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
            if (row.available)
            {
                return h(
                    NIcon,
                    {
                        component: "CheckmarkCircle"
                    }
                )
            }
            else
            {
                return null
            }
            
        }
    }
]


function userpicLink (l)
{
    return `${Constants.ASSETS}${l}?width=40&quality=90&fit=cover`;
}

function showProfile(u)
{
    emit('showProfile', u)
}


function jumpToPage()
{
    if (pageToJump.value < 1 || pageToJump.value > totalPages.value ){
        pageToJump.value = currentPage.value
    }
    else{
        currentPage.value = pageToJump.value
    }        
}

async function fetchData(url)
{
    loading.value = true

    try{
        const response = await fetch(url);
        const data = await response.json();

        tableData.value = []
        data.data.forEach((u) => {
            const row = {
                src: u.userpic ? userpicLink(u.userpic) : null,
                username: u.username,
                available: u.related[0]?.hire?.available ?? false,
                date_created: new Date(u.date_created).toDateString()
            }
            tableData.value.push (row)
        })

        if (data?.meta)
        {
            state.value.totalCount = data.meta.total_count ?? data.meta.filter_count ?? state.value.totalCount    
        }

        state.value.totalPages = Math.ceil(state.value.totalCount / state.value.pageLimit) ?? state.value.totalPages
    }
    catch(error)
    {
        console.error(error)
    }
    finally{
        loading.value = false
    }
}

const _sort = "sort=username"
const _fields =`fields[]=username,userpic,related.hire.available,date_created`

watchEffect(async () => { 

    const buildFilter = () => {
        if (!state.value.filter) return "";
        const usernameFilter = `[username][_contains]=${state.value.filter}`;
        //return `filter === 1 ? usernameFilter : filters.map((f, index) => `&filter[_and][${index}]${f}`).join("")}`;
        return `filter${usernameFilter}`
    };

    const buildParams = () => {
        const params = [];
        if (_fields) params.push(_fields);
        if (_filter) params.push(_filter);
        if (_sort) params.push(_sort);
        if (_pages) params.push(_pages);
        if (_count) params.push(_count);
        return params.join("&");
    };

    const _filter = buildFilter();
    const _pages = `limit=${state.value.pageLimit}&page=${state.value.currentPage}`;
    const _count = state.value.currentPage === 1 ? (_filter ? "meta=filter_count" : "meta=total_count") : "";

    const paramString = buildParams();
    const url = `${Constants.GET_USERS}?${paramString}`;

    fetchData(url)
})

</script>

<template>
    <n-space vertical :size="12">
        <n-data-table
            :loading="loading"
            :bordered="false"
            :columns="columns"
            :data="tableData"
            :pagination="pagination"
            />
    </n-space>
</template>