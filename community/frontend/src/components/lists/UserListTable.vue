<script setup>
import { ref, watchEffect, h } from 'vue'
import { useRouter } from 'vue-router'
import { NDataTable, NSpace, NA, NAvatar, NSwitch, NTag, NIcon, loadingBarProviderProps } from "naive-ui"
import { fetchUserData } from "./fetchUserData.js";

const router = useRouter()

const showProfile = (username)=>{
    router.push(`/user/?u=${username}`);
}

const state = defineModel()
const pagination = ref(20)
const tableData = ref([])
const loading = ref(false)

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
    fetchUserData( loading, tableData, state );
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