<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { NInput, NSelect, NIcon } from 'naive-ui';
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
    persons.value.forEach(p=>{
        p.options = [p.person];
    })
})

watchEffect(()=>{
    console.log (persons.value);
})

const url = `${Constants.GET_USERS}?limit=5&fields[]=username,id&filter[username][_contains]=`

const debounceQuery = debounce(async (query, index)=>{
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
        options: []
    })
}

function remove(index)
{
    persons.value.splice(index, 1);
}

</script>
<template>
    <div class="d-block">
        <div v-for="(p, index) in persons" :key="p.person.value" class="row">
            <div class="col-12 col-md-6">
                <NSelect v-model:value="p.person.value"
                filterable
                :placeholder="placeholderPerson"
                :options="p.options"
                :loading="loading"
                clearable
                remote
                :clear-filter-after-select="true"
                @search="q => debounceQuery (q, index)"
                />
            </div>
            <div class="col-12 col-md-6 d-flex">
                <NInput v-model:value="p.role" :placeholder="placeholderRole"/>
                <template v-if="index == persons.length-1">
                    <NIcon @click="addNew" color="#000000" class="ml-2" size="1.2rem">
                        <AddCircle/>
                    </NIcon>
                </template>
                <template v-else>
                    <NIcon @click="remove(index)" color="#ff0000" class="ml-2" size="1.2rem">
                        <RemoveCircle />
                    </NIcon>
                </template>
            </div>
        </div>
    </div>
</template>