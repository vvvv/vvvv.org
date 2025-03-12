<script setup>
import { ref, watchEffect } from 'vue'
import Constants from '../constants'

const state = defineModel()
const users = ref(null)

function link (l)
{
    return `${Constants.ASSETS}${l}?width=40&quality=90&fit=cover`;
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
    fetch(url)
    .then((response) => {
        response.json().then((data) => {
            users.value = data.data

            if (data.hasOwnProperty("meta"))
            {
                state.value.totalCount = data.meta.total_count || data.meta.filter_count || state.value.totalCount      
            }
            state.value.totalPages = Math.ceil(state.value.totalCount / state.value.pageLimit)  || state.value.totalPages
        })
    })
    .catch((err) => {
        console.error(err);
    });
}


watchEffect(async () => { 
    var _filter = ""
    var params = []
    const _sort = "sort=username"
    const _pages =`limit=${state.value.pageLimit}&page=${state.value.currentPage}`
    const _fields =`fields=username,userpic,hire.available` 
    var _count = ""

    const _usernameFilter=`[username][_contains]=${state.value.filter}`
    const _hireFilter=`[hire][available][_eq]=true`

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

    console.log (paramString)

    const url = `${Constants.GET_USERS}?${paramString}`

    fetchData(url)
})

</script>

<template>
    <div class="table-responsive">
        <table class="table table-sm">
            <colgroup>
                <col class="col-md-1">
                <col class="col-md-3">
                <col class="col-md-8">
            </colgroup>
            <thead>
                <tr>
                    <th scope="col" class="picsize"></th>
                    <th scope="col">Username</th>
                    <th scope="col">Available for hire</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="u in users" track-by="id">
                    <td><img :src="link(u.userpic)" v-if="u.userpic !== null" class="rounded-circle"/></td> 
                    <td><a :href="`?user=${u.username}`">{{u.username}}</a></td>
                    <td><template v-if="u.hire.length > 0">{{ u.hire[0].available ? 'Yes' : 'No' }}</template></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>