import { ref, computed } from 'vue'

export function useLocationHelper(_form){

    const form = ref(_form);

    const location = ref(null);

    const address = computed(()=>{

        if (!form && !form.value) return {};

        return{
            street: form.value[0].location_street,
            city: form.value[0].location_city,
            postalcode: form.value[0].location_postalcode,
            country: form.value[0].location_country,
        }
    })
    
    const handleLocation = (loc)=>{ 
        if (loc)
        {
            location.value = {
                lat: loc.geometry.coordinates[0],
                long: loc.geometry.coordinates[1]
            }
        }
    }

    const updateAddress = (loc)=>{
        if (loc)
        {
            if (loc.address.country) form.value[0].location_country = loc.address.country;
            if (loc.address.city) form.value[0].location_city = loc.address.city;
            if (loc.address.postalcode) form.value[0].location_postalcode = loc.address.postalcode;
            if (loc.address.street) form.value[0].location_street = loc.address.street;
        }
    }

    return { location, address, handleLocation, updateAddress }
}