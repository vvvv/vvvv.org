<script setup>
import { ref, reactive } from 'vue'
import { NInput } from 'naive-ui';
import LocationBox from "@/features/nominatim/components/LocationBox.vue"

function handlePlace(place)
{
    if (place)
    {
        const coords = {
            lat: place.geometry.coordinates[1],
            long: place.geometry.coordinates[0]
        }

        console.log (coords);
        location.value = place;   
    }
}

const defaultLocation = {
  "geometry": {
    "type": "Point",
    "coordinates": [
      13.402712099999999,
      52.564236099999995
    ]
  }
};

const location = ref(defaultLocation);

const addressData = reactive({
    street: "",
    postalcode: "",
    country: "" 
})

</script>

<template>
    <div id="profile">

        <NInput v-model:value="addressData.street" placeholder="Street"></NInput>
        <NInput v-model:value="addressData.plz" placeholder="plz"></NInput>
        <NInput v-model:value="addressData.country" placeholder="Country"></NInput>

        <LocationBox :location="location" :address="addressData" @location="handlePlace"/>
    </div>
</template>