<script setup>

import { reactive, ref, watch } from 'vue';
import { NInput, NDropdown, NButton } from 'naive-ui';
import LocationBox from "../../src/features/nominatim/components/LocationBox.vue";
import { useLocationHelper } from '../../src/components/profile/composables/useLocationHelper';
import Constants from '../../src/constants'

const key = import.meta.env.VITE_LOCATION_UPDATER;

console.log (key);

const types = [
    {
        label: 'Company',
        key: 'Company'
    },
    {
        label: 'Edu',
        key: 'Edu'
    }
]

const defautAddress = {
    street: '',
    city: '',
    postalcode: '',
    country: ''
}

const address = ref(defautAddress);
const type = ref('');
const loading = ref(false);
const entities = ref([]);
const selected = ref(null);

const { location, handleLocation } = useLocationHelper();

watch (location, (newValue)=>{
    console.log (newValue);
})

async function onChangeType(_type)
{
    type.value = _type;

    selected.value = null;
    address.value = defautAddress;
    location.value = null;

    try{
        loading.value = true;

        const url = `${Constants.BASEURL}items/${_type}?fields[]=name,location,location_city,location_street,location_postalcode,location_country`;
        const response = await fetch(url);

        if (!response.ok)
        {
            throw new Error ('Server Error');        
        }

        const json = await response.json();

        entities.value = json.data.map(e => {
            return {
                label: e.name,
                key: {
                    type: _type,
                    name: e.name,
                    address: {
                        city: e.location_city,
                        street: e.location_street,
                        postalcode: e.location_postalcode,
                        country: e.location_country
                    }
                }
            }
        })

    }
    catch (error)
    {
        console.log(error);
    }
    finally{
        loading.value = false;
    }
}

function onChangeEntity(entity)
{
    location.value = null;

    selected.value = entity;
    address.value = entity.address;
}

async function update()
{
    if (selected)
    {
        const payload = 
        {
            type: selected.value.type,
            name: selected.value.name,
            location: location.value
        }

        try{
            console.log (payload);
            // loading.value = true;

            // const url = `http://localhost:4050/v1/admin/updateLocation/`;
            // const response = await fetch(url, {
            //     method: "POST",
            //     body: JSON.stringify(payload)
            // });

            // if (!response.ok)
            // {
            //     throw new Error ("Can't update");
            // }
        }
        catch (error) {
            console.log(error);
        }
        finally{
            loading.value = false;
        }

    }
}

</script>
<template>
    <div>
        <NDropdown trigger="click" :options="types" @select="onChangeType">
            <NButton>{{ type || 'Choose Type'}}</NButton>
        </NDropdown>
    </div>

    <div>
        <NDropdown trigger="click" :options="entities" @select="onChangeEntity">
            <NButton>Choose Entity</NButton>
        </NDropdown>
    </div>

    <div>
        {{  selected?.name || '' }}
        <NInput v-model:value="address.street" placeholder="Street"></NInput>
        <NInput v-model:value="address.city" placeholder="City"></NInput>
        <NInput v-model:value="address.postalcode" placeholder="Postalcode"></NInput>
        <NInput v-model:value="address.country" placeholder="Country"></NInput>
    
        <LocationBox :location=location @location="handleLocation" :address="address"/>
    
        <div v-if="loading">Loading...</div>
    
        <NButton @click="update">Update</NButton>
    </div>

</template>