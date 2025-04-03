<script setup>
import { ref, watchEffect, h } from 'vue'
import Constants from '../constants'
import { NDataTable, NSpace, NA, NAvatar, NSwitch, NTag } from "naive-ui"

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
        title: 'Available',
        key: 'available',
        render(row) {
            if (row.available)
            {
                return h(
                    NTag,
                    {
                        round: "true",
                        bordered: "false",
                        type: "success"
                    },
                    "available"
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

function fetchData(url)
{
    loading.value = true

    fetch(url).then((response) => {
        response.json().then((data) => {
            tableData.value = []
            data.data.forEach((u) => {
                const row = {
                    src: userpicLink(u.userpic),
                    username: u.username,
                    available: u.related[0].hire !== null ? u.related[0].hire.available : false 
                }
                tableData.value.push (row)
            })

            if (data.hasOwnProperty("meta"))
            {
                state.value.totalCount = data.meta.total_count || data.meta.filter_count || state.value.totalCount      
            }
            state.value.totalPages = Math.ceil(state.value.totalCount / state.value.pageLimit)  || state.value.totalPages
        })
        .catch((err) => {
            throw (err);
        })
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(()=>{
        loading.value = false
    })
}

const _sort = "sort=username"
const _fields =`fields[]=username,userpic,related.hire.available`
const _hireFilter=`[related.hire][available][_eq]=true` 

watchEffect(async () => { 

    var _filter = ""
    var params = []
    const _pages =`limit=${state.value.pageLimit}&page=${state.value.currentPage}`
    var _count = ""

    const _usernameFilter=`[username][_contains]=${state.value.filter}`
    
    var filters = new Array()

    if (state.value.availableForHire) filters.push(_hireFilter)
    if (state.value.filter != "") filters.push(_usernameFilter)
    
    if (filters.length == 1)
    {
        _filter = `filter${filters[0]}`   
    }
    else
    {
        for (const [index, f] of filters.entries())
        {
            _filter += `&filter[_and][${index}]${f}`   
        }
    }

    if (state.value.currentPage == 1)
    {
        _count = _filter != "" ? "meta=filter_count" :  "meta=total_count"
    }

    if (_fields !="") params.push (_fields)
    if (_filter != "") params.push (_filter)
    if (_sort != "") params.push (_sort)
    if (_pages != "") params.push (_pages)
    if (_count != "") params.push (_count)

    var paramString = params.join('&')

    const url = `${Constants.GET_USERS}?${paramString}`

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