<script setup>

import { reactive, ref, watch } from 'vue';
import { NInput, NDropdown, NButton, NForm } from 'naive-ui';
import LocationBox from "../src/features/nominatim/components/LocationBox.vue";
import MapPicker from '../src/components/profile/MapPicker.vue'
import { useLocationHelper } from '../src/components/profile/composables/useLocationHelper';
import Constants from '../src/constants'

const key = import.meta.env.VITE_LOCATION_UPDATER;

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

const addressObject = {
    address
}

const { location, locationHandler, zoom, zoomHandler } = useLocationHelper();

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

        const headers = new Headers();
        headers.append('type', _type)
        headers.append('key', key);

        const url = `http://localhost:4050/v1/admin/read`;
        const response = await fetch(url,{
            headers
        });

        
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
            location: location.value,
            address: {
                location_country: address.value.country,
                location_city: address.value.city,
                location_postalcode: address.value.postalcode,
                location_street: address.value.street,
            }
        }

        try{
            loading.value = true;
            
            const headers = new Headers();
            headers.append('key', key);
            headers.append('Content-Type', 'application/json');

            const url = `http://localhost:4050/v1/admin/updateLocation/`;
            const response = await fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(payload)
            });

            if (!response.ok)
            {
                throw new Error ("Can't update");
            }
        }
        catch (error) {
            console.log(error);
        }
        finally{
            loading.value = false;
        }

    }
}

function updateCoords(loc)
{
    console.log (loc);
}

// function addressChangeHandler()
// {
//     const add = {
//         street: address.value.location_street,
//         city: address.value.location_city,
//         postalcode: address.value.location_postalcode,
//         country: address.value.location_country
//     }
// }

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
        <NForm @input="addressChangeHandler">
            <NInput v-model:value="address.street" placeholder="Street"></NInput>
            <NInput v-model:value="address.city" placeholder="City"></NInput>
            <NInput v-model:value="address.postalcode" placeholder="Postalcode"></NInput>
            <NInput v-model:value="address.country" placeholder="Country"></NInput>
        </NForm>
           
        <div v-if="loading">Loading...</div>
        
        <MapPicker :coords="location" @coords="updateCoords" :zoom="zoom"/>
    
        <LocationBox :location="location" @location="locationHandler" :address="address" @zoom="zoomHandler"/>

        <NButton @click="update">Update</NButton>

    </div>

</template>