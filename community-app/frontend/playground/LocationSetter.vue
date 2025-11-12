<script setup>

import { reactive, ref, watch } from 'vue';
import { NInput, NDropdown, NButton, NForm } from 'naive-ui';
import LocationBox from "../src/features/nominatim/components/LocationBox.vue";
import MapPicker from '../src/components/profile/MapPicker.vue';
import { useMapHelper } from '../src/components/profile/composables/useMapHelper.js';
import { useFormHelper } from '../src/components/profile/composables/useFormHelper.js';
import Constants from '../src/constants'

const key = import.meta.env.VITE_LOCATION_UPDATER;


const form = ref([{}]);

const formHelper = useFormHelper(form);
const { location, zoom, address, updateZoom, updateLoc, addressChangeHandler, disabled, searching, setWatchers : mapHelperSetWatchers } = useMapHelper(form, formHelper);

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

const type = ref('');
const loading = ref(false);
const entities = ref([]);
const selected = ref(null);

async function onChangeType(_type)
{
    type.value = _type;

    selected.value = null;
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
                    },
                    location: e.location ? formHelper.transformer.map.toLocation(e.location) : null
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

    mapHelperSetWatchers();
}

function onChangeEntity(entity)
{
    location.value = null;

    selected.value = entity;

    form.value[0] = {
            location_street: entity.address.street,
            location_city: entity.address.city,
            location_postalcode: entity.address.postalcode,
            location_country: entity.address.country
    }
    
    
    if (location.value)
    {
        location.value = entity.location;
        updateLoc(location.value);
    }
    else
    {
        console.log ("search address");
        address.value = entity.address;
    }

}

async function update()
{
    if (selected)
    {
        const payload = 
        {
            type: selected.value.type,
            name: selected.value.name,
            address: {
                location_country: address.value.country,
                location_city: address.value.city,
                location_postalcode: address.value.postalcode,
                location_street: address.value.street,
            }
        }

        if (location.value)
        {
            payload.location = location.value;
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

    <div id="profile">
        {{  selected?.name || '' }}
        <NForm @input="addressChangeHandler">
            <NInput v-model:value="form[0].location_street" placeholder="Street"></NInput>
            <NInput v-model:value="form[0].location_city" placeholder="City"></NInput>
            <NInput v-model:value="form[0].location_postalcode" placeholder="Postalcode"></NInput>
            <NInput v-model:value="form[0].location_country" placeholder="Country"></NInput>
        </NForm>
           
        <div v-if="loading">Loading...</div>
        
         <div class="d-flex flex-column w-100">
            <div class="row">
                <div class="col-12 map">
                    <MapPicker :coords="location" @coords="updateLoc" :zoom="zoom" @zoom="updateZoom" :disabled="disabled" :searching="searching"/>
                </div>
            </div>
         </div>
    
        <NButton @click="update">Update</NButton>

    </div>

</template>