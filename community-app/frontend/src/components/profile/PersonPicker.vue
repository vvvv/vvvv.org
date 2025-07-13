<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { NInput, NSelect, NIcon, NButton } from 'naive-ui';
import { getValue } from "./HelpTexts.js"
import Constants from '../../constants.js'
import debounce from 'lodash/debounce'
import { AddCircle, RemoveCircle } from '@vicons/ionicons5'

const props = defineProps(['path','type']);

const loading = ref(false);
const persons = defineModel();

const personsPicker = ref([]);

const placeholderPerson = getValue(props.path, "placeholderPerson", props.type);
const placeholderRole = getValue(props.path, "placeholderRole", props.type);

onMounted(()=>{

    if (persons.value && persons.value.length == 0)
    {
        addNew();  
    }
})

watchEffect(()=>{
})

const url = `${Constants.GET_USERS}?limit=5&fields[]=username,id&filter[username][_contains]=`

const debounceQuery = debounce(async (query, index)=>{
        persons.value[index].options = [];
        persons.value[index].options = await queryUsers(query);
}, 400)

async function queryUsers(query){

    let options = [];

    if (query.length == 0)
    {
        return options;
    }

    try{
        loading.value = true;

        var req = await fetch(url+query);
        if (req.ok)
        {
            const json = await req.json();
            options = json.data.map(u=>{
                return {
                    label: u.username,
                    value: u.id
                }
            });
        }
    }
    catch (error)
    {
        console.log (error);
    }
    finally{
        loading.value = false;
    }

    return options;
}

function addNew()
{
    persons.value.push({
        role: "",
        person: {
            label:"",
            value:""
        },
        options: [],
        id: null
    })
}

function remove(index)
{
    persons.value.splice(index, 1);
}

</script>
<template>
    <div class="d-block">
        <div v-for="(p, index) in persons" :key="p.person.value" class="row mb-2 align-items-center">
            <div class="col-12 col-md-6">
                <NSelect v-model:value="p.person.value"
                filterable
                :placeholder="placeholderPerson"
                :options="p.options"
                :loading="loading"
                clearable
                remote
                @focus="()=>{p.options = []}"
                @search="q => debounceQuery (q, index)"
                />
            </div>
            <div class="col-12 col-md-6 d-flex align-items-center">
                <NInput v-model:value="p.role" :placeholder="placeholderRole" clearable/>
                <NButton @click="remove(index)" secondary size="small" class="ml-2">-</NButton>
            </div>
        </div>
        <NButton @click="addNew" secondary size="small">+</NButton>
    </div>
</template>